import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header';
import DataTable from 'react-data-table-component';
import { useParams } from 'react-router-dom';
import Headerpanel from '../Headerpanel';
function ViewAnswers() {
    const {qid} = useParams();
    const [answwers,setAsnwers]=useState([]);
    var cnt =0;
    var t="";
    const clms = [
        {
          name:'Id',
          selector: row=>row.id,
          sortable:true,
          compact:false,
          maxWidth:'100px',
          cell:row=>(
            <div>{cnt++}</div>
          )
        },
        {
          name:'Answers',
          selector: row=>row.answer,
          sortable:true,
          wrap:true,
          maxWidth:'400px',
          cell:row=>(
            <div dangerouslySetInnerHTML={{__html: row.answer}}/>
          )
        },
        
        {
          name:'Status',
          selector: row=>row.status,
          sortable:true,
          maxWidth:'150px',
          conditionalCellStyles:[
            {
                when: row=>row.status === 'active',
                style:{
                    color:'#696cff'
                }
            },
            {
                when: row=>row.status === 'inactive',
                style:{
                    color:'#ffab00'
                }
            }
          ]
        },
        
        {
          name: "Actions",
          button: true,
          maxWidth:'200px',
          cell: (row) => {
            t = qid.split('--');
            return(
            <div>
                                        <button class="dropdown-item" onClick={()=>editOption(row.id)}
                                          ><i class="bx bx-edit-alt me-1"></i> Edit</button>
                                        <button class="dropdown-item" onClick={()=>deleteOption(row.id)}
                                          ><i class="bx bx-trash me-1"></i> Delete</button>
                                          {row.id === t[1] ? (
                                            <button class="dropdown-item" style={{backgroundColor:'#72da76',color:'#fff'}} onClick={()=>addAnsws(row.id)}
                                          ><i class="bx bx-key me-1"></i> Set Answer</button>
                                          ):
                                          (<button class="dropdown-item" onClick={()=>addAnsws(row.id)}
                                          ><i class="bx bx-key me-1"></i> Set Answer</button>)}
                                          
                                      </div>
          )}
        }
      ]
      function fetchQuestions()
      {
        console.log(qid);
        
        axios.get('https://entmcq.vertextechnosys.com/api/getAnswer/'+t[0])
              .then((res)=>{
                const data = res.data;
                setAsnwers(data);
                console.log(data);
              });
      }
    function addAnsws(id){
      //window.location.href="/answers/"+id;
      const dt = {
        qid:qid,
        aid:id,
      }
      axios.post('https://entmcq.vertextechnosys.com/api/setAnswer',dt)
            .then((res)=>{
              alert("Answer Set Successfully");
            })
    }
    function editOption(id)
    {
        window.location.href="/answer/"+id;
    }
    
    function deleteOption(id)
    {
      axios.delete('https://entmcq.vertextechnosys.com/api/answer/'+id)
            .then((res) =>{
              console.log(res);
              //alert("Subject added successfully");
              const data = res.data;
              if(data[0].status=="success"){
                alert("Answer Deleted successfully");
                window.location.href='/viewAnswers/'+qid;
              }
                
              else{
                alert("Subject Delete failed");
              }
              //fetchSubjects();
            })
    }
    function AddLibrary(urlOfTheLibrary) {
        const script = document.createElement('script');
        script.src = urlOfTheLibrary;
        script.async = true;
        document.body.appendChild(script);
      }
      useEffect(()=>{
        t = qid.split('--');
        fetchQuestions()
      },[])   
    return (
        <React.Fragment>
        <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
      <Header/>
        <div class="layout-page">
          
          <Headerpanel/>

          

          
          <div class="content-wrapper">
            

            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Questions Details</h4>
              <div class="row">
                       <div class="col-md-12">
                  <div class="card mb-4">
                    <h5 class="card-header">View Questions</h5>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                  <DataTable
                      columns={clms}
                      data = {answwers}
                      pagination
                    />
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
    
    {AddLibrary("/assets/vendor/libs/apex-charts/apexcharts.js")}
    {AddLibrary("/assets/js/main.js")}
    {AddLibrary("/assets/js/dashboards-analytics.js")}
    </React.Fragment>
    );
}

export default ViewAnswers;
