import Map from "./components/Map";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="overflow-hidden flex h-screen">
      <SideBar />
      <Map />
    </div>
  );
}

export default App;
