import { useMapStore } from "../hooks/mapStore";

export default function Municipios() {
  const municipios = useMapStore((state) => state.municipios);
  return (
    <div>
      <h5>Municipios</h5>
      <ul>
        {municipios.map((municipio) => (
          <li>
            {municipio.attributes.NOM_DPTO} - {municipio.attributes.NOM_MUN}
          </li>
        ))}
      </ul>
    </div>
  );
}
