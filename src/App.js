import React from 'react';
import {BrowserRouter, Route} from "react-router-dom"
import './App.css';
import Search from "./components/recherche/search";
import Login from "./components/inscription/login";
import Insc from "./components/inscription/insc";
import Activated from "./components/activation/activated";
import Activatedn from "./components/activation/activatedn";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
              <div className="App">
                <BrowserRouter>
                   <Route path="/activer" component={Activated} />
                   <Route path="/activen" component={Activatedn} />
                   <Route path="/inscription" component={Insc} />
                   <Route path="/recherche" component={Search} />
                   <Route path="/" component={Login} exact />
                </BrowserRouter>
              </div>
  );
}

export default App;
