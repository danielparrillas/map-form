import { useMapStore } from "../hooks/mapStore";

export default function Cantones() {
  const cantones = useMapStore((state) => state.cantones);
  // console.log(cantones);
  return (
    <section className="p-2 bg-white rounded h-1/3">
      <h5>Departamento, Municipio, Canton</h5>
      <ul className="list-none p-0 flex flex-col gap-1 h-full overflow-y-auto">
        {cantones.map((canton, index) => {
          const departamento: string = canton.attributes.DPTO ?? "";
          const municipio: string = canton.attributes.MUNIC ?? "";
          const cantonName: string = canton.attributes.CANTON ?? "";
          if (!departamento.trim() || !municipio.trim() || !cantonName.trim())
            return;
          return (
            <li
              key={canton.attributes.COD_MUN4 ?? `canton-${index}`}
              className="text-xs bg-gray-100 rounded p-1"
            >
              {departamento}, {municipio}, {cantonName}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
