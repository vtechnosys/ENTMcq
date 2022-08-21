import React,{useState, useEffect} from 'react';
import Header from './Header';
import axios from 'axios';
import Headerpanel from "./Headerpanel";
function Quiz() 
{
    const [quiz,setQuiz]=useState([])
    const [quiz_name,setQuizname] = useState('')
    const [mode, setMode] = useState('')
    const [difficulty,setDifficulty] = useState('')
    const [subject,setSubject] = useState('')
    const [noofq,setNoofquestion]= useState('')
    const [timemode,setTimemode]=useState('')
    const [timetype,setTimetype]=useState('')
    const [totalsec,setTotalsec]=useState('')
    const [sid,setSid] = useState('');
    const [subStauts,setSubStatus] = useState('active');
    const [error,setError] = useState(false);
    
    function storequiz(){
        if(sid === '')
      {
        if(validate())
        {
          //alert("valid")
          const subData = {
            quiz_name:quiz_name,
            mode:mode,
            difficulty:difficulty,
            subject:subject,
            no_of_question:noofq,
            time_mode:timemode,
            time_type:timetype,
            total_sec:totalsec
          };
          axios.post('http://entmcq.vertextechnosys.com/api/quiz',subData)
                .then((res) =>{
                  console.log(res);
                  //alert("Subject added successfully");
                  const data = res.data;
                  if(data[0].status=="success")
                    alert("Subject added successfully");
                  else{
                    alert("Subject failed");
                  }
                  fetchQuiz();
                })
        }
        else{
          //alert("somefields are empty");
          setError(true);
        }
        
      }
      else{
        const subData = {
          sid:sid,
          quiz_name:quiz_name,
          mode:mode,
          difficulty:difficulty,
          subject:subject,
          no_of_question:noofq,
          time_mode:timemode,
          time_type:timetype,
          total_sec:totalsec
          
        };
        alert(sid);
        axios.put('https://entmcq.vertextechnosys.com/api/quiz/'+sid,subData)
              .then((res) =>{
                console.log(res);
                //alert("Subject added successfully");
                const data = res.data;
                if(data[0].status=="success"){
                  alert("Quiz Updated successfully");
                  setSid('');
                  setQuizname('');
                  setMode('');
                  setDifficulty('');
                  setSubject('');
                  setNoofquestion('');
                  setTimemode('');
                  setTimetype('');
                  setTotalsec('');
                }
                  
                else{
                  alert("Quiz failed");
                }
                fetchQuiz();
              })
      }
    }
    function validate()
    {
      if(!quiz_name){
        return false;
      }
      else if(!mode){
        return false;
      }
      return true;
    }

    function fetchQuiz()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/quiz')
            .then((res)=>{
              const data = res.data;
              setQuiz(data);
            })
    }

    function editOption(id){
      setSid(id);
      //alert(id)
      axios.get('https://entmcq.vertextechnosys.com/api/quiz/'+id)
            .then((res)=>{
              const data = res.data;
              console.log(data);
              setSid(data.id);
              setQuizname(data.quiz_name);
              setDifficulty(data.difficulty);
              setMode(data.mode);
              setSubject(data.subjects);
              setNoofquestion(data.no_of_questions);
              setTimemode(data.time_mode);
              setTimetype(data.time_type);
              setTotalsec(data.total_secs);
              //setQuiz(data);
            })
    }

    function deleteOption(id)
    {
      axios.delete('https://entmcq.vertextechnosys.com/api/quiz/'+id)
            .then((res) =>{
              console.log(res);
              //alert("Subject added successfully");
              const data = res.data;
              if(data[0].status=="success"){
                alert("Quiz Deleted successfully");
                
              }
                
              else{
                alert("Quiz Delete failed");
              }
              fetchQuiz();
            })
    }

    useEffect(()=>{
      fetchQuiz()
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
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Quiz</h4>

              <div class="row">
                
                <div class="col-md-5">
                  <div class="card mb-4">
                    <h5 class="card-header">Add Quiz</h5>
                    <div class="card-body demo-vertical-spacing demo-only-element">
                        <div>
                          <input type="hidden" value={sid} />
                            <label for="defaultFormControlInput" class="form-label">Quiz Name</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="Quiz Name"
                              aria-describedby="defaultFormControlHelp"
                              value={quiz_name}
                              onChange={quiz_name => setQuizname(quiz_name.target.value)}
                            />
                            
                          </div>
                          <div>
                          
                            <label for="defaultFormControlInput" class="form-label">Quiz Mode</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="Quiz Mode"
                              aria-describedby="defaultFormControlHelp"
                              value={mode}
                              onChange={mode => setMode(mode.target.value)}
                            />
                            
                          </div>
                          <div>
                          
                            <label for="defaultFormControlInput" class="form-label">Difficulty</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="Difficulty"
                              aria-describedby="defaultFormControlHelp"
                              value={difficulty}
                              onChange={difficulty => setDifficulty(difficulty.target.value)}
                            />
                            
                          </div>
                          <div>
                          
                            <label for="defaultFormControlInput" class="form-label">Subject</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="Subject"
                              aria-describedby="defaultFormControlHelp"
                              value={subject}
                              onChange={subject => setSubject(subject.target.value)}
                            />
                            
                          </div>
                          <div>
                          
                            <label for="defaultFormControlInput" class="form-label">No.of Questions</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="No.of Questions"
                              aria-describedby="defaultFormControlHelp"
                              value={noofq}
                              onChange={noofq => setNoofquestion(noofq.target.value)}
                            />
                            
                          </div>
                          <div>
                          
                            <label for="defaultFormControlInput" class="form-label">Time Mode</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="Time Mode"
                              aria-describedby="defaultFormControlHelp"
                              value={timemode}
                              onChange={timemode => setTimemode(timemode.target.value)}
                            />
                            
                          </div>
                          <div>
                          
                            <label for="defaultFormControlInput" class="form-label">Time Type</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="Time Type"
                              aria-describedby="defaultFormControlHelp"
                              value={timetype}
                              onChange={timetype => setTimetype(timetype.target.value)}
                            />
                            
                          </div>
                          <div>
                          
                          <label for="defaultFormControlInput" class="form-label">Total Sec</label>
                          <input
                            type="text"
                            class="form-control"
                            id="defaultFormControlInput"
                            placeholder="Total Sec"
                            aria-describedby="defaultFormControlHelp"
                            value={totalsec}
                            onChange={totalsec => setTotalsec(totalsec.target.value)}
                          />
                          
                        </div>
                      <div class="mb-3">
                        <button class="btn btn-primary d-grid w-100" type="button" style={{backgroundColor: '#188ccc'}} onClick={storequiz}>Store</button>
                        
                      </div>
                    </div>
                  </div>
                </div>

                
                <div class="col-md-7">
                  <div class="card mb-4">
                    <h5 class="card-header">Quiz List</h5>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Quiz Name</th>
                          <th>Subject</th>
                          
                          <th>Actions</th>
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
    
    )
}

export default Quiz;
