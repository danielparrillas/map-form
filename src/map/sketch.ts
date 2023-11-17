import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Sketch from "@arcgis/core/widgets/Sketch";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import { lineStyle, markerStyle, polygonStyle } from "./graphic-styles";

const sketchLayer = new GraphicsLayer({ title: "✏️ Capa de dibujo" });

//view model

// create a new sketch widget
export const sketch = new Sketch({
  layer: sketchLayer,
  // graphic will be selected as soon as it is created
  creationMode: "update",
  visibleElements: {
    settingsMenu: false,
    selectionTools: { "lasso-selection": false, "rectangle-selection": false },
  },
  viewModel: new SketchViewModel({
    pointSymbol: markerStyle,
    polylineSymbol: lineStyle,
    polygonSymbol: polygonStyle,
  }),
});
