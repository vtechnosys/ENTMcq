
import React,{useState, useEffect} from 'react';
import Header from './Header';
import axios from 'axios';
import Headerpanel from "./Headerpanel";
import { ContactlessOutlined } from '@mui/icons-material';

function Category(){
    const [subjects,setSubjects]=useState([]);
    const [name,setSname] = useState('');
    const [description, setDescription] = useState('');
    const [subStauts,setSubStatus] = useState('active');
    const [error,setError] = useState(false);
    const [sid,setSid]=useState('');
    const [selectedFile,setselectedFile]=useState('');
    
    function onFileChange(e){
    setselectedFile(e.target.files[0]);
    };

    // formData="";
function storeSubject()
{
  
    //console.log(selectedFile);
    if(sid === '' || name === '' || description === '')
      {
        if(validate())
        {
          //alert("valid")
          const subData = {
            name:name,
            image:selectedFile,
            description:description,
          };
          console.log(subData);
          const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
          axios.post('https://entmcq.vertextechnosys.com/api/category',subData,config)
                .then((res) =>{
                  console.log(res);
                  //alert("Subject added successfully");
                  const data = res.data;
                  if(data[0].status=="success")
                    alert("Category added successfully");
                  else{
                    alert("Category failed");
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
          id:sid,
          name:name,
          description:description,
          status:subStauts
        };
        console.log(subData);
        axios.put('https://entmcq.vertextechnosys.com/api/category/'+sid,subData)
              .then((res) =>{
                console.log(res);
                //alert("Subject added successfully");
                const data = res.data;
                if(data[0].status=="success"){
                  alert("Category Updated successfully");
                  setSname('');
                  setDescription('')
                  setSubStatus('')
                  setSid('')
                }
                  
                else{
                  alert("Category failed");
                }
                fetchSubjects();
              })
      }
    }
    function validate()
    {
      if(!name){
        return false;
      }
      else if(!description){
        return false;
      }
      return true;
    }

    function fetchSubjects()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/category')
            .then((res)=>{
              const data = res.data;
              setSubjects(data);
            })
    }

    function editOption(id){
      setSid(id);
      //alert(id)
      axios.get('https://entmcq.vertextechnosys.com/api/category/'+id)
            .then((res)=>{
              const data = res.data;
              console.log(data);
              setSname(data.name);
              setDescription(data.description)
              setSubStatus(data.status)
              setSid(data.id)
              //setSubjects(data);
            })
    }

    function deleteOption(id)
    {
      axios.delete('https://entmcq.vertextechnosys.com/api/category/'+id)
            .then((res) =>{
              console.log(res);
              //alert("Subject added successfully");
              const data = res.data;
              if(data[0].status=="success"){
                alert("Category Deleted successfully");
                
              }
                
              else{
                alert("Category Delete failed");
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
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Category</h4>

              <div class="row">
                
                <div class="col-md-5">
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
                              onChange={name => setSname(name.target.value)}
                            />
                            
                          </div>
                          <div>
                            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={desc => setDescription(desc.target.value)} value={description} >{description}</textarea>
                            
                          </div>
                          <div>
                          <label for="exampleFormControlTextarea1" class="form-label">Image</label>
                            <input type="file" onChange={onFileChange}/>
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

                
                <div class="col-md-7">
                  <div class="card mb-4">
                    <h5 class="card-header">Category List</h5>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Category Name</th>
                          <th>Description</th>
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
                                <td>{obj.name}</td>
                                <td>{obj.description}</td>
                                <td>
                                  {obj.status === "active" ?
                                    (<span class="badge bg-label-primary me-1">{obj.status}</span>)
                                    :(<span class="badge bg-label-warning me-1">{obj.status}</span>)
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

export default Category;
