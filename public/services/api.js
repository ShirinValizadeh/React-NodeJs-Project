



//*******************REGISTER********** */
export const registerPost = (email, password, repassword) => {
    const sendData = {
        email,
        password,
        repassword
    }
    return new Promise((resolve, reject) => {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        }).then(response => {

            if (response.status === 200) {
                response.json().then(resiveData => {
                    resolve(resiveData)
                }).catch(err => {

                    reject(err)
                })
            } else {
                reject(new Error('can not send data to server . status: ' + response.status))
            }
        }).catch(err => {
            reject(err)
        })
    })

}



//*************LOGIN**************** */
export const loginPost = (email, password) => {
    return new Promise((resolve, reject) => {

        // create object to be sent
        const sentObj = {
            email,
            password
        }
        // send data using fetch
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sentObj)
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    //console.log(data)
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('can not send data to server . status: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })

    })

}



//*************ADD BOOK**************** */
export const addBookPost = (bookTitle, bookDescription, bookPdf, bookImgs) => {

    return new Promise((resolve, reject) => {
        const fd = new FormData()
        fd.append('bookTitle', bookTitle)
        fd.append('bookDescription', bookDescription)
        for (let i = 0; i < bookImgs.length; i++) {
            fd.append('bookImg' + i, bookImgs[i])
        }
        fd.append('bookPdf', bookPdf)

        let url = '/admin/addbook'
        // send fd to server side using fetch
        fetch(url, {
            method: 'POST',
            body: fd
        }).then(response=>{
            if (response.status === 200) {
                response.json().then(data=>{
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
            }else{
                reject(new Error('can not send data to server . status: ' + response.status))

            }
        }).catch(err=>{
            reject(err)
        })
    })
}




//****************GET ALL BOOKS************* */
export const getAllBooks = ()=>{
    return new Promise ((resolve , reject) =>{
        fetch('/getAllBooks' , {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response =>{
            if (response.status === 200) {
                response.json().then(data=>{
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
            }else{
                reject(new Error('can not send data to server . status: ' + response.status))

            }
        }).catch(err =>{
            reject(err)
        })
    })
}




//***********GET BOOK****************** */
export const getBookPost= (bookId)=>{
    return new Promise((resolve , reject)=>{
        
        const data ={
            id:bookId
        }
        fetch('/getBook' ,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then(response =>{
            if (response.status === 200) {
                response.json().then(data=>{
                  //  console.log(data);
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
            }else{
                reject(new Error('can not send data to server . status: ' + response.status))

            }
        }).catch(err =>{
            reject(err)
        })
    })
}



//*****************************************MY BOOKS************ */
//get data
export const MyBooksPost= ()=>{
    return new Promise((resolve , reject)=>{
    
        fetch('/admin/mybooks' ,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            if (response.status === 200) {
                response.json().then(data=>{
                  //  console.log(data);
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
            }else{
                reject(new Error('can not send data to server . status: ' + response.status))
            }
        }).catch(err =>{
            reject(err)
        })
    })
}


//*****************************************DELET BOOK************ */
export const deletBooksPost= (bookid)=>{
    return new Promise((resolve , reject)=>{
    
        const data={
            bookid
        }
        fetch('/admin/deletebook' ,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then(response =>{
            if (response.status === 200) {
                response.json().then(data=>{
                  //  console.log(data);
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
            }else{
                reject(new Error('can not send data to server . status: ' + response.status))
            }
        }).catch(err =>{
            reject(err)
        })
    })
}



//*****************************************edit BOOK************ */
export const editBooksPost= (bookTitle , bookDescription , bookOldImgs , bookNewImgs , bookPdf , bookid)=>{
    return new Promise((resolve , reject)=>{
        const fd = new FormData()
        fd.append('bookid' , bookid)
        fd.append('newBookTitle' , bookTitle)
        fd.append('oldImgsUrls' ,JSON.stringify(bookOldImgs) )
        for (let i = 0; i < bookNewImgs.length; i++) {
            fd.append('bookImg' + i, bookNewImgs[i])
        }
        if (bookPdf) {
            fd.append('bookPdf', bookPdf)
        }
        fd.append('bookDescription' , bookDescription)


        fetch('/admin/editbook' ,{
            method:'POST',
            body:fd
        }).then(response =>{
            if (response.status === 200) {
                response.json().then(data=>{
                  //  console.log(data);
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
            }else{
                reject(new Error('can not send data to server . status: ' + response.status))
            }
        }).catch(err =>{
            reject(err)
        })
    })
}


//*****************************************LOGOUT ************ */
export const logoutPost= ()=>{
    return new Promise((resolve , reject)=>{

        fetch('/admin/logout' ,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            if (response.status === 200) {
                response.json().then(data=>{
                  //  console.log(data);
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
            }else{
                reject(new Error('can not send data to server . status: ' + response.status))
            }
        }).catch(err =>{
            reject(err)
        })
    })
}



//*******checkLoginPost each time*********** */
export const checkLoginPost= ()=>{
    return new Promise((resolve , reject)=>{

        fetch('/checklogin' ,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            if (response.status === 200) {
                response.json().then(data=>{
                  //  console.log(data);
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
            }else{
                reject(new Error('can not send data to server . status: ' + response.status))
            }
        }).catch(err =>{
            reject(err)
        })
    })
}

