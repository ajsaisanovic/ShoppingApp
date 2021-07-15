import React, {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Col, Container, Row} from "react-bootstrap";
import './Login.css'
import axios from "axios";
/**
 * Komponenta Login prikazuje formu u koju korisnik moze da unese korisnicko ime kao i lozinke
 * kako bi se prijavio, kada se prijavi prvo se vrsi provjera da li su unesi podaci tacni
 * to jeste da li postoji to korisnicko ime i da li je lozinka za njega ispravna
 * ako jeste vrsi se preusmjeravanje na pocetnu stranicu aplikacije.
 * Pored ove forme imaju i 2 opcije da se korisnik registruje ukoliko nema napravljen racun i da ukoliko
 * je zaboravio lozinku dobije novu.
 * */
function Login({registruj,lozinka,pocetna,postavi,tip}){
    const[ime,setIme]=useState("")
    const[pass,setLozinka]=useState("")
    const [pogresniPodaci,setPogresniPodaci]=useState(false)

    function pokupiPodatke(){
        console.log(ime)
        console.log(pass)
        axios.post('http://127.0.0.1:8000/shopping/login/',{
            ime:ime,
            lozinka:pass
        }).then(
            (response)=>{
                console.log(response.data)
                if (response.data==="None")
                    setPogresniPodaci(!pogresniPodaci)
                else{
                   let niz= response.data.fields

                    console.log(response.data.pk)
                    postavi(response.data.pk)
                    pocetna(niz,response.data)
                    tip(response.data.fields.tip_korisnika)

                }


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

            <Form className="login">
                {pogresniPodaci? <p>Unijeli ste pogešne podatke! </p>: <div></div>}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Korisničko ime</Form.Label>
                    <Form.Control type="text" placeholder="Unesite korisničko ime" onChange={event => setIme(event.target.value)} />

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Lozinka</Form.Label>
                    <Form.Control type="password" placeholder="Unesite lozinku" onChange={event => setLozinka(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Row>
                        <Col xs={9}>
                            <Form.Text ><Button variant="link" onClick={lozinka}>Zaboravili ste lozinku?</Button></Form.Text>

                        </Col>
                        <Col><Form.Text ><Button variant="link" onClick={registruj}>Registruj se!</Button></Form.Text></Col>
                    </Row>

                </Form.Group>
                {/*<Button variant="primary" onClick={pocetna}>*/}
                <Button variant="primary" onClick={pokupiPodatke}>
                    Prijavi se
                </Button>
            </Form>
        </Col>
            </Row>
        </Container>
    )
}

export default Login