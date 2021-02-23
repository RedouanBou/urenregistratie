import React, { useState } from 'react';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import axios from 'axios';
import './App.css';

function App() {
	const [datum, setDatum] = useState('');
	const [dag, setDag] = useState('');
	const [begintijd, setBeginTijd] = useState('');
	const [eindtijd, setEindTijd] = useState('');
	const [werkzaamheden, setWerkzaamheden] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const objt = { datum, dag, begintijd, eindtijd, werkzaamheden };

		axios
			.post(
				"https://sheet.best/api/sheets/9dd5c7ac-a6b0-4df5-9053-67f37650687d",
				objt
			)
			.then((response) => {
				console.log(response);
			});
	};

	return (
		<Container fluid className="container">
			<Header as="h2">Urenregistratie</Header>
			<Form className="form">
				<Form.Field>
					<label>Daum</label>
					<input type="date" placeholder="Vul hier de datum in ..." onChange={(e) => setDatum(e.target.value)} />
				</Form.Field>

				<Form.Field>
					<label>Dag</label>
					<input type="text" placeholder="Vul hier de dag in ..." onChange={(e) => setDag(e.target.value)} />
				</Form.Field>

				<Form.Field>
					<label>Start time</label>
					<input type="time" placeholder="Vul hier de start tijd in ..." onChange={(e) => setBeginTijd(e.target.value)} />
				</Form.Field>

				<Form.Field>
					<label>End time</label>
					<input type="time" placeholder="Vul hier de eind tijd in ..." onChange={(e) => setEindTijd(e.target.value)} />
				</Form.Field>

				<Form.TextArea label='Werkzaamheden' placeholder='Vul hier de werkzaamheden in ...' onChange={(e) => setWerkzaamheden(e.target.value)} />

				<Button color="blue" type="submit" onClick={handleSubmit}>
					Opslaan
				</Button>
			</Form>
		</Container>
	);
}

export default App;
