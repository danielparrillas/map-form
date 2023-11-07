import Graphic from "@arcgis/core/Graphic";
import { InputNumber } from "antd";
import { updatePolygon } from "../../hooks/mapStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type Coord = {
  id: number;
  x: number;
  y: number;
};

type CoordProps = {
  coord: Coord;
  graphic: Graphic;
  index: number;
  ringLength: number;
  graphicIndex: number;
};

export function CoordDnD({
  coord,
  graphic,
  index,
  ringLength,
  graphicIndex,
}: CoordProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: coord.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="grid grid-cols-2 pl-3"
    >
      <InputNumber
        value={Number(coord.x.toFixed(8))}
        className="w-full rounded-none"
        size="small"
        controls={false}
        onChange={(value) => {
          if (value) {
            const isFirstOrLast = index === 0 || index === ringLength - 1;
            updatePolygon(
              graphic.get("uid"),
              value,
              graphicIndex,
              index,
              0,
              isFirstOrLast
            );
          }
        }}
      />
      <InputNumber
        value={Number(coord.y.toFixed(8))}
        controls={false}
        size="small"
        className="w-full rounded-none"
        onChange={(value) => {
          if (value) {
            const isFirstOrLast = index === 0 || index === ringLength - 1;
            updatePolygon(
              graphic.get("uid"),
              value,
              graphicIndex,
              index,
              1,
              isFirstOrLast
            );
          }
        }}
      />
    </div>
  );
}
