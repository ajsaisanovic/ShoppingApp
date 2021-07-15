
import Login from "./component/Login";
import RegistrujSe from "./component/RegistrujSe";
import ZaboravljenaLozinka from "./component/ZaboravljenaLozinka";
import {useState} from "react";

import "./component/Pocetna.css"
import "./component/Login.css"

import Artikli from "./component/Artikli";


function App() {
    const [registrujSe,setRegistrujSe]=useState(false)
    const [zaboravljenaLozinka,setzaboravljenaLozinka]=useState(false)
    const [pocetna,setPocetna]=useState(false)
    const [id,setId]=useState(0)
    const [podaci,setPodaci]=useState([])
    const [tip,setTip]=useState("")


    function registar(){
        setRegistrujSe(true)
        setzaboravljenaLozinka(false)
        setPocetna(false)
    }
    function zaborvaljena_lozinka(){
        setRegistrujSe(false)
        setzaboravljenaLozinka(true)
        setPocetna(false)
    }
    function artikli(niz){
        setPodaci(niz)
        setPocetna(true)
        setRegistrujSe(false)
        setzaboravljenaLozinka(false)

    }


    function odjava(){
        setPocetna(false)
        setRegistrujSe(false)
        setzaboravljenaLozinka(false)


    }
    if(registrujSe){
        return (
            <RegistrujSe pocetna={odjava}/>
        )
    }
    else if(zaboravljenaLozinka){
        return <ZaboravljenaLozinka pocetna={odjava}/>
    }
    else if(pocetna)
        return <Artikli odjava={odjava} tip={tip} info={podaci} id={id}/>


  return (

        <div className="default">
             <Login registruj={registar} lozinka={zaborvaljena_lozinka} pocetna={artikli} postavi={setId} tip={setTip} id={id}/>
        </div>

  );
}

export default App;
