import React from "react"
import {Link} from "react-router-dom"
import PopUpModal from './PopUpModal'
import validator from "validator"
import {registerPost} from "../services/api"
class Register extends React.Component {

  state = {
    email: '',
    password: '',
    repassword: '',
    errorComponent: null,
    showErrorModal: false,
    resultElement : null
  }

  onRegisterBtnClick = (e) => {
    //console.log(this.state);
    e.preventDefault()
    if (this.state.email.trim() === '' || this.state.password === '' || this.state.password !== this.state.repassword.trim() || !validator.isEmail(this.state.email.trim())) {
      const errorsElement = (

        <ul>
          {this
            .state
            .email
            .trim() === ''
            ? <li>Email should not be empty</li>
            : null}
          {!validator.isEmail(this.state.email.trim())
            ? <li>you have to enter a valid email</li>
            : null}

          {this.state.password === ''
            ? <li>Password should not be empty</li>
            : null}
          {this.state.password !== this
            .state
            .repassword
            .trim()
            ? <li>Repassword is not matching the password</li>
            : null}

        </ul>
      )
      this.setState({errorComponent: errorsElement, showErrorModal: true})
    } else {
      //********do registraion1 *************** */
      registerPost(this.state.email, this.state.password, this.state.repassword).then(data => {
           //*******show allert for registraion 1******* */ 
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
          this.setState({
            resultElement :badg
          })
      }).catch(err => {
        console.log(err);
        const badg = (
          <div className="alert alert-danger" role="alert">
          'registration was not succesfully'
        </div>
        )
          this.setState({
            resultElement :badg
          })
      })
    }

  }
//******* */
  closeModal = () => {
    this.setState({showErrorModal: false})
  }

  render() {

    const {email, password, repassword, showErrorModal} = this.state
    const {onRegisterBtnClick, closeModal} = this

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
            <span className="breadcrumb-item active">Register</span>
          </div>
        </div>
        <section className="static about-sec">
          <div className="container">
            <h1>My Account / REgister</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's printer took a galley of type and scrambled
              it to make a type specimen book. It has survived not only fiveLorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
            </p>
            <div className="form">
              <form>
                <div className="row">
                <div className='col-lg-12 col-md-12'>
                  {/* 1 */}
                {this.state.resultElement}
                  </div>
                  <div className="col-md-4">
                    <input
                      value={email}
                      onChange={(e) => {
                      this.setState({email: e.target.value})
                    }}
                      type="email"
                      placeholder="Enter User Name"
                      required/>
                    <span className="required-star">*</span>
                  </div>
                  <div className="col-md-4">
                    <input
                      value={password}
                      onChange={(e) => {
                      this.setState({password: e.target.value})
                    }}
                      type="password"
                      placeholder="Password"
                      required/>
                    <span className="required-star">*</span>
                  </div>
                  <div className="col-md-4">
                    <input
                      value={repassword}
                      onChange={(e) => {
                      this.setState({repassword: e.target.value})
                    }}
                      type="password"
                      placeholder="Repeat Password"
                      required/>
                    <span className="required-star">*</span>
                  </div>

              

                  <div className="col-lg-8 col-md-12">
                    <button onClick={onRegisterBtnClick} className="btn black">Register</button>
                    <h5>not Registered?
                      <Link to="/login">Login here</Link>
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
}

export default Register