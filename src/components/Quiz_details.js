import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
function QuizDetails() {
    const [quiz,setQuiz]=useState([])
    function fetchQuiz()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/quiz')
            .then((res)=>{
              const data = res.data;
              setQuiz(data);
            })
    }
    useEffect(()=>{
        fetchQuiz()
      },[])
          
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
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Quiz Details</h4>

              <div class="row">
                       <div class="col-md-12">
                  <div class="card mb-4">
                    <h5 class="card-header">Quiz Details List</h5>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Quiz Name</th>
                          <th>Subject</th>
                          <th>Difficulty</th>
                          <th>No.of Questions</th>
                          <th>Time Mode</th>
                          <th>Time Type</th>
                          <th>Total Secs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                            quiz.map((obj)=>{
                            return(
                              <tr>
                                <td>
                                  {obj.id}
                                </td>
                                <td>{obj.quiz_name}</td>
                                <td>{obj.subjects}</td>
                                <td>{obj.difficulty}</td>
                                <td>{obj.no_of_questions}</td>
                                <td>{obj.time_mode}</td>
                                <td>{obj.time_type}</td>
                                <td>{obj.total_secs}</td>
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

export default QuizDetails;
