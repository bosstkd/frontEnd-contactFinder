import React from 'react';
import {Button} from 'primereact/button';


class Activatedn extends React.Component{

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
                       <p style={{fontSize:"28px"}}><strong>votre compte est déjà activé.</strong></p> 
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

export default Activatedn;