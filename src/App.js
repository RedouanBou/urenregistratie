import React, { Component } from 'react';
import { Button, Form, Container, Header, Table } from 'semantic-ui-react';
import Tabletop from 'tabletop';
import axios from 'axios';
import './App.css';

// https://docs.google.com/spreadsheets/d/e/2PACX-1vQknlBl2jgiw5adES3rgWjnU9Eq3dOzHt0cQH2sCRjST5Ub5FRJBuXXxGElApI9XfNpBUNiwiVdvDKD/pubhtml

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			fields: {},
			errors: {}
		}
	}

	componentDidMount() {
		Tabletop.init({
		  key: '1rkUBoSdpdkooSm2YKkHiVFhfFurXMMKi4apOtyEdxKA',
		  callback: googleData => {
			this.setState({
				data: googleData
			})
		  },
		  simpleSheet: true
		})
	  }

	handleValidation() {
		let fields = this.state.fields;
		let errors = this.state.errors;
		let formIsValid = true;

		// Datum
		if(!fields["datum"]) {
			formIsValid = false;
			errors["datum"] = "Datum kan niet leeg zijn...";
		}

		// Dag
		if(!fields["dag"]) {
			formIsValid = false;
			errors["dag"] = "Dag kan niet leeg zijn...";
		}

		if(typeof fields["dag"] !== "undefined") {
			if(!fields["dag"].match(/^[a-zA-Z]+$/)){
			   formIsValid = false;
			   errors["dag"] = "Dag mag alleen uit letters bestaan";
			}        
		 }

		// Tijd
		if (!fields["begintijd"]) {
			formIsValid = false;
			errors["begintijd"] = "Begin tijd kan niet leeg zijn";
		}

		if (!fields["eindtijd"]) {
			formIsValid = false;
			errors["eindtijd"] = "Eind tijd kan niet leeg zijn";
		}

		if (fields["eindtijd"] < fields["begintijd"] || fields["begintijd"] === fields["eindtijd"]) {
			formIsValid = false;
			errors["eindtijd"] = "Eind tijd kan niet kleiner of gelijk zijn dan begin tijd";
		}

		// Werkzaamheden
		if (!fields["werkzaamheden"]) {
			formIsValid = false;
			errors["werkzaamheden"] = "Werkzaamheden kan niet leeg zijn";
		}

		if(typeof fields["werkzaamheden"] !== "undefined"){
			if(!fields["werkzaamheden"].match(/^[a-zA-Z]+$/)){
			   formIsValid = false;
			   errors["werkzaamheden"] = "Werkzaamheden mag alleen uit letters bestaan";
			}        
		}

		this.setState({errors: errors});
        return formIsValid;
	}

	handleSubmit(e) {
		e.preventDefault();

		if(this.handleValidation()) {
			axios.post("https://sheet.best/api/sheets/9dd5c7ac-a6b0-4df5-9053-67f37650687d", this.state.fields).then((response) => {console.log(response); });
			alert("Uurregistratie succesvol toegevoegd!");
		} else {
			alert("Form geeft foutmeldingen aan");
		}
	};

	handleChange(field, e){         
		let fields = this.state.fields;
		fields[field] = e.target.value;        
		this.setState({fields});
	}

	render() {
		const { data } = this.state;

		return (
			<Container fluid className="container">
				<Table celled className="data-table">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Datum</Table.HeaderCell>
							<Table.HeaderCell>Dag</Table.HeaderCell>
							<Table.HeaderCell>Tijd</Table.HeaderCell>
							<Table.HeaderCell>Taken</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{
							data.map(obj => {
								return (
									<Table.Row>
											<Table.Cell>{obj.datum}</Table.Cell>
											<Table.Cell>{obj.dag}</Table.Cell>
											<Table.Cell>{obj.begintijd} - {obj.eindtijd}</Table.Cell>
											<Table.Cell>{obj.werkzaamheden}</Table.Cell>
									</Table.Row>	
								)
							})
						}
					</Table.Body>
				</Table>

				<Form className="form" onSubmit= {this.handleSubmit.bind(this)}>
					<Header as="h2">Urenregistratie</Header>
					<Form.Field>
						<label>Datum</label>
						<input type="date" name="datum" placeholder="Vul hier de datum in ..." onChange={this.handleChange.bind(this, "datum")} value={this.state.fields["datum"]} />
						<span style={{color: "red"}}>{this.state.errors["datum"]}</span>
					</Form.Field>

					<Form.Field>
						<label>Dag</label>
						<input type="text" name="dag" placeholder="Vul hier de dag in ..." onChange={this.handleChange.bind(this, "dag")} value={this.state.fields["dag"]} />
						<span style={{color: "red"}}>{this.state.errors["dag"]}</span>
					</Form.Field>

					<Form.Field>
						<label>Begin tijd</label>
						<input type="time" name="begintijd" placeholder="Vul hier de start tijd in ..." onChange={this.handleChange.bind(this, "begintijd")} value={this.state.fields["begintijd"]} />
						<span style={{color: "red"}}>{this.state.errors["begintijd"]}</span>
					</Form.Field>

					<Form.Field>
						<label>Eind tijd</label>
						<input type="time" name="eindtijd" placeholder="Vul hier de eind tijd in ..." onChange={this.handleChange.bind(this, "eindtijd")} value={this.state.fields["eindtijd"]} />
						<span style={{color: "red"}}>{this.state.errors["eindtijd"]}</span>
					</Form.Field>

					<Form.TextArea name="werkzaamheden" label='Werkzaamheden' placeholder='Vul hier de werkzaamheden in ...' onChange={this.handleChange.bind(this, "werkzaamheden")} value={this.state.fields["werkzaamheden"]} />
					<span style={{color: "red"}}>{this.state.errors["werkzaamheden"]}</span>
					<br />
					<Button color="blue" type="submit">
						Opslaan
					</Button>
				</Form>
			</Container>
		)
	}
}

export default App;
