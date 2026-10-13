import { useState, type SubmitEvent } from 'react'
import type { Tarsasjatek } from '../App'
 
interface UjRekordProps {
  onHozzaadas: (jatek: Omit<Tarsasjatek, 'id'>) => void
}
 
interface UrlapAdatok {
  nev: string
  jatekosok: string
  komplexitas: string
  jatekido: string
  ar: string
}
 
const uresUrlap: UrlapAdatok = {
  nev: '',
  jatekosok: '',
  komplexitas: '',
  jatekido: '',
  ar: '',
}
 
function UjRekord({ onHozzaadas }: UjRekordProps) {
  const [urlap, setUrlap] = useState(uresUrlap)
  const [hiba, setHiba] = useState('')
  const [siker, setSiker] = useState('')
 
  const mezovaltozas = (mezo: keyof UrlapAdatok, ertek: string) => {
    setUrlap((elozo) => ({ ...elozo, [mezo]: ertek }))
    setHiba('')
    setSiker('')
  }
 
  const bekuldes = (esemeny: SubmitEvent<HTMLFormElement>) => {
    esemeny.preventDefault()
    const kotelezoMezok = Object.values(urlap)
    if (kotelezoMezok.some((ertek) => ertek.trim() === '')) {
      setHiba('Kérjük, tölts ki minden mezőt!')
      setSiker('')
      return
    }
 
    const jatekosok = Number(urlap.jatekosok)
    const komplexitas = Number(urlap.komplexitas)
    const jatekido = Number(urlap.jatekido)
    const ar = Number(urlap.ar)
    if (
      !Number.isFinite(jatekosok) || !Number.isInteger(jatekosok) || jatekosok < 1
      || !Number.isFinite(komplexitas) || komplexitas < 1 || komplexitas > 10
      || !Number.isFinite(jatekido) || !Number.isInteger(jatekido) || jatekido < 1
      || !Number.isFinite(ar) || ar < 0
    ) {
      setHiba('Ellenőrizd a számokat: a játékosszám és a játékidő pozitív egész legyen, a komplexitás 1–5 közé essen, az ár pedig ne legyen negatív!')
      setSiker('')
      return
    }
 
    onHozzaadas({
      nev: urlap.nev.trim(),
      jatekosok: urlap.jatekosok.trim(),
      komplexitas,
      jatekido: urlap.jatekido.trim(),
      ar
    })
    setUrlap(uresUrlap)
    setHiba('')
    setSiker('A társasjáték sikeresen bekerült a listába.')
  }
 
  return (
    <section className="card shadow-sm border-0">
      <div className="card-header bg-white d-flex align-items-center justify-content-between p-3">
        <div>
          <h2 className="h5 mb-0">Új társasjáték felvétele</h2>
        </div>
        <span className="badge text-bg-success fs-5" aria-hidden="true">+</span>
      </div>
      <div className="card-body">
        {hiba && <div className="alert alert-danger py-2" role="alert">{hiba}</div>}
        {siker && <div className="alert alert-success py-2" role="status">{siker}</div>}
        <form onSubmit={bekuldes} noValidate>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label" htmlFor="nev">Játék neve</label>
              <input className="form-control" id="nev" value={urlap.nev} onChange={(e) => mezovaltozas('nev', e.target.value)} required />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="jatekosok">Játékosok száma</label>
              <input className="form-control" id="jatekosok" type="number" min="1" step="1" value={urlap.jatekosok} onChange={(e) => mezovaltozas('jatekosok', e.target.value)} required />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="komplexitas">Komplexitás (1–5)</label>
              <input className="form-control" id="komplexitas" type="number" min="1" max="5" step="0.1" value={urlap.komplexitas} onChange={(e) => mezovaltozas('komplexitas', e.target.value)} required />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="jatekido">Játékidő (perc)</label>
              <input className="form-control" id="jatekido" type="number" min="1" step="1" value={urlap.jatekido} onChange={(e) => mezovaltozas('jatekido', e.target.value)} required />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="ar">Ár (Ft)</label>
              <input className="form-control" id="ar" type="number" min="0" step="1" value={urlap.ar} onChange={(e) => mezovaltozas('ar', e.target.value)} required />
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-primary px-4" type="submit">Játék hozzáadása</button>
          </div>
        </form>
      </div>
    </section>
  )
}
 
export default UjRekord