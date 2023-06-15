import Graphic from "@arcgis/core/Graphic";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";
import { arcgisToGeoJSON } from "@terraformer/arcgis";
import {
  geodesicArea,
  geodesicLength,
} from "@arcgis/core/geometry/geometryEngine";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
// import Point from "@arcgis/core/geometry/Point";

export const graphicToFeature = (graphic: Graphic): GeoJSON.Feature => {
  let feature: GeoJSON.Feature;
  const geometry = arcgisToGeoJSON(webMercatorToGeographic(graphic.geometry));
  if (graphic.geometry.type === "polyline") {
    const line = new Polyline(graphic.geometry);
    feature = {
      type: "Feature",
      geometry,
      properties: {
        perimeter: geodesicLength(line, "meters"),
      },
    };
  } else if (graphic.geometry.type === "polygon") {
    const polygon = new Polygon(graphic.geometry);
    feature = {
      type: "Feature",
      geometry,
      properties: {
        perimeter: geodesicLength(polygon, "meters"),
        area: geodesicArea(polygon, "hectares"),
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
