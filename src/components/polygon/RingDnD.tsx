import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  // arrayMove,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useMapStore } from "../../hooks/mapStore";
import { Coord, CoordDnD } from "./CoordDnd";

type RingDnDProps = {
  index: number;
  ring: number[][];
};

export default function RingDnD(props: RingDnDProps) {
  const [coords, setCoords] = useState<Coord[]>([]);
  const graphic = useMapStore((state) => state.graphic);

  useEffect(() => {
    const formatedCoords: Coord[] = props.ring.map((coord, index) => ({
      id: index,
      x: coord[0],
      y: coord[1],
    }));
    setCoords(formatedCoords);
  }, [graphic?.geometry]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setCoords((coords) => {
      const activeIndex = coords.findIndex((coord) => coord.id === active.id);
      const overIndex = coords.findIndex((coord) => coord.id === over?.id);
      return arrayMove(coords, activeIndex, overIndex);
    });
  };

  if (graphic === undefined) return;

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={coords} strategy={verticalListSortingStrategy}>
        {coords.map((coord, index) => (
          <CoordDnD
            key={`coord-${index}`}
            coord={coord}
            graphic={graphic}
            index={index}
            ringLength={props.ring.length}
            graphicIndex={props.index}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
