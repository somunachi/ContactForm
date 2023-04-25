import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {nanoid} from 'nanoid'


const Contact = () => {
    const [firstName, setFirstName] = useState("") 
    const [lastName, setLastName] = useState("") 
    const [email, setEmail] = useState("") 
    const [message, setMessage] = useState("") 

    const[loading, setLoading] = useState(false)

    const [error, setError] = useState(null)
    
    const handleFirstName = (event) =>{
        setFirstName(event.target.value)
    }
    const handleLastName = (event) =>{
        setLastName(event.target.value)
        
    }
    const handleEmail = (event) =>{
        setEmail(event.target.value)
        
    }
    const handleMessage = (event) =>{
        setMessage(event.target.value)
        
    }

    

    const handleSubmit = (event) => {
        event.preventDefault()

        const FORM_DETAILS = 
        { 
            "id": nanoid(),
            "name": firstName + " " + lastName,
            "email": email,
            "message": message
        }

        axios.post('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiriess', {
          FORM_DETAILS
        })
        .then((response) => {
            setError(<p className='success'>Form Submitted!</p>)
            console.log("Form submitted")
            console.log(response, response.data)
            setFirstName("")
            setLastName("")
            setEmail("")
            setMessage("")
        })
        .catch((error)=>{
           
           if(error.response){
            console.log(error.response, FORM_DETAILS)
            setError(<p className='error'>There was an error submitting your form</p>)
            setLoading(true)
           }
            else if (error.request){
                setError(<p className='error'>Check network connection</p>)
                setLoading(true)
                console.log("network error");
            } else {
                console.log(error)
            }
        })
  
    }

  return (
    <body>
   <div className="body-div">
   <div className="container">
            {error}
        <div className="text">Contact us Form</div>
        <form action="#" onSubmit={handleSubmit}>
           <div className="form-row">
              <div className="input-data">
                 <input type="text" value={firstName} required onChange={handleFirstName} />
                 <div className="underline"></div>
                 <label htmlFor="">First Name</label>
              </div>
              <div className="input-data">
                 <input type="text" value={lastName}  onChange={handleLastName} required/>
                 <div className="underline"></div>
                 <label htmlFor="">Last Name</label>
              </div>
           </div>
           <div className="form-row">
              <div className="input-data">
                 <input type="email" value={email} onChange={handleEmail} required/>
                 <div className="underline"></div>
                 <label htmlFor="">Email Address</label>
              </div>
            
           </div>
           <div className="form-row">
              <div className="input-data textarea">
                 <textarea rows="8" cols="80" value={message} onChange={handleMessage} required></textarea>
                 <br />
                 <div className="underline"></div>
                 <label htmlFor="">Write your message</label>
                 <br />
              </div>
           </div>
                 {loading?  <div className="form-row submit-btn">
                    <div className='input-data'>
                       <div className="inner"></div>
                       <button type="submit"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                            </svg>
                        </button>
                    </div>
                 </div>: <div className="form-row submit-btn">
                    <div className='input-data'>
                       <div className="inner"></div>
                       <input type="submit" value="Submit"/>
                    </div>
                 </div>}
           
        </form>
     </div>
   </div>
   </body>
  )
}

export default Contact