import React,{useState, useEffect} from 'react';
import Header from './Header';
import axios from 'axios';
import Headerpanel from "./Headerpanel";
import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Checkbox from '@mui/material/Checkbox';

function Questionbank() 
{
    const [state, setState] = React.useState({});
      const handleChange = (event) => {
        setState({
        
          [event.target.name]: event.target.checked,
        });
        //console.log(event.target.name);
      };
      const { subjectname } = state;
      const [error,setError] = useState(false);
      const [subjects,setSubjects]=useState([]);
      const [questionbank,setQuestionbank]=useState([]);
      const [category,setCategory]=useState([]);
      const [datavalue,setDatavalue]=useState([]);
      const [cateid,setCateid]=useState('');
      const [qname,setQname] = useState('');
      const [no_question, setNoquestion] = useState('');
      const [sid,setSid] = useState('');
      const [qid,setQid] = useState('');
      const [userinfo, setUserInfo] = useState({
        
        subjects: [],
        response: [],
      });
      const k=[];
      const data=[];
      let curval="";
      const handleInputChange = (e) =>{
        const {value,checked}=e.target;
        const { subjects } = userinfo;
      //  console.log(`${value} is ${checked}`);
        //console.log(subjects);
        
        // Case 1 : The user checks the box
        const vl = value.split(',')
          const info = {
            id:vl[0],
            name:vl[1]
          }
          //console.log(info);
        if (checked) {
          
          setUserInfo({
            subjects: [...subjects, info],
            response: [...subjects, info],
            
          });
          
        }
      
        // Case 2  : The user unchecks the box
        else {
          setUserInfo({
            subjects: subjects.filter((e) => e !== info),
            response: subjects.filter((e) => e !== info),
          });
          
        }

      };
      const subjectinfo=userinfo.response;
      //console.log(subjectinfo);
      function Addquestionbank()
      {
        
        if(qname == '' || no_question == '' || cateid == '')
        {
          if(validate())
          {

          
        //alert('working');
        const subData = {
          qname:qname,
          no_of_question:no_question,
          sub_id:subjectinfo,
          cate_id:cateid
        };
      //  console.log(subData);
        axios.post('https://entmcq.vertextechnosys.com/api/questionbank',subData)
              .then((res) =>{
                console.log(res);
                //alert("Subject added successfully");
                const data = res.data;
                if(data[0].status=="success")
                  alert("Question Bank added successfully");
                else{
                  alert("Question Bank failed");
                }
                
              })
              // .error((res)=>{
              //   console.log(res);
              // })
            }
          }
      }
    function fetchQuestionbank()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/questionbank')
            .then((res)=>{
              const data = res.data;
              setQuestionbank(data);
            })
    }
    function fetchSubjects()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/subject')
            .then((res)=>{
              const data = res.data;
              setSubjects(data);
            })
    }
    function fetchCategory()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/category')
            .then((res)=>{
              const data = res.data;
              setCategory(data);
            })
    }
    function validate()
    {
      if(!qname){
        return false;
      }
      else if(!no_question){
        return false;
      }
      return true;
    }
    function editOption(id)
    {
      setSid(id);
      //alert(id);
      axios.get('https://entmcq.vertextechnosys.com/api/questionbank/'+id)
            .then((res)=>{
              const data = res.data;
              //alert(data);
              
              //console.log(data);
              setQname(data.qname);
              setNoquestion(data.no_of_question);
              setCateid(data.cate_id);
              setSid(data.sub_id);
              //alert();
              const k=JSON.parse(data.sub_id);
              setDatavalue(k);
              //console.log(k);
              //const datavaluetest=JSON.stringify(data.sub_id);
              //alert(datavaluetest.id);
              // k.map((dvalue)=>{
              //                  console.log(dvalue.id);
              //                 });
              
            })
            
    }
    function deleteOption(id)
    {
      axios.delete('https://entmcq.vertextechnosys.com/api/questionbank/'+id)
            .then((res) =>{
              console.log(res);
              //alert("Subject added successfully");
              const data = res.data;
              if(data[0].status=="success"){
                alert("Question Bank Deleted successfully");
                
              }
                
              else{
                alert("Question Bank Delete failed");
              }
              fetchQuestionbank();
            })
    }
    useEffect(()=>{
        fetchSubjects()
      },[])
      useEffect(()=>{
        fetchCategory()
      },[])
    useEffect(()=>{
      fetchQuestionbank()
    },[])
    return (
        <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">

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
        <div className="layout-page">

        <Headerpanel/>
        <div className="content-wrapper">
          <div class="content-wrapper">
            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Question Bank</h4>
                <div class="row">
                  <div class="col-md-5">
                    <div class="card mb-4">
                      <h5 class="card-header">Add Question Bank</h5>
                        <div class="card-body demo-vertical-spacing demo-only-element">
                          <div>
                            <input type="hidden" value={sid} />
                            <label for="defaultFormControlInput" class="form-label">Question Name</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder=""
                              aria-describedby="defaultFormControlHelp"
                              value={qname}
                              onChange={qname => setQname(qname.target.value)}
                            />
                          </div>
                          <div>
                            <label for="defaultFormControlInput" class="form-label">Number Of Question</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder=""
                              aria-describedby="defaultFormControlHelp"
                              value={no_question}
                              onChange={no_question => setNoquestion(no_question.target.value)}
                              />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Category Name</label>
                            <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example" onChange={cateid => setCateid(cateid.target.value)}
                          value={cateid} >
                            <option value="">Select Category Name</option>
                            {
                              category.map((obj)=>{
                              return(
                                <option value={obj.id}>{obj.name}</option>
                                )
                              })
                            }
                           </select>
                          </div>
                          <div>
                          <label for="defaultFormControlInput" class="form-label">Subject Name</label>
                          <Box sx={{ display: 'flex' }}>
                            <FormControl sx={{ m: 6 }} component="fieldset" variant="standard">
                              <FormGroup>
                              {
                                subjects.map((obj)=>{
                                 const t=obj.id;
                                 curval=t;
                                return(
                                  
                                  datavalue.map((dvalue)=>
                                  
                                  { curval === dvalue.id ?
                              (<FormControlLabel
                                  control={
                                    <Checkbox  name="subject" value={obj.id+","+obj.name} onChange={handleInputChange} checked/>
                                  } label={obj.name} />
                              )
                              :(<FormControlLabel
                                  control={
                                    <Checkbox  name="subject" value={obj.id+","+obj.name} onChange={handleInputChange}/>
                                  } label={obj.name} />)
                              }
                              
                                  
                                )
                                )
                                
                              
                                })
                              }
                              </FormGroup>
                            </FormControl>
                          </Box>
                          
                          <div class="mb-3">
                            <button class="btn btn-primary d-grid w-100" type="button" style={{backgroundColor: '#188ccc'}} onClick={Addquestionbank}>Store</button>
                          </div>
                        </div>
                    </div>
                  </div>
                  </div>
                  <div class="col-md-7">
                  <div class="card mb-4">
                    <h5 class="card-header">Subject List</h5>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Question Name</th>
                          <th>No Of Questions</th>
                          <th>Category Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          questionbank.map((obj)=>{
                            return(
                              
                              <tr>
                                <td>
                                  {obj.qid}
                                </td>
                                <td>{obj.qname}</td>
                                <td>{obj.no_of_question}</td>
                                <td>{obj.cname}</td>
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
                                      <button class="dropdown-item" onClick={()=>editOption(obj.qid)}
                                        ><i class="bx bx-edit-alt me-1"></i> Edit</button>
                                      <button class="dropdown-item" onClick={()=>deleteOption(obj.qid)}
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
          </div>
        </div>
            </div>       
            <footer class="content-footer footer bg-footer-theme">
              <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                
              </div>
            </footer>
            

            {/* <div class="content-backdrop fade"></div> */}
          
      
      <div class="layout-overlay layout-menu-toggle"></div>
    </div>
    </div>
    
    );
}

export default Questionbank;
