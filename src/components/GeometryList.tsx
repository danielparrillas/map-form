import { sketch } from "../map/sketch";
import { useEffect } from "react";
import { useMapStore, clearGraphics, setGraphics } from "../hooks/mapStore";
import { Button } from "antd";
import GeometryForm from "./GeometryForm";

export function GeometryContainer() {
  const graphics = useMapStore((state) => state.graphics);
  useEffect(() => {
    sketch.on("create", (e) => e.state === "complete" && setGraphics());
    sketch.on("update", (e) => e.state === "complete" && setGraphics());
    sketch.on("delete", () => setGraphics());
    sketch.on("redo", () => setGraphics());
    sketch.on("undo", () => setGraphics());
  }, []);

  if (!graphics) {
    return <div></div>;
  }

  return (
    <div className="w-96">
      <Button className="rounded-none" onClick={() => clearGraphics()}>
        Limpiar
      </Button>
      {graphics.map(() => (
        // {graphics.map((graphic, index) => (
        <GeometryForm />
      ))}
    </div>
  );
}
