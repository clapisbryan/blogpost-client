import { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { register } from '../../services/userApiServices';

export default function Register() {

	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if ((username !== "" && email !== "" && password !== "" && password.length >= 8)) {

			setIsActive(true)

		} else {

			setIsActive(false)

		}
	}, [username, email, password])

	const registerUser = async (e) => {
		// Prevents the page redirection via form submission
		e.preventDefault();

		const payload = {
			username: username,
			email: email,
			password: password
		}

		const response = await register(payload);
		console.log("response", response);

		if (response.message === "Registered Successfully") {
			Swal.fire({
				title: "Registration successful",
				icon: "success",
				text: "You are now registered."
			})
			navigate("/login");
		} else if (response.message === "Email Invalid") {
			Swal.fire({
				title: "Email is invalid",
				icon: "error",
				text: "Please enter a valid email"
			})
		} else if (response.message === "Mobile number invalid") {
			Swal.fire({
				title: "Mobile number is invalid",
				icon: "error",
				text: "Mobile Number must be 11 digits"
			})
		} else if (response.message === "Password must be atleast 8 characters") {
			Swal.fire({
				title: "Password is invalid",
				icon: "error",
				text: "Password must be at least 8 characters"
			})
		} else {
			Swal.fire({
				title: "Something went wrong",
				icon: "error",
				text: "Please Contact the administrator"
			})
		}

	}

	return (
		<Container>
			<Row className='justify-content-center my-5'>
				<Col sm={12} md={8} lg={6}>
					<Card>
						<CardBody>
							<h1 className='text-center'>Register</h1>
							<Form onSubmit={(e) => registerUser(e)}>
								<Form.Group className='mb-3'>
									<Form.Label>Username:</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter username"
										required
										value={username}
										onChange={e => { setUsername(e.target.value) }}
									/>
								</Form.Group>
								<Form.Group className='mb-3'>
									<Form.Label>Email:</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter Email"
										required
										value={email}
										onChange={e => { setEmail(e.target.value) }}
									/>
								</Form.Group>
								<Form.Group className='mb-3'>
									<Form.Label>Password:</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter Password"
										required
										value={password}
										onChange={e => { setPassword(e.target.value) }}
									/>
								</Form.Group>
								<div className="text-center">
									{isActive ?
										<Button variant="primary" type="submit" id="submitBtn">Register</Button>
										:
										<Button variant="danger" type="submit" id="submitBtn" disabled>Register</Button>
									}
								</div>
							</Form>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>

	)

}