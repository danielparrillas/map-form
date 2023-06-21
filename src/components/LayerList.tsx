import { useMapStore, selectGraphic } from "../hooks/mapStore";
import { Tag } from "antd";
import {
  RadiusBottomleftOutlined,
  EnterOutlined,
  AimOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
//<EnterOutlined />
export default function LayerList() {
  const { graphic: selectedGraphic, graphics } = useMapStore();
  return (
    <div className="h-min grid gap-2 bg-white p-4 rounded-md shadow-sm">
      <div className="flex flex-col gap-2">
        <label>Figuras</label>
      </div>
      <div className="h-24 overflow-y-auto bg-neutral-100 rounded-md p-2 grid grid-cols-2 gap-x-2 gap-y-1">
        {graphics &&
          graphics
            .sort(
              (first, second) =>
                Number(first.get("uid")) - Number(second.get("uid"))
            )
            .map((graphic, index) => (
              <div key={`graphic-item-${index}`}>
                {graphic.geometry.type === "point" ? (
                  <Tag
                    color={
                      !!selectedGraphic &&
                      selectedGraphic.get("uid") === graphic.get("uid")
                        ? "gold-inverse"
                        : "gold"
                    }
                    icon={<AimOutlined />}
                    className="w-full cursor-pointer"
                    onClick={() => selectGraphic(graphic.get("uid"))}
                  >
                    {index + 1}. Punto
                  </Tag>
                ) : graphic.geometry.type === "polyline" ? (
                  <Tag
                    color={
                      !!selectedGraphic &&
                      selectedGraphic.get("uid") === graphic.get("uid")
                        ? "green-inverse"
                        : "green"
                    }
                    icon={<EnterOutlined />}
                    className="w-full cursor-pointer"
                    onClick={() => selectGraphic(graphic.get("uid"))}
                  >
                    {index + 1}. Linea
                  </Tag>
                ) : graphic.geometry.type === "polygon" ? (
                  <Tag
                    color={
                      !!selectedGraphic &&
                      selectedGraphic.get("uid") === graphic.get("uid")
                        ? "red-inverse"
                        : "red"
                    }
                    icon={<RadiusBottomleftOutlined />}
                    className="w-full cursor-pointer"
                    onClick={() => selectGraphic(graphic.get("uid"))}
                  >
                    {index + 1}. Polígono
                  </Tag>
                ) : (
                  <Tag
                    icon={<RadiusBottomleftOutlined />}
                    className="w-full cursor-pointer"
                    onClick={() => selectGraphic(graphic.get("uid"))}
                  >
                    {index + 1}. Otro
                  </Tag>
                )}
              </div>
            ))}
      </div>
      <div className="flex gap-2">
        <Tag
          color="cyan"
          icon={<DownloadOutlined />}
          className="shadow-md h-7 font-bold flex items-center cursor-pointer rounded-md"
        >
          Geojson
        </Tag>
        <Tag
          color="blue"
          icon={<DownloadOutlined />}
          className="shadow-md h-7 font-bold flex items-center cursor-pointer rounded-md"
        >
          KML
        </Tag>
      </div>
    </div>
  );
}
