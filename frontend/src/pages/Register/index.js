//importa o modulo do react junto com o estado "useState"
import React, { useState }from 'react';
//importa o modulo do router dom para trazer o conceito de spa na aplicação sem reload //O Use history serve para redirecionar o usuario 
import { Link, useHistory } from 'react-router-dom';
//importa o icon de flecha
import { FiArrowLeft } from 'react-icons/fi';
//importa a api para fazer a integração de serviço 
import api from '../../services/api';
//importa o css
import './styles.css';
//importa a imagem de logo
import logoImg from '../../assets/logo.svg';

export default function Register() {
  //define o estado com o modulo use state //variavel nome do campo e o metodo para setar o valor do input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  //usa o modulo useHistory para redirecionar o usuario
  const history = useHistory();
  
  //função assincrona para comnuicar com a api e inserir os dados no banco
  async function handleRegister(e){
    //previone o reload
    e.preventDefault();
    //dados do input que serao enviados
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    //tente inserir os dados
    try{
      //armnazena na response(reposta) a espera(await) se comunicar com a rota(ongs) utilizando o metodo post(api.post), enviando os dados do input 
      const response = await api.post('ongs', data);
      //depois que cadastrou retorna para o cliente
      alert(`Seu ID de acesso: ${response.data.id}`);
      //redireciona caso tenha sido cadastrado
      history.push('/');
      //deu erro? CAPTURA O ERRO
    }catch(err){
      //retorna para o cliente a mensagem de erro
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
          Não tenho cadastro
        </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da OMG" 
            value={name}  
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}  
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="WhatsApp" 
            value={whatsapp}  
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input 
              placeholder="Cidade" 
              value={city}  
              onChange={e => setCity(e.target.value)}
            />
            <input 
              placeholder="UF" 
              style={{ width: 80 }} 
              value={uf}  
              onChange={e => setUf(e.target.value)}  
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}