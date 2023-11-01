// import UploadFile from "./UploadFile";
import GeometryForm from "./GeometryForm";
import Municipios from "./Municipios";
export default function SideBar() {
  return (
    <div className="p-4 flex flex-col w-96 bg-stone-100 gap-2">
      <GeometryForm />
      <Municipios />
    </div>
  );
}
