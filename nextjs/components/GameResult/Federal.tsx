export default function FederalResult({ data }: { data: any }) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-lottery-federal text-white">
            <tr>
              <th className="py-2 px-3 text-left">Destino</th>
              <th className="py-2 px-3 text-left">Bilhete</th>
              <th className="py-2 px-3 text-right">Valor do Prêmio</th>
            </tr>
          </thead>
          <tbody>
            {data.listaRateioPremio?.map((premio: any, index: number) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="py-2 px-3">{`${index + 1}º`}</td>
                <td className="py-2 px-3 font-medium">
                  {data.listaDezenas[index]}
                </td>
                <td className="py-2 px-3 text-right">
                  {premio.valorPremio.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-600 text-center">
        Sorteio realizado no {data.localSorteio} em {data.municipio},{' '}
        {data.nomeMunicipioUFSorteio}
      </div>
    </div>
  );
}
