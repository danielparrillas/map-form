import Graphic from "@arcgis/core/Graphic";
import { drawingSketch } from "./layers/drawing";
import Collection from "@arcgis/core/core/Collection";

import { create } from "zustand";

interface UseMapStore {
  graphic?: Graphic;
  setGraphic: (graphic?: Graphic) => void;
  graphics: Collection<Graphic>;
  updatedGraphics: () => void;
  clearGraphics: () => void;
}

export const useMapStore = create<UseMapStore>()((set) => ({
  graphics: drawingSketch.layer.graphics,
  updatedGraphics: () =>
    set(() => ({ graphics: drawingSketch.layer.graphics })),
  clearGraphics: () => {
    drawingSketch.layer.graphics.removeAll();
    set(() => ({ graphics: drawingSketch.layer.graphics }));
  },
  setGraphic: (graphic) => set(() => ({ graphic: graphic })),
}));
