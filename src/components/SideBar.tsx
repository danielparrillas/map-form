// import UploadFile from "./UploadFile";
import GeometryForm from "./GeometryForm";
export default function SideBar() {
  return (
    <div className="p-4 flex flex-col w-96">
      <h1>Formulario</h1>
      {/* <UploadFile /> */}
      <GeometryForm />
    </div>
  );
}
