import React from 'react';
function Doctorheader () {
    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
        <div className="app-brand demo">
          <a href="index.html" className="app-brand-link">
              <img src="assets/img/icons/ent.png" className="app-brand-logo demo" style={{height:50,width:70}}/>
              <span className="app-brand-text demo menu-text fw-bolder ms-2" style={{textTransform: 'capitalize',fontSize:20}}>ENT-MCQ</span>
          </a>

          <a href="#" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
         
          <li className="menu-item active">
            <a href="/" className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div data-i18n="Analytics">Dashboard</div>
            </a>
          </li>

         
          <li className="menu-item">
            <a href="/doctorquestions" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-cube-alt"></i>
              <div data-i18n="Authentications">Questions</div>
            </a>
            {/* <ul className="menu-sub">
              <li className="menu-item">
                <a href="auth-login-basic.html" className="menu-link" target="_blank">
                  <div data-i18n="Basic">Login</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="auth-register-basic.html" className="menu-link" target="_blank">
                  <div data-i18n="Basic">Register</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="auth-forgot-password-basic.html" className="menu-link" target="_blank">
                  <div data-i18n="Basic">Forgot Password</div>
                </a>
              </li>
            </ul> */}
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-cube-alt"></i>
              <div data-i18n="Authentications">Answer</div>
            </a>
          </li>
         
          
          
          
        </ul>
      </aside>
    );
}

export default Doctorheader;
