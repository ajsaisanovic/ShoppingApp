import React, {useEffect, useState} from "react";
import {Button, Col, FormLabel, Row} from "react-bootstrap";

import Form from "react-bootstrap/Form";
import axios from "axios";
import Modal from "react-bootstrap/Modal";


/**
 * Ova komponenta prikazuje modal, koji se prikazuje klikon na button naruci, te koja sluzi
 * da potvrdimo da sigurno zelimo narudzbu koju smo unijeli.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function MyVerticallyCenteredModal(props) {

    function sacuvaj(){

            axios.post('http://127.0.0.1:8000/shopping/novaNarudzba/',{
                korisnik:props.id,
                proizvod:props.opis,
                cijena:props.cijena*props.kolicina,
                kolicina:props.kolicina,
                velicina:props.velicina

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
                    Potvrdite narudzbu
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Da li ste sigurni da zelite sljedecu narudzbu:<br/>
                Artikal: {props.opis}<br/>
                Velicina: {props.velicina}<br/>
                Kolicina: {props.kolicina}<br/>
                Ukupna cijena: {props.kolicina*props.cijena} KM


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="danger">Zatvori</Button>
                <Button onClick={sacuvaj} variant="success">Potvrdi</Button>
            </Modal.Footer>
        </Modal>
    );
}

/**
 * ArtikliKartice komponenta nam definise kako ce se prikazivati informacije za pojedini proizvod.
 * Za svaki proizvod prikazujemo njegovu sliku, opis, i cijenu. Ukoliko je prijavljen kupac imat cemo
 * i input elemente za velicinu i kolicinu proizvoda i button na ciji klik moze naruciti trenutni proizvod,
 * dok ukoliko je prijavljen administrator ovih input elemenata nece biti, vec ce umjesto njih stajati
 * dva button-a za brisanje proizvoda, kao i za promjenu bilo kojeg parametra proizvoda.
 * @param id
 * @param opis
 * @param cijena
 * @param slika
 * @param tip
 * @param idProizvoda
 * @param ucitaj
 * @returns {JSX.Element}
 * @constructor
 */
function ArtikliKartice({id,opis,cijena,slika,tip,idProizvoda,ucitaj}){
    const [kolicina,setKolicina]=useState(1)
    const [velicina,setVelicina]=useState("XS")
    const[modal,setModal]=useState(false)
    const[naziv,setNaziv]=useState(opis)
    const[cijenaNovo,setCijena]=useState(cijena)
    const [forma,setForma]=useState(false)
    const [putanja,setPutanja]=useState("../../../")


    function naruci(){
        setModal(true)
        console.log("idd"+id)
    }

    function izbrisi(){
        axios.post('http://127.0.0.1:8000/shopping/izbrisiProizvod/',{
            id:idProizvoda

        }).then(
            (response)=>{
                console.log(response)
                ucitaj()

            },
            (error) =>{
                console.log(error)
            }
        )

    }

    function promijeni(){
        axios.post('http://127.0.0.1:8000/shopping/promijeniProizvod/',{
            id:idProizvoda,
            cijena:cijenaNovo,
            naziv:naziv

        }).then(
            (response)=>{
                console.log(response)
                ucitaj()
                setForma(!forma)

            },
            (error) =>{
                console.log(error)
            }
        )

    }



    return(
        <Col xs={4}>
            <div className="kartica">

                {/*<img className="slika" src={slika}/>*/}

                <img className="slika" src={putanja+slika}/>{console.log(putanja+slika)}

                <p>Naziv: {opis}</p>
                <p>Cijena: {cijena} KM</p>
                {tip==="Kupac"? <div>
                <Form className="">
                    <Form.Group controlId="velicina.ControlSelect1">
                        <Form.Label>Veličina</Form.Label>
                        <Form.Control as="select" onChange={event => setVelicina(event.target.value)}>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Količina</Form.Label>
                        <Form.Control type="number" min="1" onChange={event => setKolicina(event.target.value)} />
                    </Form.Group>



                    <Button variant="primary" onClick={naruci} >
                        Naruči
                    </Button>
                    <MyVerticallyCenteredModal
                        id={id}
                        show={modal}
                        kolicina={kolicina}
                        opis={opis}
                        cijena={cijena}
                        velicina={velicina}
                        onHide={() => setModal(false)}
                    />
                </Form></div> : <div></div>}{
                tip==="Admin"? <div><Button variant="danger" onClick={izbrisi} >
                    Izbriši
                </Button>
                    <Button className="promjena" variant="success" onClick={()=> setForma(!forma)} >
                        Promijeni
                    </Button>
                    {forma?
                    <Form >

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Naziv</Form.Label>
                            <Form.Control type="text" placeholder="Unesite novi naziv" onChange={event => setNaziv(event.target.value)} />

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Cijena</Form.Label>
                            <Form.Control type="text" placeholder="Unesite novu cijenu" onChange={event => setCijena(event.target.value)}/>
                        </Form.Group>


                        <Button variant="primary" onClick={promijeni}>
                            Promijeni
                        </Button>
                    </Form>:<div></div>}
                </div>:<div></div>
            }
            </div>
        </Col>
    )

}

export default ArtikliKartice