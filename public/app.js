import React from "react"
import ReactDom from "react-dom"
import {Provider} from "react-redux"
import {createStore} from 'redux'

import Router from "./components/Router"
import reducer from  "./reducers"  //main store

class App extends React.Component{
    render (){
        return(
            <Router>
                <div>
                   
                </div>
            </Router>
          
        )
    }
}


ReactDom.render( 
<Provider store={createStore(reducer)}>
    <App />
    </Provider>   ,
     document.querySelector('#root'))

 