import React from 'react';

import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import logo from '../../img/logo.jpg';

export default function Entete(props) {

  
    return (
      <div style={{ border: '1px solid white', backgroundColor:'white' ,textAlign:'left', boxShadow: '5px 0px 5px deepskyblue',position:'fixed',left:0, top:0, width:'100%'}}>
                                  
          <img src={logo} alt="logo" style={{width:'8%', position:'relative', top:'12px', left:'90%'}}/>
  
          <label  style={{ fontSize: 30, textAlign: 'left' }}><strong>Contact finder</strong></label>
          <InputText  
            value={props.requete}
            type="text" 
            name="requete" 
            placeholder="Recherche" 
            onChange={props.handelChange}
            style={{ width:'42%', fontSize: 22, textAlign: 'left' , position:"relative", left:'5%', top:'0px' }}
            />
             
            <Button icon="pi pi-search" onClick={props.handelClick}
                  style={{ fontSize: 22, position:"relative", left:'2%' }}
                  title="Chercher"
            /> 
            
            <Button icon="pi pi-power-off" onClick={props.disconnect} className="p-button-warning"
                  style={{position:"relative", left:'100px', fontSize: 22}} 
                  title="Se Déconnecter"
            />     

        <p/>    
      </div>   
    );
  }

