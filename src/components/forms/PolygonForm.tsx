import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  // arrayMove,
} from "@dnd-kit/sortable";
import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";
import { webMercatorToGeographic } from "@arcgis/core/geometry/support/webMercatorUtils";
import {
  geodesicArea,
  geodesicLength,
} from "@arcgis/core/geometry/geometryEngine";
import { updatePolygon } from "../../hooks/mapStore";
import { InputNumber } from "antd";

type GeometryForm = {
  graphic: Graphic;
};
export default function PolygonForm({ graphic }: GeometryForm) {
  if (graphic === undefined) return;
  const polygon = new Polygon(webMercatorToGeographic(graphic.geometry));
  const handleDragEnd = (e: DragEndEvent) => {
    // const {active, over} = e;
  };
  return (
    <>
      <InputNumber
        value={Math.abs(geodesicArea(polygon, "hectares")).toFixed(8)}
        className="w-full"
        addonBefore="Área"
        addonAfter="ha"
        readOnly
      />
      <InputNumber
        value={geodesicLength(polygon, "meters").toFixed(8)}
        className="w-full"
        addonBefore="Perímetro"
        addonAfter="m"
        readOnly
      />
      <div className="grid grid-cols-2 text-center">
        <label>X</label>
        <label>Y</label>
      </div>
      <div className="flex flex-col h-full overflow-y-auto rounded-md p-2 bg-neutral-100">
        <DndContext collisionDetection={closestCenter}>
          <SortableContext
            items={polygon.rings[0]}
            strategy={verticalListSortingStrategy}
          >
            {polygon.rings.map((subRings, sri) =>
              subRings.map((coords, index) => (
                <div key={`coords-${index}`} className="grid grid-cols-2">
                  <InputNumber
                    key={`poly-x-${index}`}
                    value={Number(coords[0].toFixed(8))}
                    className="w-full rounded-none"
                    size="small"
                    controls={false}
                    onChange={(value) => {
                      if (value) {
                        const isFirstOrLast =
                          index === 0 || index === subRings.length - 1;
                        updatePolygon(
                          graphic.get("uid"),
                          value,
                          sri,
                          index,
                          0,
                          isFirstOrLast
                        );
                      }
                    }}
                  />
                  <InputNumber
                    key={`poly-y-${index}`}
                    value={Number(coords[1].toFixed(8))}
                    controls={false}
                    size="small"
                    className="w-full rounded-none"
                    onChange={(value) => {
                      if (value) {
                        const isFirstOrLast =
                          index === 0 || index === subRings.length - 1;
                        updatePolygon(
                          graphic.get("uid"),
                          value,
                          sri,
                          index,
                          1,
                          isFirstOrLast
                        );
                      }
                    }}
                  />
                </div>
              ))
            )}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}
