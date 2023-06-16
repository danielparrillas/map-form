import { drawingSketch } from "../map/layers/drawing";
import { useEffect } from "react";
import { useMapStore, clearGraphics, setGraphics } from "../map/store";
import { Button } from "antd";

import GeometryForm from "./GeometryForm";
import { graphicToFeature } from "../utils/feature";

export function GeometryContainer() {
  const { graphics } = useMapStore();
  useEffect(() => {
    drawingSketch.on("create", (e) => e.state === "complete" && setGraphics());
    drawingSketch.on("update", (e) => e.state === "complete" && setGraphics());
    drawingSketch.on("delete", () => setGraphics());
    drawingSketch.on("redo", () => setGraphics());
    drawingSketch.on("undo", () => setGraphics());
  }, []);

  return (
    <div className="w-96">
      <Button className="rounded-none" onClick={() => clearGraphics()}>
        Limpiar
      </Button>
      {graphics.map((graphic, index) => (
        <GeometryForm />
      ))}
    </div>
  );
}
