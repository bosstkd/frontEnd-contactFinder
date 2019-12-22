import React from 'react';
import {Button} from 'primereact/button';


class Activated extends React.Component{

    constructor(){
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(){
        window.open('/',"_self")
    }


        render(){
            return(
                <div>
                       <p style={{fontSize:"28px"}}><strong>Félicitation votre compte est activé.</strong></p> 
                       <p>vous pouvez désormé accéder a votre compte en utilisant votre adresse mail et mot de passe</p>
                       <br/>
                       <Button 
                                             onClick={this.onSubmit}
                                             label="Clic ici pour accéder à votre compte" 
                                             className="p-button-success" 
                                             style={{ fontSize:'25px',width: "50%",  position:"relative", left:'0%', top:'10%' }}
                                       />  
                </div>
                )
        }

}

export default Activated;