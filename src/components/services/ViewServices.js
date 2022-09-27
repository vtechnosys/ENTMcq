import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header';
import DataTable from 'react-data-table-component';
import Headerpanel from '../Headerpanel';
import {useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
function ViewServices() {
    const [service,setService]=useState([])
    var cnt =0;
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
          name:'Title',
          selector: row=>row.service_name,
          sortable:true,
          wrap:true,
          maxWidth:'400px',
          cell:row=>(
            <div dangerouslySetInnerHTML={{__html: row.service_name}}/>
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
          cell: (row) => (
            <div>
                                        <button class="dropdown-item" onClick={()=>editOption(row.id)}
                                          ><i class="bx bx-edit-alt me-1"></i> Edit</button>
                                        <button class="dropdown-item" onClick={()=>deleteOption(row.id)}
                                          ><i class="bx bx-trash me-1"></i> Delete</button>
                                      </div>
          )
        }
      ]
    function fetchService()
    {
      axios.get('https://entmcq.vertextechnosys.com/api/service')
            .then((res)=>{
              const data = res.data;
              setService(data);
            })
    }
    function editOption(id){
        window.location.href='/service/'+id;
        //setSerid(id)
        //alert(id);
        // axios.get('https://entmcq.vertextechnosys.com/api/service/'+id)
        //       .then((res)=>{
        //         const data = res.data;
        //         console.log(data);
        //         setSername(data.service_name);
        //         setDescription(data.description);
        //         setSerid(data.id)
        //         //setSubjects(data);
        //       })
      }
  
      function deleteOption(id)
      {
        axios.delete('https://entmcq.vertextechnosys.com/api/service/'+id)
              .then((res) =>{
                console.log(res);
                //alert("Subject added successfully");
                const data = res.data;
                if(data[0].status=="success"){
                  window.location.href = "/services";
                  
                }
                  
                else{
                  toast.error('Invalid Details');
                }
                fetchService();
              })
      }
      useEffect(()=>{
        fetchService()
      },[])

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
      <Header/>
        <div class="layout-page">
          
          <Headerpanel/>

          

          
          <div class="content-wrapper">
            

            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Services Details</h4>
              <a href="/service" class="btn btn-danger col-sm-2"><i class="bx bx-plus me-1"></i> Add new</a>
              
              <div class="row mt-4">
                       <div class="col-md-12">
                  <div class="card mb-4">
                    <h5 class="card-header">View Services</h5>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                  <DataTable
                      columns={clms}
                      data = {service}
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
    {AddLibrary("/assets/js/dashboards-analytics.js")}
    {AddLibrary("/assets/vendor/libs/apex-charts/apexcharts.js")}
    {AddLibrary("/assets/js/main.js")}
    </React.Fragment>
    );
}

export default ViewServices;
