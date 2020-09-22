import React, { useState, useRef } from 'react'
import {Link , useHistory} from 'react-router-dom'
import PopUpModal from "./PopUpModal"
import {addBookPost} from '../services/api'


const AddBook = () => {

const history = useHistory()

  const intialState = {
    bookTitle: '',
    bookDescription: '',
    modalElement: null,
    showModal: false,
    modalTitle:'',
    modalClassColor : 'bg-danger'
  }
  const [state, setState] = useState(intialState)

  // to access files (insted of using id)
  const pdfFileInpRef = useRef()
  const imgFileInpRef = useRef()

  //btn func
  const bookSaveBtnClick = (e) => {
    e.preventDefault()
    //check validation 
    if (state.bookTitle.trim() === '' ||
      state.bookDescription.trim() === '' ||
      pdfFileInpRef.current.files.length === 0 ||
      imgFileInpRef.current.files.length === 0) {
      //all error elements
      const errorElement = (
        <ul>
          {state.bookTitle.trim() === '' ? <li>pleas enter bookTitle</li> : null}
          {state.bookDescription.trim() === '' ? <li>pleas enter bookDescription</li> : null}
          {pdfFileInpRef.current.files.length === 0 ? <li>pleas upload the book pdf file</li> : null}
          {imgFileInpRef.current.files.length === 0 ? <li>pleas upload at least one img </li> : null}
        </ul>
      )
      // save error in setstate
      setState({...state ,
        modalElement : errorElement,
        showModal:true,
        modalTitle:'Error'
      })
    }else{
      addBookPost(state.bookTitle , state.bookDescription ,pdfFileInpRef.current.files[0] , imgFileInpRef.current.files).then(data=>{
        switch (data) {
          case 1:
            setState({...state ,
              modalElement : <p>the book save successfully</p>,
              showModal:true,
              modalTitle:'Success',
              modalClassColor:'bg-success'
            })
            break;
            case 2:
              setState({...state ,
                modalElement : <p>some Entries not right</p>,
                showModal:true,
                modalTitle:'Error',
                 modalClassColor :'bg-danger'

              })
              break;
              case 3:
                setState({...state ,
                  modalElement : <p>bookTitle is already exist</p>,
                  showModal:true,
                  modalTitle:'Error',
                 modalClassColor :'bg-danger'
                })
                break;
                case 4:
                  setState({...state ,
                    modalElement : <p>Server Error pls contact the Adminstrator</p>,
                    showModal:true,
                    modalTitle:'Error',
                 modalClassColor : 'bg-danger'
                  })
                  break;
                  case 10:
                    //jum page to page without refreshing
                  history.push('/login')
                    break;
          default:
            break;
        }
      }).catch(err=>{
        setState({...state ,
          modalElement : <p>can not send data to server </p>,
          showModal:true,
          modalTitle:'Server Error',
          modalClassColor : 'bg-danger'

        })
      })
    }

  }
//to be close modal
  const closeModal = () => {
    setState({ ...state, showModal: false })
  }

  return (
    <React.Fragment>
      <PopUpModal
        show={state.showModal}
        closeToggle={closeModal}
        className={state.modalClassColor}
        title={state.modalTitle}>
        {state.modalElement}
      </PopUpModal>



      <div className="breadcrumb">
        <div className="container">
          <Link className="breadcrumb-item" to="/admin">Daschbord</Link>
          <span className="breadcrumb-item active">Addbook</span>
        </div>
      </div>
      <section className="static about-sec">
        <div className="container">
          <h1>My Account / Add Book</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's printer took a galley of type and scrambled
          it to make a type specimen book. It has survived not only fiveLorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem
          </p>
          <div className="form">
            <form>
              <div className="form-group">
                <label htmlFor="bookTitleInp">Book Title</label>
                <input
                  value={state.bookTitle}
                  onChange={e => { setState({ ...state, bookTitle: e.target.value }) }}
                  type="text"
                  className="form-control"
                  id='bookTitleInp'
                  placeholder="Book Title" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Book Images</label>
                <input
                  ref={imgFileInpRef}
                  type="file"
                  className="form-control-file"
                  id='exampleFormControlFile1'
                  multiple
                  accept="image/x-png,image/gif,image/jpeg" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Book PDF</label>
                <input
                  ref={pdfFileInpRef}
                  type="file"
                  className="form-control-file"
                  id='exampleFormControlFile1'
                  accept="application/pdf" />
              </div>
              <div className="form-group">
                <label htmlFor="bookDescriptionInp">Book Description</label>
                <textarea className="form-control" id='bookDescriptionInp'
                  value={state.bookDescription}
                  onChange={e => { setState({ ...state, bookDescription: e.target.value }) }}

                ></textarea>
              </div>
              <button onClick={bookSaveBtnClick} className="btn btn-success mt-3" >save</button>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default AddBook