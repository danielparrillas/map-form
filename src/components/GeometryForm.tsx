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
        <label>Coordenadas</label>
        <div className="bg-white p-2 rounded-md">
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
        </div>
      </>
    );
  };

  const getPolyline = () => {
    if (graphic === undefined) return;
    const polyline = new Polyline(webMercatorToGeographic(graphic.geometry));
    return (
      <>
        <div className="flex gap-2">
          <label className="w-24">Distancia</label>
          <InputNumber
            value={geodesicLength(polyline, "meters")}
            className="w-full"
            addonAfter="m"
            precision={6}
            readOnly
          />
        </div>
        <label>Coordenadas</label>
        <div className="flex flex-col gap-4 h-full overflow-y-auto bg-white p-2 rounded-md">
          {polyline.paths.map((subPaths, pathsI) =>
            subPaths.map((coord, index) => (
              <div key={`coords-${index}`}>
                <InputNumber
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
        <div className="flex gap-2">
          <label className="w-24">Área</label>
          <InputNumber
            value={Math.abs(geodesicArea(polygon, "hectares"))}
            className="w-full"
            addonAfter="ha"
            precision={6}
            readOnly
          />
        </div>
        <div className="flex gap-2">
          <label className="w-24">Perímetro</label>
          <InputNumber
            value={geodesicLength(polygon, "meters")}
            className="w-full"
            addonAfter="m"
            precision={6}
            readOnly
          />
        </div>
        <label>Coordenadas</label>
        <div className="flex flex-col gap-4 h-full overflow-y-auto bg-white p-2 rounded-md">
          {polygon.rings.map((subRings) =>
            subRings.map((coords, index) => (
              <div key={`coords-${index}`}>
                <InputNumber
                  key={`poly-x-${index}`}
                  value={coords[0]}
                  className="w-full"
                  addonBefore="x"
                  precision={6}
                />
                <InputNumber
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
    <div className="h-full overflow-hidden flex flex-col gap-2 bg-neutral-100 p-4 rounded-md">
      {!graphic
        ? ""
        : graphic.geometry.type === "point"
        ? getPoint()
        : graphic.geometry.type === "polyline"
        ? getPolyline()
        : graphic.geometry.type === "polygon"
        ? getPolygon()
        : ""}
      <div className="w-full h-full grid place-content-end">
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
