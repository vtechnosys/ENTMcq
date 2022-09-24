import React, { useState, useRef, useMemo, useEffect }  from 'react';
import Header from "../Header";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import axios from 'axios';
import Headerpanel from '../Headerpanel';
import {useParams} from 'react-router-dom'
import {Triangle} from 'react-loader-spinner';



function QuestionEdit(){
    const qid = useParams();
  const [subjects, setSubjects] = useState([]);
  const [subid,setSubid] = useState('');
  const [title,setTitle] = useState('');
  const [qtitle,setQTitle] = useState('');
  const [explain,setExplain] = useState('');
  const [qstatus,setQstatus] = useState('');
  const [level,setLevel] = useState('');
  const [showProcess,setShowProcess] = useState(true);

  function fetchSubject()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/subject')
            .then((res)=>{
              const data = res.data;
              setSubjects(data);
              setShowProcess(false);
            })
    }
    function fetchQuestion()
    {
        axios.get('https://entmcq.vertextechnosys.com/api/question/'+qid.qid)
        .then((res)=>{
            const data = res.data;
            setTitle(data.title);
            setExplain(''+data.explanation);
            setQTitle(data.qtitle);
            setLevel(data.qmode);
            //setExplain('welcome')
            setQstatus(data.status);
            setSubid(data.sub_id);
            // console.log(explain);
            // console.log(qid)
        })

    }
    
  function handleTitleChange(content)
  {
    setTitle(content);
    //console.log(content);
  }

  function handleExplainChnage(content){
    setExplain(content);
  }

  function handleClick()
  {
    const qusData = {
        id:qid,
      title:title,
      qtitle:qtitle,
      answer_option:'a',
      explain:explain,
      doctor_id:'20',
      qmode:level,
      sub_id:subid,
    }
    axios.put('https://entmcq.vertextechnosys.com/api/question/'+qid,qusData)
        .then((resp)=>{
          const data = resp.data;
          console.log(data)
          if(data.status=='success')
          {
            alert('updated');
            window.location.href='/viewQuestions';
          }
        })
  }

  
  function AddLibrary(urlOfTheLibrary) {
    const script = document.createElement('script');
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
  }

  const noStyle={
    display:'none',
  }

  const yesStyle={
    display:'block',
  }

  

  useEffect(()=>{
    fetchSubject();
    fetchQuestion();
    console.log(showProcess)
  },[]);



    return(
      <React.Fragment>
        {showProcess && (<div style={{marginTop:20+"%",justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        <Triangle
          height="80%"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{justifyContent:'center',alignContent:'center'}}
          visible={showProcess}
        />
        </div>)}
        <div className="layout-wrapper layout-content-navbar" style={showProcess?noStyle:yesStyle}>
        
      <div className="layout-container">

        <Header/>
        <div className="layout-page">

          <Headerpanel/>
          <div className="content-wrapper">

            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Questions /</span> Edit Question</h4>
              
              <div className="row">
                <div className="col-md-9">
                  <div className="card mb-4">
                    <h5 className="card-header">Add Questions</h5>
                    <div className="card-body  demo-only-element row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Subject</label>
                            <select
                              class="form-select" 
                              id="exampleFormControlSelect1" 
                              aria-label="Default select example"
                              onChange={subid => setSubid(subid.target.value)}
                              value={subid}
                            >
                            <option value="">Select Subject Name</option>
                            {
                              subjects.map((obj)=>{
                              return (
                                <option value={obj.id}>{obj.name}</option>
                                )
                              })
                            }
                            
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="exampleFormControlSelect1" className="form-label" >Question Title</label>
                            <input type='text'
                              class="form-control" 
                              id="exampleFormControlSelect1" 
                              aria-label="Default select example"
                              style={{width:100+'%'}}
                              onChange={qtitle => setQTitle(qtitle.target.value)}
                              value={qtitle}
                            />
                            
                        </div>
                        <div>
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Question</label>
                            
                            <SunEditor setOptions={{height:700,}} setContents={title} style={{height:200,}} onChange={handleTitleChange} />
                          </div>
                        {/* <div>
                            <label htmlFor="defaultFormControlInput" className="form-label">Answer Option</label>
                            <input
                              type="text"
                              className="form-control"
                              id="defaultFormControlInput"
                              placeholder="Answer Option A,B,..."
                              aria-describedby="defaultFormControlHelp"
                            />
                            
                        </div> */}
                          <div>
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Exaplaination</label>
                            {/* <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {}}
                            /> */}
                            <SunEditor setContents={explain} setOptions={{height:700,}}  style={{height:200,}} onChange={handleExplainChnage} />
                          </div>
                          <label htmlFor="exampleFormControlSelect1" className="form-label" style={{marginTop:20,}}>Difficulty level</label>
                          <div className="col-sm-4 mb-3">
                            
                            <input type='radio' name='level' id="exampleFormControlSelect1" aria-label="Default select example" 
                              onChange={level =>setLevel(level.target.value)}
                              value="hard"
                              checked={level == "hard"}
                              /> Hard
                              
                          </div>
                          <div className="col-sm-4 mb-3">
                            
                          <input type='radio' name='level'  id="exampleFormControlSelect1" aria-label="Default select example" 
                              onChange={level =>setLevel(level.target.value)}
                              value='moderate'
                              checked={level == "moderate"}
                              /> Moderate
                          </div>
                          <div className="col-sm-4 mb-3">
                            
                          <input type='radio' name='level'  id="exampleFormControlSelect1" 
                              onChange={level =>setLevel(level.target.value)}
                              value='easy'
                              checked={level == "easy"}
                              /> Easy
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Status</label>
                            <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example" 
                              onChange={qstatus =>setQstatus(qstatus.target.value)}
                              value={qstatus}>
                              <option value ="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>

                      <div className="mb-3">
                        <button className="btn btn-primary d-grid w-100" type="submit" style={{backgroundColor: "#188ccc"}} onClick={handleClick}>Submit</button>
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
    {AddLibrary("/assets/vendor/libs/jquery/jquery.js")}
    {AddLibrary("/assets/vendor/libs/popper/popper.js")}
    {AddLibrary("/assets/vendor/js/bootstrap.js")}
    {AddLibrary("/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js")}
    {AddLibrary("/assets/vendor/js/menu.js")}
    
    {AddLibrary("/assets/vendor/libs/apex-charts/apexcharts.js")}
    {AddLibrary("/assets/js/main.js")}
    {AddLibrary("/assets/js/dashboards-analytics.js")}
    </React.Fragment>
    )

}

export default QuestionEdit;