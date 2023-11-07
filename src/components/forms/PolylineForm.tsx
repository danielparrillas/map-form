import { InputNumber } from "antd";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";
import { geodesicLength } from "@arcgis/core/geometry/geometryEngine";
import { updateLine } from "../../hooks/mapStore";

type GeometryForm = {
  graphic: Graphic;
};

export default function PolylineForm({ graphic }: GeometryForm) {
  if (graphic === undefined) return;
  const polyline = new Polyline(webMercatorToGeographic(graphic.geometry));
  return (
    <>
      <InputNumber
        value={geodesicLength(polyline, "meters").toFixed(8)}
        className="w-full"
        addonBefore="Distancia"
        addonAfter="m"
        readOnly
      />
      <div className="grid grid-cols-2 text-center">
        <label>X</label>
        <label>Y</label>
      </div>
      <div className="flex flex-col gap-1 h-full overflow-y-auto p-1 bg-neutral-100">
        {polyline.paths.map((subPaths, pathsI) =>
          subPaths.map((coord, index) => (
            <div key={`coords-${index}`} className="grid grid-cols-2 gap-1">
              <InputNumber
                key={`poly-x-${index}`}
                value={Number(coord[0].toFixed(8))}
                controls={false}
                size="small"
                className="w-full"
                onChange={(value) => {
                  if (value) {
                    updateLine(graphic.get("uid"), value, pathsI, index, 0);
                  }
                }}
              />
              <InputNumber
                key={`poly-y-${index}`}
                value={Number(coord[1].toFixed(8))}
                size="small"
                className="w-full"
                controls={false}
                onChange={(value) => {
                  if (value) {
                    updateLine(graphic.get("uid"), value, pathsI, index, 1);
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
