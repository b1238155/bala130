
import React from "react";
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../assets/logo 2.png"
import profilepic from "../assets/avater2.jpg";

function NavbartitleAddco() {
  return (
    <Navbar expand="lg" className="bg-body navbartop" bg="light">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={logo} alt="" className="logocolorimg" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <text className="title">Welcome Back Ajay Varadharajan<span className="titlecolor"> (SRO) </span></text>
            {/* <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex titleaddprofile">

          
        {/* <div className="me-2">
          <button className="titlebuttonsize">
            <IoIosAddCircleOutline size={24} color={"#ffffff"} />
            <text className="titlebuttontext">Add Company</text>
          </button>
        </div> */}
{/* <Button variant="outline-success"   className=" me-2">Search</Button> */}

<div className="titleprofile">
          <img className="profilepic" src={profilepic} alt="profile" />
          <select className="titleselect titleselectsize">
            <option className="titleselect">Jeyaprakash</option>
            <option className="titleselect">Mahendra varma</option>
          </select>
        </div>
           
          </Form>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavbartitleAddco;