import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import {Button, Col, Row} from "react-bootstrap";

import ArtikliKartice from "./ArtikliKartice";
import Form from "react-bootstrap/Form";
import Narudzbe from "./Narudzbe";
import axios from "axios";

/**
 * Komponenta Artikli nam prikazuje pocetnu stranicu aplikacije, koja se razlikuje ukoliko je
 * prijavljen obicni korisnik i ukoliko je administrator. Naime ako je prijavljen obicni korisnik
 * imat cemo prikazan navigacijski meni, kao i sve dostupne proizvode. Ukoliko je prijavljen administrator
 * pored ovoga imas cemo i jos 2 dodatne opcije, a to su forma za dodavanje novog proizvoda, kao i dugme
 * za prikaz trenutnih narudzbi.
 * @param info
 * @param odjava
 * @param tip
 * @param id
 * @returns {JSX.Element}
 * @constructor
 */
function Artikli({info,odjava,tip,id}){

    const [korisnik,setKorisnik]=useState(id)
    const [podaci,setPodaci]=useState(info)
    const[proizvodi,setProizvod]=useState([])
    const [opis,setOpis]=useState("")
    const [cijena,setCijena]=useState(0)
    const [slika,setSlika]=useState("")
    const [forma,setForma]=useState(false)
    const [narudzbe,setNarudzbe]=useState(false)
    const [file,setFile]=useState(null)


    useEffect(()=>{
        ucitajProizvode()
    },[forma])
    function prikaziFormu(){
        setForma(!forma)
    }
    function prikaziNarudzbe(){
        setNarudzbe(!narudzbe)
    }


    function ucitajProizvode(){
        axios.post('http://127.0.0.1:8000/shopping/ucitajProizvode/').then(
            (response)=>{
                console.log(response)
                setProizvod(response.data)

            },
            (error) =>{
                console.log(error)
            }
        )

    }
    function dodajProizvod(){
        axios.post('http://127.0.0.1:8000/shopping/dodajProizvod/',{
            opis:opis,
            cijena:cijena,
            slika:slika
        }).then(
            (response)=>{
               console.log(response)
                setForma(!forma)

            },
            (error) =>{
                console.log(error)
            }
        )

    }

    return(
        <div>

            <NavBar odjava={odjava} ime={info.ime} prezime={info.prezime} status={info.tip_korisnika}/>
            {tip === "Admin" ?
                <div>
                <Button variant="success" className="evidencijaArtikl" onClick={prikaziFormu}>+ dodaj novi
                    proizvod</Button>
                <Button variant="success" className="evidencijaNarudzbe" onClick={prikaziNarudzbe}> Prikazi nove
                    narudzbe</Button>
                </div>:<div></div>

            }{forma?
            <Form className="dodajArtikl">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control type="text" placeholder="Unesite naziv" onChange={event => setOpis(event.target.value)}/>

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" min="1" placeholder="Unesite cijenu" onChange={event => setCijena(event.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Slika</Form.Label>
                    <Form.Control type="text" placeholder="Unesite naziv" onChange={event => setSlika(event.target.value)}/>

                </Form.Group>


                <Button variant="primary" onClick={dodajProizvod} >
                    Dodaj proizvod
                </Button>
            </Form>:<div></div>
            }
            {
                narudzbe? <Narudzbe/>:<div></div>
            }
            <Row>

                     {
                    proizvodi.map((doc)=>{
                        return <ArtikliKartice key={doc.pk} ucitaj={ucitajProizvode} idProizvoda={doc.pk} id={id} tip={tip} cijena={doc.fields.cijena} opis={doc.fields.naziv} slika={doc.fields.slika}/>
                    })
                }





            </Row>

        </div>
    )

}


export default Artikli