import { InputNumber } from "antd";
import { useEffect, useState } from "react";
import { drawingSketch } from "../map/layers/drawing";
import { useMapStore } from "../map/store";
import { graphicToFeature } from "../utils/feature";

export default function GeometryForm() {
  const { setGraphic } = useMapStore();
  const [feature, setFeature] = useState<GeoJSON.Feature>();
  useEffect(() => {
    drawingSketch.on("create", (e) => {
      // if (e.state === "active" || e.state === "complete" || e.state === "start")
      setGraphic(e.graphic);
    });
    drawingSketch.on("update", (e) => {
      if (
        e.state === "active" ||
        e.state === "complete" ||
        e.state === "start"
      ) {
        e.graphics.forEach((updatedGraphic) => {
          const isUpdated = drawingSketch.layer.graphics.some(
            (previousGraphic) => {
              return previousGraphic.get("uid") === updatedGraphic.get("uid");
            }
          );
          if (isUpdated) {
            // El gráfico ha sido actualizado
            setGraphic(updatedGraphic);
            setFeature(graphicToFeature(updatedGraphic));
          }
        });
      }
    });
    // drawingSketch.on("delete", (e) => setGraphic());
    drawingSketch.on("redo", (e) => {
      e.graphics.forEach((updatedGraphic) => {
        const isUpdated = drawingSketch.layer.graphics.some(
          (previousGraphic) => {
            return previousGraphic.get("uid") === updatedGraphic.get("uid");
          }
        );
        if (isUpdated) {
          // El gráfico ha sido actualizado
          setGraphic(updatedGraphic);
          setFeature(graphicToFeature(updatedGraphic));
        }
      });
    });
    drawingSketch.on("undo", (e) => {
      e.graphics.forEach((updatedGraphic) => {
        const isUpdated = drawingSketch.layer.graphics.some(
          (previousGraphic) => {
            return previousGraphic.get("uid") === updatedGraphic.get("uid");
          }
        );
        if (isUpdated) {
          // El gráfico ha sido actualizado
          setGraphic(updatedGraphic);
          setFeature(graphicToFeature(updatedGraphic));
        }
      });
    });
  }, []);

  if (feature === undefined) {
    return <div></div>;
  }
  return (
    <div className="h-full overflow-hidden flex flex-col gap-2">
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
          <div className="flex flex-col gap-4 h-full overflow-y-auto p-2">
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
          <div className="flex flex-col gap-4 h-full overflow-y-auto p-2">
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
          <InputNumber
            value={feature.geometry.coordinates[0]}
            className="w-full"
            addonBefore="x"
            precision={6}
          />
          <InputNumber
            value={feature.geometry.coordinates[1]}
            className="w-full"
            addonBefore="y"
            precision={6}
          />
        </>
      )}
    </div>
  );
}
