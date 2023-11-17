import { useMapStore } from "../../hooks/mapStore";

export default function Municipios() {
  const municipios = useMapStore((state) => state.municipios);
  console.log(municipios);
  return (
    <div>
      <h5>Municipios</h5>
      <ul>
        {municipios.map((municipio, index) => (
          <li key={municipio.attributes.COD_MUN4 ?? `mun-${index}`}>
            {municipio.attributes.NOM_DPTO} - {municipio.attributes.MUNIC}
          </li>
        ))}
      </ul>
    </div>
  );
}
