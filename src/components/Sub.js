import Header from './Header';
import axios from "axios";
import Headerpanel from "./Headerpanel";
import React,{useState, useEffect} from 'react';
function Sub() {
    const [subcription,setSubcription]=useState([])
    const [sid,setSid] = useState('')
    const [userid, setUserid] = useState('')
    const [packageid,setPackageid] = useState('')
    const [subjectcode,setSubjectcode] = useState('')
    const [startdate,setStartdate]=useState('')
    const [enddate,setEnddate]=useState('')
    const [error,setError] = useState(false);
    function storeSub()
    {
      if(sid === '')
      {
        if(validate())
        {
          //alert("valid")
          const subData = {
            user_id:userid,
            package_id:packageid,
            sub_code:subjectcode,
            sub_startdate:startdate,
            sub_enddate:enddate
          };
          
          axios.post('https://entmcq.vertextechnosys.com/api/subscription',subData)
                .then((res) =>{
                  console.log(res);
                  //alert("Subject added successfully");
                  const data = res.data;
                  if(data[0].status=="success")
                    alert("subscription added successfully");
                  else{
                    alert("subscription failed");
                  }
                  fetchSubjects();
                })
        }
        else{
          //alert("somefields are empty");
          setError(true);
        }
        
      }
    }
    function validate()
    {
      if(!userid){
        return false;
      }
      else if(!packageid){
        return false;
      }
      return true;
    }
    function fetchSubjects()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/subscription')
            .then((res)=>{
              const data = res.data;
              setSubcription(data);
            })
    }

    function editOption(id){
        setSid(id);
        //alert(id)
        axios.get('https://entmcq.vertextechnosys.com/api/subscription/'+id)
              .then((res)=>{
                const data = res.data;
                console.log(data);
                setUserid(data.userid);
                setPackageid(data.packageid)
                setSubjectcode(data.subjectcode)
                setStartdate(data.startdate)
                setEnddate(data.enddate)
                setSid(data.id)
                //setSubjects(data);
              })
      }
      function deleteOption(id)
      {
       // alert(id);
        axios.delete('https://entmcq.vertextechnosys.com/api/subscription/'+id)
              .then((res) =>{
                console.log(res);
                //alert("Subject added successfully");
                const data = res.data;
                if(data[0].status=="success"){
                  alert("Subscription Deleted successfully");
                  
                }
                  
                else{
                  alert("Subscription Delete failed");
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
          
        <Headerpanel/>
          

          
          <div class="content-wrapper">
            

            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Subscription</h4>

              <div class="row">
                
                {/* <div class="col-md-5">
                  <div class="card mb-4">
                    <h5 class="card-header">Add Subscription</h5>
                    <div class="card-body demo-vertical-spacing demo-only-element">
                        <div>
                          <input type="hidden" value={sid} />
                            <label for="defaultFormControlInput" class="form-label">User Id</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="User Id"
                              aria-describedby="defaultFormControlHelp"
                              value={userid}
                              onChange={userid => setUserid(userid.target.value)}
                            />
                            
                          </div>
                          <div>
                          
                            <label for="defaultFormControlInput" class="form-label">Package Id</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="Package Id"
                              aria-describedby="defaultFormControlHelp"
                              value={packageid}
                              onChange={packageid => setPackageid(packageid.target.value)}
                            />
                            
                          </div>
                          <div>
                          
                            <label for="defaultFormControlInput" class="form-label">Subscription Start Date</label>
                            <input
                              type="date"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="Payment Mode"
                              aria-describedby="defaultFormControlHelp"
                              value={startdate}
                              onChange={startdate => setStartdate(startdate.target.value)}
                            />
                            
                          </div>
                          <div>
                          
                            <label for="defaultFormControlInput" class="form-label">Subscription End Date</label>
                            <input
                              type="date"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="Subscription Code"
                              aria-describedby="defaultFormControlHelp"
                              value={enddate}
                              onChange={enddate => setEnddate(enddate.target.value)}
                            />
                            
                          </div>
                          <div>
                          
                            <label for="defaultFormControlInput" class="form-label">Subscription Code</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="Subscription Code"
                              aria-describedby="defaultFormControlHelp"
                              value={subjectcode}
                              onChange={subjectcode => setSubjectcode(subjectcode.target.value)}
                            />
                            
                          </div>
                          

                      <div class="mb-3">
                        <button class="btn btn-primary d-grid w-100" type="button" style={{backgroundColor: '#188ccc'}} onClick={storeSub}>Store</button>
                        
                      </div>
                    </div>
                  </div>
                </div> */}

                
                <div class="col-md-12">
                  <div class="card mb-4">
                    <h5 class="card-header">Subscription List</h5>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>User Name</th>
                          <th>Package Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Code</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                            subcription.map((obj)=>{
                            return(
                              <tr>
                                <td>
                                  {obj.sid}
                                </td>
                                <td>{obj.name}</td>
                                <td>{obj.package_name}</td>
                                <td>{obj.sub_date}</td>
                                <td>{obj.sub_edate}</td>
                                <td>{obj.sub_code}</td>
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
                                    {/* {/* <button class="dropdown-item" onClick={()=>editOption(obj.id)}
                                        ><i class="bx bx-edit-alt me-1"></i> Edit</button> */}
                                      <button class="dropdown-item" onClick={()=>deleteOption(obj.sid)}
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

export default Sub;
