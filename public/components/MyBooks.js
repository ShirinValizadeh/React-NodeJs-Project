import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from "react-router-dom"
import { MyBooksPost, deletBooksPost } from '../services/api'
import ConfirmModal from './ConfirmModal'




const MyBooks = () => {

    const history = useHistory()


    const intialState = {
        books: [],
        confirmModalShow: false,
        dltTitle: '',
        errorElement: '',
        confirmModalPayLoad: null
    }
    const [state, setState] = useState(intialState)

    useEffect(() => {
        MyBooksPost().then(data => {
            console.log(data);
            switch (data) {
                case 10:
                    history.push('/login')
                    break;
                case 2:
                    console.log('server error');
                    break;
                default:
                    setState({
                        ...state,
                        books: data
                    })
                    break;
            }

        }).catch(err => {
            console.log(err);
        })
    }, [])


    // close modal with click an cansel
    const closeConfirmModal = () => {
        setState({
            ...state,
            confirmModalShow: false
        })
    }

    // button function to show samething in modal
    const btnDlt = (bookId) => {
        setState({
            ...state,
            confirmModalShow: true,
            dltTitle: 'Confirm Delete',
            errorElement: <p>do you want Delete? this book gonna be deleted forever.</p>,
            confirmModalPayLoad: bookId

        })
    }

    //! with clicking an  (delete )btn inside modal book will be completlly deleted
    const deleteConfirm = (bookid) => {
        // console.log(bookId);
        deletBooksPost(bookid).then(data => {
            switch (data) {
                case 10:
                    history.push('/login')
                    break;
                case 2:
                    console.log('server error');
                    break;
                default:
                    const newBooks = [...state.books]
                    newBooks.splice(newBooks.indexOf(newBooks.find(element => element._id === bookid)), 1)
                    setState({
                        ...state,
                        books: newBooks,
                        confirmModalShow: false
                    })
                    break;
            }

        })
    }
    //save arry of data
    const booksElement = state.books.map(book => {
        return (
            <div key={book._id} className="col-md-3" >
                <div className="item">
                    <img className="bookimage" src={book.imgs[0]} alt="img" />
                    <h3><Link to={"/admin/mybooks/" + book._id}>{book.title}</Link></h3>
                    <h6><Link to={"/admin/mybook/" + book._id}><button className='btn'>Edit</button> </Link>&nbsp;&nbsp;&nbsp;
                    <button className="btn" to="#" onClick={() => { btnDlt(book._id) }}>Delete</button></h6>
                </div>
            </div>
        )
    })

    return (
        <React.Fragment>


            <ConfirmModal
                show={state.confirmModalShow}
                close={closeConfirmModal}
                className='bg-danger'
                payload={state.confirmModalPayLoad}
                onConfirm={deleteConfirm}
                title={state.dltTitle}>
                {state.errorElement}
            </ConfirmModal>



            <div className="breadcrumb">
                <div className="container">
                    <Link className="breadcrumb-item" to="/admin">Daschbord</Link>
                    <span className="breadcrumb-item active">My Books</span>
                </div>
            </div>
            <section className="static about-sec">
                <div className="container">

                    <h2>My books</h2>
                    <div className="recent-book-sec">
                        <div className="row">
                            {booksElement}
                        </div>
                        <div className="btn-sec">
                            <button className="btn gray-btn">load More books</button>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}






export default MyBooks