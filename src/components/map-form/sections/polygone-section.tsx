import { InputNumber } from "antd";
import { useMapStore, updatePolygon } from "../../../hooks/mapStore";
import Polygon from "@arcgis/core/geometry/Polygon";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";
import {
  geodesicArea,
  geodesicLength,
} from "@arcgis/core/geometry/geometryEngine";

export default function PolygonSection() {
  const { graphic } = useMapStore();
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
      <div className="flex flex-col h-full gap-1 overflow-y-auto rounded-md p-1 bg-neutral-100">
        {polygon.rings.map((subRings, sri) =>
          subRings.map((coords, index) => (
            <div key={`coords-${index}`} className="grid grid-cols-2 gap-1">
              <InputNumber
                key={`poly-x-${index}`}
                value={Number(coords[0].toFixed(8))}
                className="w-full"
                size="small"
                controls={false}
                onChange={(value) => {
                  if (value) {
                    const isFirstOrLast =
                      index === 0 || index === subRings.length - 1;
                    updatePolygon(
                      graphic.uid ?? "",
                      value,
                      sri,
                      index,
                      0,
                      isFirstOrLast
                    );
                  }
                }}
              />
              <InputNumber
                key={`poly-y-${index}`}
                value={Number(coords[1].toFixed(8))}
                controls={false}
                size="small"
                className="w-full"
                onChange={(value) => {
                  if (value) {
                    const isFirstOrLast =
                      index === 0 || index === subRings.length - 1;
                    updatePolygon(
                      graphic.uid ?? "",
                      value,
                      sri,
                      index,
                      1,
                      isFirstOrLast
                    );
                  }
                }}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}
