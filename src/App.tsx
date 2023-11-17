import Map from "./components/map-form/map";
import MapForm from "./components/map-form/map-form";

function App() {
  return (
    <div className="overflow-hidden flex h-screen">
      <MapForm />
      <Map />
    </div>
  );
}

export default App;
