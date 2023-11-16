declare module "tokml" {
  /**
   * See https://github.com/mapbox/tokml
   * @param featureCollection
   * @param options
   */
  function tokml(
    featureCollection: GeoJSON.FeatureCollection | GeoJSON.Feature,
    options?
  ): string;
  export default tokml;
}
