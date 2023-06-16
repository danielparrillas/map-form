import { InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useMapStore } from "../map/store";
import { graphicToFeature } from "../utils/feature";

export default function GeometryForm() {
  const { graphic } = useMapStore();
  const [feature, setFeature] = useState<GeoJSON.Feature>();
  useEffect(() => {
    !!graphic ? setFeature(graphicToFeature(graphic)) : setFeature(undefined);
  }, [graphic?.geometry]);

  if (feature === undefined) {
    return (
      <div className="h-full overflow-hidden flex flex-col gap-2 bg-neutral-100 p-4 rounded-md"></div>
    );
  }

  const onchange = (value: any, key: string = "") => {
    value = Number(value);
    if (key === "Enter" && !isNaN(value)) {
      console.log(value);
      console.log(graphic?.get("uid"));
    }
  };

  return (
    <div className="h-full overflow-hidden flex flex-col gap-2 bg-neutral-100 p-4 rounded-md">
      {feature.geometry.type === "Polygon" && (
        <>
          <div className="flex gap-2">
            <label className="w-24">Área</label>
            <InputNumber
              value={feature.properties?.area}
              className="w-full"
              addonAfter="ha"
              precision={6}
            />
          </div>
          <div className="flex gap-2">
            <label className="w-24">Perímetro</label>
            <InputNumber
              value={feature.properties?.perimeter}
              className="w-full"
              addonAfter="m"
              precision={6}
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
