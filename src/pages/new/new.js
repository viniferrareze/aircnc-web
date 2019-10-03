import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './new.style.css'
import api from '../../services/api';

export default function New({history}) {
   const [company, setCompany] = useState('');
   const [techs, setTechs] = useState('');
   const [price, setPrice] = useState('');
   const [thumbnail, setThumbnail] = useState(null);

   const preview = useMemo(() => {
      return thumbnail ? URL.createObjectURL(thumbnail) : null;
   }, [thumbnail])

   async function salvar(event) {
      event.preventDefault();

      const user_id = localStorage.getItem('user');

      const data = new FormData();
      data.append('thumbnail', thumbnail);
      data.append('company', company);
      data.append('techs', techs);
      data.append('price', price);
      
      await api.post('/spots', data, {
         headers: {user_id}
      });

      history.push('/dashboard');
   }

   return (
      <form onSubmit={salvar}>
         <label id="thumbnail" 
                style={{backgroundImage: `url(${preview})`}}
                className={preview ? 'has-thumbnail': ''}>
            <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
            <img src={camera} alt="Select img"/>
         </label>

         <label htmlFor="company">Empresa *</label>
         <input type="text"
            id="company"
            placeholder="Sua empresa"
            onChange={event => setCompany(event.target.value)}
            value={company}
         />

         <label htmlFor="techs">Tecnologias *</label>
         <input type="text"
            id="techs"
            placeholder="Quais tecnologias usam"
            onChange={event => setTechs(event.target.value)}
            value={techs}
         />

         <label htmlFor="price">Valor da Diária *</label>
         <input id="price"
            placeholder="Valor cobrado por dia"
            onChange={event => setPrice(event.target.value)}
            value={price}
         />

         <button type="submit">Salvar</button>
      </form>


   );
}