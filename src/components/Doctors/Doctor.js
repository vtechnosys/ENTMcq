import Header from '../Header';
import axios from "axios";
import React,{useState, useEffect} from 'react';
import Headerpanel from '../Headerpanel';
import { ToastContainer, toast } from 'react-toastify';
import { isEmail } from "../../validators/Validations";
import 'react-toastify/dist/ReactToastify.css';
function Doctor()
{
    const [doctor,setDoctor]=useState([]);
    const [subject,setSubject]=useState([]);
    const [sid,setSid] = useState('');
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [subid,setSubid]=useState('');
    const [error,setError] = useState(false);
    const warn = { borderWidth: 1, borderColor: '#f44336' }
    const nowarn = { borderWidth: 1, borderColor: '#d9dee3' }
    const [isNameError,setNameerror]=useState(false);
    const [isEmailError, setEmailError] = useState(false);
    const [isPasswordError,setPasswordError] = useState(false);
    const [isSubError,setSubError]=useState(false);
    
    function storeDoctor()
    {
      
      if(name=="")
      {
        toast.error('Enter Name');
        setName();
        setNameerror(true)
      }else if(!isEmail(email))
      {
        toast.error('Enter Email');
        setEmail();
        setEmailError(true)
      }else if(password=="")
      {
        toast.error('Enter Password');
        setPassword();
        setPasswordError(true)
      }else if(subid=="")
      {
        toast.error('Select Subject');
        setSubid();
        setSubError(true)
      }else{
         const subData = {
            name:name,
            email:email,
            password:password,
            subid:subid,
          };
          axios.post('https://entmcq.vertextechnosys.com/api/doctor',subData)
                .then((res) =>{
                  console.log(res);
                  //alert("Subject added successfully");
                  const data = res.data;
                  if(data[0].status=="success"){
                    window.location.href = "/doctors";
                  }else{
                    toast.error('Invalid Login Details');
                  }
                  
                })
        }
        
        
      }
      
      //   const subData = {
      //     id:sid,
      //     name:name,
      //     email:email,
      //     password:password,
      //     subid:subid,
          
      //   };
      //   axios.put('https://entmcq.vertextechnosys.com/api/doctor/'+sid,subData)
      //         .then((res) =>{
      //           console.log(res);
      //           //alert("Subject added successfully");
      //           const data = res.data;
      //           if(data[0].status=="success"){
      //             alert("Doctor Updated successfully");
      //             setName('');
      //             setEmail('');
      //             setPassword('');
      //             setSubid('')
      //           }
                  
      //           else{
      //             alert("Doctor failed");
      //           }
      //           fetchDoctors();
      //         })
      // }
    
    // function validate()
    // {
     
      
    // }

    function fetchDoctors()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/doctor')
            .then((res)=>{
              const data = res.data;
              setDoctor(data);
            });
    }
    function fetchSubject()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/subject')
            .then((res)=>{
              const data = res.data;
              setSubject(data);
            })
    }

    function editOption(id){
      setSid(id);
      //alert(id)
      axios.get('https://entmcq.vertextechnosys.com/api/doctor/'+id)
     
            .then((res)=>{
              const data = res.data;
              console.log(data);
              setName(data.name);
              setEmail(data.email);
              setPassword(data.password);
              
              setSubid(data.subid)
              //setQuiz(data);
            })
    }

    function deleteOption(id)
    {
      axios.delete('https://entmcq.vertextechnosys.com/api/doctor/'+id)
            .then((res) =>{
              console.log(res);
              //alert("Subject added successfully");
              const data = res.data;
              if(data[0].status=="success"){
                alert("Doctor Deleted successfully");
                
              }
                
              else{
                alert("Doctor Delete failed");
              }
              fetchDoctors();
            })
    }

    function AddLibrary(urlOfTheLibrary) {
      const script = document.createElement('script');
      script.src = urlOfTheLibrary;
      script.async = true;
      document.body.appendChild(script);
    }
    useEffect(() => {
    fetchSubject();
  }, []);
    
return (
  <React.Fragment>
    <div class="layout-wrapper layout-content-navbar">
  <div class="layout-container">
    

    <Header/>
          {error && (<div
            class="bs-toast toast toast-placement-ex m-2 show bg-warning top-0 end-0 fade show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-delay="2000"
            
          >
            <div class="toast-header">
              <i class="bx bx-bell me-2"></i>
              <div class="me-auto fw-semibold">Alert</div>
              {/* <small>11 mins ago</small> */}
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={()=>{setError(false)}}></button>
            </div>
            <div class="toast-body">somefields are empty</div>
          </div>)}
    <div class="layout-page">
      
      <Headerpanel/>

      

      
      <div class="content-wrapper">
        

        <div class="container-xxl flex-grow-1 container-p-y">
          <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Doctor</h4>

          <div class="row" style={{justifyContent:'center'}}>
            
            <div class="col-md-6">
              <div class="card mb-4">
                <h5 class="card-header">Add Doctor</h5>
                <div class="card-body demo-vertical-spacing demo-only-element">
                    <div>
                      <input type="hidden" value={sid} />
                        <label for="defaultFormControlInput" class="form-label">Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="defaultFormControlInput"
                          placeholder="Name"
                          aria-describedby="defaultFormControlHelp"
                          value={name}
                          onChange={(name) => {setName(name.target.value)
                          setNameerror(false);
                          }}
                          style={isNameError ? warn : nowarn}
                        />
                        
                      </div>
                      <div>
                      
                        <label for="defaultFormControlInput" class="form-label">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          id="defaultFormControlInput"
                          placeholder="Email"
                          aria-describedby="defaultFormControlHelp"
                          value={email}
                          style={isEmailError ? warn : nowarn}
                          onChange={(email) => {setEmail(email.target.value)
                          setEmailError(false)
                          }}
                        />
                        
                      </div>
                      <div>
                      
                        <label for="defaultFormControlInput" class="form-label">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="defaultFormControlInput"
                          placeholder="Password"
                          aria-describedby="defaultFormControlHelp"
                          value={password}
                          style={isPasswordError ? warn : nowarn}
                          onChange={(password) => {setPassword(password.target.value)
                          setPasswordError(false)
                          }}
                        />
                        
                      </div>
                      
                      <div>
                      
                        <label for="defaultFormControlInput" class="form-label">Subject Name</label>
                        <select
                          class="form-select" 
                          id="exampleFormControlSelect1" 
                          aria-label="Default select example"
                          onChange={(subid) => {setSubid(subid.target.value)
                          setSubError(false)
                          }}
                          value={subid}
                          style={isSubError ? warn : nowarn}
                        >
                        <option value="">Select Subject Name</option>
                        {
                          subject.map((obj)=>{
                          return (
                            <option value={obj.id}>{obj.name}</option>
                            )
                          })
                        }
                        
                        </select>
                        
                      </div>
                      
                  <div class="mb-3">
                    <button class="btn btn-primary d-grid w-100" type="button" style={{backgroundColor: '#188ccc'}} onClick={storeDoctor}>Store</button>
                    
                  </div>
                </div>
              </div>
            </div>

            
            

            
            
          </div>

          

         
          

          
        </div>
        
        <footer class="content-footer footer bg-footer-theme">
          <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
            
          </div>
        </footer>
        

        <div class="content-backdrop fade"></div>
      </div>
     
    </div>
    
  </div>

  
  <div class="layout-overlay layout-menu-toggle"></div>
</div>
<ToastContainer />
{AddLibrary("/assets/vendor/libs/jquery/jquery.js")}
  {AddLibrary("/assets/vendor/libs/popper/popper.js")}
  {AddLibrary("/assets/vendor/js/bootstrap.js")}
  {AddLibrary("/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js")}
  {AddLibrary("/assets/vendor/js/menu.js")}
  {AddLibrary("/assets/js/dashboards-analytics.js")}
  {AddLibrary("/assets/vendor/libs/apex-charts/apexcharts.js")}
  {AddLibrary("/assets/js/main.js")}
</React.Fragment>
)
}
export default Doctor;
