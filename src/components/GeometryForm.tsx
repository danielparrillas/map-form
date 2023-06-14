import { Collapse, InputNumber } from "antd";
const { Panel } = Collapse;

interface Props {
  feature: GeoJSON.Feature;
  index?: number;
}

export default function GeometryForm({ feature }: Props) {
  console.log("asdf");
  return (
    <Collapse size="small">
      <Panel header={feature.geometry.type} key={1}>
        {feature.geometry.type === "Polygon" && (
          <div className="flex gap-2">
            <label>Área</label>
            <InputNumber
              value={feature.properties?.area}
              className="w-full"
              addonAfter="ha"
            />
          </div>
        )}
        {feature.geometry.type === "Polygon" && (
          <div className="flex gap-2">
            <label>Perímetro</label>
            <InputNumber
              value={feature.properties?.perimeter}
              className="w-full"
              addonAfter="m"
            />
          </div>
        )}
        {feature.geometry.type === "LineString" && (
          <div className="flex gap-2">
            <label>Distancia</label>
            <InputNumber
              value={feature.properties?.perimeter}
              className="w-full"
              addonAfter="m"
            />
          </div>
        )}
      </Panel>
    </Collapse>
  );
}
