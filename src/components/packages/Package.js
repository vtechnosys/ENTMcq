import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Headerpanel from '../Headerpanel';
import { ToastContainer, toast } from 'react-toastify';
import { Triangle } from 'react-loader-spinner';

import 'react-toastify/dist/ReactToastify.css';
function Package() {
  const [error, setError] = useState(false);
  const [service, setServices] = useState([]);
  // const [questionbank,setQuestionBank]=useState([]);
  const [packages, setPackage] = useState([]);
  const [service_include, setService] = useState('');
  const [package_name, setPackagename] = useState('');
  const [pricing, setPrice] = useState('');
  const [discount, setDiscount] = useState('0');
  const [duration, setDuration] = useState('10');
  const [subjects, setSubject] = useState('');
  const [serid, setSerid] = useState('');
  const [questionb, setQuestionb] = useState('');
  const [isPackageError, setPackageError] = useState(false);
  const [isPriceError, setPriceError] = useState(false);
  const [isDiscountError, setDiscountError] = useState(false);
  const [isSubjectError, setSubjectError] = useState(false);
  const warn = { borderWidth: 1, borderColor: '#f44336' }
  const nowarn = { borderWidth: 1, borderColor: '#d9dee3' }
  const [userinfo, setUserInfo] = useState({
    services: [],
    response: [],
  });
  const [userinfo1, setUserInfo1] = useState({
    subjects: [],
    response: [],
  });

  const [showProcess, setShowProcess] = useState(false);
  const noStyle = {
    display: 'none',
  }

  const yesStyle = {
    display: 'block',
  }

  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { services } = userinfo;

    console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        services: [...services, value],
        response: [...services, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        services: services.filter((e) => e !== value),
        response: services.filter((e) => e !== value),
      });
    }
  };
  const handleChangesubject = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { subjects } = userinfo1;

    console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo1({
        subjects: [...subjects, value],
        response: [...subjects, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setUserInfo1({
        subjects: subjects.filter((e) => e !== value),
        response: subjects.filter((e) => e !== value),
      });
    }
  };
  const ft = userinfo.response;
  function storeSubject() {
    if (package_name == "") {
      toast.error('Enter Package Name');
      setPackagename();
      setPackageError(true)
    } else if (pricing == "") {
      toast.error('Enter Pricing');
      setPrice();
      setPriceError(true)
    } else if (discount == "") {
      toast.error('Enter Discount');
      setDiscount();
      setDiscountError(true)
    } else {
      //alert("valid")
      const subData = {
        package_name: package_name,
        service_include: ft,
        pricing: pricing,
        discount: discount,
        subjects: userinfo1.response,
        duration: duration,

      };
      // console.log(subData);
      setShowProcess(true);
      axios.post('https://entmcq.vertextechnosys.com/api/package', subData)
        .then((res) => {
          console.log(res);
          //alert("Subject added successfully");
          const data = res.data;
          if (data[0].status == "success")
            window.location.href = "/packages";
          else {
            toast.error('Invalid Login Details');
          }
          setShowProcess(false)
          //featchSubject();
        })


    }
  }
  function featchPackage() {
    setShowProcess(true)
    axios.get('https://entmcq.vertextechnosys.com/api/package')
      .then((res) => {
        const data = res.data;
        setPackage(data);
        setShowProcess(false)
      })
  }
  function featchService() {
    setShowProcess(true)
    axios.get('https://entmcq.vertextechnosys.com/api/service')
      .then((res) => {
        const data = res.data;
        setServices(data);
        setShowProcess(false)
      })
  }


  
  function AddLibrary(urlOfTheLibrary) {
    const script = document.createElement('script');
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
  }
  useEffect(() => {
    featchService()
  }, [])
  useEffect(() => {
    featchPackage()
  }, [])
  // useEffect(()=>{
  //   featchQuestionBank()
  // },[])
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
                <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Package</h4>

                <div class="row">

                  <div class="col-md-12">
                    <div class="card mb-4">
                      <h5 class="card-header">Add Package</h5>
                      <div class="card-body demo-vertical-spacing demo-only-element">

                        {/* <div>
                        <label for="defaultFormControlInput" class="form-label">Question Bank</label>
                            <select
                            class="form-select" 
                            id="exampleFormControlSelect1" 
                            aria-label="Default select example"
                            onChange={questionb => setQuestionb(questionb.target.value)}
                            value={questionb}
                          >
                            <option value="">Select Question Bank Name</option>
                            {
                              questionbank.map((obj)=>{
                              return (
                                <option value={obj.qid}>{obj.qname}</option>
                                )
                              })
                            }
                          
                          </select>
                        </div> */}
                        <div>
                          <input type="hidden" value="" />
                          <label for="defaultFormControlInput" class="form-label">Package Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="defaultFormControlInput"
                            placeholder=""
                            aria-describedby="defaultFormControlHelp"
                            value={package_name}
                            style={isPackageError ? warn : nowarn}
                            onChange={(packagename) => {
                              setPackagename(packagename.target.value)
                              setPackageError(false)
                            }}
                          />
                        </div>


                        <div>

                          <label for="defaultFormControlInput" class="form-label">Pricing</label>
                          <input
                            type="text"
                            class="form-control"
                            id="defaultFormControlInput"
                            placeholder=""
                            aria-describedby="defaultFormControlHelp"
                            value={pricing}
                            onChange={(pricing) => {
                              setPrice(pricing.target.value)
                              setPriceError(false)
                            }}
                            style={isPriceError ? warn : nowarn}
                          />
                        </div>
                        <div>

                          <label for="defaultFormControlInput" class="form-label">No. of Questions</label>
                          <input
                            type="text"
                            class="form-control"
                            id="defaultFormControlInput"
                            placeholder=""
                            aria-describedby="defaultFormControlHelp"
                            value={discount}
                            onChange={(discount) => {
                              setDiscount(discount.target.value)
                              setDiscountError(false)
                            }}
                          />
                        </div>
                        <div>

                          <label for="defaultFormControlInput" class="form-label">Duration (in days)</label>
                          <input
                            type="text"
                            class="form-control"
                            id="defaultFormControlInput"
                            placeholder=""
                            aria-describedby="defaultFormControlHelp"
                            value={duration}
                            onChange={(duration) => {
                              setDuration(duration.target.value)
                            }}
                          />
                        </div>
                        <div>
                          <label for="defaultFormControlInput" class="form-label">Service Name</label>
                          <FormGroup>

                            {
                              service.map((obj) => {
                                return (
                                  <FormControlLabel control={<Checkbox />} label={obj.service_name} value={obj.id} name="services" id="flexCheckDefault" onChange={handleChange} />
                                )
                              })
                            }
                          </FormGroup>

                        </div>



                        <div class="mb-3">
                          <button class="btn btn-primary d-grid w-100" type="button" style={{ backgroundColor: '#188ccc' }} onClick={storeSubject}>Store</button>
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
  );
}

export default Package;
