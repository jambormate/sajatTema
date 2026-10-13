import { useMemo, useState } from "react";
import Fejlec from "./components/Fejlec";
import KeresesRendezes from "./components/Kereses-Rendezes";
import Lablec from "./components/Lablec";
import Tablazat from "./components/Tablazat";
import UjRekord from "./components/UjRekord";
 
 
export interface Tarsasjatek {
  id: number;
  nev: string;
  jatekosok: string;
  komplexitas: number;
  jatekido: string;
  ar: number;
}
 
const mintaJatekok: Tarsasjatek[] = [
  {
    id: 1,
    nev: "Root: A Game of Woodland Might and Right",
    jatekosok: "2-4",
    komplexitas: 3.7,
    jatekido: "60-90",
    ar: 28990,
  },
  {
    id: 2,
    nev: "The Heat: Pedal to the Metal",
    jatekosok: "2-6",
    komplexitas: 2.2,
    jatekido: "30-60",
    ar: 24990,
  },
  {
    id: 3,
    nev: "Gloomhaven",
    jatekosok: "1-4",
    komplexitas: 3.9,
    jatekido: "30-120",
    ar: 69990,
  },
  {
    id: 4,
    nev: "Settlers of Catan",
    jatekosok: "3-4",
    komplexitas: 2.5,
    jatekido: "60-90",
    ar: 12990,
  },
  {
    id: 5,
    nev: "Azul",
    jatekosok: "2-4",
    komplexitas: 1.8,
    jatekido: "30-45",
    ar: 15990,
  },
];
 
function App() {
  const [jatekok, setJatekok] = useState(mintaJatekok);
  const [keresesiSzoveg, setKeresesiSzoveg] = useState("");
  const [aktivKereses, setAktivKereses] = useState("");
  const [novekvo, setNovekvo] = useState(true);
 
  const lathatoJatekok = useMemo(() => {
    const keresett = aktivKereses.trim().toLocaleLowerCase("hu");
    return jatekok
      .filter((jatek) => jatek.nev.toLocaleLowerCase("hu").includes(keresett))
      .toSorted((a, b) =>
        novekvo ? a.komplexitas - b.komplexitas : b.komplexitas - a.komplexitas,
      );
  }, [aktivKereses, jatekok, novekvo]);
 
  const hozzaadJatek = (ujJatek: Omit<Tarsasjatek, "id">) => {
    setJatekok((elozoJatekok) => [
      ...elozoJatekok,
      {
        ...ujJatek,
        id: Math.max(0, ...elozoJatekok.map((jatek) => jatek.id)) + 1,
      },
    ]);
  };
 
  return (
    <div className="min-vh-100 d-flex flex-column bg-body-tertiary">
      <Fejlec />
      <main className="container py-4 py-lg-5 flex-grow-1">
        <section className="bg-success text-white rounded-4 p-4 p-lg-5 mb-4 mb-lg-5 shadow">
          <div>
            <h2 className="mb-2">Társasjáték-gyűjtemény</h2>
          </div>
          <div
            className="d-inline-flex flex-column align-items-center rounded-3 border border-light border-opacity-25 bg-white bg-opacity-10 px-4 py-2 mt-3"
            aria-label={`${jatekok.length} társasjáték`}
          >
            <span className="fs-2 fw-bold">{jatekok.length}</span>
            <small>játék a listában</small>
          </div>
        </section>
 
        <div className="row g-4">
          <div className="col-12">
            <KeresesRendezes
              keresesiSzoveg={keresesiSzoveg}
              onKeresesiSzovegValtozas={setKeresesiSzoveg}
              onKereses={() => setAktivKereses(keresesiSzoveg)}
              novekvo={novekvo}
              onRendezesValtas={() => setNovekvo((elozo) => !elozo)}
            />
          </div>
          <div className="col-12">
            <Tablazat jatekok={lathatoJatekok} />
          </div>
          <div className="col-12">
            <UjRekord onHozzaadas={hozzaadJatek} />
          </div>
        </div>
      </main>
      <Lablec />
    </div>
  );
}
 
export default App;