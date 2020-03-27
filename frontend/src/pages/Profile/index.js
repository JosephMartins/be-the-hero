import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';
import './styles.css';

export default function Profile() {
	//captura o idong do localstorage que está gravado no navegador
	const ongId = localStorage.getItem('ongId');
	//captura o ongname do localstorage que está gravado no navegador
	const ongName = localStorage.getItem('ongName');
	//adiciona no estado do componente os incidentes(casos)
	const [incidents, setIncidents] = useState([]);
	const history = useHistory();
	
	useEffect(() => {
		//vai na api, na rota profile
		api.get('profile', {
			//no header pega o valor que é ongId
			headers: {
				Authorization: ongId,
			}
			//então tras a resposta e coloca na variavel incidentes la no usestate
		}).then(response => {
			setIncidents(response.data);
		})
	}, [ongId]);

	async function handleDeleteIncident(id){
		try{
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ongId,
				}
			});

			setIncidents(incidents.filter(incidents => incidents.id !== id));
		}catch(err){
			alert("erro ao deletar caso, tente novamente.");
		}
	}

	function handleLogout(){
		localStorage.clear();
		history.push('/');
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Be The Hero" />
				<span>Bem vinda, {ongName}</span>

				<Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
				<button onClick={handleLogout} type="button">
					<FiPower  size={18} color="#E02041"  />
				</button>
			</header>

			<h1>Casos cadastrados</h1>
			<ul>

				{incidents.map(incident => (
					<li key={incident.id}>
						<strong>CASO:</strong>
						<p>{incident.title}</p>
						<strong>DESCRIÇAO</strong>
						<p>{incident.description}</p>
						<strong>VALOR</strong>
						<p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
						<button onClick={() => handleDeleteIncident(incident.id)} type="button">
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</li>
				))}

			</ul>

		</div>
	);
}