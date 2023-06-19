import Graphic from "@arcgis/core/Graphic";
import { sketch } from "../map/sketch";
import Collection from "@arcgis/core/core/Collection";
import { create } from "zustand";
import Point from "@arcgis/core/geometry/Point";
import {
  webMercatorToGeographic,
  geographicToWebMercator,
} from "@arcgis/core/geometry/support/webMercatorUtils";

interface UseMapStore {
  graphic?: Graphic;
  graphics?: Collection<Graphic>;
}

export const useMapStore = create<UseMapStore>()(() => ({}));

/**
 * limipia la lista de graficos del mapa y la vista
 */
export const clearGraphics = () => {
  sketch.layer.graphics.removeAll();
  useMapStore.setState({ graphics: sketch.layer.graphics });
};

export const setGraphics = () => {
  useMapStore.setState({ graphics: sketch.layer.graphics });
};

/**
 * Setea el grafico que muestra la vista
 * @param graphic
 */
export const setGraphic = (graphic?: Graphic) => {
  useMapStore.setState({ graphic: graphic });
};

export const removeGraphic = (graphicUID: string | number) => {
  const graphics = sketch.layer.graphics;
  for (let index = 0; index < graphics.length; index++) {
    const item = graphics.getItemAt(index);
    if (item.get("uid") === graphicUID) {
      graphics.removeAt(index);
      break;
    }
  }
  console.log("erew");
};

export const updatePoint = (
  graphicUID: string | number,
  x: number,
  y: number
) => {
  const graphics = sketch.layer.graphics;
  graphics.forEach((graphic, index) => {
    if (graphic.get("uid") === graphicUID) {
      const point = new Point({ x, y });
      graphic.geometry = geographicToWebMercator(point);
      setGraphic(graphic);
    }
  });
};

//⏺️ Vamos a actualizar la vista con estos eventos del sketch
sketch.on("create", (e) => {
  if (e.state === "complete") {
    setGraphic(e.graphic);
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
    e.graphics.forEach((updatedGraphic) => {
      const isUpdated = sketch.layer.graphics.some((previousGraphic) => {
        return previousGraphic.get("uid") === updatedGraphic.get("uid");
      });
      if (isUpdated) {
        // El gráfico ha sido actualizado
        setGraphic(updatedGraphic);
      }
    });
  }
});

sketch.on("delete", () => {
  setGraphic();
});

sketch.on("redo", (e) => {
  e.graphics.forEach((updatedGraphic) => {
    const isUpdated = sketch.layer.graphics.some((previousGraphic) => {
      return previousGraphic.get("uid") === updatedGraphic.get("uid");
    });
    if (isUpdated) {
      // El gráfico ha sido actualizado
      setGraphic(updatedGraphic);
    }
  });
});

sketch.on("undo", (e) => {
  e.graphics.forEach((updatedGraphic) => {
    const isUpdated = sketch.layer.graphics.some((previousGraphic) => {
      return previousGraphic.get("uid") === updatedGraphic.get("uid");
    });
    if (isUpdated) {
      // El gráfico ha sido actualizado
      setGraphic(updatedGraphic);
    }
  });
});
