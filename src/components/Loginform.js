import { useState, useEffect } from "react";
import axios from "axios";
import { isEmail } from "../validators/Validations";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm(){
  
const[username,setUsername]=useState('');
const[password,setPassword]=useState('');
const[isEmailError,setEmailError] = useState(false);

function storeQuestion(){
    const Login ={
        uname:username,
        pass:password
    };
    console.log(isEmail(username));
    if(!isEmail(username))
    {
      toast.error('Invalid Login Details');
      setUsername('');
      setPassword('');
    }
    else{
      
      axios.post('https://entmcq.vertextechnosys.com/api/logincheck',Login)
        .then((res) =>{
            console.log(res);
            //alert("Subject added successfully");
            const data = res.data;
            const type=data[0].type;
            if(data[0].status=="success" && data[0].type=="admin")
            {
              
                // storing input name
                localStorage.setItem("type", JSON.stringify(type));
                localStorage.setItem('toast',true);
                //alert(name);
             
                toast('Login Successfull');
                window.location.href='/';
            }else if(data[0].status=="success" && data[0].type=='doctor')
            {
              
                // storing input name
                localStorage.setItem("type", JSON.stringify(type));
                //alert(name);
             
                toast('Login Successfull');
                window.location.href='/';
            }
            else{
              toast.error('Invalid Login Details');
            }
            //fetchSubjects();
        })
      //return false;
    }
    
  }
    return (
    <div className='maindiv'>
        <div className="form">
        
     <form>
       <div className="input-container">
       <br/><br/>
       <center><img src="/assets/img/icons/entmcq.png" className="imgcode"/></center>
       {/* <center><h4>ENT-MCQ</h4></center> */}
         <label>Username </label>
         <input type="text" name="uname" required value={username} onChange={username=>setUsername(username.target.value)}/>

       </div>
       <div className="input-container">
         <label>Password </label>
         <input type="password" name="pass" required value={password} onChange={password=>setPassword(password.target.value)}/>

       </div>
       <div className="button-container">
         <button type="button" onClick={storeQuestion}>Login</button>
       </div>
     </form>
   </div>
   <ToastContainer/>
   </div>
    );
}

export default LoginForm;
