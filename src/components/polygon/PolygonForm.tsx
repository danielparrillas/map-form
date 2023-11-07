import Polygon from "@arcgis/core/geometry/Polygon";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";
import {
  geodesicArea,
  geodesicLength,
} from "@arcgis/core/geometry/geometryEngine";
import { useMapStore } from "../../hooks/mapStore";
import RingDnD from "./RingDnD";
import { InputNumber } from "antd";

export default function PolygonForm() {
  const graphic = useMapStore((state) => state.graphic);
  if (graphic === undefined) return;
  const polygon = new Polygon(webMercatorToGeographic(graphic.geometry));
  return (
    <>
      <InputNumber
        value={Math.abs(geodesicArea(polygon, "hectares")).toFixed(8)}
        className="w-full"
        addonBefore="Área"
        addonAfter="ha"
        readOnly
      />
      <InputNumber
        value={geodesicLength(polygon, "meters").toFixed(8)}
        className="w-full"
        addonBefore="Perímetro"
        addonAfter="m"
        readOnly
      />
      <div className="grid grid-cols-2 text-center">
        <label>X</label>
        <label>Y</label>
      </div>
      <div className="flex flex-col h-full overflow-y-auto rounded-md p-2 bg-neutral-100">
        {polygon.rings.map((ring, index) => (
          <RingDnD ring={ring} index={index} />
        ))}
      </div>
    </>
  );
}
