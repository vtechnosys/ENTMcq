import React, { useState}  from 'react';
import ent from './ent.png';
import './Loginform.css';
import axios from "axios";

function LoginForm(){
    
const[username,setUsername]=useState('');
const[password,setPassword]=useState('');
function storeQuestion(){
    const Login ={
        uname:username,
        pass:password
    };
    axios.post('https://entmcq.vertextechnosys.com/api/logincheck',Login)
        .then((res) =>{
            console.log(res);
            //alert("Subject added successfully");
            const data = res.data;
            if(data[0].status==="success" && data[0].type==="admin")
            {
                alert("Admin Login Success");
                window.location.href='/home';
            }else if(data[0].status==="success" && data[0].type==='doctor')
            {
                alert("Doctor Login Success");
                window.location.href='/doctorhome';
            }
            else{
                alert("Login failed");
            }
            //fetchSubjects();
        })
  }
    return (
    <div className='maindiv'>
        <div className="form">
        
     <form action="">
       <div className="input-container">
       <br/><br/>
       <center><img src={ent} className="imgcode"/></center>
       <center><h4>ENT-MCQ</h4></center>
         <label>Username </label>
         <input type="text" name="uname" required value={username} onChange={username=>setUsername(username.target.value)}/>

       </div>
       <div className="input-container">
         <label>Password </label>
         <input type="password" name="pass" required value={password} onChange={password=>setPassword(password.target.value)}/>

       </div>
       <div className="button-container">
         <button type="button"  onClick={storeQuestion}>Login</button>
       </div>
     </form>
   </div>
   </div>
    );
}

export default LoginForm;
