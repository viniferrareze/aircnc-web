import React, {useState} from 'react';
import api from '../../services/api';

export default function Login({ history }) {
   const [email, setEmail] = useState('');

	async function acessar(event){
      event.preventDefault(); //ignora evento padrão
      
      const resposta = await api.post('/session', {email});
      
      const {_id} = resposta.data;

      localStorage.setItem('user', _id);

      history.push('/dashboard');
	}

   return (
      <>
         <p>
            Ofereça <strong>spots</strong> para programadores e econtre talentos para sua empresa
         </p>

         <form onSubmit={acessar}>
            <label htmlFor="email">E-mail*</label>
            <input type="email"
               id="email"
               placeholder="Seu e-mail"
               onChange={event => setEmail(event.target.value)}
               value={email} />

            <button className="btn" type="submit">Acessar</button>
         </form>
      </>
   );
}