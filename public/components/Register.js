import React from "react"
import {Link} from "react-router-dom"

class Register extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="breadcrumb">
          <div className="container">
             <Link className="breadcrumb-item"  to="/home">Home</Link> 
    
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
                  <div className="col-md-4">
                    <input id="emailInp" type="email" placeholder="Enter User Name" required/>
                    <span className="required-star">*</span>
                  </div>
                  <div className="col-md-4">
                    <input id="passInp" type="password" placeholder="Password" required/>
                    <span className="required-star">*</span>
                  </div>
                  <div className="col-md-4">
                    <input id="repassInp" type="password" placeholder="Repeat Password" required/>
                    <span className="required-star">*</span>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <button id="registerBtn" className="btn black">Register</button>
                    <h5>not Registered?
                      <Link to="login.html">Login here</Link>
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