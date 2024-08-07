import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';


const AppNavbar = ({ fetchData }) => {

	const token = localStorage.getItem('token');

	const handleLogout = () => {
		localStorage.clear();
		fetchData();
	}
	return (
		<>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand href="/">BlogPo</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-light' />
					{token ?

						<Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
							<Nav className="">
								<Button variant='primary' onClick={handleLogout}>Logout</Button>
							</Nav>
						</Navbar.Collapse> :
						<Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
							<Nav className="">
								<Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
								<Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					}
				</Container>
			</Navbar>
		</>
	)
}

export default AppNavbar
