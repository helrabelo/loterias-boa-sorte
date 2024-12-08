export default function LotecaResult({ data }: { data: any }) {
  const games = data.listaResultadoEquipeEsportiva || [];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-lottery-loteca text-white">
            <tr>
              <th className="py-2 px-2 text-center w-12">Jogo</th>
              <th className="py-2 px-2">Coluna 1</th>
              <th className="py-2 px-2 text-center w-8">x</th>
              <th className="py-2 px-2">Coluna 2</th>
              <th className="py-2 px-2 w-24 text-center">Data</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game: any, index: number) => (
              <tr
                key={index}
                className={
                  game.nuSequencial % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }
              >
                <td className="py-2 px-2 text-center">{game.nuSequencial}</td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-gray-100 text-sm">
                      {game.nuGolEquipeUm}
                    </span>
                    <span>
                      {game.nomeEquipeUm}
                      {game.siglaUFUm && `/${game.siglaUFUm}`}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-2 text-center">x</td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-gray-100 text-sm">
                      {game.nuGolEquipeDois}
                    </span>
                    <span>
                      {game.nomeEquipeDois}
                      {game.siglaUFDois && `/${game.siglaUFDois}`}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-2 text-center text-sm">
                  {game.diaSemana}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Prize Information */}
      <div className="space-y-2 pt-4 border-t">
        {data.listaRateioPremio?.map((premio: any, index: number) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <span>
              {premio.descricaoFaixa} ({premio.numeroDeGanhadores} ganhadores)
            </span>
            <span className="font-bold">
              {premio.valorPremio.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
