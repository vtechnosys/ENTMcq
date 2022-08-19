import axios from "axios";
import React,{useState,useEffect} from "react";
import Header from "./Header";
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
                alert("User Deleted successfully");
                
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
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn p-0 dropdown-toggle hide-arrow"
                                    data-bs-toggle="dropdown"
                                  >
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                  </button>
                                  <div class="dropdown-menu">
                                  <button class="dropdown-item" onClick={()=>deleteOption(obj.id)}
                                        ><i class="bx bx-trash me-1"></i> Delete</button>
                                  </div>
                                </div>
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
