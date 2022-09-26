import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header';
import DataTable from 'react-data-table-component';
import Headerpanel from '../Headerpanel';
function DoctorsList() {
    const [doctor,setDoctor]=useState([]);
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
          name:'Name',
          selector: row=>row.name,
          sortable:true,
          wrap:true,
          maxWidth:'200px',
          cell:row=>(
            <div>{row.name}</div>
          )
        },
        {
            name:'Email',
            selector: row=>row.email,
            sortable:true,
            wrap:true,
            maxWidth:'200px',
            cell:row=>(
              <div>{row.email}</div>
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
                                        <button style={{border:0,marginRight:5}} onClick={()=>editOption(row.id)}
                                          ><i class="bx bx-edit-alt me-1"></i> Edit</button>
                                        <button style={{border:0,marginRight:5}} onClick={()=>deleteOption(row.id)}
                                          ><i class="bx bx-trash me-1"></i> Delete</button>
                                      </div>
          )
        }
      ]
      function fetchDoctors()
      {
        axios.get('https://entmcq.vertextechnosys.com/api/doctor')
              .then((res)=>{
                const data = res.data;
                setDoctor(data);
              });
      }
    
    function editOption(id)
    {
        window.location.href="editDoctor/"+id;
    }

    function deleteOption(id)
    {
      axios.delete('https://entmcq.vertextechnosys.com/api/doctor/'+id)
            .then((res) =>{
              console.log(res);
              //alert("Subject added successfully");
              const data = res.data;
              if(data[0].status=="success"){
                alert("Doctor Deleted successfully");
                window.location.href="/doctors";
              }
                
              else{
                alert("Doctor Delete failed");
              }
              //fetchSubjects();
            })
    }

    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(
      false
    );
    // const filteredItems = data.filter(
    //   item => item.name && item.name.includes(filterText)
    // );
    const filteredItems = doctor.filter(
      item =>
        JSON.stringify(item)
          .toLowerCase()
          .indexOf(filterText.toLowerCase()) !== -1
    );
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };


    function AddLibrary(urlOfTheLibrary) {
        const script = document.createElement('script');
        script.src = urlOfTheLibrary;
        script.async = true;
        document.body.appendChild(script);
      }
      useEffect(()=>{
        fetchDoctors()
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
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Doctors Details</h4>
              <a href="/addDoctor" class="btn btn-danger col-sm-2"><i class="bx bx-plus me-1"></i> Add new</a>
              <div class=" col-sm-3 input-group" style={{width:30+"%",float:'right'}}>
                        <input type="text" class="form-control" placeholder="Search Admin" value={filterText} onChange={(e)=>{setFilterText(e.target.value)}}/>
                        <button class="btn btn-outline-primary" type="button" id="button-addon2" style={{margin:0}} onClick={handleClear}>X</button>
              </div>
              <div class="row mt-4">
                       <div class="col-md-12">
                  <div class="card mb-4">
                    <h5 class="card-header">View Doctor's</h5>
                <div class="card-body">
                  <div class="table-responsive text-nowrap">
                  <DataTable
                      columns={clms}
                      data = {filteredItems}
                      pagination
                      striped
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
    {AddLibrary("assets/vendor/libs/jquery/jquery.js")}
    {AddLibrary("assets/vendor/libs/popper/popper.js")}
    {AddLibrary("assets/vendor/js/bootstrap.js")}
    {AddLibrary("assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js")}
    {AddLibrary("assets/vendor/js/menu.js")}
    
    {AddLibrary("assets/vendor/libs/apex-charts/apexcharts.js")}
    {AddLibrary("assets/js/main.js")}
    {AddLibrary("assets/js/dashboards-analytics.js")}
    </React.Fragment>
    );
}

export default DoctorsList;
