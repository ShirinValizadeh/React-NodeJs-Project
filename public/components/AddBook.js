import React from 'react'

const AddBook = () => {
  return (
    <React.Fragment>
      <div className="breadcrumb">
        <div className="container">
          <a className="breadcrumb-item" href="index.html">Home</a>
          <span className="breadcrumb-item active">Register</span>
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
                  type="text"
                  className="form-control"
                  id='bookTitleInp'
                  placeholder="Book Title"/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Book Images</label>
                <input
                  type="file"
                  className="form-control-file"
                  id='exampleFormControlFile1'
                  multiple
                  accept="image/x-png,image/gif,image/jpeg"/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Book PDF</label>
                <input
                  type="file"
                  className="form-control-file"
                  id='exampleFormControlFile1'
                  accept="application/pdf"/>
              </div>
              <div className="form-group">
                <label htmlFor="bookDescriptionInp">Book Description</label>
                <textarea className="form-control" id='bookDescriptionInp'></textarea>
              </div>
              <button className="btn btn-success mt-3" >save</button>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default AddBook