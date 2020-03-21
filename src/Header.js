import React, {useState} from 'react';
import { Navbar, NavbarToggler, Container, Row, Col,  Collapse,  Nav, NavItem, NavLink} from 'reactstrap';
import logo  from './logo.png';
import { FaUserMd, FaUsers, FaUserShield } from "react-icons/fa";

export default function Header(props){
    const [collapsed, setCollapsed] = useState(false);
    const [inputVal, setInputVal] = useState("");

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
        props.data(!collapsed);
    };
    const searchData = (e) => {
        setInputVal(e.target.value);
        props.searchData(e.target.value)
    }
        return (  
            <div>
                <Navbar color="faded" light className="box-shadow">
                <Container fluid>
                    <Row className="mx-0 my-0 flex-grow-1">
                        <Col xs="6" md="1" className="text-left"><a href="/"><img src={logo} alt="paymeindia" className="logo"/></a></Col>
                        <Col xs="6" md="1" className="text-right"><NavbarToggler onClick={toggleNavbar} className="mr-2 mt-20 border-0 lh-2" /></Col>
                        <Col md="10" xs="12"><input placeholder="Search" id="search" className="bb-green w100 border-top-0 border-right-0 border-left-0" onChange={searchData} value={inputVal}/></Col>  
                    </Row>
                    <Collapse isOpen={collapsed} navbar className="mobile-collapse">
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/roles"><FaUserMd/>Manage roles</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/privileges"><FaUsers/>Manage privileges</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/users"><FaUserShield/>Manage users</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
                </Navbar>
            </div>
        );
}
 