import React, { useEffect, useState, useRef } from "react"
import { useParams, Link, useHistory } from 'react-router-dom'
import { getBookPost, editBooksPost } from '../services/api'
import PopUpModal from './PopUpModal'

const MyBook = () => {

    const history = useHistory()
    const params = useParams()
    const initioalState = {
        book: null,
        newImgFile: [],
        newPdfFile: null,
        showModal: false,
        modalClass: '',
        modalElement: null,
        modalTitle: ''
    }
    const [state, setState] = useState(initioalState)
    const pdfSpanRef = useRef()
    const pdfInpRef = useRef()
    const imgInpRef = useRef()


    useEffect(() => {
        //call func from api here to get all data using params
        getBookPost(params.id).then(data => {
           // console.log(data);
            switch (data) {
                case 2:
                    console.log('server Error');
                    break;
                case 10:
                    history.push('./login');
                    break;
                default:
                    setState({
                        ...state,
                        book: data,
                        // newBookTitle:data.title
                    })
                    break;
            }
        })
    }, [])


    //====== delete imge from DOM=========
    const deletImgClick = (image, e) => {
        e.preventDefault()
        const newBook = { ...state.book }
        // use splice to delete
        newBook.imgs.splice(newBook.imgs.indexOf(image), 1)
        setState({
            ...state,
            book: newBook

        })
    }

    //============ dlt pdf =====
    const pdfDltClick = e => {
        e.preventDefault()
        pdfSpanRef.current.remove()
        pdfInpRef.current.disabled = false
        //dlt pdf from state
        const newBook = { ...state.book }
        newBook.pdfUrl = ''
        setState({
            ...state,
            book: newBook
        })
    }

    //=================title===========
    const titleInpChane = (e) => {
        e.preventDefault()
        const newBook = { ...state.book }
        newBook.title = e.target.value
        setState({
            ...state,
            book: newBook
        })
    }
    //=============description=========
    const descriptionInpChange = (e) => {
        e.preventDefault()
        const newBook = { ...state.book }
        newBook.description = e.target.value
        setState({
            ...state,
            book: newBook
        })
    }


    //===========save changes BTN=======
    const saveBtnClick = (e) => {
        e.preventDefault()
        let titleErrorElement = null
        if (state.book.title === '') {
            titleErrorElement = <li>Book Title should not be empty</li>
        }
        let imgsErrorElement = null
        if (state.book.imgs.length === 0 && state.newImgFile.length === 0) {
            imgsErrorElement = <li>you need to select img</li>
        }
        let pdfErrorElement = null
        if (state.newPdfFile === null && state.book.pdfUrl === '') {
            pdfErrorElement = <li>you need to upload new pdf</li>
        }
        let descriptionErrorElement = null
        if (state.book.description === '') {
            descriptionErrorElement = <li>you need to write Description</li>
        }

        if (titleErrorElement === null && imgsErrorElement === null && pdfErrorElement === null && descriptionErrorElement === null) {
            //all thing are gut we need save data to server side
            editBooksPost(state.book.title, state.book.description, state.book.imgs, state.newImgFile, state.newPdfFile, params.id).then(data => {
                switch (data) {

                    case 100:
                        setState({
                            ...state,
                            showModal: true,
                            modalClass: 'bd-danger',
                            modalTitle: 'Updated faild',
                            modalElement: <p>you can not haking my web side</p>
                        })
                        break;
                        case 100:
                            setState({
                                ...state,
                                showModal: true,
                                modalClass: 'bd-danger',
                                modalTitle: 'Updated faild',
                                modalElement: <p>the book is not Updated pls contact the admin</p>
                            })
                            break;
                    case 10:
                        history.push('/login')
                        break;
                    default:
                        imgInpRef.current.value = ''
                        pdfInpRef.current.value = ''
                        setState({
                            ...state,
                            book:data,
                            showModal: true,
                            modalClass: 'bg-success',
                            modalTitle: 'Updated successfully',
                            modalElement: <p>the book is Updated</p>
                        })
                        break;
                }
            }).catch(err => {
              //  console.log(err);
            })
        } else {
            const errElement = (
                <ul>
                    {titleErrorElement}
                    {imgsErrorElement}
                    {pdfErrorElement}
                    {descriptionErrorElement}
                </ul>
            )
            setState({
                ...state,
                showModal: true,
                modalClass: 'bg-danger',
                modalTitle: 'Entries Error',
                modalElement: errElement,
            })
        }

    }

    const closeModal = () => {
        setState({ ...state, showModal: false })
    }


    if (state.book) {

        // imgs will be reapeted 
        const imgesElement = state.book.imgs.map((image, idx) => {
            return (
                <div key={idx} className="col-md-3">
                    {/*img schould be deleted from dom and state */}
                    <a href="#" className="deleteImg" onClick={e => { deletImgClick(image, e) }}>X</a>
                    <img className="bookimg" src={image} alt="" />
                </div>
            )
        })




        return (
            <React.Fragment>

                <PopUpModal
                    show={state.showModal}
                    closeToggle={closeModal}
                    className={state.modalClass}
                    title={state.modalTitle}>
                    {state.modalElement}
                </PopUpModal>



                <div className="breadcrumb">
                    <div className="container">
                        <Link className="breadcrumb-item" to="/admin/mybooks">Daschbord</Link>
                        <span className="breadcrumb-item active">{state.book.title}</span>
                    </div>
                </div>
                <section className="static about-sec">
                    <div className="container">
                        <h1>My Account / Edit Book</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry's printer took a galley of type and scrambled it to make a type specimen book. It has survived
                not only fiveLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem </p>
                        <div className="form">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="bookTitleInp">Book Title</label>
                                    <input type="text" className="form-control" id="bookTitleInp" placeholder="Book Title"
                                        value={state.book.title}
                                        onChange={titleInpChane}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1">Book Images</label>

                                    <div className="row">
                                        {imgesElement}
                                    </div>

                                    <input type="file" className="form-control-file"
                                    ref={imgInpRef}
                                        multiple
                                        onChange={e => { setState({ ...state, newImgFile: e.target.files }) }}
                                        id="bookImgsInp"
                                        accept="image/x-png,image/gif,image/jpeg" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1">Book PDF</label>
                                    <span ref={pdfSpanRef} className="badge badge-default">{state.book.pdfUrl.substr(state.book.pdfUrl.lastIndexOf('/') + 1)}
                                        <a href="#" id="deletePdf" onClick={e => { pdfDltClick(e) }}>X</a></span>

                                    <input ref={pdfInpRef} type="file" className="form-control-file" id="bookPdfInp"
                                        onChange={e => { setState({ ...state, newPdfFile: e.target.files[0] }) }}
                                        accept="application/pdf" disabled />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="bookDescriptionInp">Book Description</label>
                                    <textarea className="form-control" id="bookDescriptionInp" value={state.book.description} onChange={descriptionInpChange}></textarea>
                                </div>
                                <button className="btn btn-success mt-3" id="bookSaveBtn" onClick={saveBtnClick}>save</button>
                            </form>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )

    } else {
        return (
            <div>Loading ...</div>
        )

    }

}



export default MyBook