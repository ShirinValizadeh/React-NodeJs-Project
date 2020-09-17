import React from "react"
import {BrowserRouter , Route, Switch} from "react-router-dom"

import NavigationBar from "./NavigationBar"
import Home from "./Home"
import Page404 from "./Page404"
import Footer from "./Footer"
import Register from "./Register"
import Contact from "./Contact"
import Aboutus from "./Aboutus"


class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
            <div>

                {/* here Cann be navigation bar */}
                 {this.props.children}
                <NavigationBar />
                <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/contact" exact component={null} />
                <Route path="/aboutus" exact component={null} /> 
                <Route path="/register" exact component={Register} /> 
                <Route path="/"  component={Page404} />
                </Switch>
                {/* here Cann be footer */}
                <Footer />
            </div>
            </BrowserRouter> 
        )

    }
}


export default Router