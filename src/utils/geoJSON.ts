import Graphic from "@arcgis/core/Graphic";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";
import { arcgisToGeoJSON } from "@terraformer/arcgis";
import {
  geodesicArea,
  geodesicLength,
} from "@arcgis/core/geometry/geometryEngine";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
import tokml from "tokml";

export const graphicToFeature = (graphic: Graphic): GeoJSON.Feature => {
  let feature: GeoJSON.Feature;
  const geometry = arcgisToGeoJSON(webMercatorToGeographic(graphic.geometry));
  if (graphic.geometry.type === "polyline") {
    const line = new Polyline(graphic.geometry);
    feature = {
      type: "Feature",
      geometry,
      properties: {
        length: geodesicLength(line, "meters"),
        lengthUnit: "meters",
      },
    };
  } else if (graphic.geometry.type === "polygon") {
    const polygon = new Polygon(graphic.geometry);
    feature = {
      type: "Feature",
      geometry,
      properties: {
        perimeter: geodesicLength(polygon, "meters"),
        perimeterUnit: "meters",
        area: geodesicArea(polygon, "hectares"),
        areaUnit: "hectareas",
      },
    };
  } else {
    feature = {
      type: "Feature",
      geometry,
      properties: {},
    };
  }
  return feature;
};

export const downloadGeoJSON = (
  geoJSON: GeoJSON.Feature | GeoJSON.FeatureCollection
) => {
  const nombreArchivo = "export.geojson";
  // Crear un enlace temporal para la descarga
  const enlaceDescarga = document.createElement("a");
  enlaceDescarga.href =
    "data:text/plain;charset=utf-8," +
    encodeURIComponent(JSON.stringify(geoJSON));
  enlaceDescarga.download = nombreArchivo;
  // Simular el clic en el enlace para iniciar la descarga
  enlaceDescarga.click();
};

export const downloadKML = (
  geoJSON: GeoJSON.Feature | GeoJSON.FeatureCollection
) => {
  const kmlString = tokml(geoJSON);
  const blob = new Blob([kmlString], {
    type: "application/vnd.google-earth.kml+xml",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "export.kml";
  link.click();
};
