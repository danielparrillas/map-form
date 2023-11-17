import { Button, Tag, Drawer, Popconfirm } from "antd";
import { useState } from "react";
import ReactJson from "react-json-view";
import { useMapStore, removeGraphic } from "../../hooks/mapStore";
import {
  RadiusBottomleftOutlined,
  EnterOutlined,
  AimOutlined,
  DownloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";

import {
  downloadGeoJSON,
  downloadKML,
  graphicToFeature,
} from "../../utils/geoJSON";
import PointSection from "./sections/point-section";
import PolylineSection from "./sections/polyline-section";
import PolygonSection from "./sections/polygone-section";
import Geometry from "@arcgis/core/geometry/Geometry";
import ImportSection from "./sections/import-section";
import { view } from "../../map/config";
import type { PopconfirmProps } from "antd/es/popconfirm";

type GeometryProperties = {
  color: string;
  icon: JSX.Element;
  title: string;
  section: JSX.Element;
};

const geometryProperties: Record<
  Geometry["type"],
  GeometryProperties | undefined
> = {
  point: {
    color: "gold-inverse",
    icon: <AimOutlined />,
    title: "Punto",
    section: <PointSection />,
  },
  polyline: {
    color: "green-inverse",
    icon: <EnterOutlined />,
    title: "Línea",
    section: <PolylineSection />,
  },
  polygon: {
    color: "red-inverse",
    icon: <RadiusBottomleftOutlined />,
    title: "Polígono",
    section: <PolygonSection />,
  },
  multipoint: undefined,
  extent: undefined,
  mesh: undefined,
};

export default function GeometryForm() {
  const { graphic } = useMapStore();
  const [open, setOpen] = useState(false);

  const confirmDeleteGeometry: PopconfirmProps["onConfirm"] = () => {
    graphic && removeGraphic(graphic.uid ?? "");
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  if (graphic === undefined)
    return (
      <div className="h-full overflow-hidden flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm">
        <Tag
          icon={<AimOutlined />}
          className="w-full rounded-md flex items-center"
        >
          Vacío
        </Tag>
        <ImportSection />
      </div>
    );

  return (
    <div className="h-full flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm">
      <Tag
        color={geometryProperties[graphic.geometry.type]?.color}
        icon={geometryProperties[graphic.geometry.type]?.icon}
        className="w-full rounded-md flex items-center cursor-pointer h-16"
        onClick={() => view.goTo(graphic)}
      >
        Ir a {geometryProperties[graphic.geometry.type]?.title}
      </Tag>
      {geometryProperties[graphic.geometry.type]?.section}
      <div className="w-full h-24 flex gap-2">
        <Popconfirm
          title="Elimininar geometría"
          description="¿Estás seguro que quieres eliminarla?"
          onConfirm={confirmDeleteGeometry}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} danger />
        </Popconfirm>
        <Button color="cyan" icon={<EyeOutlined />} onClick={showDrawer}>
          JSON
        </Button>
        <Button
          color="blue"
          icon={<DownloadOutlined />}
          onClick={() => downloadKML(graphicToFeature(graphic))}
        >
          KML
        </Button>
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
              onClick={() => downloadGeoJSON(graphicToFeature(graphic))}
            />
          </div>
        }
        placement="left"
        onClose={onClose}
        open={open}
      >
        <ReactJson
          src={graphic ? graphicToFeature(graphic) : {}}
          displayDataTypes={false}
          indentWidth={2}
        />
      </Drawer>
    </div>
  );
}
