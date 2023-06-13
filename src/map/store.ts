import Graphic from "@arcgis/core/Graphic";
import Geometry from "@arcgis/core/geometry/Geometry";
import { drawingSketch } from "./layers/drawing";
import Collection from "@arcgis/core/core/Collection";

import { create } from "zustand";

type GeometryType =
  | "point"
  | "polyline"
  | "polygon"
  | "extent"
  | "multipoint"
  | "mesh";

interface UseMapStore {
  graphic?: Graphic;
  setGraphic: (graphic?: Graphic) => void;
  geometry?: Geometry;
  setGeometry: (geometry?: Geometry) => void;
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
  setGeometry: (geometry) => set(() => ({ geometry: geometry })),
}));
