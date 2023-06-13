import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Sketch from "@arcgis/core/widgets/Sketch";

const drawingLayer = new GraphicsLayer({ title: "✏️ Capa de dibujo" });

//view model

// create a new sketch widget
export const drawingSketch = new Sketch({
  layer: drawingLayer,
  // graphic will be selected as soon as it is created
  creationMode: "update",
  visibleElements: {
    createTools: { circle: false, rectangle: false },
    selectionTools: { "lasso-selection": false, "rectangle-selection": false },
    settingsMenu: false,
  },
  defaultUpdateOptions: { tool: "reshape" },
});

// con esto podemos ver las coordenadas
// drawingSketch.on("create", (e) => {
//   if (e.state === "complete") {
//     const geometry = e.graphic.geometry;
//     if (geometry.type === "point") console.log("Punto");
//     if (geometry.type === "polygon") console.log("Poligono");
//     console.log(
//       drawingSketch.layer.graphics.forEach((g) => console.log(g.geometry))
//     );
//   }
// });

// con este metodo solo podremos ingresar un tipo de geometria
drawingSketch.on("create", (e) => {
  if (drawingSketch.layer.graphics.length !== 0) {
    if (
      drawingSketch.layer.graphics.getItemAt(0).geometry.type !==
      e.graphic.geometry.type
    ) {
      drawingSketch.layer.graphics.removeAll();
    }
  }
});

//permite cancelar un dibujo
// drawingSketch.on("create", function (event) {
//   // Si ya hay una geometría presente, desactiva el dibujo o muestra un mensaje al usuario
//   drawingSketch.cancel();
//   console.log("Solo se permite crear una geometría.");
//   return;
// });
