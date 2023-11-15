declare module "@mapbox/togeojson" {
  type FeatureCollection = {
    features: GeoJSON[];
    type: "FeatureCollection";
  };

  interface KmlOptions {
    styles?: boolean;
  }

  function kml(document: Document, options?: KmlOptions): FeatureCollection;
  function gpx(document: Document): FeatureCollection;

  export { kml, gpx };
}
