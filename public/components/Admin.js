import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"

const Admin =(props)=>{
    // const location =useLocation()
    // const history = useHistory()
//console.log(history);
//console.log(location);
//console.log(props);
    return(
        <section className="slider">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>Welcome {props.user}</h2>
                    <Link to="/admin/addbook">Add Book</Link>
                    <br></br>
                    <Link to="/admin/mybooks">My Books</Link>
                    <br></br>
                </div>
            </div>
        </div>
    </section>
    )
}

//to take props using redux
const mapStateToProps = (state) =>{
    return({user:state.user})
}

export default connect(mapStateToProps)(Admin) 