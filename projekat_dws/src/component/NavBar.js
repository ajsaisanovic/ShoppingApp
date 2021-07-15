import React from "react"

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';
import './Pocetna.css'


/**
 * Komponenta NavBar nam prikazuje navigacijski meni u aplikaciji. U meniju imamo prikazan naziv aplikacije,
 * zatim ime i prezime svakog korisnika, te tip korisnika da li je to kupac ili administrator. Pored toga
 * imamo i button odjavi se pomocu kojeg se odjavljujemo sa trenutno prijavljenog profila.
 * @param odjava
 * @param ime
 * @param status
 * @param prezime
 * @returns {JSX.Element}
 * @constructor
 */
function NavBar({odjava,ime,status,prezime}) {
    return (
        <div className="fiksiraj">

            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Navbar.Brand href="">
                    <img
                        alt=""
                        src="https://cdn.iconscout.com/icon/premium/png-256-thumb/shopping-bags-6-784395.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    Shopping app</Navbar.Brand>
                <Nav className="mr-auto" >

                    <Nav.Link href="">Korisnik: {ime} {prezime}</Nav.Link>
                    <Nav.Link href="">Tip: {status}</Nav.Link>


                </Nav>
                <Button variant="secondary" onClick={odjava}>Odjavi se</Button>
            </Navbar>
        </div>
    )
}

export default NavBar