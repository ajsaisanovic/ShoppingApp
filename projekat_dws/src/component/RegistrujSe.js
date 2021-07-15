import React, {useState} from "react"
import {Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

/**
 * Komponenta RegistrujSe prikazuje formu u koje korisnik unosi sve trazene podatke
 * kako bi napravio novi korisnicki racun. Kada unese sve podatke preko axiosa saljemo djangu
 * gdje ce se dalje vrsiti upis tih podataka u bazu. Te na taj nacin korisnik sada ima napravljen racun
 * preko kojeg se moze prijaviti kako bi mogao koristiti aplikaciju.
 * @param pocetna
 * @returns {JSX.Element}
 * @constructor
 */
function RegistrujSe({pocetna}){
    const[ime,setIme]=useState("")
    const[prezime,setPrezime]=useState("")
    const[lozinka,setLozinka]=useState("")
    const[lozinka_p,setLozinkaP]=useState("")
    const[email,setEmail]=useState("")
    const[korisnickoIme,setKorisnickoIme]=useState("")
    const[adresa,setAdresa]=useState("")

    function pokupiPodatke(){
        axios.post('http://127.0.0.1:8000/shopping/spasiKorisnika/',{
            ime:ime,
            prezime:prezime,
            lozinka:lozinka,
            email:email,
            korisnickoIme:korisnickoIme,
            adresa:adresa,
            tip:"Kupac"


        }).then(
            (response)=>{
                console.log(response)
                pocetna()
            },
            (error) =>{
                console.log(error)
            }
        )


    }

    return(
        <Container >
            <Row>
                <Col xs={9} >
                    <Form className="registrujSe">

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Ime</Form.Label>
                            <Form.Control type="text" placeholder="Unesite ime" onChange={event => setIme(event.target.value)} />

                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Prezime</Form.Label>
                            <Form.Control type="text" placeholder="Unesite prezime" onChange={event => setPrezime(event.target.value)}/>

                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Adresa</Form.Label>
                            <Form.Control type="text" placeholder="Unesite adresu" onChange={event => setAdresa(event.target.value)}/>

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Korisničko ime</Form.Label>
                            <Form.Control type="text" placeholder="Unesite korisničko ime" onChange={event => setKorisnickoIme(event.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email </Form.Label>
                            <Form.Control type="email" placeholder="Unesite email" onChange={event => setEmail(event.target.value)} />

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Lozinka</Form.Label>
                            <Form.Control type="password" placeholder="Unesite lozinku" onChange={event => setLozinka(event.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Ponovljena lozinka</Form.Label>
                            <Form.Control type="password" placeholder="Potvrdite lozinku" onChange={event => setLozinkaP(event.target.value)} />
                        </Form.Group>

                        <Button variant="primary"  onClick={pokupiPodatke}>
                            Registruj se
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )


}

export default RegistrujSe