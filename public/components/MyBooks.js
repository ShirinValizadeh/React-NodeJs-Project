import React, { useEffect, useState ,useRef} from 'react'
import { Link } from "react-router-dom"
import { MyBooksPost } from '../services/api'
import ConfirmModal from './ConfirmModal'
const MyBooks = () => {

    const intialState = {
        booksElement: null,
        confirmModalShow:false,
        dltTitle:'',
        errorElement:'',
        confirmModalPayLoad:null
    }
    const [state, setState] = useState(intialState)

    useEffect(() => {
        MyBooksPost().then(data => {
            console.log(data);
            if (data != 2) {
                //save arry of data
                const booksElement = data.map(book => {
                    return (
                        <div key={book._id} className="col-md-3" >
                            <div className="item">
                                <img className="bookimage" src={book.imgs[0]} alt="img" />
                                <h3><Link to={"/admin/mybooks/" + book._id}>{book.title}</Link></h3>
                                <h6><Link to={"/admin/mybooks/" + book._id}><button className='btn'>Edit</button> </Link>&nbsp;&nbsp;&nbsp;
                            <button className="btn" to="#" onClick={()=>{btnDlt(book._id)} }>Delete</button></h6>
                            </div>
                        </div>
                    )
                })
                setState({
                    ...state,
                    booksElement
                })
            }

        }).catch(err => {
            console.log(err);
        })
    }, [])



    const closeConfirmModal = () => {
        setState({ 
            ...state,
            confirmModalShow:false
        })
      }


    const btnDlt = (bookId)=>{
        setState({
            ...state ,
            confirmModalShow :true,
            dltTitle:'Confirm Delete',
            errorElement:<p>do you want Delete? this book gonna be deleted forever.</p>,
            confirmModalPayLoad:bookId

        })
    }

const deleteConfirm = (bookId)=>{
    console.log(bookId);
}


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
                            {state.booksElement}
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