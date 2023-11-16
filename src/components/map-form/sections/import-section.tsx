import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message, notification } from "antd";
import type { UploadProps } from "antd/es/upload/interface";
import * as togeojson from "@mapbox/togeojson";
import { sketch } from "../../../map/sketch";
import Graphic from "@arcgis/core/Graphic";
import { geojsonToArcGIS } from "@terraformer/arcgis";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
import Point from "@arcgis/core/geometry/Point";
import { setGraphic } from "../../../hooks/mapStore";
import {
  polygonStyle,
  lineStyle,
  markerStyle,
} from "../../../map/graphic-styles";
import { view } from "../../../map/config";
import { geographicToWebMercator } from "@arcgis/core/geometry/support/webMercatorUtils";

const beforeUpload: UploadProps["beforeUpload"] = async (file, fileList) => {
  console.log("fileList", fileList);
  message.loading("Leyendo archivo KML");
  const kmlFile = await file.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(kmlFile, "text/xml");
  const featureCollection = togeojson.kml(doc);
  message.destroy();
  if (!featureCollection.features.length) {
    message.error("No se encontro ninguna geometría en el kml");
    console.error(
      "no se encontro ninguna geometría en el kml: ",
      featureCollection
    );
    return false;
  }

  const feature = featureCollection.features[0];
  console.info("feature", feature);
  console.info("feature.geometry", feature.geometry);

  let graphic: Graphic;
  switch (feature.geometry.type) {
    case "Point":
      graphic = new Graphic({
        geometry: geographicToWebMercator(
          new Point(geojsonToArcGIS(feature.geometry))
        ),
        symbol: markerStyle,
      });
      break;
    case "LineString":
      graphic = new Graphic({
        geometry: geographicToWebMercator(
          new Polyline(geojsonToArcGIS(feature.geometry))
        ),
        symbol: lineStyle,
      });
      break;
    case "Polygon":
      graphic = new Graphic({
        geometry: geographicToWebMercator(
          new Polygon(geojsonToArcGIS(feature.geometry))
        ),
        symbol: polygonStyle,
      });
      break;
    default:
      notification.warning({
        description: "Geometría incompatible",
        message: "Solo se acepta Línea, Punto y Polygono",
      });
      return false;
  }

  console.info("graphic", graphic);

  // view.graphics.add(graphic);
  sketch.layer.graphics.add(graphic);
  view.goTo(graphic);
  setGraphic(graphic);

  return false;
};

const onRemove: UploadProps["onRemove"] = (file) => {
  console.log(file);
};

const onChange: UploadProps["onChange"] = (info) => {
  if (info.file.status !== "removed") {
    console.log(info.file, info.fileList);
  }
};

const App: React.FC = () => {
  return (
    <Upload
      name="import-kml-file"
      accept=".kml"
      maxCount={1}
      beforeUpload={beforeUpload}
      onRemove={onRemove}
      onChange={onChange}
    >
      <Button icon={<UploadOutlined />}>Select File</Button>
    </Upload>
  );
};

export default App;
