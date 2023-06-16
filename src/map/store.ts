import Graphic from "@arcgis/core/Graphic";
import { drawingSketch } from "./sketch";
import Collection from "@arcgis/core/core/Collection";

import { create } from "zustand";

interface UseMapStore {
  graphic?: Graphic;
  graphics?: Collection<Graphic>;
}

export const useMapStore = create<UseMapStore>()(() => ({}));

/**
 * limipia la lista de graficos del mapa y la vista
 */
export const clearGraphics = () => {
  drawingSketch.layer.graphics.removeAll();
  useMapStore.setState({ graphics: drawingSketch.layer.graphics });
};

export const setGraphics = () => {
  useMapStore.setState({ graphics: drawingSketch.layer.graphics });
};

/**
 * Setea el grafico que muestra la vista
 * @param graphic
 */
export const setGraphic = (graphic?: Graphic) => {
  useMapStore.setState({ graphic: graphic });
};
