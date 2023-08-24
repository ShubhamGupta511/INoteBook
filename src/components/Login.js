import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({email:"", password:""});
   let Navigate=useNavigate();
    const handleSubmit=async(e)=>{
       
          e.preventDefault();
          const response= await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
              body: JSON.stringify({email:credentials.email, password:credentials.password})
          
          });
          const json =await response.json();
          console.log(json);
          if(json.success){
            //save in local storage
            localStorage.setItem('token',json.authtoken)
            Navigate("/");
          }
          else{
            alert('Invalid Credentials')
          }
    }

    const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
       }

   
    
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"  >Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} name="email" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="passsword" className="form-label"  >Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
