interface KeresesRendezesProps {
  keresesiSzoveg: string
  onKeresesiSzovegValtozas: (ertek: string) => void
  onKereses: () => void
  novekvo: boolean
  onRendezesValtas: () => void
}
 
function KeresesRendezes({
  keresesiSzoveg,
  onKeresesiSzovegValtozas,
  onKereses,
  novekvo,
  onRendezesValtas,
}: KeresesRendezesProps) {
  return (
    <section className="card shadow-sm border-0">
      <div className="card-body d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3">
        <form
          className="w-100"
          role="search"
          onSubmit={(esemeny) => {
            esemeny.preventDefault()
            onKereses()
          }}
        >
          <label className="form-label fw-semibold" htmlFor="jatek-kereses">Játék keresése</label>
          <div className="input-group">
            <input
              id="jatek-kereses"
              className="form-control"
              type="search"
              value={keresesiSzoveg}
              onChange={(esemeny) => onKeresesiSzovegValtozas(esemeny.target.value)}
            />
            <button className="btn btn-primary px-4" type="submit">Keresés</button>
          </div>
        </form>
        <button
          className="btn btn-outline-secondary text-nowrap"
          type="button"
          onClick={onRendezesValtas}
          aria-label={`Rendezés ${novekvo ? 'csökkenő' : 'növekvő'} komplexitás szerint`}
        >
          <span aria-hidden="true">{novekvo ? '↑' : '↓'}</span>
          Komplexitás: {novekvo ? 'növekvő' : 'csökkenő'}
        </button>
      </div>
    </section>
  )
}
 
export default KeresesRendezes