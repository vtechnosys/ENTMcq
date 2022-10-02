import React,{useEffect,useState} from "react";
import { useIdleTimer, workerTimers } from 'react-idle-timer'

function Header()
{
  // Set timeout values
  const timeout = 30 * 1000
  const promptTimeout = 1000 * 30

  // Modal open state
  const [open, setOpen] = useState(false)

  // Time before idle
  const [remaining, setRemaining] = useState(0)

  const onPrompt = () => {
    // onPrompt will be called after the timeout value is reached
    // In this case 30 minutes. Here you can open your prompt. 
    // All events are disabled while the prompt is active. 
    // If the user wishes to stay active, call the `reset()` method.
    // You can get the remaining prompt time with the `getRemainingTime()` method,
    setOpen(true)
    setRemaining(promptTimeout)
  }
  
  const onIdle = () => {
    // onIdle will be called after the promptTimeout is reached.
    // In this case 30 seconds. Here you can close your prompt and 
    // perform what ever idle action you want such as log out your user.
    // Events will be rebound as long as `stopOnMount` is not set.
    setOpen(false)
    setRemaining(0)
    // localStorage.removeItem("type");
    // window.location.href='/login';
  }
  
  const onActive = () => {
    // onActive will only be called if `reset()` is called while `isPrompted()` 
    // is true. Here you will also want to close your modal and perform
    // any active actions. 
    setOpen(false)
    setRemaining(0)
  }

  const { getRemainingTime, isPrompted, activate } = useIdleTimer({
    timeout,
    promptTimeout,
    onPrompt,
    onIdle,
    onActive
  })

 //  const handleStillHere = () => {
 //    setOpen(false)
 //    activate()
 //  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPrompted()) {
        setRemaining(Math.ceil(getRemainingTime() / 1000))
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [getRemainingTime, isPrompted])



  const [type, setType] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("type");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
    
  });
  function islog(){
    //alert(type);
    if(type == "")
    {
      
      window.location.href='/login';
    }
  }
 
  useEffect(()=>{
    islog()
  },[])
    return(
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
          <div className="app-brand demo">
            <a href="index.html" className="app-brand-link">
                <img src="/assets/img/icons/entmcq.png" className="app-brand-logo demo" style={{height:60,width:60}}/>
                {/* <span className="app-brand-text demo menu-text fw-bolder ms-2" style={{textTransform: 'capitalize',fontSize:20}}>ENT-MCQ</span> */}
            </a>

            <a href="#" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
              <i className="bx bx-chevron-left bx-sm align-middle"></i>
            </a>
          </div>

          <div className="menu-inner-shadow"></div>

          
            {type == "admin" ?
            (
            <ul className="menu-inner py-1">
           
            <li className="menu-item active">
              <a href="/" className="menu-link">
                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Dashboard</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Layouts">Admin's</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="/admins" className="menu-link">
                    <div data-i18n="Without menu">View All</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a href="/addAdmin" className="menu-link">
                    <div data-i18n="Without menu">Add New</div>
                  </a>
                </li>
                
              </ul>
            </li>

            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Layouts">Doctor's</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="/doctors" className="menu-link">
                    <div data-i18n="Without menu">View All</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a href="/addDoctor" className="menu-link">
                    <div data-i18n="Without menu">Add New</div>
                  </a>
                </li>
                
              </ul>
            </li>
            

            <li className="menu-header small text-uppercase">
              <span className="menu-header-text">Question Bank</span>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Layouts">Category</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="/category" className="menu-link">
                    <div data-i18n="Without menu">View All</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a href="/addCategory" className="menu-link">
                    <div data-i18n="Without menu">Add New</div>
                  </a>
                </li>
                
              </ul>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Layouts">Question Bank</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="/quetionbank" className="menu-link">
                    <div data-i18n="Without menu">View All</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a href="/addQuetionBank" className="menu-link">
                    <div data-i18n="Without menu">Add New</div>
                  </a>
                </li>
                
              </ul>
            </li>
            {/* <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Layouts">Subject</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="/view_subjects" className="menu-link">
                    <div data-i18n="Without menu">View All</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a href="/subjects" className="menu-link">
                    <div data-i18n="Without menu">Add New</div>
                  </a>
                </li>
                
              </ul>
            </li> */}

            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Layouts">Questions</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="/viewQuestions" className="menu-link">
                    <div data-i18n="Without menu">View All</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a href="/questions" className="menu-link">
                    <div data-i18n="Without menu">Add New</div>
                  </a>
                </li>
                
              </ul>

            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Layouts">services</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="/services" className="menu-link">
                    <div data-i18n="Without menu">View All</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a href="/service" className="menu-link">
                    <div data-i18n="Without menu">Add New</div>
                  </a>
                </li>
                
              </ul>

            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Layouts">packages</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="/packages" className="menu-link">
                    <div data-i18n="Without menu">View All</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a href="/package" className="menu-link">
                    <div data-i18n="Without menu">Add New</div>
                  </a>
                </li>
                
              </ul>

            </li>
            
            
            <li className="menu-header small text-uppercase"><span className="menu-header-text">Users</span></li>
            
            <li className="menu-item">
              <a href="/user" className="menu-link">
                <i className="menu-icon tf-icons bx bx-collection"></i>
                <div data-i18n="Basic">Users Registered</div>
              </a>
            </li>
            
                        
            <li className="menu-header small text-uppercase"><span className="menu-header-text">Reports</span></li>
            
            <li className="menu-item">
              <a href="/subscription" className="menu-link">
                <i className="menu-icon tf-icons bx bx-detail"></i>
                <div data-i18n="Form Elements">Subscriptions</div>
              </a>
              {/* <ul className="menu-sub">
                <li className="menu-item">
                  <a href="forms-basic-inputs.html" className="menu-link">
                    <div data-i18n="Basic Inputs">Basic Inputs</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="forms-input-groups.html" className="menu-link">
                    <div data-i18n="Input groups">Input groups</div>
                  </a>
                </li>
              </ul> */}
            </li>
            {/* <li className="menu-item">
              <a href="/payments" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-detail"></i>
                <div data-i18n="Form Layouts">Payments Details</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="form-layouts-vertical.html" className="menu-link">
                    <div data-i18n="Vertical Form">Vertical Form</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="form-layouts-horizontal.html" className="menu-link">
                    <div data-i18n="Horizontal Form">Horizontal Form</div>
                  </a>
                </li>
              </ul>
            </li>
            
            <li className="menu-item">
              <a href="tables-basic.html" className="menu-link">
                <i className="menu-icon tf-icons bx bx-table"></i>
                <div data-i18n="Tables">Expired Subscriptions</div>
              </a>
            </li>
            
            <li className="menu-header small text-uppercase"><span className="menu-header-text">Misc</span></li>
            <li className="menu-item">
              <a
                href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                target="_blank"
                className="menu-link"
              >
              <i className="menu-icon tf-icons bx bx-table"></i>
                <div data-i18n="Support">Reports</div>
              </a>
            </li> */}
            </ul>)
            :(
              <ul className="menu-inner py-1">
           
            <li className="menu-item active">
              <a href="/" className="menu-link">
                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Dashboard</div>
              </a>
            </li>
              <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Layouts">Questions</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="/viewQuestions" className="menu-link">
                    <div data-i18n="Without menu">View All</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a href="/questions" className="menu-link">
                    <div data-i18n="Without menu">Add Question</div>
                  </a>
                </li>
                
              </ul>
            </li>
            </ul>
            )
          }
          
        </aside>
    )
}

export default Header;