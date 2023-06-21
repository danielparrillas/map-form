import { useMapStore, selectGraphic, setGraphic } from "../hooks/mapStore";
import { Tag } from "antd";
import {
  RadiusBottomleftOutlined,
  EnterOutlined,
  AimOutlined,
} from "@ant-design/icons";
//<EnterOutlined />
export default function LayerList() {
  const { graphic: selectedGraphic, graphics } = useMapStore();
  console.log(graphics);
  return (
    <div className="h-min grid grid-cols-2 gap-2 bg-white p-4 rounded-md shadow-sm">
      <label>Figuras</label>
      <div className="h-24 overflow-y-auto bg-neutral-100 rounded-md p-2">
        {graphics &&
          graphics
            .sort(
              (first, second) =>
                Number(first.get("uid")) - Number(second.get("uid"))
            )
            .map((graphic) => (
              <div>
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
                    Punto
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
                    Linea
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
                    Polígono
                  </Tag>
                ) : (
                  <Tag
                    icon={<RadiusBottomleftOutlined />}
                    className="w-full cursor-pointer"
                    onClick={() => selectGraphic(graphic.get("uid"))}
                  >
                    Otro
                  </Tag>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}
