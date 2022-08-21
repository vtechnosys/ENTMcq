import React, { useState, useRef, useMemo,useEffect }  from 'react';
import Header from "./Header";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import JoditEditor from "jodit-react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import axios from "axios";
import Headerpanel from "./Headerpanel";


function Questions(){
    const [value, setValue] = useState('');
    const [answer_option,setAnsweroption]=useState('');
    const [status,setStatus]=useState('');
    const [doctor_id,setDoctorname]=useState('');
    const [sub_id,setSubjectname]=useState('');
    const [doctor,setDoctor]=useState([]);
    const [subject,setSubject]=useState([]);
    const [qmode,setQmode]=useState('');
    const [explanation,setExplain]=useState('');
    const [error,setError] = useState(false);
    const editor = useRef(null)
	const [title, setContent] = useState('')
    const placeholder="Start typing..."
	const config = useMemo(()=>({
		readonly: false, // all options from https://xdsoft.net/jodit/doc/,
		placeholder: placeholder ||'Start typings...',
	}),[placeholder])

  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  function uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID ##clientid##');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          console.log(response)
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          console.log(error)
          reject(error);
        });
      }
    );
  }
  function storeQuestion()
  {
        alert(sub_id);
          const subData = {
            title:title,
            answer_option:answer_option,
            explanation:explanation,
            doctor_id:doctor_id,
            qmode:qmode,
            sub_id:sub_id
          };
          axios.post('https://entmcq.vertextechnosys.com/api/question',subData)
                .then((res) =>{
                  console.log(res);
                  //alert("Subject added successfully");
                  const data = res.data;
                  if(data[0].status=="success")
                    alert("Question added successfully");
                  else{
                    alert("Question failed");
                  }
                  //fetchSubjects();
                })
        }
       
        
     
 
  function fetchDoctors()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/doctor')
            .then((res)=>{
              const data = res.data;
              setDoctor(data);
            });
    }
    function fetchSubjects()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/subject')
            .then((res)=>{
              const data = res.data;
              setSubject(data);
            });
    }
    useEffect(()=>{
      fetchDoctors()
    },[])
    useEffect(()=>{
      fetchSubjects()
    },[])
    return(
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

            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Add Question</h4>

              <div className="row">
                <div className="col-md-9">
                  <div className="card mb-4">
                    {/* <h5 className="card-header">Add Questions</h5> */}
                    <div className="card-body demo-vertical-spacing demo-only-element">
                        <div>
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Title</label>
                            <JoditEditor
                                ref={editor}
                                value={title}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={title => setContent(title)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {}}
                            />
                          </div>
                        <div>
                            <label htmlFor="defaultFormControlInput" className="form-label">Answer Option</label>
                            <input
                              type="text"
                              className="form-control"
                              id="defaultFormControlInput"
                              placeholder=""
                              aria-describedby="defaultFormControlHelp"
                              value={answer_option}
                              onChange={answer_option=>setAnsweroption(answer_option.target.value)}
                            />
                            
                          </div>
                          <div>
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Exaplaination</label>
                            <JoditEditor
                                ref={editor}
                                value={explanation}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={explanation => setExplain(explanation)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {}}
                            />
                          </div>
                          <label for="defaultFormControlInput" class="form-label">Question Mode</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder=""
                              aria-describedby="defaultFormControlHelp"
                              value={qmode}
                              onChange={qmode=>setQmode(qmode.target.value)}
                            />
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Doctor Name</label>
                            <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example" value={doctor_id}
                              onChange={doctor_id=>setDoctorname(doctor_id.target.value)}>
                            <option value="">Select Doctor Name</option>
                            {
                        doctor.map((obj)=>{
                        return(
                    
                              <option value={obj.id}>{obj.name}</option>
                        )
                        })
                            }
                            </select>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Subject Name</label>
                            <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example" value={sub_id}
                              onChange={sub_id=>setSubjectname(sub_id.target.value)}>
                            <option value="">Select Subject Name</option>
                            {
                        subject.map((obj)=>{
                        return(
                    
                              <option value={obj.id}>{obj.name}</option>
                        )
                        })
                            }
                            </select>
                          </div>

                      <div className="mb-3">
                      <button class="btn btn-primary d-grid w-100" type="button" style={{backgroundColor: '#188ccc'}} onClick={storeQuestion}>Store</button>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>

              

             
              

              
            </div>
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                
              </div>
            </footer>

            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>

      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
    )
}

export default Questions;