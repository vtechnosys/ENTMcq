import { useState, useEffect } from "react";
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
            const type=data[0].type;
            if(data[0].status==="success" && data[0].type==="admin")
            {
              
                // storing input name
                localStorage.setItem("type", JSON.stringify(type));
                //alert(name);
             
                alert("Admin Login Success");
                window.location.href='/home';
            }else if(data[0].status==="success" && data[0].type==='doctor')
            {
              
                // storing input name
                localStorage.setItem("type", JSON.stringify(type));
                //alert(name);
             
                alert("Doctor Login Success");
                window.location.href='/home';
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
