import React from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
  
import Uren from './components/Uren';
import AddUren from './components/AddUren';

function App() {
	return (
		<Router>
			<div className="App">
				<div class="topnav" id="myTopnav">
					<Link to="/">Home</Link>
					<Link to="/add-uren">Uren Toevoegen</Link>
				</div>
			</div>
			<Switch>
				<Route path="/" exact><Uren /></Route>
				<Route path="/add-uren"><AddUren /></Route>
			</Switch>
		</Router>
	)
}

export default App;
