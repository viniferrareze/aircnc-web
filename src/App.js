import React, {useState} from 'react';
import './App.css';
import logo from './assets/logo.svg';
import api from './services/api';

function App() {
	const [email, setEmail] = useState('');

	function acessar(event){
		event.preventDefault(); //ignora evento padrão
	}

	return (
		<div className="container">
			<img src={logo} alt="Aircnc" />

			<div className="content">
				<p>
					Ofereça <strong>spots</strong> para programadores e econtre talentos para sua empresa
				</p>

				<form onSubmit={acessar}>
					<label htmlFor="email">E-mail*</label>
					<input type="email" id="email" placeholder="Seu e-mail" onChange={event => setEmail(event.target.value)} value={email}/>

					<button className="btn" type="submit">Acessar</button>
				</form>
			</div>
		</div>
	);
}

export default App;

//parei no 41:50