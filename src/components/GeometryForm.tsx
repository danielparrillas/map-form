import { InputNumber, Button } from "antd";
import { useEffect, useState } from "react";
import { useMapStore, removeGraphic, updatePolygon } from "../hooks/mapStore";
import { DeleteOutlined } from "@ant-design/icons";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";
import {
  geodesicArea,
  geodesicLength,
} from "@arcgis/core/geometry/geometryEngine";

export default function GeometryForm() {
  const { graphic: graphicFromMap } = useMapStore();
  const [graphic, setGraphic] = useState<Graphic>();

  useEffect(() => {
    !!graphicFromMap ? setGraphic(graphicFromMap) : setGraphic(undefined);
  }, [graphicFromMap?.geometry]);

  const onchange = (value: any, key: string = "") => {
    value = Number(value);
    if (key !== "Enter" || isNaN(value) || !graphic) return;
    console.log(value);
    const graphicUid = graphic.get("uid");
    typeof graphicUid === "string" ||
      (typeof graphicUid === "number" && removeGraphic(graphicUid));
    setGraphic(undefined);
  };

  const getPoint = () => {
    if (graphic === undefined) return;
    const point = new Point(webMercatorToGeographic(graphic.geometry));
    return (
      <>
        <InputNumber
          value={point.x}
          className="w-full"
          addonBefore="x"
          precision={6}
          onKeyDown={(e) => onchange(e.currentTarget.value, e.key)}
        />
        <InputNumber
          value={point.y}
          className="w-full"
          addonBefore="y"
          precision={6}
        />
      </>
    );
  };

  const getPolyline = () => {
    if (graphic === undefined) return;
    const polyline = new Polyline(webMercatorToGeographic(graphic.geometry));
    return (
      <>
        <InputNumber
          value={geodesicLength(polyline, "meters")}
          className="w-full"
          addonBefore="Distancia"
          addonAfter="m"
          precision={6}
          readOnly
        />
        <div className="flex flex-col gap-1 h-full overflow-y-auto p-1 bg-neutral-100">
          {polyline.paths.map((subPaths, pathsI) =>
            subPaths.map((coord, index) => (
              <div key={`coords-${index}`} className="grid grid-cols-2 gap-1">
                <InputNumber
                  size="small"
                  key={`poly-x-${index}`}
                  value={coord[0]}
                  className="w-full"
                  addonBefore="x"
                  precision={6}
                  onChange={(value) => {
                    if (!!value) {
                      updatePolygon(
                        graphic.get("uid"),
                        value,
                        pathsI,
                        index,
                        0
                      );
                    }
                  }}
                />
                <InputNumber
                  size="small"
                  key={`poly-y-${index}`}
                  value={coord[1]}
                  className="w-full"
                  addonBefore="y"
                  precision={6}
                />
              </div>
            ))
          )}
        </div>
      </>
    );
  };

  const getPolygon = () => {
    if (graphic === undefined) return;
    const polygon = new Polygon(webMercatorToGeographic(graphic.geometry));
    return (
      <>
        <InputNumber
          value={Math.abs(geodesicArea(polygon, "hectares"))}
          className="w-full"
          addonBefore="Área"
          addonAfter="ha"
          precision={6}
          readOnly
        />
        <InputNumber
          value={geodesicLength(polygon, "meters")}
          className="w-full"
          addonBefore="Perímetro"
          addonAfter="m"
          precision={6}
          readOnly
        />
        <div className="flex flex-col gap-1 overflow-y-auto rounded-md p-1 bg-neutral-100">
          {polygon.rings.map((subRings) =>
            subRings.map((coords, index) => (
              <div key={`coords-${index}`} className="grid grid-cols-2 gap-1">
                <InputNumber
                  size="small"
                  key={`poly-x-${index}`}
                  value={coords[0]}
                  className="w-full"
                  addonBefore="x"
                  precision={6}
                />
                <InputNumber
                  size="small"
                  key={`poly-y-${index}`}
                  value={coords[1]}
                  className="w-full"
                  addonBefore="y"
                  precision={6}
                />
              </div>
            ))
          )}
        </div>
      </>
    );
  };

  return (
    <div className="h-full overflow-hidden flex flex-col gap-2 bg-white p-4 rounded-md">
      {!graphic
        ? ""
        : graphic.geometry.type === "point"
        ? getPoint()
        : graphic.geometry.type === "polyline"
        ? getPolyline()
        : graphic.geometry.type === "polygon"
        ? getPolygon()
        : ""}
      <div className="w-full h-min grid place-content-end">
        {!!graphic && (
          <Button
            onClick={() => {
              !!graphic && removeGraphic(graphic.get("uid"));
              setGraphic(undefined);
            }}
            icon={<DeleteOutlined />}
            danger
          />
        )}
      </div>
    </div>
  );
}
