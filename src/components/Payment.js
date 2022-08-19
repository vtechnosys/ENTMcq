import Header from './Header';
import axios from "axios";
import React,{useState, useEffect} from 'react';

function Payment ()  {
    const [subjects,setSubjects]=useState([])
    const [sid,setSid] = useState('')
    const [pmode, setPmode] = useState('')
    const [pid,setPid] = useState('')
    const [subStauts,setSubStatus] = useState('success');
    const [error,setError] = useState(false);
    function storeSubject()
    {
      if(pid === '')
      {
        if(validate())
        {
          //alert("valid")
          const subData = {
            sid:sid,
            pmode:pmode
          };
          axios.post('https://entmcq.vertextechnosys.com/api/payment',subData)
                .then((res) =>{
                  console.log(res);
                  //alert("Subject added successfully");
                  const data = res.data;
                  if(data[0].status=="success")
                    alert("Payment added successfully");
                  else{
                    alert("Payment failed");
                  }
                  fetchSubjects();
                })
        }
        else{
          //alert("somefields are empty");
          setError(true);
        }
        
      }
      else{
        const subData = {
          id:pid,
          sid:sid,
          pmode:pmode
          
        };
        axios.put('https://entmcq.vertextechnosys.com/api/payment/'+pid,subData)
              .then((res) =>{
                console.log(res);
                //alert("Subject added successfully");
                const data = res.data;
                if(data[0].status=="success"){
                  alert("Payment Updated successfully");
                  setSid('');
                  setPmode('')
                }
                  
                else{
                  alert("Payment failed");
                }
                fetchSubjects();
              })
      }
    }   
    function validate()
    {
      if(!sid){
        return false;
      }
      else if(!pmode){
        return false;
      }
      return true;
    }
    function fetchSubjects()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/payment')
            .then((res)=>{
              const data = res.data;
              setSubjects(data);
            })
    }
    function editOption(id){
      setPid(id);
      // alert(id);
      axios.get('https://entmcq.vertextechnosys.com/api/payment/'+id)
            .then((res)=>{
              const data = res.data;
              console.log(data);
              setSid(data.sid);
              setPmode(data.pmode)
              //setSubjects(data);
            })
    }
    function deleteOption(id)
    {
      //alert(id);
      axios.delete('https://entmcq.vertextechnosys.com/api/payment/'+id)
            .then((res) =>{
              //alert(res);
              console.log(res);
              //alert("Subject added successfully");
              const data = res.data;
              if(data[0].status=="success"){
                alert("Payment Deleted successfully");
                
              }
                
              else{
                alert("Payment Delete failed");
              }
              fetchSubjects();
            })
    }
    useEffect(()=>{
        fetchSubjects()
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
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Payment</h4>

              <div class="row">
                
                

                
                <div class="col-md-12">
                  <div class="card mb-4">
                    <h5 class="card-header">Payment List</h5>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Subscription Id</th>
                          <th>Payment Mode</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          subjects.map((obj)=>{
                            return(
                              <tr>
                                <td>
                                  {obj.id}
                                </td>
                                <td>{obj.sid}</td>
                                <td>{obj.pmode}</td>
                                <td>
                                  {obj.pstatus === "success" ?
                                    (<span class="badge bg-label-primary me-1">Success</span>)
                                    :(<span class="badge bg-label-warning me-1">Pending</span>)
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
                                    {/* <button class="dropdown-item" onClick={()=>editOption(obj.id)}
                                        ><i class="bx bx-edit-alt me-1"></i> Edit</button> */}
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
    
    )
}


export default Payment;
