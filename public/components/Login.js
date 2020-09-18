import React , {useState} from "react"
import {Link} from "react-router-dom"
import validator from "validator"




const Login = () => {

    const intioalState = {
        email: '',
        password : '',
        showErrorModal:false

    } 

    const [myState , setMyState] = useState(intioalState)

    onLoginBtnClick =(e)=>{
        e.preventDefault()
        if (myState.email || myState.password) {
            const errorsElement = (
                <ul>
                  {myState.email
                    .trim() === ''
                    ? <li>Email should not be empty</li>
                    : null}
                  {!validator.isEmail(myState.email.trim())
                    ? <li>you have to enter a valid email</li>
                    : null}
        
                  {myState.password === ''
                    ? <li>Password should not be empty</li>
                    : null}
                </ul>
              )
             setMyState({
            errorComponent: errorsElement,
             showErrorModal: true
        })
        }else{
            loginPost(myState.email , myState.password).then(data => {
                //*******show allert for login ******* */ 
             console.log(data);
             let badgClass = ''
             let badgMsg = ''
          
             switch (data) {
               case 1:
                 badgClass = "alert alert-success"
                 badgMsg= 'your register Succefully , you can login now'
                 break;
                 case 2:
                   case 4:
                   badgClass = "alert alert-danger"
                   badgMsg= 'server side Error'
                   break;
                   case 3:
                     badgClass = "alert alert-danger"
                     badgMsg= 'user exist'
                     break;
               default:
                 break;
             }
             const badg = (
               <div className={badgClass} role="alert">
               {badgMsg}
             </div>
             )
               setMyState({
                 resultElement :badg
               })
           }).catch()
        }
 
    }

    closeModal = () => {
        setMyState({showErrorModal: false})
      }
    
  return (
    <React.Fragment>

    <PopUpModal
          show={showErrorModal}
          closeToggle={closeModal}
          className='bg-danger'
          title='Entries Error'>
          {this.state.errorComponent}
        </PopUpModal>


      <div className="breadcrumb">
        <div className="container">
        <Link className="breadcrumb-item" to="/">Home</Link>
          <span className="breadcrumb-item active">Login</span>
        </div>
      </div>
      <section className="static about-sec">
        <div className="container">
          <h1>My Account / login</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only fiveLorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
          </p>
          <div className="form">
            <form>
              <div className="row">
                <div className="col-md-4">
                {this.state.resultElement}

                  <input value={myState.email} 
                  onChange={(e)=>{setMyState({...myState , email:e.target.value})}} 
                  type="email" placeholder="Enter User Name" required/>
                  <span className="required-star">*</span>
                </div>
                <div className="col-md-4">

                  <input value={myState.password}
                    onChange={(e)=>{setMyState({...myState , password:e.target.value})}}
                     type="password" placeholder="Password" required/>
                  <span className="required-star">*</span>
                </div>

                <div className="col-md-4">
                  <button onClick={onLoginBtnClick}  className="btn black">Login</button>
                  <h5>not Registered?
                  <Link to="/register">Register here</Link>

                  </h5>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Login