import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Sketch from "@arcgis/core/widgets/Sketch";
import { setGraphic } from "./store";

const sketchLayer = new GraphicsLayer({ title: "✏️ Capa de dibujo" });

//view model

// create a new sketch widget
export const sketch = new Sketch({
  layer: sketchLayer,
  // graphic will be selected as soon as it is created
  creationMode: "update",
  visibleElements: {
    createTools: { circle: true, rectangle: true },
    selectionTools: { "lasso-selection": false, "rectangle-selection": false },
    settingsMenu: false,
  },
});

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
