import React,{useState, useEffect} from 'react';
import Header from '../Header';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Headerpanel from '../Headerpanel';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EditSubject()
{
  const {id} = useParams();
  const [subjects,setSubjects]=useState([])
  const [sname,setSname] = useState('');
  const [qbid,setQbid] = useState('')
  const [description, setDescription] = useState('');
  const [sid,setSid] = useState('');
  const [subStauts,setSubStatus] = useState('active');
  const [error,setError] = useState(false);
  const [isSubjectError,setSubjectError]=useState(false);
  const [isDescError,setDescError]=useState(false);
  const [isQuestionError,setQuestionError]=useState(false);
  const warn = { borderWidth: 1, borderColor: '#f44336' }
  const nowarn = { borderWidth: 1, borderColor: '#d9dee3' }
  const clms = [
    {
      name:'Id',
      selector: row=>row.id,
      sortable:true,
      compact:false,
      cell:row=>(
        <div>{row.id}</div>
      )
    },
    {
      name:'Subject',
      selector: row=>row.name,
      sortable:true
    },
    {
      name:'Status',
      selector: row=>row.status,
      sortable:true
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div>
                                    <button style={{border:0,marginRight:5}} onClick={()=>editOption(row=>row.id)}
                                      ><i class="bx bx-edit-alt me-1"></i> Edit</button>
                                    <button style={{border:0,marginRight:5}} onClick={()=>deleteOption(row=>row.id)}
                                      ><i class="bx bx-trash me-1"></i> Delete</button>
                                  </div>
      )
    }
  ]

  function storeSubject()
  {
    if(sname=="")
    {
     toast.error('Enter Subject Name');
     setSubjects();
     setSubjectError(true)
    }else if(description=="")
    {
     toast.error('Enter Description');
     setDescription();
     setDescError(true)
    }else if(qbid=="")
    {
     toast.error('Select Question Bank');
     setQbid();
     setQuestionError(true)
    }
    else
    {
      const subData = {
        id:sid,
        name:sname,
        qbid:qbid,
        description:description,
        status:subStauts
      };
      axios.put('https://entmcq.vertextechnosys.com/api/subject/'+sid,subData)
            .then((res) =>{
              console.log(res);
              //alert("Subject added successfully");
              const data = res.data;
              if(data[0].status=="success"){
                // alert("Subject Updated successfully");
                setSname('');
                setDescription('')
                setSubStatus('')
                setSid('')
                window.location.href="/view_subjects"
              }
                
              else{
                toast.error('Invalid Login Details');
              }
              //fetchSubjects();
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

  

  function editOption(id){
    setSid(id);
    //alert(id)
    axios.get('https://entmcq.vertextechnosys.com/api/subject/'+id)
          .then((res)=>{
            const data = res.data;
            console.log(data);
            setSname(data.name);
            setDescription(data.description)
            setSubStatus(data.status)
            setSid(data.id)
            setQbid(data.qb_id);
            //setSubjects(data);
          })
  }

  function deleteOption(id)
  {
    axios.delete('https://entmcq.vertextechnosys.com/api/subject/'+id)
          .then((res) =>{
            console.log(res);
            //alert("Subject added successfully");
            const data = res.data;
            if(data[0].status=="success"){
              // alert("Subject Deleted successfully");
              window.location.href="/view_subjects"
            }
              
            else{
              toast.error('Invalid Login Details');
            }
            //fetchSubjects();
          })
  }

  function fetchSubjects()
      {
        axios.get('https://entmcq.vertextechnosys.com/api/questionbank')
              .then((res)=>{
                const data = res.data;
                setSubjects(data);
              })
      }
  useEffect(()=>{
    fetchSubjects();
    editOption(id);

  },[]);

  function AddLibrary(urlOfTheLibrary) {
    const script = document.createElement('script');
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
  }

  return (
    <React.Fragment>
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
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Subjects</h4>

            <div class="row" style={{justifyContent:'center'}}>
              
              <div class="col-md-6">
                <div class="card mb-4">
                  <h5 class="card-header">Edit Subjects</h5>
                  <div class="card-body demo-vertical-spacing demo-only-element">
                      <div>
                        <input type="hidden" value={sid} />
                          <label for="defaultFormControlInput" class="form-label">Subject Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="defaultFormControlInput"
                            placeholder=""
                            aria-describedby="defaultFormControlHelp"
                            value={sname}
                            onChange={(sname) => {setSname(sname.target.value)
                              setSubjectError(false)
                              }}
                              style={isSubjectError ? warn : nowarn}
                          />
                          
                        </div>
                        <div>
                          <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(desc) => {setDescription(desc.target.value)
                            setDescError(false)
                            }} value={description} style={isDescError ? warn : nowarn}>{description}</textarea>
                          
                        </div>

                        {sid !== '' ? (<div class="mb-3">
                          <label for="exampleFormControlSelect1" class="form-label">Status</label>
                          <select class="form-select" id="exampleFormControlSelect1" aria-label="Default select example" value={subStauts} onChange={st => setSubStatus(st.target.value)}>
                            <option value ="active" selected>Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>):"" }
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Question Bank</label>
                            <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example" onChange={qbid => setQbid(qbid.target.value)}
                          value={qbid} >
                            <option value="">Select Question Bank</option>
                            {
                              subjects.map((obj)=>{
                              return(
                                <option value={obj.qid}>{obj.qname}</option>
                                )
                              })
                            }
                           </select>
                          </div>

                    <div class="mb-3">
                      <button class="btn btn-primary d-grid w-100" type="button" style={{backgroundColor: '#188ccc'}} onClick={storeSubject}>Update</button>
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
  <ToastContainer />
  {AddLibrary("/assets/vendor/libs/jquery/jquery.js")}
  {AddLibrary("/assets/vendor/libs/popper/popper.js")}
  {AddLibrary("/assets/vendor/js/bootstrap.js")}
  {AddLibrary("/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js")}
  {AddLibrary("/assets/vendor/js/menu.js")}
  {AddLibrary("/assets/js/dashboards-analytics.js")}
  {AddLibrary("/assets/vendor/libs/apex-charts/apexcharts.js")}
  {AddLibrary("/assets/js/main.js")}

  </React.Fragment>
  )
}


export default EditSubject;