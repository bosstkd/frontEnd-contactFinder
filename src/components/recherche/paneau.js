import React from 'react';


export default function Paneau(props){
    return(
        <div className="column" key={props.mail} style={{ padding: '.5em' }} >
                                                              
        <div style={{ textAlign: 'left', border: '1px solid white', backgroundColor:'#f5f5ef' ,borderRadius: '5px', boxShadow: '5px 0px 5px #ffd1b3' }}>
          <div className="item5"><a target="_blank" rel="noopener noreferrer" href={props.url} style={{fontSize:'19px', position:'relative',left:'10px'}}>{props.titre.toString("utf8")}</a></div>
            <div className="grid-container">
                <div className="item2" style={{textAlign:"center"}}>
                  <img src={props.urlImg} alt="noImg" style={{width:'50px', height:'50px', fontSize:5, textAlign:'left', position:'relative',left:'10px'}}/>
                </div>
                <div className="item3">
                  <label style={{fontSize:19, color:'green', position:'relative',left:'10px'}}>{props.mail}</label>
                  <br/>
                  <label style={{fontSize:14, position:'relative',left:'10px'}}>{props.paragraph.toString("utf8")}</label>
                </div>  
              <div className="item5"><a target="_blank" rel="noopener noreferrer" href={props.url} style={{fontSize:'15px', color:'#e68a00', position:'relative',left:'10px'}}>{props.url}</a></div>
            </div>
        </div>
      
      </div>
    )
}
