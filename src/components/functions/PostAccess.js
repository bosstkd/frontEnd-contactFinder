
export function PostAccess(userData){
    return new Promise((resolve, reject)=>{

          fetch('/api/authenticate',{
           method:'POST',
           headers: {
               'Accept':'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(userData)
       }).then((response)=> response.json())
       .then((responseJson)=>{
           resolve(responseJson);
       })
.catch((error)=>{
   // console.log(error);
      reject(error);
})
    })
}
