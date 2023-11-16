import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Sketch from "@arcgis/core/widgets/Sketch";

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
});
