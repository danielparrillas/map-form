import { drawingSketch } from "../map/layers/drawing";
import { useEffect } from "react";
import { useMapStore } from "../map/store";
import { Button } from "antd";

import GeometryForm from "./GeometryForm";
import { graphicToFeature } from "../utils/feature";

export function GeometryContainer() {
  const { graphics, clearGraphics, updatedGraphics } = useMapStore();
  useEffect(() => {
    drawingSketch.on(
      "create",
      (e) => e.state === "complete" && updatedGraphics()
    );
    drawingSketch.on(
      "update",
      (e) => e.state === "complete" && updatedGraphics()
    );
    drawingSketch.on("delete", () => updatedGraphics());
    drawingSketch.on("redo", () => updatedGraphics());
    drawingSketch.on("undo", () => updatedGraphics());
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
