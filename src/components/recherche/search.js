import React from 'react';
import Entete from './entete';
import Paneau from './paneau';
import {Button} from 'primereact/button';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Dialog} from 'primereact/dialog';
import {Password} from 'primereact/password';
import {InputText} from 'primereact/inputtext';
import logo from '../../img/logo.jpg';
import axios from 'axios'
import {Growl} from 'primereact/growl';



class Search extends React.Component{

        constructor(){
                super()
                this.state={
                        mail:"",
                        hits:[],
                        nbpage:1,
                        selectedPage:1,
                        requete:"",
                        first: 0, 
                        rows: 10, 
                        tosend:"",
                        isLoading:false,
                        visible:false,
                        ansPsw:"",
                        nvPsw:""
                }

                this.tMail = [];
                this.handelClick = this.handelClick.bind(this);
                this.handleClicks= this.handleClicks.bind(this);
                this.downFile    = this.downFile.bind(this);
                this.disconnect  = this.disconnect.bind(this);
                this.handelChange= this.handelChange.bind(this);
                this.handelClic  = this.handelClic.bind(this);
                this.showMessage = this.showMessage.bind(this);
            }


        componentDidMount(){

                this.setState({
                               mail:sessionStorage.getItem('userName')
                              });
                var strToken =  sessionStorage.getItem('strToken');
                
                let str = 'Bearer '+strToken;
              //  console.log(str);

              if(strToken===''){
                window.open('/',"_self");
              }else{
                 const options = {
                        headers: {
                          'Authorization': str
                        },
                      }
        
                    
               fetch("/api/search/"+this.state.mail, options )
               .then(response => response.json())
               .then(data => this.setState({ hits: data }))
               .catch(
                error=>{
                    console.log(error);
                    window.open('/',"_self")
                }
               );
              }
        
                 
  
            }
//------------------------


          handelClic(){
                var strToken =  sessionStorage.getItem('strToken');
                console.log(strToken);

                let msg={
                  titre:"",
                  text: ""
              }


                if(strToken===''){
                 // window.open('/',"_self");
                }else{
                  let str = 'Bearer '+strToken;
                  const options = {
                    headers: {
                      'Authorization': str
                    },
                  }

                  let myRequest={
                                id : sessionStorage.getItem('userName'),
                                ansPsw : this.state.ansPsw,
                                nvPsw : this.state.nvPsw
                                } 
                            

                                axios.post("/api/password", myRequest, options)
                                .then(response =>{                      
                                   if(response.data.id === myRequest.id){
                                                     msg.titre = "Information";
                                                     msg.text = "Mot de passe modifier pour "+myRequest.id;
                                                     console.log("Effectuer");
                                                     this.showMessage(msg, 0);
                                   }else{
                                                     msg.titre = "Attention";
                                                     msg.text = response.data;
                                                     console.log(response.data);
                                                     this.showMessage(msg, 1);
                                   }
                                }).catch(error=>{
                                   console.log(error);
                                         msg.titre = "Erreur";
                                         msg.text = error;
                                         console.log(error);
                                         
                                         this.showMessage(msg, 2);
                                })          
                      }

              
            }



            handelClick(){
                var strToken =  sessionStorage.getItem('strToken');
                if(strToken===''){
                  window.open('/',"_self");
                }else{
                   let str = 'Bearer '+strToken;
                   this.setState({isLoading:true,})
                      const options = {
                            headers: {
                              'Authorization': str
                            },
                          }
                  let ipGetter = "127.0.0.1";
                  try{
                    fetch('https://jsonip.com/', {mode: 'cors'})
                          .then(response => response.json())
                          .then((text)=> {
                            ipGetter = text.ip;
                          })
                          .catch(function(error) {
                              console.log('Request failed', error)
                          });
                  }catch{
                    console.log('Erreur IP');
                   }

                  let myRequest={
                                  id : sessionStorage.getItem('userName'),
                                  requete : this.state.requete,
                                  ipAdresse : ipGetter
                  }           

               fetch("/api/search/"+myRequest.id+"/"+myRequest.ipAdresse+"/"+myRequest.requete+"/1", options)
                .then(response => response.json())
                .then(data => this.setState({ 
                                              nbpage: data.nbPage,
                                              isLoading:false, 
                                              hits: data.listTc,
                                              selectedPage:1,
                                              tosend:"/api/search/"+myRequest.id+"/"+myRequest.ipAdresse+"/"+myRequest.requete+"/"
                                            })).catch(error=>
                                                                                  {
                                                                                      console.log(error);
                                                                                      window.open('/',"_self")
                                                                                  }
                                                                          );
                }

               
                                                                        
            }


            handelChange(event){
                const {name, value}=event.target;
                     this.setState({
                         [name] : value
                     })
             }


            handleClicks = (e, dat) => {

              e.preventDefault();
              this.setState({
                isLoading:true,
             });

             var strToken =  sessionStorage.getItem('strToken');


             if(strToken===''){
              window.open('/',"_self");
            }else{
                  let str = 'Bearer '+strToken;            
                   this.setState({
                       isLoading:true,
                    })

                      const options = {
                            headers: {
                              'Authorization': str
                            },
                          }

             fetch(this.state.tosend+dat, options)
             .then(response =>response.json())
             .then(data => this.setState({ 
                                           nbpage: data.nbPage,
                                           isLoading:false, 
                                           hits: data.listTc,
                                           selectedPage:dat
                                         })).catch(error=>
                                                                               {
                                                                                   console.log(error);
                                                                                   window.open('/',"_self")
                                                                               }
                                                                       );

              console.log(dat);
            }

                
            };

//-----------------------

downFile = (e, linkFile)=>{
  var lk = linkFile;
  lk = lk.replace("search","download");
  var strToken =  sessionStorage.getItem('strToken');

  if(strToken===''){
    window.open('/',"_self");
  }else{
    let str = 'Bearer '+strToken;
                      const options = {
                            headers: {
                              'Authorization': str
                            },
                          }

                      fetch(lk, options)
                      .then(response => {
                        console.log(response);
                        
                      //  const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
                        response.blob().then(blob => {
                          let url = window.URL.createObjectURL(blob);
                          let a = document.createElement('a');
                          a.href = url;
                          a.download = this.state.requete+".txt";
                          a.click();
                      });
                   });
  }

                
}

disconnect(){
  sessionStorage.setItem('strToken','');
  window.open('/',"_self");
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



//-----------------------------------






        render(){


          try{
                this.state.hits.map(hit=>this.tMail=hit.mail);


                 let listPage = [];
                 

                if(this.state.nbpage<=5) {
                  for(let x = 1; x<=this.state.nbpage; x++){
                     listPage[x-1]=x;
                  }
                }else{

                  if(this.state.selectedPage+4<this.state.nbpage){

                      if(this.state.selectedPage > 2){
                        for(let x = this.state.selectedPage-2; x<=this.state.selectedPage+2; x++){
                          listPage[x-1]=x;
                        }
                      }else{
                        for(let x = 1; x<=this.state.selectedPage+4; x++){
                              listPage[x-1]=x;
                          }
                      }
 
                  }else{
                   
                    for(let x = this.state.selectedPage-2; x<=this.state.nbpage; x++){
                      listPage[x-1]=x;
                     }
                  }

                }
                
               // class="active"
                const lsPg = listPage.map(ss=><div>
                                                  <a  href="#" className={ss===this.state.selectedPage?"active":''} onClick={((e)=>this.handleClicks(e, ss))} >{ss}</a>
                                              </div>)

               let longueur =  this.state.hits.length;                          
               
              const getResults = this.state.isLoading ? <div>
                                                            <ProgressSpinner style={{ width:'100px', height:'100px', position:"relative", top:'200px'}} animationDuration=".5s"/>
                                                        </div> 
                                                      : 
                                                      <div>
                                                        <div className="row" style={{ width:'82%', position:"relative", left:'15%', top:'100px'}}>
                                                                  {this.state.hits.map(hit =>
                                                                                             <Paneau mail={hit.mail} url={hit.url} titre={hit.titre} urlImg={hit.urlImg} paragraph={hit.paragraph} />
                                                                                       )}  
                                                        </div>
                                                        <div className="pagination">
                                                                    <a href="#" onClick={((e)=>this.handleClicks(e, 1))}>&laquo;</a>
                                                                                    {lsPg}
                                                                    <a href="#" onClick={((e)=>this.handleClicks(e, this.state.nbpage))}>&raquo;</a>
                                                        </div> 
                                                        <Button icon="pi pi-cloud-download" onClick={((e)=>this.downFile(e, this.state.tosend))} 
                                                            style={{position:"fixed", top:"15%", left:"96%", fontSize:"16px"}} 
                                                            className="p-button-success" title="téléchargement"
                                                         />   
                            
                                                        
                                                          <Dialog header="Changement du mot de passe" visible={this.state.visible} style={{width: '30vw', position:'absolute', top:'100px'}} modal={true} onHide={() => this.setState({visible: false})}>
                                                          <Growl ref={(el) => this.growl = el}></Growl>
                                                          <div style={{ border: '1px solid green', borderRadius:'1px', width: '100%', height: 275 , position:"absolute", left:'0%', top:'0%', backgroundColor:'white' }}>
                                                              <header style={{ height:'18%',  textAlign:'center'}}><img src={logo} alt="logo" style={{width:'33%', height:'100%'}}/></header>
                                                                    <div style={{fontSize: 16, textAlign: 'left', width: "77%", height: 200 , position:"relative", left:'12%', top:'4%' }}>
                                                                    <span className="p-float-label" >
                                                                    
                                                                        <InputText 
                                                                                id="float-input" 
                                                                                type="password" 

                                                                                name="ansPsw"
                                                                                value={this.state.ansPsw} 
                                                                                onChange={this.handelChange} 
                                                                                style={{ width:'100%' }}
                                                                        />
                                                                        <label htmlFor="float-input" >Mot de passe actuel</label>
                                                                    </span>
                                                                    <br/>
                                                                    <span className="p-float-label" >
                                                                    
                                                                        <Password 
                                                                                name="nvPsw"
                                                                                id="psw-input" 
                                                                                value={this.state.nvPsw} 
                                                                                onChange={this.handelChange} 
                                                                                style={{ width:'100%' }}
                                                                        />
                                                                        <label htmlFor="psw-input">Nouveau mot de passe</label>
                                                                    </span>

                                                                    
                                                                    <Button 
                                                                          onClick={this.handelClic}
                                                                          label="Modifier" 
                                                                          style={{ fontSize:'16px',width: "45%",  position:"relative", left:'55%', top:'15%' }}
                                                                    />
                                                                    </div>

                                                              </div> 
                                                            
                                                          </Dialog>


                                                          <Button 
                                                              style={{position:"fixed", top:"22%", left:"96%", fontSize:"16px"}} 
                                                              icon="pi pi-info-circle" 
                                                              onClick={(e) => this.setState({visible: true})} 
                                                              title="Changer mon mot de passe"
                                                          />
                                                        


                                                      </div>
                                                          
            
          if(longueur > 0)  
             return(
                  <div>
                      {getResults}
                      
                      <Entete disconnect={this.disconnect} requete={this.state.requete} handelClick={this.handelClick} handelChange={this.handelChange}/> 
                  </div>
                )                          
            else{
              return(
                      <div>
                        <Entete disconnect={this.disconnect} requete={this.state.requete} handelClick={this.handelClick} handelChange={this.handelChange}/>
                        <div >
                            <p style={{width:'100%', height:"50%",position:'relative', left:'0%', top:150, fontSize:'500%'}}>
                                    Auncun résultats
                            </p>
                            <Dialog header="Changement du mot de passe" visible={this.state.visible} style={{width: '30vw', position:'absolute', top:'100px'}} modal={true} onHide={() => this.setState({visible: false})}>
          <Growl ref={(el) => this.growl = el}></Growl>
          <div style={{ border: '1px solid green', borderRadius:'1px', width: '100%', height: 275 , position:"absolute", left:'0%', top:'0%', backgroundColor:'white' }}>
              <header style={{ height:'18%',  textAlign:'center'}}><img src={logo} alt="logo" style={{width:'33%', height:'100%'}}/></header>
                    <div style={{fontSize: 16, textAlign: 'left', width: "77%", height: 200 , position:"relative", left:'12%', top:'4%' }}>
                    <span className="p-float-label" >
                    
                        <InputText 
                                id="float-input" 
                                type="password" 

                                name="ansPsw"
                                value={this.state.ansPsw} 
                                onChange={this.handelChange} 
                                style={{ width:'100%' }}
                        />
                        <label htmlFor="float-input" >Mot de passe actuel</label>
                    </span>
                    <br/>
                    <span className="p-float-label" >
                    
                        <Password 
                                name="nvPsw"
                                id="psw-input" 
                                value={this.state.nvPsw} 
                                onChange={this.handelChange} 
                                style={{ width:'100%' }}
                        />
                        <label htmlFor="psw-input">Nouveau mot de passe</label>
                    </span>

                    
                    <Button 
                          onClick={this.handelClic}
                          label="Modifier" 
                          style={{ fontSize:'16px',width: "45%",  position:"relative", left:'55%', top:'15%' }}
                    />
                    </div>

              </div> 
            
          </Dialog>
          <Button 
                                                              style={{position:"fixed", top:"15%", left:"96%", fontSize:"16px"}} 
                                                              icon="pi pi-info-circle" 
                                                              onClick={(e) => this.setState({visible: true})} 
                                                              title="Changer mon mot de passe"
                                                          />
                        </div> 
                      </div>
                    )
            }                    

            }catch{
                console.log("erreur sur hits");
            }               

//--------------------------------------------

          return(
                  <div>
                  <Entete disconnect={this.disconnect} requete={this.state.requete} handelClick={this.handelClick} handelChange={this.handelChange}/>
                    
                      {
                    this.state.isLoading ? <div>
                                              <ProgressSpinner style={{ width:'100px', height:'100px', position:"relative", top:'200px'}} animationDuration=".5s"/>
                                            </div> 
                        : <div > <p style={{width:'100%', height:"50%",position:'relative', left:'0%', top:150, fontSize:'500%'}}>
                                Zone des résultats
                            </p>
                            <Dialog header="Changement du mot de passe" visible={this.state.visible} style={{width: '30vw', position:'absolute', top:'100px'}} modal={true} onHide={() => this.setState({visible: false})}>
          <Growl ref={(el) => this.growl = el}></Growl>
          <div style={{ border: '1px solid green', borderRadius:'1px', width: '100%', height: 275 , position:"absolute", left:'0%', top:'0%', backgroundColor:'white' }}>
              <header style={{ height:'18%',  textAlign:'center'}}><img src={logo} alt="logo" style={{width:'33%', height:'100%'}}/></header>
                    <div style={{fontSize: 16, textAlign: 'left', width: "77%", height: 200 , position:"relative", left:'12%', top:'4%' }}>
                    <span className="p-float-label" >
                    
                        <InputText 
                                id="float-input" 
                                type="password" 

                                name="ansPsw"
                                value={this.state.ansPsw} 
                                onChange={this.handelChange} 
                                style={{ width:'100%' }}
                        />
                        <label htmlFor="float-input" >Mot de passe actuel</label>
                    </span>
                    <br/>
                    <span className="p-float-label" >
                    
                        <Password 
                                name="nvPsw"
                                id="psw-input" 
                                value={this.state.nvPsw} 
                                onChange={this.handelChange} 
                                style={{ width:'100%' }}
                        />
                        <label htmlFor="psw-input">Nouveau mot de passe</label>
                    </span>

                    
                    <Button 
                          onClick={this.handelClic}
                          label="Modifier" 
                          style={{ fontSize:'16px',width: "45%",  position:"relative", left:'55%', top:'15%' }}
                    />
                    </div>

              </div> 
            
          </Dialog>
          <Button 
                                                              style={{position:"fixed", top:"15%", left:"96%", fontSize:"16px"}} 
                                                              icon="pi pi-info-circle" 
                                                              onClick={(e) => this.setState({visible: true})} 
                                                              title="Changer mon mot de passe"
                                                          />
                          </div> 
                    }
                  </div>
                )
        }

}

export default Search;