import React from 'react';
import {Password} from 'primereact/password';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';
import {PostAccess} from '../functions/PostAccess';
import logo from '../../img/logo.jpg';
import axios from 'axios'

class Login extends React.Component{

    constructor(){
        super();
        this.state={
            usrName:"",
            psw:""
          };

          this.onSubmit= this.onSubmit.bind(this);
          this.handelChange= this.handelChange.bind(this);
          this.showMessage= this.showMessage.bind(this);
          this.pageInsc=this.pageInsc.bind(this);
          this.pswForg =this.pswForg.bind(this); 
     }

    
    pageInsc(){
        window.open('/inscription',"_self")
    }

    pswForg(){
            let msg={
                     titre:"",
                     text: ""
                     }  

     let tSend = {
            id:"",
            password:"A1b2c3d4e5f6a123",
            activite:"to open",
            adresseIp:"127.0.0.1",
            redirect:false
          }

     tSend.id = this.state.usrName;
     if(tSend.id === ""){
               msg.titre = "Attention";
               msg.text = "Merci d'indiqué votre adresse mail svp !!";
               this.showMessage(msg, 1);
     }else{

            fetch('https://jsonip.com/', {mode: 'cors'})
            .then(response => response.json())
            .then((text)=> {
               tSend.adresseIp=text.ip;
            })
            .catch(function(error) {
               tSend.adresseIp="127.0.0.1";
               console.log('Request failed', error)
            });

            //  axios.post("http://contactfinderone.cfapps.io/password/mail/", tSend)
            axios.post("/api/activation/mail/", tSend)
            .then(response =>{                      
               if(response.data.id === tSend.id){
                                 msg.titre = "Information";
                                 msg.text = "Un mail de changement de mot de passe vous à été transfèré sur "+tSend.id;
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




    onSubmit(){

        let msg={
            titre:"",
            text: ""
        }
         
        let tSend = {
           username:"",
           password:"",
        }

        tSend.username = this.state.usrName;
        tSend.password= this.state.psw;
        console.log(tSend);
        PostAccess(tSend).then((result)=>{
           let responseJSON = result;
           console.log(responseJSON);
           if(responseJSON.token){

                  sessionStorage.setItem('userData', responseJSON);
                  sessionStorage.setItem('strToken', responseJSON.token);
                  sessionStorage.setItem('userName', tSend.username);
                  
                  console.log(responseJSON.token);
                  window.open('/recherche',"_self")

               }else if(responseJSON.empty === false){

                  msg.titre = "Attention";
                  msg.text = "Veuillez activer votre compte."
                  this.showMessage(msg, 1);
                  console.log("activation null");

               }else{

                  msg.titre = "Accés refuser.";
                  msg.text = "Veuillez vérifier le nom et le mot de passe svp !!"
                  this.showMessage(msg, 1);
                  console.log("login error");

               }
        
        })
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

        render(){
            return(
                <div>
                           <Growl ref={(el) => this.growl = el}></Growl>
                           <div>

                                 <div style={{ borderRadius:'5px', width: '50%', height: '80%' , position:"absolute", left:'0%', top:'15%' }}>
                                  <iframe width="120%" height="100%" src="https://app.powerbi.com/view?r=eyJrIjoiYjU5MDU4MGUtYjZhYS00ZWI0LWExYmEtNzY0MzA4NzlmMTc5IiwidCI6ImU2NTBjZDg1LTlmMTAtNGExNC1iMjBlLWFkMThkOWNkMzE5MiJ9" frameborder="0" allowFullScreen="true"></iframe>
                                 </div>

                                 < div style={{ border: '1px solid green', borderRadius:'1px', width: '33%', height: 425 , position:"absolute", left:'55%', top:'16%' }}>
                                 <header style={{ height:'18%',  textAlign:'center'}}><img src={logo} alt="logo" style={{width:'33%', height:'100%'}}/></header>
                                 <p style={{textAlign:'left', position:"relative", left:'12%', top:'0%', fontSize:'17px' }}><strong>Connexion</strong></p>
                                       <div style={{fontSize: 16, textAlign: 'left', width: "77%", height: 200 , position:"relative", left:'12%', top:'4%' }}>
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

                                       <a href="#" onClick={this.pageInsc} style={{fontSize:'12px' ,position:"relative", top:'0%'}} >Vous n'avez pas encore de compte ? Créez-en un !.</a>
                                        <br/>
                                       <a href="#" onClick={this.pswForg} style={{fontSize:'12px' ,position:"relative", top:'0%'}} >Mot de passe oublier !!</a>
                                        <br/>  
                                       <Button 
                                             onClick={this.onSubmit}
                                             label="Se connecter" 
                                             
                                             style={{ fontSize:'16px',width: "45%",  position:"relative", left:'55%', top:'15%' }}
                                       />
                                       </div>

                                 </div> 
                                 
                                 </div>  

                </div>
                )
        }

}

export default Login;