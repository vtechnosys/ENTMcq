import React,{useState, useEffect} from 'react';
import Header from '../Header';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
function ServiceEdit(){
    const {id} = useParams();
    const [error,setError] = useState(false);
    const [serid,setSerid] = useState('');
    const [service,setService]=useState([])
    const [sname,setSername] = useState('');
    const [description, setDescription] = useState('');
    const [isSnameError,setSnameError]=useState(false);
    const [isDescError,setDescError]=useState(false);
    const warn = { borderWidth: 1, borderColor: '#f44336' }
   const nowarn = { borderWidth: 1, borderColor: '#d9dee3' }

    function storeSubject()
    {
        if(sname=="")
        {
          toast.error('Enter Service Name');
          setSername();
          setSnameError(true)
        }else if(description=="")
        {
          toast.error('Enter Description');
          setDescription();
          setDescError(true)
        }
        else
        {
        const subData = {
          id:serid,
          service_name:sname,
          description:description,
          
        };
        axios.put('https://entmcq.vertextechnosys.com/api/service/'+serid,subData)
              .then((res) =>{
                console.log(res);
                //alert("Subject added successfully");
                const data = res.data;
                if(data[0].status=="success"){
                  alert("Service Updated successfully");
                  setSername('');
                  setDescription('')
                  
                  setSerid('')
                  window.location.href = "/service";
                }
                  
                else{
                  toast.error('Invalid Login Details');
                }
                //fetchService();
              })
      }
    }
    
    function fetchService()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/service')
            .then((res)=>{
              const data = res.data;
              setService(data);
            })
    }
    function editOption(id){
      setSerid(id)
      //alert(id);
      axios.get('https://entmcq.vertextechnosys.com/api/service/'+id)
            .then((res)=>{
              const data = res.data;
              console.log(data);
              setSername(data.service_name);
              setDescription(data.description);
              setSerid(data.id)
              //setSubjects(data);
            })
    }

    function deleteOption(id)
    {
      axios.delete('https://entmcq.vertextechnosys.com/api/service/'+id)
            .then((res) =>{
              console.log(res);
              //alert("Subject added successfully");
              const data = res.data;
              if(data[0].status=="success"){
                alert("Service Deleted successfully");
                
              }
                
              else{
                alert("Service Delete failed");
              }
              fetchService();
            })
    }
    function AddLibrary(urlOfTheLibrary) {
        const script = document.createElement('script');
        script.src = urlOfTheLibrary;
        script.async = true;
        document.body.appendChild(script);
      }
    useEffect(()=>{
      //fetchService()
      editOption(id);
    },[])
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
          
          <nav
            class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i class="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
             
              <div class="navbar-nav align-items-center">
                <div class="nav-item d-flex align-items-center">
                  <i class="bx bx-search fs-4 lh-0"></i>
                  <input
                    type="text"
                    class="form-control border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                  />
                </div>
              </div>
              

              <ul class="navbar-nav flex-row align-items-center ms-auto">
                
                <li class="nav-item lh-1 me-3">
                  <a
                    class="github-button"
                    href="https://github.com/themeselection/sneat-html-admin-template-free"
                    data-icon="octicon-star"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
                    >Star</a
                  >
                </li>

                
                <li class="nav-item navbar-dropdown dropdown-user dropdown">
                  <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <div class="avatar avatar-online">
                      <img src="../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                    </div>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="#">
                        <div class="d-flex">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar avatar-online">
                              <img src="../assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle" />
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <span class="fw-semibold d-block">John Doe</span>
                            <small class="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div class="dropdown-divider"></div>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <i class="bx bx-user me-2"></i>
                        <span class="align-middle">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <i class="bx bx-cog me-2"></i>
                        <span class="align-middle">Settings</span>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        <span class="d-flex align-items-center align-middle">
                          <i class="flex-shrink-0 bx bx-credit-card me-2"></i>
                          <span class="flex-grow-1 align-middle">Billing</span>
                          <span class="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <div class="dropdown-divider"></div>
                    </li>
                    <li>
                      <a class="dropdown-item" href="auth-login-basic.html">
                        <i class="bx bx-power-off me-2"></i>
                        <span class="align-middle">Log Out</span>
                      </a>
                    </li>
                  </ul>
                </li>
                
              </ul>
            </div>
          </nav>

          

          
          <div class="content-wrapper">
            

            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Service</h4>

              <div class="row">
                
                <div class="col-md-5">
                  <div class="card mb-4">
                    <h5 class="card-header">Add Service</h5>
                    <div class="card-body demo-vertical-spacing demo-only-element">
                        <div>
                          <input type="hidden" value={serid} />
                            <label for="defaultFormControlInput" class="form-label">Service Name</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder=""
                              aria-describedby="defaultFormControlHelp"
                              value={sname}
                              onChange={(sname) => {setSername(sname.target.value)
                              setSnameError(false)
                              }}
                              style={isSnameError ? warn : nowarn}
                            />
                            
                          </div>
                          <div>
                            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(description) => {setDescription(description.target.value)
                            setDescError(false)}} style={isDescError ? warn : nowarn}>{description}</textarea>
                            
                          </div>

                      <div class="mb-3">
                        <button class="btn btn-primary d-grid w-100" type="submit" style={{backgroundColor: '#188ccc'}} onClick={storeSubject}>Store</button>
                      </div>
                    </div>
                  </div>
                </div>

                
                {/* <div class="col-md-7">
                  <div class="card mb-4">
                    <h5 class="card-header">Service List</h5>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Service Name</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          service.map((obj)=>{
                            return(
                              <tr>
                                <td>
                                  {obj.id}
                                </td>
                                <td>{obj.service_name}</td>
                                <td>{obj.description}</td>
                                <td>
                                  {obj.status === "active" ?
                                    (<span class="badge bg-label-primary me-1">Active</span>)
                                    :(<span class="badge bg-label-warning me-1">Inactive</span>)
                                  }

                                  
                                </td>
                                <td>
                                  <div class="dropdown">
                                    <button
                                      type="button"
                                      class="btn p-0 dropdown-toggle hide-arrow"
                                      data-bs-toggle="dropdown"
                                    >
                                      <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                      <button class="dropdown-item" onClick={()=>editOption(obj.id)}
                                        ><i class="bx bx-edit-alt me-1"></i> Edit</button>
                                      <button class="dropdown-item" onClick={()=>deleteOption(obj.id)}
                                        ><i class="bx bx-trash me-1"></i> Delete</button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                        }
                        
                        
                      </tbody>
                    </table>
                  </div>
                </div>
                  </div>
                </div> */}

                
                
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
    );
}

export default ServiceEdit;
