import type { Tarsasjatek } from '../App'
 
interface TablazatProps {
  jatekok: Tarsasjatek[]
}
 
function Tablazat({ jatekok }: TablazatProps) {
  return (
    <section className="card shadow-sm border-0">
      <div className="card-header bg-white d-flex align-items-center justify-content-between p-3">
        <div>
          <h2 className="h5 mb-1">Játéklista</h2>
        </div>
        <span className="badge rounded-pill text-bg-success">{jatekok.length} találat</span>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Társasjáték</th>
              <th scope="col">Játékosok száma</th>
              <th scope="col">Komplexitás</th>
              <th scope="col">Játékidő</th>
              <th scope="col">Ár</th>
            </tr>
          </thead>
          <tbody>
            {jatekok.length > 0 ? jatekok.map((jatek) => (
              <tr key={jatek.id}>
                <th scope="row" className="fw-semibold">{jatek.nev}</th>
                <td>{jatek.jatekosok} fő</td>
                <td><span className="badge rounded-pill text-bg-light">{jatek.komplexitas} / 5</span></td>
                <td>{jatek.jatekido} perc</td>
                <td>{jatek.ar} Ft</td>
              </tr>
            )) : (
              <tr>
                <td className="text-center text-secondary py-5" colSpan={6}>
                  Nincs ilyen társasjáték a listán
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
 
export default Tablazat