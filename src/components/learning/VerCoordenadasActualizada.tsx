// import Polygon from "@arcgis/core/geometry/Polygon";
// import Point from "@arcgis/core/geometry/Point";
// import Polyline from "@arcgis/core/geometry/Polyline";
import Geometry from "@arcgis/core/geometry/Geometry";
import { drawingSketch } from "../../map/layers/drawing";
import { useEffect, useState } from "react";

export function GeometryContainer() {
  const [geometry, setGeometry] = useState<Geometry>();
  useEffect(() => {
    drawingSketch.on("create", (e) => {
      if (e.state === "complete") {
        setGeometry(e.graphic.geometry);
      }
    });
  }, []);

  return <div>{JSON.stringify(geometry)}</div>;
}
