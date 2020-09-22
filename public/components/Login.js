import React, { useState } from "react"
import { Link ,useHistory} from "react-router-dom"

import PopUpModal from "./PopUpModal"
import { loginPost } from "../services/api"


const Login = () => {

const history = useHistory()

  const intioalState = {
    email: '',
    password: '',
    errorElement: null,
    entriesError: false,
    errorTitle: ''

  }

  const [myState, setMyState] = useState(intioalState)

  const onLoginBtnClick = (e) => {
    e.preventDefault()
    if (myState.email === '' || myState.password === '') {
      const errorElement = (
        <ul>
          {myState.email.trim() === '' ? <li>Email should not be empty</li> : null}
          {myState.password === '' ? <li>Password should not be empty</li> : null}

        </ul>
      )
      setMyState({
        ...myState,
        errorElement,
        entriesError: true,
        errorTitle: 'Entries Error'
      })
    } else {
      loginPost(myState.email, myState.password).then(data => {
        switch (data) {
          case 2:
            setMyState({ ...myState, entriesError: true, errorElement: <p>there was server error</p>, errorTitle: 'server Error' })
            break;
          case 3:
            setMyState({ ...myState, entriesError: true, errorElement: <p>password is wrong</p>, errorTitle: 'password error' })
            break;
          case 4:
            setMyState({ ...myState, entriesError: true, errorElement: <p>the email is not Exist</p>, errorTitle: 'user not exist' })
            break;
            case 1:
           //show admin panell
           history.push('/admin' , myState.email)
         // console.log('success');
                break;
          default:
            break;
        }
      }).catch(err => {

      })
    }

  }

  const closeModal = () => {
    setMyState({ ...myState, entriesError: false })
  }

  return (
    <React.Fragment>

      <PopUpModal
        show={myState.entriesError}
        closeToggle={closeModal}
        className='bg-danger'
        title={myState.errorTitle}>
        {myState.errorElement}
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


                  <input value={myState.email}
                    onChange={(e) => { setMyState({ ...myState, email: e.target.value }) }}
                    type="email" placeholder="Enter User Name" required />
                  <span className="required-star">*</span>
                </div>
                <div className="col-md-4">

                  <input value={myState.password}
                    onChange={(e) => { setMyState({ ...myState, password: e.target.value }) }}
                    type="password" placeholder="Password" required />
                  <span className="required-star">*</span>
                </div>

                <div className="col-md-4">
                  <button onClick={onLoginBtnClick} className="btn black">Login</button>
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