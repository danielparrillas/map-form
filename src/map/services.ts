import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";

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

export const municipiosFeatureLayer = new FeatureLayer({
  url: "https://geoportal.snet.gob.sv/server/rest/services/sig_ccanales/CapasVIGEA2022/MapServer/30",
  title: "Municipios",
});
//https://geoportal.snet.gob.sv/server/rest/services/sig_ccanales/CapasVIGEA2022/MapServer/31

export const cantonesFeatureLayer = new FeatureLayer({
  url: "https://geoportal.snet.gob.sv/server/rest/services/sig_ccanales/CapasVIGEA2022/MapServer/31",
  title: "Cantones",
});
