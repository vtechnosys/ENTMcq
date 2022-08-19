import React,{useState, useEffect} from 'react';
import Header from './Header';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Package(){
    const [error,setError] = useState(false);
    const [subject,setSubjects]=useState([]);
    const [service,setServices]=useState([]);
    const [packages,setPackage]=useState([]);
    const [service_include,setService]=useState('');
    const [package_name,setPackagename]=useState('');
    const [pricing,setPrice]=useState('');
    const [discount,setDiscount]=useState('');
    const [subjects,setSubject]=useState('');
    const [serid,setSerid] = useState('');

    const [userinfo, setUserInfo] = useState({
      services: [],
      response: [],
    });
    const [userinfo1, setUserInfo1] = useState({
      subjects: [],
      response: [],
    });

    const handleChange = (e) => {
      // Destructuring
      const { value, checked } = e.target;
      const { services } = userinfo;
        
      console.log(`${value} is ${checked}`);
       
      // Case 1 : The user checks the box
      if (checked) {
        setUserInfo({
          services: [...services, value],
          response: [...services, value],
        });
      }
    
      // Case 2  : The user unchecks the box
      else {
        setUserInfo({
          services: services.filter((e) => e !== value),
          response: services.filter((e) => e !== value),
        });
      }
    };
    const handleChangesubject = (e) => {
      // Destructuring
      const { value, checked } = e.target;
      const { subjects } = userinfo1;
        
      console.log(`${value} is ${checked}`);
       
      // Case 1 : The user checks the box
      if (checked) {
        setUserInfo1({
          subjects: [...subjects, value],
          response: [...subjects, value],
        });
      }
    
      // Case 2  : The user unchecks the box
      else {
        setUserInfo1({
          subjects: subjects.filter((e) => e !== value),
          response: subjects.filter((e) => e !== value),
        });
      }
    };
    const ft=userinfo.response;
    function storeSubject()
    {
      if(package_name === '' || service_include === '' || pricing === '' || discount === '' || subjects === '')
      {
        if(validate())
        {
          //alert("valid")
          const subData = {
            package_name:package_name,
            service_include:ft,
            pricing:pricing,
            discount:discount,
            subjects:userinfo1.response
          };
          console.log(subData);
          
          axios.post('https://entmcq.vertextechnosys.com/api/package',subData)
                .then((res) =>{
                  console.log(res);
                  //alert("Subject added successfully");
                  const data = res.data;
                  if(data[0].status=="success")
                    alert("Package added successfully");
                  else{
                    alert("Package failed");
                  }
                  featchSubject();
                })
        }
        else{
          //alert("somefields are empty");
          setError(true);
        }
        
      }
    }
    function editOption(id)
    {
      setSerid(id)
      //alert(id);
      axios.get('https://entmcq.vertextechnosys.com/api/package/'+id)
            .then((res)=>{
              const data = res.data;
              console.log(data);
              setPackagename(data.package_name);
              setServices(data.userinfo.response);
              setPrice(data.pricing);
              setDiscount(data.discount);
              setSubjects(data.subjects);
              //setSubjects(data);
            })
    }
    function validate()
    {
      if(!package_name){
        return false;
      }
      else if(!pricing){
        return false;
      }
      return true;
    }
    function featchPackage()
    {
        axios.get('https://entmcq.vertextechnosys.com/api/package')
        .then((res)=>{
          const data = res.data;
          setPackage(data);
        })
    }
    function featchService()
    {
        axios.get('https://entmcq.vertextechnosys.com/api/service')
        .then((res)=>{
          const data = res.data;
          setServices(data);
        })
    }
    function featchSubject()
    {
        axios.get('https://entmcq.vertextechnosys.com/api/subject')
        .then((res)=>{
          const data = res.data;
          setSubjects(data);
        })
    }
    
    function deleteOption(id)
    {
      //alert(id);
      axios.delete('https://entmcq.vertextechnosys.com/api/package/'+id)
      .then((res)=>{
        const data = res.data;
        if(data[0].status=="success"){
          alert("Package Deleted successfully");
          
        }
          
        else{
          alert("package Delete failed");
        }
        featchPackage();
      })
    }
    
    useEffect(()=>{
        featchService()
      },[])
    useEffect(()=>{
      featchSubject()
    },[])
    useEffect(()=>{
      featchPackage()
    },[])
    return (
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
              

              <ul className="navbar-nav flex-row align-items-center ms-auto">
                
                {/* <li className="nav-item lh-1 me-3">
                  <a
                    className="github-button"
                    href="https://github.com/themeselection/sneat-html-admin-template-free"
                    data-icon="octicon-star"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
                    >Star</a
                  >
                </li> */}

                
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  
                  <a href="/" class="btn btn-danger">Logout</a>
                </li>
                
              </ul>
            </div>
          </nav>

          

          
          <div class="content-wrapper">
            

            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Package</h4>

              <div class="row">
                
                <div class="col-md-5">
                  <div class="card mb-4">
                    <h5 class="card-header">Add Package</h5>
                    <div class="card-body demo-vertical-spacing demo-only-element">
                        
                          
                          <div>
                          <input type="hidden" value="" />
                            <label for="defaultFormControlInput" class="form-label">Package Name</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder=""
                              aria-describedby="defaultFormControlHelp"
                              value={package_name}
                              onChange={packagename => setPackagename(packagename.target.value)}
                            />
                          </div>
                          
                          
                          <div>
                          
                            <label for="defaultFormControlInput" class="form-label">Pricing</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder=""
                              aria-describedby="defaultFormControlHelp"
                              value={pricing}
                              onChange={pricing => setPrice(pricing.target.value)}
                            />
                          </div>
                          <div>
                          
                            <label for="defaultFormControlInput" class="form-label">Discount</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder=""
                              aria-describedby="defaultFormControlHelp"
                              value={discount}
                              onChange={discount => setDiscount(discount.target.value)}
                            />
                          </div>
                          <div>
                            <label for="defaultFormControlInput" class="form-label">Service Name</label>
                            <FormGroup>
                            
                            {
                              service.map((obj)=>{
                                    return(
                                      <FormControlLabel control={<Checkbox/>} label={obj.service_name} value={obj.id}  name="services" id="flexCheckDefault" onChange={handleChange}/>
                                    )
                                })
                            }
                            </FormGroup>
                            
                          </div>
                          
                          <div>
                            <label for="defaultFormControlInput" class="form-label">Subject Name</label>
                            <FormGroup>
                            {
                              subject.map((obj)=>{
                                    return(
                                      <FormControlLabel control={<Checkbox/>} label={obj.name} value={obj.id}  name="subjects" id="flexCheckDefault1" onChange={handleChangesubject}/>
                                    )
                                })
                            }
                            </FormGroup>
                            
                          </div>
                          
                      <div class="mb-3">
                        <button class="btn btn-primary d-grid w-100" type="button" style={{backgroundColor: '#188ccc'}} onClick={storeSubject}>Store</button>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div class="col-md-7">
                  <div class="card mb-4">
                    <h5 class="card-header">Package List</h5>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Package Name</th>
                          <th>Price</th>
                          <th>Discount</th>
                          
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                       
                          {
                            packages.map((obj)=>{
                              return (

                              
                              <tr>
                                <td>
                                 {obj.id}
                                </td>
                                <td>{obj.package_name}</td>
                                <td>{obj.pricing}</td>
                                <td>{obj.discount}</td>
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
    
    );
}

export default Package;
