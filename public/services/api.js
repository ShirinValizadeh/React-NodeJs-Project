

//send data
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