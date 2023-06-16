import KMLLayer from "@arcgis/core/layers/KMLLayer";

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
