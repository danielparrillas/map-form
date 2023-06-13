//🎉 third party
//📒mine
import Map from "./components/Map";
import SideBar from "./components/SideBar";
import Sheets from "./components/Sheets";

function App() {
  return (
    <div className="overflow-hidden flex h-screen">
      <SideBar />
      <Map />
      {/* <Sheets /> */}
    </div>
  );
}

export default App;
