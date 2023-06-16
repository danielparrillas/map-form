import { InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useMapStore } from "../hooks/mapStore";
import { graphicToFeature } from "../utils/feature";
import { sketch } from "../map/sketch";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";

export default function GeometryForm() {
  const { graphic: graphicFromMap } = useMapStore();
  const [feature, setFeature] = useState<GeoJSON.Feature>();
  const [graphic, setGraphic] = useState<Polygon | Polygon | Point>();

  useEffect(() => {
    !!graphicFromMap
      ? setFeature(graphicToFeature(graphicFromMap))
      : setFeature(undefined);
  }, [graphicFromMap?.geometry]);

  const generarPolygono = (graphic: Graphic) => {};

  const onchange = (value: any, key: string = "") => {
    value = Number(value);
    if (key !== "Enter" || isNaN(value)) return;
    console.log(value);
    const graphicUid = graphic?.get("uid");
    console.log(graphicUid);
    const graphicFinded = sketch.layer.graphics.find(
      (item) => item.get("uid") === graphicUid
    );
    console.log(graphicFinded.get("uid"));
  };

  if (feature === undefined) {
    return (
      <div className="h-full overflow-hidden flex flex-col gap-2 bg-neutral-100 p-4 rounded-md"></div>
    );
  } else {
    return (
      <div className="h-full overflow-hidden flex flex-col gap-2 bg-neutral-100 p-4 rounded-md">
        {feature.geometry.type === "Polygon" && (
          <>
            <div className="flex gap-2">
              <label className="w-24">Área</label>
              <InputNumber
                value={Math.abs(feature.properties?.area)}
                className="w-full"
                addonAfter="ha"
                precision={6}
                readOnly
              />
            </div>
            <div className="flex gap-2">
              <label className="w-24">Perímetro</label>
              <InputNumber
                value={feature.properties?.perimeter}
                className="w-full"
                addonAfter="m"
                precision={6}
                readOnly
              />
            </div>
            <label>Coordenadas</label>
            <div className="flex flex-col gap-4 h-full overflow-y-auto bg-white p-2 rounded-md">
              {feature.geometry.coordinates.map((coordinates2) =>
                coordinates2.map((coordinate, index) => (
                  <div key={`coords-${index}`}>
                    <InputNumber
                      key={`poly-x-${index}`}
                      value={coordinate[0]}
                      className="w-full"
                      addonBefore="x"
                      precision={6}
                    />
                    <InputNumber
                      key={`poly-y-${index}`}
                      value={coordinate[1]}
                      className="w-full"
                      addonBefore="y"
                      precision={6}
                    />
                  </div>
                ))
              )}
            </div>
          </>
        )}
        {feature.geometry.type === "LineString" && (
          <>
            <div className="flex gap-2">
              <label className="w-24">Distancia</label>
              <InputNumber
                value={feature.properties?.perimeter}
                className="w-full"
                addonAfter="m"
                precision={6}
                readOnly
              />
            </div>
            <label>Coordenadas</label>
            <div className="flex flex-col gap-4 h-full overflow-y-auto bg-white p-2 rounded-md">
              {feature.geometry.coordinates.map((coordinates2, index) => (
                <div key={`coords-${index}`}>
                  <InputNumber
                    key={`linea-x-${index}`}
                    value={coordinates2[0]}
                    className="w-full"
                    addonBefore="x"
                    precision={6}
                  />
                  <InputNumber
                    key={`linea-y-${index}`}
                    value={coordinates2[1]}
                    className="w-full"
                    addonBefore="y"
                    precision={6}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {feature.geometry.type === "Point" && (
          <>
            <label>Coordenadas</label>
            <div className="bg-white p-2 rounded-md">
              <InputNumber
                value={feature.geometry.coordinates[0]}
                className="w-full"
                addonBefore="x"
                precision={6}
                // onChange={(value) => onchange(value)}
                onKeyDown={(e) => onchange(e.currentTarget.value, e.key)}
              />
              <InputNumber
                value={feature.geometry.coordinates[1]}
                className="w-full"
                addonBefore="y"
                precision={6}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
