import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Headerpanel from "../Headerpanel";

function Admin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sid, setSid] = useState('');
  const [admin, setAdmin] = useState([])
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  function storeAdmin() {
    if (name === '' || email === '' || password === '') {
      if (validate()) {
        //alert("valid")
        const subData = {
          name: name,
          email: email,
          password: password
        };
        axios.post('https://entmcq.vertextechnosys.com/api/admin', subData)
          .then((res) => {
            console.log(res);
            //alert("Subject added successfully");
            const data = res.data;
            if (data[0].status == "success")
              alert("Admin added successfully");
            else {
              alert("Admin failed");
            }
            //fetchAdmins();
          })
      }
      else {
        //alert("somefields are empty");
        setError(true);
      }

    }
    else {
      const subData = {
        id: sid,
        name: name,
        email: email,
        password: password

      };
      axios.put('https://entmcq.vertextechnosys.com/api/admin/' + sid, subData)
        .then((res) => {
          console.log(res);
          //alert("Subject added successfully");
          const data = res.data;
          if (data[0].status == "success") {
            alert("Admin Updated successfully");
            setSid('');
            setName('');
            setEmail('');
            setPassword('')
          }

          else {
            alert("Admin failed");
          }
          //fetchAdmins();
        })
    }
  }
  function validate() {
    if (!name) {
      return false;
    }
    else if (!email) {
      return false;
    } else if (!password) {
      return false;
    }
    return true;
  }


  function editOption(id) {
    setSid(id);
    //alert(id)
    axios.get('https://entmcq.vertextechnosys.com/api/admin/' + id)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setName(data.name);
        setEmail(data.email)
        setPassword(data.password)
        setSid(data.id)
        //setSubjects(data);
      })
  }

  function deleteOption(id) {
    axios.delete('https://entmcq.vertextechnosys.com/api/admin/' + id)
      .then((res) => {
        console.log(res);
        //alert("Subject added successfully");
        const data = res.data;
        if (data[0].status == "success") {
          alert("Admin Deleted successfully");

        }

        else {
          alert("Admin Delete failed");
        }
        //fetchAdmins();
      })
  }


  //fetchDoctors();
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
                <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Admin's</h4>

                <div class="row">

                  <div class="col-md-5">
                    <div class="card mb-4">
                      <h5 class="card-header">Add Admin's</h5>
                      <div class="card-body demo-vertical-spacing demo-only-element">

                        <form method="post" onSubmit={storeAdmin}>
                          <div>
                            <input type="hidden" value={sid} />

                            <label for="defaultFormControlInput" class="form-label">Name</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder="John Doe"
                              aria-describedby="defaultFormControlHelp"
                              value={name}
                              onChange={uname => setName(uname.target.value)}
                            />

                          </div>
                          <div>
                            <label for="defaultFormControlInput1" class="form-label">Email</label>
                            <input
                              type="email"
                              class="form-control"
                              id="defaultFormControlInput1"
                              placeholder="abc@abc.com"
                              aria-describedby="defaultFormControlHelp"
                              value={email}
                              onChange={em => setEmail(em.target.value)}
                            />

                          </div>

                          <div class="form-password-toggle">
                            <label class="form-label" for="basic-default-password12">Password</label>
                            <div class="input-group">
                              <input
                                type="password"
                                class="form-control"
                                id="basic-default-password12"
                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                aria-describedby="basic-default-password2"
                                value={password}
                                onChange={ps => setPassword(ps.target.value)}
                              />
                              <span id="basic-default-password2" class="input-group-text cursor-pointer"
                              ><i class="bx bx-hide"></i
                              ></span>
                            </div>
                          </div>

                          <div class="mb-3">
                            <button class="btn btn-primary d-grid w-100" type="submit" style={{ backgroundColor: '#188ccc' }} onClick={storeAdmin}>Store</button>
                          </div>
                        </form>

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
      {AddLibrary("/assets/vendor/libs/jquery/jquery.js")}
      {AddLibrary("/assets/vendor/libs/popper/popper.js")}
      {AddLibrary("/assets/vendor/js/bootstrap.js")}
      {AddLibrary("/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js")}
      {AddLibrary("/assets/vendor/js/menu.js")}
      {AddLibrary("/assets/js/dashboards-analytics.js")}
      {AddLibrary("/assets/vendor/libs/apex-charts/apexcharts.js")}
      {AddLibrary("/assets/js/main.js")}
    </React.Fragment >
  )
}

export default Admin;