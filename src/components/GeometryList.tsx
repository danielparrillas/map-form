// import Polygon from "@arcgis/core/geometry/Polygon";
// import Geometry from "@arcgis/core/geometry/Geometry";
// import Point from "@arcgis/core/geometry/Point";
// import Polyline from "@arcgis/core/geometry/Polyline";
// import Graphic from "@arcgis/core/Graphic";
import { drawingSketch } from "../map/layers/drawing";
import { useEffect } from "react";
// import Collection from "esri/core/Collection";
import { useMapStore } from "../map/store";
import {
  geodesicArea,
  geodesicLength,
} from "@arcgis/core/geometry/geometryEngine";
import { geojsonToArcGIS, arcgisToGeoJSON } from "@terraformer/arcgis";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";

export function GeometryContainer() {
  const { graphics, clearGraphics, updatedGraphics } = useMapStore();
  useEffect(() => {
    drawingSketch.on("create", () => updatedGraphics());
    drawingSketch.on("update", () => updatedGraphics());
    drawingSketch.on("delete", () => updatedGraphics());
    drawingSketch.on("redo", () => updatedGraphics());
    drawingSketch.on("undo", () => updatedGraphics());
  }, []);

  return (
    <div className="w-96">
      {JSON.stringify(
        graphics.map((g) =>
          arcgisToGeoJSON(webMercatorToGeographic(g.geometry))
        )
      )}
    </div>
  );
}
