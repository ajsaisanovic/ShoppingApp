import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

/**
 * Detalji prikazuju modal u kojem su nam detaljnije informacije o kupcu, to jeste prikazuje
 * ime,prezime i adresu kupca kako bi administrator znao kome treba poslati proizvod, pored toga ima i
 * button poslano, na ciji klik evidentiramo da je narudzba poslana.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Detalji(props) {
    const [kupac,setKupac]=useState([])


    function potvrdiNarudzbu(){

        axios.post('http://127.0.0.1:8000/shopping/poslanaNarudzba/',{
            id:props.idNarudzbe

        }).then(
            (response)=>{
                console.log(response)
                props.onHide()
            },
            (error) =>{
                console.log(error)
            }
        )


    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Odobri narudzbu
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Narudzba<br/>
                Kupac: {props.ime} {props.prezime}<br/>
                Adresa: {props.adresa}<br/>
                Narudzba: {props.idNarudzbe}<br/>



            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Zatvori</Button>
                <Button variant="success" onClick={potvrdiNarudzbu}>Poslano</Button>
            </Modal.Footer>
        </Modal>
    );
}

/***
 * Komponenta Narudzbe ce biti prikazana samo ukoliko je prijavljen administrator.
 * Komponenta prikazuje tabelu u kojoj se nalaze sve trenutne narudzbe, prikazuju se sve informacije
 * o proizvodu koji je narucen (kolicin,cijena,velicina) kao i detalji o kupcu.
 * @returns {JSX.Element}
 * @constructor
 */
function Narudzbe(){
    const [idNarudzbe,setIdNarudzbe]=useState()
    const [idKorisnika,setIdKorisnika]=useState()
    const [modal,setModal]=useState(false)
    const [podaci,setPodaci]=useState([])
   const [ime,setIme]=useState("")
   const [prezime,setPrezime]=useState("")
   const [adresa,setAdresa]=useState("")
    let brojac=0;

    useEffect(()=>{
        ucitajPodatke()
    },[modal])

    function ucitajPodatke(){
        axios.post('http://127.0.0.1:8000/shopping/sveNarudzbe/').then(
            (response)=>{
                console.log(response)
                setPodaci(response.data)


            },
            (error) =>{
                console.log(error)
            }
        )
    }

    function prikaziDetalje(idN,idK){
        axios.post('http://127.0.0.1:8000/shopping/detaljiKupca/',{
            id:idK
        }).then(
            (response)=>{
                console.log("OVDJE")
                console.log(response.data)

                setIme(response.data.fields.ime)
                setPrezime(response.data.fields.prezime)
                setAdresa(response.data.fields.adresa)
                setIdNarudzbe(idN)

                setModal(true)

            },
            (error) =>{
                console.log(error)
            }
        )



    }

    return(
        <div className="tabela">
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Proizvod</th>
                <th>Količina</th>
                <th>Ukupna cijena</th>
                <th>Kupac</th>
            </tr>
            </thead>
            <tbody>

            {
                podaci.map((doc)=>{
                    brojac++
                    return <tr>
                        <td>{brojac}</td>
                        <td>{doc.fields.proizvod}</td>
                        <td>{doc.fields.kolicina}</td>
                        <td>{doc.fields.cijena} KM</td>
                        <td><Button onClick={()=> prikaziDetalje(doc.pk,doc.fields.korisnik)}>Detalji</Button></td>
                    </tr>
                })
            }



            </tbody>
        </Table>
            <Detalji
                idNarudzbe={idNarudzbe}
                show={modal}
                idKorisnika={idKorisnika}
                adresa={adresa}
                ime={ime}
                prezime={prezime}
                onHide={() => setModal(false)}
            />
        </div>
    )


}
export default Narudzbe