import Polygon from "@arcgis/core/geometry/Polygon";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";

// 🗺️ Graphics Layers
export const graphicsLayer = new GraphicsLayer({ title: "🌳 Reforestaciones" });

const polygon = new Polygon({
  rings: [
    [
      [-88.72444100946737, 13.916831121334241, 0.0],
      [-88.724318543227298, 13.91676328873301, 0.0],
      [-88.724271817051772, 13.91679308341504, 0.0],
      [-88.724292077539772, 13.916866380888781, 0.0],
      [-88.724310966974386, 13.91690394939941, 0.0],
      [-88.724336378952231, 13.91692616682537, 0.0],
      [-88.724386042211435, 13.916943802064599, 0.0],
      [-88.724446616354385, 13.916932658434559, 0.0],
      [-88.724472878074664, 13.91692312199214, 0.0],
      [-88.724498956291271, 13.91692792531083, 0.0],
      [-88.724544933196611, 13.91697302717524, 0.0],
      [-88.724606114235399, 13.9170423474869, 0.0],
      [-88.724649518671001, 13.917039046702129, 0.0],
      [-88.724687577044207, 13.91699603131921, 0.0],
      [-88.724640622356645, 13.916944060299119, 0.0],
      [-88.724652691260914, 13.916882318854951, 0.0],
      [-88.724617842908984, 13.916828248946601, 0.0],
      [-88.724566081294668, 13.9168266707812, 0.0],
      [-88.724545870488399, 13.916872854807121, 0.0],
      [-88.724519403435309, 13.91690416131738, 0.0],
      [-88.724429610552164, 13.91688052960771, 0.0],
      [-88.72444100946737, 13.916831121334241, 0.0],
    ],
  ],
});
const simpleFillSymbol = {
  type: "simple-fill",
  color: [227, 139, 79, 0.8], // Orange, opacity 80%
  outline: {
    color: [255, 255, 255],
    width: 1,
  },
};

const polygonGraphic = new Graphic({
  attributes: {
    ObjectId: "1",
    address: "Holasdfjkdls",
  },
  geometry: polygon,
  symbol: simpleFillSymbol,
  popupTemplate: {
    title: "Places in Los Angeles",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "address",
            label: "address",
            visible: true,
          },
          {
            fieldName: "address",
            label: "Address",
            visible: true,
          },
        ],
      },
    ],
  },
});

const simpleMarkerSymbol = {
  type: "simple-marker",
  color: [226, 119, 40], // Orange
  outline: {
    color: [255, 255, 255], // White
    width: 1,
  },
};
const point = new Point({
  x: polygon.rings[0][0][0],
  y: polygon.rings[0][0][1],
});
const pointGraphic = new Graphic({
  // geometry: polygon.centroid, //⭐ funciona
  geometry: point,
  symbol: simpleMarkerSymbol,
});

// addes
graphicsLayer.add(pointGraphic);
graphicsLayer.add(polygonGraphic);
