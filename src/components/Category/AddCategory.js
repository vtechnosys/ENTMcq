import React,{useState, useEffect} from 'react';
import Header from '../Header';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Headerpanel from '../Headerpanel';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function AddCategory()
{
    
    const [subjects,setSubjects]=useState([]);
    const [name,setSname] = useState('');
    const [description, setDescription] = useState('');
    const [subStauts,setSubStatus] = useState('active');
    const [error,setError] = useState(false);
    const [sid,setSid]=useState('');
    const [selectedFile,setselectedFile]=useState('');

    const [isNameError,setNameError]=useState(false);
    const [isDescError,setDescError]=useState(false);
    const [isFileError,setFileError]=useState(false);
    const warn = { borderWidth: 1, borderColor: '#f44336' }
    const nowarn = { borderWidth: 1, borderColor: '#d9dee3' }

    function onFileChange(e){
        setselectedFile(e.target.files[0]);
        };

    function storeSubject()
    {
      if(name==""){
        toast.error('Enter Name');
        setSname();
        setNameError(true)
      }else if(description=="")
      {
        toast.error('Enter Description');
        setDescription('');
        setDescError(true)
      }else if(selectedFile==""){
        toast.error('Choose File');
        setselectedFile('');
        setFileError(true)
      }else
      {
            //alert("valid")
            const subData = {
              name:name,
              image:selectedFile,
              description:description,
            };
            //console.log(subData);
            const config = {     
              headers: { 'content-type': 'multipart/form-data' }
             } 
            axios.post('https://entmcq.vertextechnosys.com/api/category',subData,config)
                  .then((res) =>{
                    console.log(res);
                    //alert("Subject added successfully");
                    const data = res.data;
                    if(data.status=="success")
                    window.location.href = "/category";
                    else{
                      toast.error('Invalid Login Details');

                    }
                    
                  })
          
        
        }
      
      
    }

    
    function AddLibrary(urlOfTheLibrary) {
      const script = document.createElement('script');
      script.src = urlOfTheLibrary;
      script.async = true;
      document.body.appendChild(script);
    }

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
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Category</h4>

              <div class="row" style={{justifyContent:'center'}}>
                
                <div class="col-md-6">
                  <div class="card mb-4">
                    <h5 class="card-header">Add Category</h5>
                    <div class="card-body demo-vertical-spacing demo-only-element">
                    <div>
                          <input type="hidden" value={sid} />
                            <label for="defaultFormControlInput" class="form-label">Category Name</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder=""
                              aria-describedby="defaultFormControlHelp"
                              value={name}
                              onChange={(name) => {setSname(name.target.value)
                              setNameError(false)
                              }}
                              style={isNameError ? warn : nowarn}
                            />
                            
                          </div>
                          <div>
                            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(desc) => {setDescription(desc.target.value)
                            setDescError(false)
                            }} value={description} style={isDescError ? warn : nowarn}>{description}</textarea>
                            
                          </div>
                          <div>
                          <label for="exampleFormControlTextarea1" class="form-label">Image</label>
                            <input type="file" onChange={onFileChange} style={isFileError ? warn : nowarn}/>
                          </div>

                          {sid !== '' ? (<div class="mb-3">
                            <label for="exampleFormControlSelect1" class="form-label">Status</label>
                            <select class="form-select" id="exampleFormControlSelect1" aria-label="Default select example" value={subStauts} onChange={st => setSubStatus(st.target.value)}>
                              <option value ="active" selected>Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>):"" }

                      <div class="mb-3">
                        <button class="btn btn-primary d-grid w-100" type="submit" style={{backgroundColor: '#188ccc'}} onClick={storeSubject}>Store</button>
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

export default AddCategory;