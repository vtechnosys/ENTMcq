import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Headerpanel from '../Headerpanel';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function EditQB() {
  const id = useParams();

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
        subs: datavalue,
        cate_id: cateid,
        no_of_question: '',
        tm: tm,
        fdate: fromDate,
        tdate: toDate
      };
      // console.log(subData);
      axios.put('https://entmcq.vertextechnosys.com/api/questionbank/' + sid, subData)
        .then((res) => {
          console.log(res);
          //alert("Subject added successfully");
          const data = res.data;
          if (data.status == "success") {

            window.location.href = '/quetionbank';
          }
          else {
            toast.error('Invalid Details');
          }

        })
      // .error((res)=>{
      //   console.log(res);
      // })
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

  function editOption(id) {
    setSid(id.id);
    console.log(sid);
    //alert(id);
    axios.get('https://entmcq.vertextechnosys.com/api/questionbank/' + id.id)
      .then((res) => {
        const data = res.data;
        //alert(data);

        console.log(data);
        setQname(data.qname);
        // setNoquestion(data.no_of_question);
        setFromDate(data.fdate);
        setToDate(data.tdate);
        setTm(data.time);
        setDatavalue(JSON.parse(data.sub_id))
        setCateid(data.cate_id);

      })

  }

  function AddLibrary(urlOfTheLibrary) {
    const script = document.createElement('script');
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
  }
  useEffect(() => {
    fetchPackages()
    editOption(id)
  }, [])
  return (
    <React.Fragment>
      <div class="layout-wrapper layout-content-navbar">
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

                  <div class="col-md-6">
                    <div class="card mb-4">
                      <h5 class="card-header">Edit Bank</h5>
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
                          <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example" onChange={(qname) => {
                            setQname(qname.target.value)
                            setQnameError(false)
                          }}
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
                          <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example" onChange={(cateid) => {
                            setCateid(cateid.target.value)
                            setCateError(false)
                          }}
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
                                  <th>Name</th>
                                  <th>No. Of Questions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  datavalue.map((obj) => {
                                    return (
                                      <tr>
                                        <td>{obj.cname}</td>
                                        <td><input
                                          type="text"
                                          class="form-control"
                                          id="defaultFormControlInput"
                                          placeholder=""
                                          aria-describedby="defaultFormControlHelp"
                                          value={obj.n}
                                          onChange={(n) => {
                                            handleNQuestions(obj.id, n.target.value)

                                          }}
                                        /></td>
                                      </tr>
                                    )
                                  })
                                }

                              </tbody>
                            </table>
                          </div>

                        </div>


                        <div class="mb-3">
                          <button class="btn btn-primary d-grid w-100" type="button" style={{ backgroundColor: '#188ccc' }} onClick={Addquestionbank}>Update</button>
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

export default EditQB;