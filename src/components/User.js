import axios from "axios";
import React,{useState,useEffect} from "react";
import Header from "./Header";
import Headerpanel from './Headerpanel';
function User () {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [regdate,setRegdate] = useState('')
    const [user,setUser] = useState([])
    function onSubmit()
    {
    const regDate = new Date();
    let dt= ""+regDate.getDate()+"/"+(regDate.getMonth()+1)+"/"+regDate.getFullYear();
    const apiData = {
      name:name,
      email:email,
      password:password,
      register_date:regdate
    };
    axios.post("https://entmcq.vertextechnosys.com/api/users",apiData)
          .then(res=>{
            console.log(res);
            alert("Users Added Successfully");
            fetchUsers();
          })
    }
    function deleteOption(id)
    {
      //alert(id);
      axios.delete('https://entmcq.vertextechnosys.com/api/users/'+id)
            .then((res) =>{
              //alert(res);
              console.log(res);
              //alert("Subject added successfully");
              const data = res.data;
              if(data[0].status=="success"){
                window.location.href='/user';
                
              }
                
              else{
                alert("User Delete failed");
              }
              fetchUsers();
            })
    }
    function fetchUsers()
  {
    axios.get("https://entmcq.vertextechnosys.com/api/users")
          .then(res=>{
            console.log(res.data)
            setUser(res.data)
          });
  }
  useEffect(()=>{
    fetchUsers();
  },[]);
    return (
        <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        

        <Header/>
        

        
        <div class="layout-page">
          

          <Headerpanel/>

          
          <div class="content-wrapper">
            

            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Users</h4>

              <div class="row">
                
                
                
                <div class="col-md-12">
                  <div class="card mb-4">
                    <h5 class="card-header">Users List</h5>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Register Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          user.map((obj)=>{
                            return (<tr>
                              <td>
                                {obj.id}
                              </td>
                              <td>{obj.name}</td>
                              <td>
                                {obj.email}
                              </td>
                              <td>{obj.register_date}</td>
                              <td>
                                  {obj.status === "active" ?
                                    (<span class="badge bg-label-primary me-1">Active</span>)
                                    :(<span class="badge bg-label-warning me-1">Inactive</span>)
                                  }
                              </td>
                              <td>
                                  <button class="dropdown-item" onClick={()=>deleteOption(obj.id)}
                                        ><i class="bx bx-trash me-1"></i> Delete</button>
                                
                                
                              </td>
                            </tr>)
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

export default User;
