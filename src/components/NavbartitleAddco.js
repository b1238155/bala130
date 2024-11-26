
import React,{useState} from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/logo 2.png"
import profilepic from "../assets/avater2.jpg";
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
function NavbartitleAddco() {
  // const userName = useSelector((state) => state.form.usertoken.username);
  // const userType = useSelector((state) => state.form.usertoken.usertype);
  const token = localStorage.getItem('accessToken');
  const userName = localStorage.getItem('username');
  const userType = localStorage.getItem('usertype');
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === "logout") {
      // Perform logout action, such as clearing user session, etc.
      // Then, navigate to the login page or perform any other necessary actions.
      // For this example, I'll just navigate to the root ("/") path.
      navigate("/");
    }
  };
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
            <text className="title">Welcome Back <span className="titlecolor">{userName}({userType})</span></text>
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
          <select className="titleselect titleselectsize"
          id="profile"
          value={selectedOption}
          onChange={handleSelectChange}>
            <option className="titleselect" value="useranme">{userName}({userType})</option>
            <option className="titleselect" value="logout">Logout</option>
          </select>
        </div>
           
          </Form>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavbartitleAddco;