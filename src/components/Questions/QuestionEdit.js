import React, { useState, useRef, useMemo, useEffect }  from 'react';
import Header from "../Header";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import axios from 'axios';
import Headerpanel from '../Headerpanel';
import {useParams} from 'react-router-dom'
import {Triangle} from 'react-loader-spinner';
import TableRows from '../ui/TableRows';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { queryByDisplayValue } from '@testing-library/react';


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
  const [error, setError] = useState(false)
  const [rowsData, setRowsData] = useState([{ans:'',setans:false}]);
  const [trial,setTrial]=useState('');

  
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
            
            setTrial(data.trial);
            setRowsData(JSON.parse(data.answer_option));
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
      id:qid.qid,  
      title:title,
      qtitle:qtitle,
      answer_option:rowsData,
      explain:explain,
      doctor_id:'20',
      qmode:level,
      sub_id:subid,
      trial:trial,
      status:qstatus,
    }
    console.log(qusData);
    
    axios.put('https://entmcq.vertextechnosys.com/api/question/'+qid.qid,qusData)
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

  const addTableRows = () => {

    const rowsInput = {
      ans: '',
      setans:false

    }
    setRowsData([...rowsData, rowsInput])

  }
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  }

  const handleChange = (index, evnt) => {

    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    console.log(value)
    console.log(rowsInput);
    setRowsData(rowsInput);



  }
  const handleChangesetevent = (index)=>{
  // const {name, value } = index;
    const rowsInput = [...rowsData];
    
    
    
    //const rows = [...rowsData];
    //rows.splice(index, 1);
    
    //console.log(rowsInput.setans);
   // console.log(index.ans);
    var ft='';
    var rowele='';
    var kp='';

    const newState = rowsInput.map((obj)=>{
      ft=obj.ans;
      
      
      rowele=rowsInput[index]['ans'];
      
    //  console.log(ft);
    //  console.log(rowele);
      
      if(rowele === ft)
      {
        return {...obj,setans:true};
        
      }
      else
      {
        return {...obj,setans:false};
        //kp=rowsInput[index]['setans']=false;
        
        
      }
      return obj;  

    });
    setRowsData(newState)

    console.log(rowsData);
        

    
      //setRowsData(newState);
       // console.log(ft);
        //console.log(rows);
        
        
    
    //console.log(rowsInput);
    //console.log(rowsInput);
    
  };


  
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
                <div className="col-md-12">
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
                            <option value="">Select Subject</option>
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
                          {/* <label htmlFor="exampleFormControlSelect1" className="form-label">Answers</label> */}

                          {/* <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example"
                            onChange={qstatus => setQstatus(qstatus.target.value)}
                            value={qstatus}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select> */}
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Add Answers</th>
                                <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                              </tr>
                            </thead>
                            <tbody>
                              <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} handleChangesetevent={handleChangesetevent}/>
                            </tbody>
                          </table>
                        </div>
                        <label htmlFor="exampleFormControlSelect1" className="form-label" style={{ marginTop: 20, }}>Trial</label>
                        <div className="col-sm-2 mb-3">

                          <input type='radio' name='trial' id="exampleFormControlSelect1" aria-label="Default select example"
                            onChange={trial => setTrial(trial.target.value)}
                            value="trial" checked={trial == "trial"} /> Yes

                        </div>
                        <div className="col-sm-2 mb-3">

                          <input type='radio' name='trial' id="exampleFormControlSelect1" aria-label="Default select example"
                            onChange={trial => setTrial(trial.target.value)}
                            value='No' checked={trial == "No"}/> No
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