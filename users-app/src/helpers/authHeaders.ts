export const authheaders = ()=>{
    const data = localStorage.getItem('user');
    if(data){
        const user = JSON.parse(data)
        return { 'Authorization': 'Basic ' + user.auth };
    }else{
        return {}
    }
    
}