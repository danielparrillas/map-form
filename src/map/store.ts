import Graphic from "@arcgis/core/Graphic";
import { drawingSketch } from "./layers/drawing";
import Collection from "@arcgis/core/core/Collection";

import { create } from "zustand";

interface UseMapStore {
  graphic?: Graphic;
  graphics: Collection<Graphic>;
  setGraphics: () => void;
  clearGraphics: () => void;
}

export const useMapStore = create<UseMapStore>()((set) => ({
  graphics: drawingSketch.layer.graphics,
  setGraphics: () => set(() => ({ graphics: drawingSketch.layer.graphics })),
  clearGraphics: () => {
    drawingSketch.layer.graphics.removeAll();
    set(() => ({ graphics: drawingSketch.layer.graphics }));
  },
}));

export const setGraphic = (graphic?: Graphic) => {
  useMapStore.setState({ graphic: graphic });
};

drawingSketch.on("create", (e) => {
  if (e.state === "complete") {
    setGraphic(e.graphic);
  }
});

drawingSketch.on("update", (e) => {
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
      const isUpdated = drawingSketch.layer.graphics.some((previousGraphic) => {
        return previousGraphic.get("uid") === updatedGraphic.get("uid");
      });
      if (isUpdated) {
        // El gráfico ha sido actualizado
        setGraphic(updatedGraphic);
      }
    });
  }
});

drawingSketch.on("delete", () => {
  setGraphic();
});

drawingSketch.on("redo", (e) => {
  e.graphics.forEach((updatedGraphic) => {
    const isUpdated = drawingSketch.layer.graphics.some((previousGraphic) => {
      return previousGraphic.get("uid") === updatedGraphic.get("uid");
    });
    if (isUpdated) {
      // El gráfico ha sido actualizado
      setGraphic(updatedGraphic);
    }
  });
});

drawingSketch.on("undo", (e) => {
  e.graphics.forEach((updatedGraphic) => {
    const isUpdated = drawingSketch.layer.graphics.some((previousGraphic) => {
      return previousGraphic.get("uid") === updatedGraphic.get("uid");
    });
    if (isUpdated) {
      // El gráfico ha sido actualizado
      setGraphic(updatedGraphic);
    }
  });
});
