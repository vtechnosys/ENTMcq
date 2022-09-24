import React, { useState, useEffect } from "react";
import axios from "axios";
import { isEmail } from "../validators/Validations";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailError, setEmailError] = useState(false);
    const [isPasswordError, setPasswordError] = useState(false);
    const warn = { borderWidth: 1, borderColor: '#f44336' }
    const nowarn = { borderWidth: 1, borderColor: '#d9dee3' }

    function handleSubmit() {
        console.log(username);
        console.log(password);
        if (!isEmail(username)) {
            toast.error('Invalid Login Details');
            setUsername('');
            setPassword('');
            setEmailError(true);
        }
        if (!password) {
            setPasswordError(true)
        }
        else {
            const Login ={
                uname:username,
                pass:password
            };
            axios.post('https://entmcq.vertextechnosys.com/api/logincheck', Login)
                .then((res) => {
                    console.log(res);
                    //alert("Subject added successfully");
                    const data = res.data;
                    const type = data[0].type;
                    if (data[0].status == "success" && data[0].type == "admin") {

                        // storing input name
                        localStorage.setItem("type", JSON.stringify(type));
                        localStorage.setItem('toast', true);
                        //alert(name);

                        toast('Login Successfull');
                        window.location.href = '/';
                    } else if (data[0].status == "success" && data[0].type == 'doctor') {

                        // storing input name
                        localStorage.setItem("type", JSON.stringify(type));
                        //alert(name);

                        toast('Login Successfull');
                        window.location.href = '/';
                    }
                    else {
                        toast.error('Invalid Login Details');
                    }
                    //fetchSubjects();
                })
        }
    }
    function AddLibrary(urlOfTheLibrary) {
        const script = document.createElement('script');
        script.src = urlOfTheLibrary;
        script.async = true;
        document.body.appendChild(script);
    }
    function AddCC(urlOfTheLibrary) {
        const script = document.createElement('link');
        script.href = urlOfTheLibrary;
        script.rel = "stylesheet";
        script.type = "text/css";
        document.head.appendChild(script);
    }
    return (
        <React.Fragment>
            {AddCC('/assets/vendor/css/pages/page-auth.css')}
            <div class="container-xxl">
                <div class="authentication-wrapper authentication-basic container-p-y">
                    <div class="authentication-inner">
                        <div class="card">
                            <div class="card-body">
                                <div class="app-brand justify-content-center">
                                    <a href="index.html" class="app-brand-link gap-2">
                                        <span class="app-brand-logo demo">
                                            <img src="/assets/img/icons/entmcq.png" className="app-brand-logo demo" style={{ height: 80, width: 86 }} />
                                        </span>

                                    </a>
                                </div>
                                <h4 class="mb-4">Welcome to ENTMCQ Admin</h4>



                                <div class="mb-3">
                                    <label for="email" class="form-label">Email or Username</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="email"
                                        name="email-username"
                                        placeholder="Enter your email or username"
                                        autofocus
                                        style={isEmailError ? warn : nowarn}
                                        value={username}
                                        onChange={(username) => setUsername(username.target.value)}
                                    />
                                </div>
                                <div class="mb-3 form-password-toggle">
                                    <div class="d-flex justify-content-between">
                                        <label class="form-label" for="password">Password</label>

                                    </div>
                                    <div class="input-group input-group-merge">
                                        <input
                                            type="password"
                                            id="password"
                                            class="form-control warn"
                                            name="password"
                                            aria-describedby="password"
                                            style={isPasswordError ? warn : nowarn}
                                            value={password} onChange={password => setPassword(password.target.value)}
                                        />
                                        <span class="input-group-text cursor-pointer warn" style={isPasswordError ? warn : nowarn}><i class="bx bx-hide"></i></span>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <button class="btn btn-primary d-grid w-100" type="submit" onClick={handleSubmit}>Sign in</button>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
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

export default Login