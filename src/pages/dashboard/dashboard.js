import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import api from '../../services/api';
import './dashboard.style.css';

export default function Dashboard() {
   const [spots, setSpots] = useState([]);
   const [requests, setRequests] = useState([]);

   const user_id = localStorage.getItem('user');
   const socket = useMemo(() => socketio('http://192.168.1.15:3333', {
      query: {user_id}
   }), [user_id]);

   useEffect(() => {   
      socket.on('booking_request', data => {
         //[... request, data] = mantem o q ja tem no array e adiciona mais a data
         setRequests([... requests, data])
      });
   }, [requests, socket]);

   useEffect(() => {
      //executar apenas 1 vez...
      async function loadSpots() {
         const user_id = localStorage.getItem('user');
         const response = await api.get('/dashboard', {
            headers: { user_id }
         });

         setSpots(response.data);
      }

      loadSpots();

   }, [requests]);

   async function accept(id){
      await api.post(`/bookings/${id}/approvals`);

      setRequests(requests.filter(request => requests._id != id));
   }

   async function reject(id){
      await api.post(`/bookings/${id}/rejections`);

      setRequests(requests.filter(request => requests._id != id));
   }

   return (
      <>
         <ul className="notifications">
            {requests.map(request => (
               <li key={request._id}>
                  <p>
                     <strong>{request.user.email}</strong> está solicitando um reserva em <strong>{request.spot.company}</strong> para a data <strong>{request.date}</strong>
                  </p>

                  <button className="accept" onClick={() => accept(request._id)}>ACEITAR</button>
                  <button className="reject" onClick={() => reject(request._id)}>REJEITAR</button>
               </li>
            ))}
         </ul>

         <ul className="spot-list">
            {spots.map(spot => (
               <li key={spot._id}>
                  <header style={{ backgroundImage: `url(${spot.thumbnail})` }}/>
                  <strong>{spot.company}</strong>
                  <span>{spot.price ? `R$${spot.price}/dia` : `free` }</span>
               </li>   
            ))}
         </ul>

         <Link to="/new">
            <button className="btn">Cadastrar novo Spot</button>
         </Link>
      </>
   );
}