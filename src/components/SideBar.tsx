// import UploadFile from "./UploadFile";
import Cantones from "./location-section";
import GeometryForm from "./map-form/map-form";
// import Municipios from "./Municipios";
export default function SideBar() {
  return (
    <div className="p-4 flex flex-col w-96 bg-stone-100 gap-2">
      <GeometryForm />
      <Cantones />
    </div>
  );
}
