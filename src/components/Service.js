import React,{useState, useEffect} from 'react';
import Header from './Header';
import axios from 'axios';
import Headerpanel from "./Headerpanel";
function Service(){
    const [error,setError] = useState(false);
    const [serid,setSerid] = useState('');
    const [service,setService]=useState([])
    const [sname,setSername] = useState('');
    const [description, setDescription] = useState('');
    function storeSubject()
    {
        if(serid === ''|| sname === '' || description === '')
        {
        if(validate())
        {
          //alert("valid")
          const subData = {
            service_name:sname,
            description:description,
          };
          axios.post('https://entmcq.vertextechnosys.com/api/service',subData)
                .then((res) =>{
                  console.log(res);
                  //alert("Subject added successfully");
                  const data = res.data;
                  if(data[0].status=="success")
                    alert("Service added successfully");
                  else{
                    alert("Service failed");
                  }
                  fetchService();
                })
        }
      }
      else{
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
                }
                  
                else{
                  alert("Service failed");
                }
                fetchService();
              })
      }
    }
    function validate()
    {
      
      if(!sname){
        return false;
      }
      else if(!description){
        return false;
      }
      return true;
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
    useEffect(()=>{
      fetchService()
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
                              onChange={sname => setSername(sname.target.value)}
                            />
                            
                          </div>
                          <div>
                            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={description => setDescription(description.target.value)} >{description}</textarea>
                            
                          </div>

                      <div class="mb-3">
                        <button class="btn btn-primary d-grid w-100" type="submit" style={{backgroundColor: '#188ccc'}} onClick={storeSubject}>Store</button>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div class="col-md-7">
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

export default Service;
