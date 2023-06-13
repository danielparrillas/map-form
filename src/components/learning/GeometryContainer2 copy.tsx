import { InputNumber } from "antd";
// import Polygon from "@arcgis/core/geometry/Polygon";
// import Geometry from "@arcgis/core/geometry/Geometry";
// import Point from "@arcgis/core/geometry/Point";
// import Polyline from "@arcgis/core/geometry/Polyline";
// import Graphic from "@arcgis/core/Graphic";
import { drawingSketch } from "../../map/layers/drawing";
import { useEffect } from "react";
// import Collection from "esri/core/Collection";
import { useMapStore } from "../../map/store";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";

export function GeometryContainer() {
  const { geometry, setGeometry } = useMapStore();
  useEffect(() => {
    drawingSketch.on("create", (e) =>
      setGeometry(webMercatorToGeographic(e.graphic.geometry))
    );
    drawingSketch.on("update", (e) =>
      setGeometry(webMercatorToGeographic(e.graphics[0].geometry))
    );
    drawingSketch.on("delete", () => setGeometry());
    drawingSketch.on("redo", (e) =>
      setGeometry(webMercatorToGeographic(e.graphics[0].geometry))
    );
    drawingSketch.on("undo", (e) =>
      setGeometry(webMercatorToGeographic(e.graphics[0].geometry))
    );
  }, []);

  if (!!geometry) {
    switch (geometry.type) {
      case "point":
        return (
          <div className="grid grid-cols-2 gap-2 overflow-y-auto">
            <InputNumber
              value={geometry.get("x")}
              className="w-full rounded-none"
              precision={6}
            />
            <InputNumber
              value={geometry.get("y")}
              className="w-full rounded-none"
              precision={6}
            />
          </div>
        );
      case "polyline":
        break;
      case "polygon":
        break;

      default:
        break;
    }
  } else {
    return <div></div>;
  }
}
