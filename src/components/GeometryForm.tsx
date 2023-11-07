import { Button, Tag, Drawer } from "antd";
import { useState } from "react";
import ReactJson from "react-json-view";
import { useMapStore, removeGraphic } from "../hooks/mapStore";
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
} from "../utils/geoJSON";
import PolygonForm from "./forms/PolygonForm";
import PointForm from "./forms/PointForm";
import PolylineForm from "./forms/PolylineForm";

export default function GeometryForm() {
  const { graphic } = useMapStore();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="h-full overflow-hidden flex flex-col gap-2 bg-white p-4 rounded-md shadow-sm">
      {graphic ? (
        <Tag
          color={
            graphic.geometry.type === "point"
              ? "gold-inverse"
              : graphic.geometry.type === "polyline"
              ? "green-inverse"
              : graphic.geometry.type === "polygon"
              ? "red-inverse"
              : "default"
          }
          icon={
            graphic.geometry.type === "point" ? (
              <AimOutlined />
            ) : graphic.geometry.type === "polyline" ? (
              <EnterOutlined />
            ) : graphic.geometry.type === "polygon" ? (
              <RadiusBottomleftOutlined />
            ) : (
              <RadiusBottomleftOutlined />
            )
          }
          className="w-full rounded-md flex items-center"
        >
          {graphic.geometry.type === "point"
            ? "Punto"
            : graphic.geometry.type === "polyline"
            ? "Línea"
            : graphic.geometry.type === "polygon"
            ? "Polígono"
            : "Otro"}
        </Tag>
      ) : (
        <Tag
          icon={<AimOutlined />}
          className="w-full h-10 rounded-md flex items-center"
        >
          Vacío
        </Tag>
      )}
      {!graphic ? (
        ""
      ) : graphic.geometry.type === "point" ? (
        <PointForm graphic={graphic} />
      ) : graphic.geometry.type === "polyline" ? (
        <PolylineForm graphic={graphic} />
      ) : graphic.geometry.type === "polygon" ? (
        <PolygonForm graphic={graphic} />
      ) : (
        ""
      )}
      <div className="w-full h-min grid place-content-end">
        {!!graphic && (
          <div className="flex gap-2">
            <Button color="cyan" icon={<EyeOutlined />} onClick={showDrawer}>
              Geojson
            </Button>
            <Button
              color="blue"
              icon={<DownloadOutlined />}
              onClick={() =>
                !!graphic && downloadKML(graphicToFeature(graphic))
              }
            >
              KML
            </Button>
            <Button
              onClick={() => {
                !!graphic && removeGraphic(graphic.get("uid"));
              }}
              icon={<DeleteOutlined />}
              danger
            />
          </div>
        )}
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
          src={graphic ? graphicToFeature(graphic) : {}}
          displayDataTypes={false}
          indentWidth={2}
        />
      </Drawer>
    </div>
  );
}
