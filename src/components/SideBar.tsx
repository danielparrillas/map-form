// import UploadFile from "./UploadFile";
import { GeometryContainer } from "./GeometryList.tsx";
import GeometryForm from "./GeometryForm";
import { graphicToFeature } from "../utils/feature";
import { useMapStore } from "../map/store.ts";

export default function SideBar() {
  const { graphic, setGraphic } = useMapStore();
  return (
    <div className="p-4 flex flex-col w-96">
      <h1>Coordenadas</h1>
      {/* <UploadFile /> */}
      <GeometryForm feature={graphicToFeature(graphic)} />
    </div>
  );
}
