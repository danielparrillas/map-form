import KMLLayer from "@arcgis/core/layers/KMLLayer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";

// 🗺️ KML's
export const kmlSitiosRAMSAR = new KMLLayer({
  url: "http://apps3.marn.gob.sv/geocumplimiento/restauracion/registro/SitiosRamsar.kmz",
  opacity: 0.5,
});
export const kmlANP = new KMLLayer({
  url: "http://apps3.marn.gob.sv/geocumplimiento/restauracion/registro/AnpProtegidasDeclaradas.kmz",
  opacity: 0.5,
});
export const kmlAC = new KMLLayer({
  url: "http://apps3.marn.gob.sv/geocumplimiento/restauracion/registro/AreasConservacion.kmz",
  opacity: 0.5,
});
export const kmlReservaBiosfera = new KMLLayer({
  url: "http://apps3.marn.gob.sv/geocumplimiento/restauracion/registro/ReservaBiosfera.kmz",
  opacity: 0.5,
});

// GeoJSON

export const municipiosGeoJSONLayer = new GeoJSONLayer({
  url: "./layers/municipios.geojson",
  title: "Áreas de Conservación",
  copyright: "Ministerio de Medio Ambiente",
  id: "municipios",
  renderer: new UniqueValueRenderer({
    field: "municipios",
    defaultSymbol: new SimpleFillSymbol({
      color: "transparent",
      outline: { color: "white" },
    }),
  }),
  opacity: 0,
  popupEnabled: false,
});
