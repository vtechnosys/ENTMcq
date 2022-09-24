import React, { useState,useEffect } from 'react';
import Header from "../Header";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Headerpanel from '../Headerpanel';

function EditAnswers(){
    
    const aid = useParams();
    const [qid,setQid] = useState('');
    const [ans,setAns] = useState('');


    function fetchAns()
    {
        //console.log(aid.aid);
        axios.get('https://entmcq.vertextechnosys.com/api/answer/'+aid.aid)
            .then((res)=>{
                const data = res.data;
                setQid(data.q_id);
                setAns(data.answer);
                console.log(ans);
            })
    }

    function handleTitleChange(content)
  {
    setAns(content);
    //console.log(content);
  }

  function handleClick()
  {
    const qusData = {
        id:aid.aid,
      question_id:qid,
      answer:ans,
      
    }
    console.log(qusData);
    axios.put('https://entmcq.vertextechnosys.com/api/answer/'+aid.aid,qusData)
        .then((resp)=>{
          const data = resp.data;
          //console.log(data)
          if(data.status="success"){
            alert('Answer Updated successfully');
            window.location.href='/viewAnswers/'+qid;
          }
        })
  }
  useEffect(()=>{
    fetchAns();
  },[])
  function AddLibrary(urlOfTheLibrary) {
    const script = document.createElement('script');
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
  }
    return(
      <React.Fragment>
        <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">

        <Header/>
        <div className="layout-page">

          <Headerpanel/>
          <div className="content-wrapper">

            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Dashboard /</span> Answer</h4>

              <div className="row">
                <div className="col-md-9">
                  <div className="card mb-4">
                    <h5 className="card-header">Add Answer</h5>
                    <div className="card-body demo-vertical-spacing demo-only-element">
                        <div>
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Answer</label>
                            <SunEditor setOptions={{height:700,}} setContents={ans} style={{height:300,}} onChange={handleTitleChange} />
                          </div>
                        {/* <div>
                            <label htmlFor="defaultFormControlInput" className="form-label">Answer Option</label>
                            <input
                              type="text"
                              className="form-control"
                              id="defaultFormControlInput"
                              placeholder="John Doe"
                              aria-describedby="defaultFormControlHelp"
                            />
                            
                          </div>
                          <div>
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Exaplaination</label>
                            <SunEditor setOptions={{height:700,}} style={{height:200,}} onChange={handleExplainChnage} />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Status</label>
                            <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example">
                              <option value ="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div> */}

                      <div className="mb-3">
                        <button className="btn btn-primary d-grid w-100" type="button" onClick={handleClick} style={{backgroundColor: "#188ccc"}}>Store</button>
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

export default EditAnswers;