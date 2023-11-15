import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import type { UploadProps } from "antd/es/upload/interface";
import * as togeojson from "@mapbox/togeojson";
import { view } from "../../../map/config";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";

const props: UploadProps = {
  name: "file",
  accept: ".kml",
  maxCount: 1,
  onRemove: (file) => {
    console.log(file);
  },
  beforeUpload: async (file, fileList) => {
    console.log("fileList", fileList);
    message.loading("Leyendo archivo KML");
    const kmlFile = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(kmlFile, "text/xml");
    const featureCollection = togeojson.kml(doc);
    const geoJSON = featureCollection.features[0];
    const blob = new Blob([JSON.stringify(geoJSON)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    message.destroy();
    message.loading("Mostrando la primera geometría");
    const importedFeatureLayer = new GeoJSONLayer();
    importedFeatureLayer.url = url;
    view.map.add(importedFeatureLayer);
    view.goTo(importedFeatureLayer);
    return false;
  },
  onChange(info) {
    if (info.file.status !== "removed") {
      console.log(info.file, info.fileList);
    }
  },
};

const App: React.FC = () => {
  return (
    <Upload {...props} multiple={false}>
      <Button icon={<UploadOutlined />}>Select File</Button>
    </Upload>
  );
};

export default App;
