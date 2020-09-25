//**************isAuthed  ******** */ 

import React ,{useEffect}from "react"
import {useHistory} from "react-router-dom"
import {checkLoginPost} from '../services/api'
import {setUserAction} from '../actions'
import {connect} from 'react-redux'

const CheckLogin = props =>{

    const history = useHistory()


useEffect(() => {
    // post to server  is this user login or not
    checkLoginPost().then(data=>{
        if (data === 10) {
            history.push('/login')
        }else{
            props.setUserAction(data)
        }
    }).catch(err =>{
        history.push('/login')

    })
}, [])

    return(
        props.children
    )
}



export default connect(null ,{setUserAction} )(CheckLogin) 