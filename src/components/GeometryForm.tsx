import { InputNumber, Button } from "antd";
import { useEffect, useState } from "react";
import {
  useMapStore,
  removeGraphic,
  updatePoint,
  updateLine,
  updatePolygon,
} from "../hooks/mapStore";
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

  const getPoint = () => {
    if (graphic === undefined) return;
    const point = new Point(webMercatorToGeographic(graphic.geometry));
    return (
      <div className="flex flex-col gap-1 h-full overflow-y-auto p-1 bg-neutral-100">
        <InputNumber
          value={Number(point.x.toFixed(6))}
          className="w-full"
          addonBefore="x"
          onChange={(value) => {
            if (!!value) {
              updatePoint(
                graphic.get("uid"),
                Number(value.toFixed(6)),
                point.y
              );
            }
          }}
        />
        <InputNumber
          value={Number(point.y.toFixed(6))}
          className="w-full"
          addonBefore="y"
          onChange={(value) => {
            if (!!value) {
              updatePoint(
                graphic.get("uid"),
                point.x,
                Number(value.toFixed(6))
              );
            }
          }}
        />
      </div>
    );
  };

  const getPolyline = () => {
    if (graphic === undefined) return;
    const polyline = new Polyline(webMercatorToGeographic(graphic.geometry));
    return (
      <>
        <InputNumber
          value={geodesicLength(polyline, "meters").toFixed(6)}
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
                  value={Number(coord[0].toFixed(6))}
                  className="w-full"
                  onChange={(value) => {
                    if (!!value) {
                      updateLine(graphic.get("uid"), value, pathsI, index, 0);
                    }
                  }}
                />
                <InputNumber
                  key={`poly-y-${index}`}
                  value={Number(coord[1].toFixed(6))}
                  className="w-full"
                  onChange={(value) => {
                    if (!!value) {
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
  };

  const getPolygon = () => {
    if (graphic === undefined) return;
    const polygon = new Polygon(webMercatorToGeographic(graphic.geometry));
    return (
      <>
        <InputNumber
          value={Math.abs(geodesicArea(polygon, "hectares")).toFixed(6)}
          className="w-full"
          addonBefore="Área"
          addonAfter="ha"
          readOnly
        />
        <InputNumber
          value={geodesicLength(polygon, "meters").toFixed(6)}
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
                  value={Number(coords[0].toFixed(6))}
                  className="w-full"
                  onChange={(value) => {
                    if (!!value) {
                      let isFirstOrLast =
                        index === 0 || index === subRings.length - 1;
                      updatePolygon(
                        graphic.get("uid"),
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
                  value={Number(coords[1].toFixed(6))}
                  className="w-full"
                  onChange={(value) => {
                    if (!!value) {
                      let isFirstOrLast =
                        index === 0 || index === subRings.length - 1;
                      updatePolygon(
                        graphic.get("uid"),
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
              console.log("sadf");

              setGraphic(undefined);
            }}
            icon={<DeleteOutlined />}
            onKeyDown={(e) => console.log(e)}
            danger
          />
        )}
      </div>
    </div>
  );
}
