import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
// import Color from "@arcgis/core/Color.js";

export const markerStyle = new SimpleMarkerSymbol({
  color: "rgba(255,140,0,1)",
  outline: {
    color: "white",
    width: 2,
  },
});
export const lineStyle = new SimpleLineSymbol({
  color: "darkorange",
  width: 2,
});
export const polygonStyle = new SimpleFillSymbol({
  color: "rgba(255,140,0,0.2)",
  outline: {
    color: "darkorange",
    width: 2,
  },
});
