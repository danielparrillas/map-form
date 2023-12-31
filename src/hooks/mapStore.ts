import Graphic from "@arcgis/core/Graphic";
import Geometry from "@arcgis/core/geometry/Geometry";
import { sketch } from "../map/sketch";
import Collection from "@arcgis/core/core/Collection";
import { create } from "zustand";
import Point from "@arcgis/core/geometry/Point";
import {
  webMercatorToGeographic,
  geographicToWebMercator,
} from "@arcgis/core/geometry/support/webMercatorUtils";
import Polyline from "@arcgis/core/geometry/Polyline";
import Polygon from "@arcgis/core/geometry/Polygon";
import { view } from "../map/config";
import { municipiosFeatureLayer, cantonesFeatureLayer } from "../map/services";

type GraphicWithUID = Graphic & { uid?: string };

interface UseMapStore {
  graphic?: GraphicWithUID;
  graphics?: Collection<GraphicWithUID>;
  municipios: GraphicWithUID[];
  cantones: GraphicWithUID[];
}

export const useMapStore = create<UseMapStore>()(() => ({
  municipios: [],
  cantones: [],
}));

export const clearGraphics = () => {
  sketch.layer.graphics.removeAll();
  useMapStore.setState({ graphics: sketch.layer.graphics });
};

export const setGraphics = () => {
  useMapStore.setState({ graphics: sketch.layer.graphics });
};
export const setGraphic = (graphic?: Graphic) => {
  useMapStore.setState({ graphic: graphic });
};

export const selectGraphic = (graphicUID: string | number) => {
  const graphics = sketch.layer.graphics;
  for (let index = 0; index < graphics.length; index++) {
    const item: GraphicWithUID = graphics.getItemAt(index);
    if (item?.uid === graphicUID) {
      view.goTo(item);
      if (item.geometry.type === "point") view.zoom = 20;
      setGraphic(item);
      break;
    }
  }
};

export const removeGraphic = (graphicUID: string | number) => {
  const graphics = sketch.layer.graphics;
  for (let index = 0; index < graphics.length; index++) {
    const item: GraphicWithUID = graphics.getItemAt(index);
    if (item?.uid === graphicUID) {
      graphics.removeAt(index);
      break;
    }
  }
  setGraphic();
  setGraphics();
};

export const updatePoint = (
  graphicUID: string | number,
  x: number,
  y: number
) => {
  const graphics = sketch.layer.graphics;
  graphics.forEach((graphic: GraphicWithUID) => {
    if (graphic?.uid === graphicUID) {
      const point = new Point({ x, y });
      graphic.geometry = geographicToWebMercator(point);
      setGraphic(graphic);
      setMunicipiosFromSketchGeometry(graphic.geometry);
      setCantonesFromSketchGeometry(graphic.geometry);
    }
  });
};

export const updateLine = (
  graphicUID: string | number,
  value: number,
  index1: number,
  index2: number,
  index3: number
) => {
  const graphics = sketch.layer.graphics;
  graphics.forEach((graphic: GraphicWithUID) => {
    if (graphic?.uid === graphicUID) {
      const lineString = new Polyline(
        webMercatorToGeographic(graphic.geometry)
      );
      lineString.paths[index1][index2][index3] = value;
      graphic.geometry = geographicToWebMercator(lineString);
      setGraphic(graphic);
      setMunicipiosFromSketchGeometry(graphic.geometry);
      setCantonesFromSketchGeometry(graphic.geometry);
    }
  });
};

export const updatePolygon = (
  graphicUID: string | number,
  value: number,
  index1: number,
  index2: number,
  index3: number,
  isFirstOrLast: boolean
) => {
  const graphics = sketch.layer.graphics;
  graphics.forEach((graphic: GraphicWithUID) => {
    if (graphic?.uid === graphicUID) {
      const lineString = new Polygon(webMercatorToGeographic(graphic.geometry));
      if (isFirstOrLast) {
        const lastIndex = lineString.rings[index1].length - 1;
        lineString.rings[index1][0][index3] = value;
        lineString.rings[index1][lastIndex][index3] = value;
      } else {
        lineString.rings[index1][index2][index3] = value;
      }
      graphic.geometry = geographicToWebMercator(lineString);
      setGraphic(graphic);
      setMunicipiosFromSketchGeometry(graphic.geometry);
      setCantonesFromSketchGeometry(graphic.geometry);
    }
  });
};

//⏺️ Vamos a actualizar la vista con estos eventos del sketch
sketch.on("create", (e) => {
  e.state === "start" && sketch.layer.graphics.length > 0 && clearGraphics();
  if (e.state === "complete") {
    setGraphic(e.graphic);
    setGraphics();
    setMunicipiosFromSketchGeometry(e.graphic.geometry);
    setCantonesFromSketchGeometry(e.graphic.geometry);
  }
});

sketch.on("update", (e) => {
  const isEditEventType =
    e.toolEventInfo &&
    e.toolEventInfo.type !== "move" &&
    e.toolEventInfo.type !== "reshape" &&
    e.toolEventInfo.type !== "rotate" &&
    e.toolEventInfo.type !== "scale";

  const isStartOrCompleteState =
    !e.toolEventInfo && (e.state === "start" || e.state === "complete");
  if (isEditEventType || isStartOrCompleteState) {
    e.graphics.forEach((updatedGraphic: GraphicWithUID) => {
      const isUpdated = sketch.layer.graphics.some(
        (previousGraphic: GraphicWithUID) => {
          return previousGraphic?.uid === updatedGraphic?.uid;
        }
      );
      if (isUpdated) {
        // El gráfico ha sido actualizado
        setGraphic(updatedGraphic);
        setMunicipiosFromSketchGeometry(updatedGraphic.geometry);
        setCantonesFromSketchGeometry(updatedGraphic.geometry);
      }
    });
  }
});

sketch.on("delete", () => {
  setGraphic();
  setGraphics();
  setMunicipiosFromSketchGeometry();
  setCantonesFromSketchGeometry();
});

sketch.on("redo", (e) => {
  e.graphics.forEach((updatedGraphic: GraphicWithUID) => {
    const isUpdated = sketch.layer.graphics.some(
      (previousGraphic: GraphicWithUID) => {
        return previousGraphic?.uid === updatedGraphic?.uid;
      }
    );
    if (isUpdated) {
      // El gráfico ha sido actualizado
      setGraphic(updatedGraphic);
      setMunicipiosFromSketchGeometry(updatedGraphic.geometry);
      setCantonesFromSketchGeometry(updatedGraphic.geometry);
    }
  });
});

sketch.on("undo", (e) => {
  e.graphics.forEach((updatedGraphic: GraphicWithUID) => {
    const isUpdated = sketch.layer.graphics.some(
      (previousGraphic: GraphicWithUID) => {
        return previousGraphic?.uid === updatedGraphic?.uid;
      }
    );
    if (isUpdated) {
      // El gráfico ha sido actualizado
      setGraphic(updatedGraphic);
      setMunicipiosFromSketchGeometry(updatedGraphic.geometry);
      setCantonesFromSketchGeometry(updatedGraphic.geometry);
    }
  });
});

function setMunicipiosFromSketchGeometry(geometry?: Geometry) {
  if (!geometry) {
    useMapStore.setState({ municipios: [] });
    return;
  }

  municipiosFeatureLayer
    .queryFeatures({
      geometry,
      outFields: ["*"],
      spatialRelationship: "intersects",
      returnGeometry: false,
    })
    .then((featureSet) => {
      const result = featureSet.features;
      useMapStore.setState({ municipios: result });
    });
}

function setCantonesFromSketchGeometry(geometry?: Geometry) {
  if (!geometry) {
    useMapStore.setState({ cantones: [] });
    return;
  }

  cantonesFeatureLayer
    .queryFeatures({
      geometry,
      outFields: ["*"],
      spatialRelationship: "intersects",
      returnGeometry: false,
    })
    .then((featureSet) => {
      const result = featureSet.features;
      useMapStore.setState({ cantones: result });
    });
}
