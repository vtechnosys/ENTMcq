import React,{useState, useEffect} from 'react';
import Header from '../Header';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Headerpanel from '../Headerpanel';

function AddQb()
{
    
    const [category,setCategory]=useState([]);
    const [datavalue,setDatavalue]=useState([]);
    const [cateid,setCateid]=useState('');
    const [qname,setQname] = useState('');
    const [no_question, setNoquestion] = useState('');
    const [error,setError] = useState(false);
    const [sid,setSid]=useState('');

   
    function Addquestionbank()
      {
        const subData = {
            qname:qname,
            no_of_question:no_question,
            cate_id:cateid
          };
          console.log(subData);
        if(sid=='' || qname == '' || no_question == '' || cateid == '')
        {
          if(validate())
          {

          
        //alert('working');
        
        axios.post('https://entmcq.vertextechnosys.com/api/questionbank',subData)
              .then((res) =>{
                console.log(res);
                //alert("Subject added successfully");
                const data = res.data;
                if(data[0].status=="success"){
                  alert("Question Bank added successfully");
                  window.location.href='/quetionbank';
                }
                else{
                  alert("Question Bank failed");
                }
                
              })
              // .error((res)=>{
              //   console.log(res);
              // })
            }
            else{
                setError(true)
            }
          }
          else{
            setError(true)
          }
      }

    function validate()
    {
        if(!qname){
            return false;
          }
          else if(!no_question){
            return false;
          }
          return true;
    } 
    function fetchCategory()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/category')
            .then((res)=>{
              const data = res.data;
              setCategory(data);
            })
    }
    function AddLibrary(urlOfTheLibrary) {
      const script = document.createElement('script');
      script.src = urlOfTheLibrary;
      script.async = true;
      document.body.appendChild(script);
    }
    useEffect(()=>{
        fetchCategory()
      },[])
    return (
      <React.Fragment>
        <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        

        <Header/>
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
                  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={()=>{setError(false)}}></button>
                </div>
                <div class="toast-body">somefields are empty</div>
              </div>)}
        <div class="layout-page">
          
          <Headerpanel/>

          

          
          <div class="content-wrapper">
            

            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Question Bank</h4>

              <div class="row" style={{justifyContent:'center'}}>
                
                <div class="col-md-6">
                  <div class="card mb-4">
                    <h5 class="card-header">Add Bank</h5>
                    <div class="card-body demo-vertical-spacing demo-only-element">
                    <div>
                    <input type="hidden" value={sid} />
                            <label for="defaultFormControlInput" class="form-label">Question Name</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder=""
                              aria-describedby="defaultFormControlHelp"
                              value={qname}
                              onChange={qname => setQname(qname.target.value)}
                            />
                          </div>
                          <div>
                            <label for="defaultFormControlInput" class="form-label">Number Of Question</label>
                            <input
                              type="text"
                              class="form-control"
                              id="defaultFormControlInput"
                              placeholder=""
                              aria-describedby="defaultFormControlHelp"
                              value={no_question}
                              onChange={no_question => setNoquestion(no_question.target.value)}
                              />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Category Name</label>
                            <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example" onChange={cateid => setCateid(cateid.target.value)}
                          value={cateid} >
                            <option value="">Select Category Name</option>
                            {
                              category.map((obj)=>{
                              return(
                                <option value={obj.id}>{obj.name}</option>
                                )
                              })
                            }
                           </select>
                          </div>
                          
                          
                          <div class="mb-3">
                            <button class="btn btn-primary d-grid w-100" type="button" style={{backgroundColor: '#188ccc'}} onClick={Addquestionbank}>Store</button>
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