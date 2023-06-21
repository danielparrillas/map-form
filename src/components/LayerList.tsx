import {
  useMapStore,
  selectGraphic,
  clearGraphics,
  generateGeoJSON,
} from "../hooks/mapStore";
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
import tokml from "tokml";

export default function LayerList() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleDownloadGeoJSON = () => {
    const nombreArchivo = "features.geojson";
    // Crear un enlace temporal para la descarga
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href =
      "data:text/plain;charset=utf-8," +
      encodeURIComponent(JSON.stringify(generateGeoJSON()));
    enlaceDescarga.download = nombreArchivo;
    // Simular el clic en el enlace para iniciar la descarga
    enlaceDescarga.click();
  };
  const handleDownloadKML = () => {
    const kmlString = tokml(generateGeoJSON());
    const blob = new Blob([kmlString], {
      type: "application/vnd.google-earth.kml+xml",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "file.kml";
    link.click();
  };
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
        <Button color="cyan" icon={<EyeOutlined />} onClick={showDrawer}>
          Geojson
        </Button>
        <Button
          color="blue"
          icon={<DownloadOutlined />}
          onClick={handleDownloadKML}
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
              onClick={handleDownloadGeoJSON}
            />
          </div>
        }
        placement="left"
        onClose={onClose}
        open={open}
      >
        <ReactJson
          src={generateGeoJSON()}
          displayDataTypes={false}
          indentWidth={2}
        />
      </Drawer>
    </div>
  );
}