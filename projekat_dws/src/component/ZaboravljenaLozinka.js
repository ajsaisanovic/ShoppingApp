import React, {useState} from "react";
import {Col, Container, FormLabel, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

/**
 *Komponenta ZaboravljenaLozinka sluzi da ukoliko korisnik ima vec napravljen racun i ukoliko je
 * zaboravio svoj lozinku da moze dobiti novu. Potrebno je da unese email pomocu kojeg je i kreirao
 * taj racun, te ce mu se na taj email i poslati nova sifra pomocu koje sada moze pristupiti svom profilu.
 * @param pocetna
 * @returns {JSX.Element}
 * @constructor
 */

function ZaboravljenaLozinka({pocetna}){
    const[email,setEmail]=useState("")
    function posaljiEmail(){
        axios.post('http://127.0.0.1:8000/shopping/posaljiEmail/',{
            email:email

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
                    <Form className="login">
                        <FormLabel>Ukoliko ste zaboravili lozinku unesite email kako bismo Vam poslali novu!</FormLabel>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email adresa</Form.Label>
                            <Form.Control type="email" placeholder="Unesite email" onChange={event => setEmail(event.target.value)}/>

                        </Form.Group>


                        <Button variant="primary" type="submit" onClick={posaljiEmail}>
                            Pošalji email
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}

export default ZaboravljenaLozinka