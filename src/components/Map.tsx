import { useRef, useEffect } from "react";
import { view } from "../map/map";

export default function Map() {
  const mapDiv = useRef(null);
  useEffect(() => {
    if (mapDiv.current) {
      view.container = mapDiv.current;
    }
  }, []);

  return <div className="mapDiv w-full h-screen" ref={mapDiv}></div>;
}
