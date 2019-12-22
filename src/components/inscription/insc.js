import React from 'react';
import {Password} from 'primereact/password';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Growl} from 'primereact/growl';
import axios from 'axios'
import logo from '../../img/logo.jpg';



class Insc extends React.Component{

    constructor(){
        super();
        this.state={
            usrName:"",
            psw:"",
            activite: {name: 'Conseil en systèmes et logiciels informatiques', code: 'InformatiqueC'},
            hits:[]
          };

          this.onSubmit= this.onSubmit.bind(this);
          this.handelChange= this.handelChange.bind(this);
          this.showMessage= this.showMessage.bind(this);
          this.onActivityChange = this.onActivityChange.bind(this);
          this.pageAcc = this.pageAcc.bind(this);
    }

    pageAcc(){
        window.open('/',"_self")
    }
    
    onSubmit(){
                let tSend = {
                                id:"",
                                password:"",
                                activite:"",
                                adresseIp:"",
                                redirect:false
                            }

                tSend.id = this.state.usrName;
                tSend.password= this.state.psw;
                tSend.activite= this.state.activite.name;
 

             fetch('https://jsonip.com/', {mode: 'cors'})
                        .then(response => response.json())
                        .then((text)=> {
                          //  console.log(text);
                            tSend.adresseIp=text.ip;
                        })
                        .catch(function(error) {
                            tSend.adresseIp="127.0.0.1";
                            console.log('Request failed', error)
                        });
  

               // console.log(tSend);  

                let msg={
                    titre:"",
                    text: ""
                }

               
                var regexMail = RegExp('[a-zA-A-Z0-9_%.+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9-.]+');
                var regexPsw = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");




                if(!regexMail.test(tSend.id)){
                    msg.titre = "Attention: ";
                    msg.text = "Veuillez entrer une adresse mail valide svp.";
                    this.showMessage(msg, 1);
                }else if(!regexPsw.test(tSend.password)){
                    msg.titre = "Attention: ";
                    msg.text = "Veuillez Choisir un mot de passe robust aui ce compose d'au moins 8 caractères, une lettre majiscule, une lettre miniscule, un chiffre et un caractère spécial.";
                    this.showMessage(msg, 1);
                }else{

                    axios.post("/api/inscription", tSend)
                  // axios.post("http://localhost:8080/inscription", tSend)
                    .then(response =>{                      
                       if(response.data.id === tSend.id){
                                        msg.titre = "Information";
                                        msg.text = "Un mail de confirmation vous à été transfèré sur "+tSend.id;
                                        this.showMessage(msg, 0);
                        }else{
                                        msg.titre = "Attention";
                                        msg.text = response.data;
                                        this.showMessage(msg, 1);
                        }
                    }).catch(error=>{
                        console.log(error);
                            msg.titre = "Erreur";
                            msg.text = error;
                            this.showMessage(msg, 2);
                    })
                    
                }
            }


 showMessage(msg, type){
    if(type === 0){
           this.growl.show({severity: 'success', summary: msg.titre, detail:  msg.text});
      }else if(type === 1){
           this.growl.show({severity: 'warn', summary:  msg.titre, detail:  msg.text});
      }else{
           this.growl.show({severity: 'error', summary:  msg.titre, detail:  msg.text});
      }
      
 }

    handelChange(event){
        const {name, value}=event.target
                     this.setState({
                                      [name] : value
                                   }) 
     }

     onActivityChange(e) {
        this.setState({activite: e.value});
    }

        render(){

            const activities = [
                {name: 'Location de terrains et d’autres biens immobiliers', code: 'LocationTI'},
                {name: 'Conseil pour les affaires et autres conseils de gestion', code: 'ConseilAG'},
                {name: 'Autres organisations fonctionnant par adhésion volontaire', code: 'Volontaria'},
                {name: 'Activités juridiques', code: 'ActiviteJ'},
                {name: 'Location de logements', code: 'LocationL'},
                {name: 'Arts du spectacle vivant', code: 'Arts'},
                {name: 'Création artistique relevant des arts plastiques', code: 'Artistique'},
                {name: 'Activités des sociétés holding', code: 'ActiviteS'},
                {name: 'Restauration traditionnelle', code: 'Restauration'},
                {name: 'Autre création artistique', code: 'CreationArts'},
                {name: 'Conseil en relations publiques et communication', code: 'ConseilRPC'},
                {name: 'Activités spécialisées de design', code: 'ActiviteSD'},
                {name: 'Agences immobilières', code: 'AgentceI'},
                {name: 'Conseil en systèmes et logiciels informatiques', code: 'InformatiqueC'},
                {name: 'Activités d’architecture', code: 'Architecture'},
                {name: 'Programmation informatique', code: 'InformatiqueP'},
                {name: 'Restauration de type rapide', code: 'Fastfood'},
                {name: 'Commerce de détail d’habillement en magasin spécialisé', code: 'CommerceMS'},
                {name: 'Formation continue d’adultes', code: 'Formation'},
                {name: 'Administration d’immeubles et autres biens immobiliers', code: 'Administration'},
                {name: 'Autre', code: 'Autre'}
            ];



            return(
                <div>
                           <Growl ref={(el) => this.growl = el}></Growl>
                           <div>
                                 < div style={{ border: '1px solid green', borderRadius:'5px', width: '33%', height: 400 , position:"absolute", left:'33%', top:'10%' }}>
                                 <header style={{ height:'18%',  textAlign:'center'}}><img src={logo} alt="logo" style={{width:'33%', height:'100%'}}/></header>
                                 <p style={{textAlign:'left', position:"relative", left:'12%', top:'0%', fontSize:'17px' }}><strong>Créer un compte</strong></p>

                                       <div style={{fontSize: 16, textAlign: 'left', width: "77%", height: 200 , position:"relative", left:'12%', top:'0%' }}>
                                       <span className="p-float-label" >
                                       
                                          <InputText 
                                                   id="float-input" 
                                                   type="text" 
                                                   size="30" 
                                                   name="usrName"
                                                   value={this.state.usrName} 
                                                   onChange={this.handelChange} 
                                                   style={{ width:'100%' }}
                                          />
                                          <label htmlFor="float-input" >Adresse mail</label>
                                       </span>
                                       <br/>
                                       <span className="p-float-label" >
                                       
                                          <Password 
                                                   name="psw"
                                                   id="psw-input" 
                                                   value={this.state.psw} 
                                                   onChange={this.handelChange} 
                                                   style={{ width:'100%' }}
                                          />
                                          <label htmlFor="psw-input">Mot de passe</label>
                                       </span>
                                       <br/>
                                       <Dropdown 
                                              value={this.state.activite} 
                                              options={activities} 
                                              onChange={this.onActivityChange} 
                                              placeholder="Conseil en systèmes et logiciels informatiques" 
                                              optionLabel="name"
                                              style={{ width:'100%', textAlign:'left'}}/>
                                       
                                        <a href="#" onClick={this.pageAcc} style={{fontSize:'12px',position:"relative", top:'5%'}} >retour a la page d'accueil.</a>
                                        <br/>
                                        <Button 
                                             onClick={this.onSubmit}
                                             label="S'inscrire" 
                                             style={{ fontSize:'16px',width: "50%",  position:"relative", left:'50%', top:'15%' }}
                                       />

                                       </div>
                                       
                                 </div> 
                                    
                                 </div>  

                </div>
                )
        }

}

export default Insc;