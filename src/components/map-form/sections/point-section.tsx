import { InputNumber } from "antd";
import { useMapStore, updatePoint } from "../../../hooks/mapStore";

import Point from "@arcgis/core/geometry/Point";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";

export default function PointSection() {
  const { graphic } = useMapStore();
  if (graphic === undefined) return;
  const point = new Point(webMercatorToGeographic(graphic.geometry));
  return (
    <div className="flex flex-col gap-1 h-full overflow-y-auto p-1 bg-neutral-100">
      <InputNumber
        value={Number(point.x.toFixed(8))}
        className="w-full"
        controls={false}
        addonBefore="x"
        onChange={(value) => {
          if (value) {
            updatePoint(graphic.get("uid"), Number(value.toFixed(8)), point.y);
          }
        }}
      />
      <InputNumber
        value={Number(point.y.toFixed(8))}
        className="w-full"
        controls={false}
        addonBefore="y"
        onChange={(value) => {
          if (value) {
            updatePoint(graphic.get("uid"), point.x, Number(value.toFixed(8)));
          }
        }}
      />
    </div>
  );
}
