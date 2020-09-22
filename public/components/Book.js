import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getBookPost } from '../services/api'

const Book = () => {
    //get 
    const params = useParams()
    console.log(params);

    useEffect(() => {
        getBookPost(params.id).then(data => {
            console.log(data);
        }).catch(err => {

        })
    })

    return (
        <div>book</div>
    )
}

export default Book