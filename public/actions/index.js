
// user is null  >  change user (it will be change wenn user is login)  

export const setUserAction =(user)=>{
        return{
            type: 'CHAMGE_USER' , 
            payload:user
        }
}