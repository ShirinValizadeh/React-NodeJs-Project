import React from 'react'
import {Link} from 'react-router-dom'
import {useLocation , useHistory} from 'react-router-dom'


const Admin =(props)=>{
    const location =useLocation()
    const history = useHistory()
console.log(history);
console.log(location);
console.log(props);
    return(
        <section className="slider">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>Welcome {props.location.state}</h2>
                    <Link to="/admin/addbook">Add Book</Link>
                    <br></br>
                    <Link to="/admin/mybooks">My Books</Link>
                    <br></br>
                    <Link to="/admin/logout">Logout</Link>
                </div>
            </div>
        </div>
    </section>
    )
}


export default Admin