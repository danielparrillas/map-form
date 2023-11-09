//🌎 arcgis
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import config from "@arcgis/core/config";
//🗺️ imports
// import { graphicsLayer } from "./layers/graphic";
import { sketch } from "./sketch";
// import { fullscreen } from "./fullscreen";
// import { basemapToggle } from "./basemapToggle";
// import { layerList } from "./layerList";
import { municipiosFeatureLayer, cantonesFeatureLayer } from "./services";
//🧪 testing

//⚙️ config
config.apiKey =
  "AAPKd049885b0910426db536781c03b20661HIFgGhU3Hh7xnuoUq8lhAvUhEysGdin0RrXYMAotKJjivYAmbr0Pn7EKiOAOSBeB";

export const view = new MapView({
  map: new WebMap({
    basemap: "arcgis-imagery-standard",
  }),
  center: [-88.93025, 13.7489783],
  zoom: 9,
});

//⏺️ cuando este lista la instancia del mapa
view.when(() => {
  addLayers();
  // // 1️⃣ basemap toogle
  // basemapToggle.view = view;
  // view.ui.add(basemapToggle, "bottom-left");
  //3️⃣ add drawing sketch
  sketch.view = view;
  view.ui.add(sketch, "top-right");
  // 4️⃣ layer list
  // layerList.view = view;
  // view.ui.add(layerList, "top-right");
  //5️⃣ fullscreen option
  // fullscreen.view = view;
  // view.ui.add(fullscreen, "bottom-right");
});

function addLayers() {
  view.map.add(municipiosFeatureLayer);
  view.map.add(cantonesFeatureLayer);
  view.map.add(sketch.layer);
}
