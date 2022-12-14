import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Headerpanel from '../Headerpanel';
import { ToastContainer, toast } from 'react-toastify';
import { Triangle } from 'react-loader-spinner';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import 'react-toastify/dist/ReactToastify.css';
function AddQb() {

  const [fromDate, setFromDate] = useState(() => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    let separator = "-";
    let dt = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
    return dt;
  })

  const [toDate, setToDate] = useState(() => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    let separator = "-";
    let dt = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
    return dt;
  })
  const [category, setCategory] = useState([]);
  const [packages, setPackages] = useState([]);
  const [datavalue, setDatavalue] = useState([]);
  const [getqval,setGetQvalue]=useState([]);
  const [cateid, setCateid] = useState('');
  const [qname, setQname] = useState('mock');
  const [tm, setTm] = useState('10');
  const [no_question, setNoquestion] = useState('');
  const [error, setError] = useState(false);
  const [sid, setSid] = useState('');
  const [isCateError, setCateError] = useState(false);
  const [isQnameError, setQnameError] = useState(false);
  const [isNoQError, setNoQError] = useState(false);
  const warn = { borderWidth: 1, borderColor: '#f44336' }
  const nowarn = { borderWidth: 1, borderColor: '#d9dee3' }
  const [showProcess, setShowProcess] = useState(false);
  const [rowsData, setRowsData] = useState([{id:'',qtitle:'',select:false}]);
  const noStyle = {
    display: 'none',
  }

  const yesStyle = {
    display: 'block',
  }
  const [userinfo, setUserInfo] = useState({
    services: [],
    response: [],
  });
const lengtharr=rowsData.length;
  
  function Addquestionbank() {
    if (qname == "") {
      toast.error('Enter Question Name');
      setQname('');
      setQnameError(true)
    }
    else if (cateid == "") {
      toast.error('Enter Category Name');
      setCateid();
      setCateError(true)
    }
    else {
      const subData = {
        qname: qname,
        subs: rowsData,
        cate_id: cateid,
        no_of_question: lengtharr,
        tm: tm,
        fdate: fromDate,
        tdate: toDate
      };
      setShowProcess(true);
      // console.log(subData);
      axios.post('https://entmcq.vertextechnosys.com/api/questionbank', subData)
        .then((res) => {
          console.log(res);
          //alert("Subject added successfully");
          const data = res.data;
          if (data[0].status == "success") {
            // alert("Question Bank added successfully");
            window.location.href = '/quetionbank';
          }
          else {
            toast.error('Invalid Details');
          }
          setShowProcess(false)

        })
        .error((res) => {
          setShowProcess(false)
          console.log(res);
        })
    }

  }
  function fetchPackages() {
    axios.get('https://entmcq.vertextechnosys.com/api/packages')
      .then((res) => {
        const data = res.data;
        setPackages(data);
      })
  }
  function fetchCategory() {
    axios.get('https://entmcq.vertextechnosys.com/api/fetchCategory')
      .then((res) => {
        const data = res.data;
        setCategory(data);
        // console.log(data);
        var cdata = [];
        data.map((obj) => {
          cdata.push({
            id: obj.id,
            cname: obj.name,
            n: "1"
          })
        })
        setDatavalue(cdata);
        // console.log(datavalue);
      })
  }
  function handleNQuestions(id, n) {
    var tdata = []
    datavalue.map((obj) => {
      if (obj.id == id) {
        obj.n = n;
      }
      tdata.push(obj);
    })
    //console.log(datavalue);
    setDatavalue(tdata);
  }
  function AddLibrary(urlOfTheLibrary) {
    const script = document.createElement('script');
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
  }
  const handleChange = (e) => {
    //const {value}=e.target;
    var qtype=qname;
    var ptype=e.target.value;
    setCateid(ptype);
    axios.get("https://entmcq.vertextechnosys.com/api/getquestion?qtype="+qtype+"&ptype="+ptype+"")
    
      .then((res) => {
        const data = res.data;
        var cdata = [];
        data.map((obj) => {
          cdata.push({
            id: obj.id,
            qtitle: obj.qtitle,
            select: false
          })
        })
        setRowsData(cdata);
        setGetQvalue(data);
        
      })
    
  };
  const handleChangeq = (e) => {
    //const {value}=e.target;
    var ptype=cateid;
    var qtype=e.target.value;
    setQname(qtype);
    axios.get("https://entmcq.vertextechnosys.com/api/getquestion?qtype="+qtype+"&ptype="+ptype+"")
    
      .then((res) => {
        const data = res.data;
        var cdata = [];
        data.map((obj) => {
          cdata.push({
            id: obj.id,
            qtitle: obj.qtitle,
            select: false
          })
        })
        setRowsData(cdata);
        setGetQvalue(data);
        
      })
    
  };
  const handleChangequestion = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { services } = userinfo;

    var ft='';
    var qid="";
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        services: [...services, value],
        response: [...services, value],
      });
    qid=value;

      const newState = rowsData.map((obj)=>{
        ft=obj.id;
         if(qid==ft)
         {
           return {...obj,select:true};
        }
        
      });
      console.log(newState);
    }
    else {
      setUserInfo({
        services: services.filter((e) => e !== value),
        response: services.filter((e) => e !== value),
      });
    }

  
  };
 //console.log(userinfo.response);
  const handleChangesetevent = (index)=>{
    // const {name, value } = index;
      const rowsInput = [...rowsData];
      
      var ft='';
      var rowele='';
      var kp='';
  
      const newState = rowsInput.map((obj)=>{
        ft=obj.qtitle;
        
        
        rowele=rowsInput[index]['qtitle'];
        
        if(rowele === ft)
        {
          return {...obj,setans:true};
              
        }
        
        return obj;  
  
      });
      setRowsData(newState)
  
      console.log(rowsData);
          
    };


  useEffect(() => {
    fetchCategory();
    fetchPackages();
    
  }, [])
  return (
    <React.Fragment>
      {showProcess && (<div style={{ marginTop: 20 + "%", justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <Triangle
          height="80%"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{ justifyContent: 'center', alignContent: 'center' }}
          visible={showProcess}
        />
      </div>)}

      <div className="layout-wrapper layout-content-navbar" style={showProcess ? noStyle : yesStyle}>
        <div class="layout-container">


          <Header />
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
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => { setError(false) }}></button>
            </div>
            <div class="toast-body">somefields are empty</div>
          </div>)}
          <div class="layout-page">

            <Headerpanel />
            <div class="content-wrapper">


              <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Question Bank</h4>

                <div class="row" style={{ justifyContent: 'center' }}>

                  <div class="col-md-9">
                    <div class="card mb-4">
                      <h5 class="card-header">Add Bank</h5>
                      <div class="card-body demo-vertical-spacing demo-only-element">
                        <div>
                          <input type="hidden" value={sid} />
                          <label for="defaultFormControlInput" class="form-label">Question type</label>
                          {/* <input
                            type="text"
                            class="form-control"
                            id="defaultFormControlInput"
                            placeholder=""
                            aria-describedby="defaultFormControlHelp"
                            value={qname}
                            onChange={(qname) => {
                              setQname(qname.target.value)
                              setQnameError(false)
                            }}
                            style={isQnameError ? warn : nowarn}
                          /> */}
                          <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example" onChange={(e)=>{handleChangeq(e)}}
                            value={qname} style={isQnameError ? warn : nowarn}>
                            <option key="mock" value="Mock">Mock</option>
                            <option key="quick" value="Quick">Quick</option>
                          </select>
                        </div>
                        {/* <div>
                          <label for="defaultFormControlInput" class="form-label">Number Of Question</label>
                          <input
                            type="text"
                            class="form-control"
                            id="defaultFormControlInput"
                            placeholder=""
                            aria-describedby="defaultFormControlHelp"
                            value={no_question}
                            onChange={no_question => setNoquestion(no_question.target.value)}
                            style={isNoQError ? warn : nowarn}
                          />
                        </div> */}
                        <div className="mb-3">
                          <label htmlFor="exampleFormControlSelect1" className="form-label">Package</label>
                          <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example" onChange={(e)=>{handleChange(e)}}
                            value={cateid} style={isCateError ? warn : nowarn}>
                            <option value="">Select package</option>
                            {
                              packages.map((obj) => {
                                return (
                                  <option value={obj.package_name} key={obj.id}>{obj.package_name}</option>
                                )
                              })
                            }
                          </select>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="exampleFormControlSelect1" className="form-label">Quiz Time (in mins.)</label>
                          <div class="col-md-10">
                            <input class="form-control" type="text" value={tm} id="html5-date-input" onChange={(tm) => {
                              //console.log(dt.target.value)
                              setTm(tm.target.value)
                            }} />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="exampleFormControlSelect1" className="form-label">Start Date</label>
                          <div class="col-md-10">
                            <input class="form-control" type="date" value={fromDate} id="html5-date-input" onChange={(dt) => {
                              //console.log(dt.target.value)
                              setFromDate(dt.target.value)
                            }} />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="exampleFormControlSelect1" className="form-label">End Date</label>
                          <div class="col-md-10">
                            <input class="form-control" type="date" value={toDate} onChange={(dt) => {
                              //console.log(dt.target.value)
                              setToDate(dt.target.value)
                            }} id="html5-date-input" />
                          </div>
                        </div>

                        <div className='mb-3'>
                          <div class="table-responsive text-nowrap">
                            <table class="table table-bordered">
                              <thead>
                                <tr>
                                  <th>Question Title</th>
                                  <th>Select</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  getqval.map((obj) => {
                                    return (
                                      <tr>
                                        <td>{obj.qtitle}</td>
                                        <td><FormGroup>

      <FormControlLabel control={<Checkbox />} value={obj.id} name="services" id="flexCheckDefault" onChange={handleChangequestion} />
  
</FormGroup></td>
                                      </tr>
                                    )
                                  })
                                }

                              </tbody>
                            </table>
                          </div>

                        </div>


                        <div class="mb-3">
                          <button class="btn btn-primary d-grid w-100" type="button" style={{ backgroundColor: '#188ccc' }} onClick={Addquestionbank}>Store</button>
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

export default AddQb;