import React from 'react';

//importa o modulo brower router do react-router-dom da instalação npm install react-router-dom
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//importa o componente logon
import Logon from './pages/Logon';
//importa o componente register
import Register from './pages/Register';
//importa o componente profile
import Profile from './pages/Profile'
//importa o component Newincident
import NewIncident from './pages/Newincident';

//exporta o componente de rotas // exact serve para definir a rota exata "/"
export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Logon} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <Route path="/incidents/new" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}