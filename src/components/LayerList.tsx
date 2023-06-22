import { useMapStore, selectGraphic, clearGraphics } from "../hooks/mapStore";
import { Tag, Button, Popconfirm, Drawer } from "antd";
import ReactJson from "react-json-view";
import {
  RadiusBottomleftOutlined,
  EnterOutlined,
  AimOutlined,
  DownloadOutlined,
  ClearOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import {
  downloadGeoJSON,
  downloadKML,
  graphicToFeature,
} from "../utils/geoJSON";

export default function LayerList() {
  const [open, setOpen] = useState(false);
  const { graphic } = useMapStore();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const { graphic: selectedGraphic, graphics } = useMapStore();
  return (
    <div className="h-min grid gap-2 bg-white p-4 rounded-md shadow-sm">
      <div className="flex flex-col gap-2">
        <label>Figuras</label>
      </div>
      <div className="h-6 overflow-y-auto bg-neutral-100 rounded-md p-2 grid grid-cols-1 gap-x-2 gap-y-1">
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
        <Button color="cyan" icon={<EyeOutlined />} onClick={showDrawer}>
          Geojson
        </Button>
        <Button
          color="blue"
          icon={<DownloadOutlined />}
          onClick={() => !!graphic && downloadKML(graphicToFeature(graphic))}
        >
          KML
        </Button>
        <Popconfirm
          title="Limpiar mapa"
          description="¿Desea eliminar todas las geometrias dibujadas?"
          cancelText="No"
          okText="Si"
          onConfirm={() => clearGraphics()}
        >
          <Button color="red" icon={<ClearOutlined />} danger />
        </Popconfirm>
      </div>
      <Drawer
        title={
          <div className="flex gap-2">
            Vista previa de GeoJSON
            <Button
              color="blue"
              icon={<DownloadOutlined />}
              type="primary"
              size="small"
              onClick={() =>
                !!graphic && downloadGeoJSON(graphicToFeature(graphic))
              }
            />
          </div>
        }
        placement="left"
        onClose={onClose}
        open={open}
      >
        <ReactJson
          src={!!graphic ? graphicToFeature(graphic) : {}}
          displayDataTypes={false}
          indentWidth={2}
        />
      </Drawer>
    </div>
  );
}
