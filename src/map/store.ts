import Graphic from "@arcgis/core/Graphic";
import { drawingSketch } from "./layers/drawing";
import Collection from "@arcgis/core/core/Collection";

import { create } from "zustand";

interface UseMapStore {
  graphic?: Graphic;
  graphics?: Collection<Graphic>;
}

export const useMapStore = create<UseMapStore>()(() => ({}));

export const clearGraphics = () => {
  drawingSketch.layer.graphics.removeAll();
  useMapStore.setState({ graphics: drawingSketch.layer.graphics });
};

export const setGraphics = () => {
  useMapStore.setState({ graphics: drawingSketch.layer.graphics });
};

export const setGraphic = (graphic?: Graphic) => {
  useMapStore.setState({ graphic: graphic });
};
