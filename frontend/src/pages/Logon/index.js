//importa o modulo react e o useState para 
import React, { useState } from 'react';
//torna o link dinamico sem recarregar a pagiona tornando uma SPA
import { Link, useHistory } from 'react-router-dom';

//importa icones da instalação "npm install react-icons"
import { FiLogIn } from 'react-icons/fi';
//importa a api
import api from '../../services/api';

// importa o estilo do logon
import './styles.css';

//importa a logo da  aplicação que está na pasta assets e utilizamos essa variavel entre chaves no html
import logoImg from '../../assets/logo.svg';
//importa a imagem header da aplicação que tambem está na pasta assets e utilizamos essa variavel entre chaves no html
import heroesImg from '../../assets/heroes.png';

//exporta o componente Logon para ser usado em qualquer lugar
export default function Logon() {
  //armazena o estado do input que é o valor do input e o metodo para armazena o valor
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();

    try{
      const response = await api.post('session', { id });
      //armazena na memoria do navegador
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('./profile');
    }catch(err){
      alert('Erro filho da puta');
    }
  }

  return (

    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input 
            placeholder="Sua ID" 
            value={id}
            //captura o valor do alvo que é o input e armazena na variavel id
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
          Não tenho cadastro
        </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}