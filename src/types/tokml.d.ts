declare module "tokml" {
  function tokml(
    featureCollection: GeoJSON.FeatureCollection | GeoJSON.Feature
  ): string;
  export default tokml;
}
