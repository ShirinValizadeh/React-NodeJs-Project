import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBookPost } from '../services/api'
import ImageGallery from 'react-image-gallery';


const Book = () => {
    //get 
    const params = useParams()
    console.log(params);
    // creat state
    const intialState = {
        book: null,
    }
    const [state, setState] = useState(intialState)


    useEffect(() => {
        getBookPost(params.id).then(data => {
            console.log(data);
            //update state to add data
            setState({ ...state, book: data })
        }).catch(err => {
            console.log(err);
        })
    }, [])
 
    if (state.book) {
        //!set imges for img-gallery it is a arry  und put it inside  <ImageGallery />
        const imgesSet = state.book.imgs.map(img=>{
            return({
                original:img,
                thumbnail:img
            })
        })

        return (
            <React.Fragment>
                <div className="breadcrumb">
                    <div className="container">
                        <Link className="breadcrumb-item" to="/">Home</Link>
                        <span className="breadcrumb-item active">{state.book.title}</span>
                    </div>
                </div>
                <section className="product-sec">
                    <div className="container">
                        <h1>{state.book.title}</h1>
                        <div className="row">
                            <div className="col-md-6 slider-sec">
                            <ImageGallery 
                            items={imgesSet} 
                            thumbnailPosition="right" 
                            showPlayButton={true} 
                            showFullscreenButton={true}/>  </div>

                            <div className="col-md-6 slider-content">
                                {state.book.description}

                                <div className="btn-sec">
                                    {state.book.pdfUrl  ? <a href={state.book.pdfUrl} target="_blank" className="btn btn-success">download</a> :<Link to="/login" className="btn btn-success">Login for Download</Link>}
                                        
                                        


                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }else{
        return(
            <div>Loading ...</div>
        )
    }

}

export default Book