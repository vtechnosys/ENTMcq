import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header';
import DataTable from 'react-data-table-component';
import Headerpanel from '../Headerpanel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Triangle } from 'react-loader-spinner';
function QBList() {
    const [subjects,setSubjects]=useState([])
    const [catlist,setCatList] = useState([]);
    const [showProcess, setShowProcess] = useState(false);
    const noStyle = {
        display: 'none',
    }

    const yesStyle = {
        display: 'block',
    }
    const clms = [
        {
          name:'Id',
          selector: row=>row.qid,
          sortable:true,
          compact:false,
          maxWidth:'100px',
          cell:row=>(
            <div>{row.qid}</div>
          )
        },
        {
          name:'Name',
          selector: row=>row.qname,
          sortable:true,
          wrap:true,
          maxWidth:'200px',
          cell:row=>(
            <div>{row.qname}</div>
          )
        },
        
          {
            name:'Package',
            selector: row=>row.cname,
            sortable:true,
            wrap:true,
            maxWidth:'200px',
            cell:row=>(
              <div>{row.cname}</div>
            )
          },
        {
          name:'Total Qs.',
          selector: row=>row.sub_id,
          sortable:true,
          maxWidth:'150px',
          cell:((row)=>{
            var total = 0
            JSON.parse(row.sub_id).map((obj)=>{
              total += parseInt(obj.n);
            })
            return (<div>{total}</div>)
          })
        },
        {
          name: "Actions",
          button: true,
          maxWidth:'200px',
          cell: (row) => (
            <div>
                                        <button class="dropdown-item" onClick={()=>editOption(row.qid)}
                                          ><i class="bx bx-edit-alt me-1"></i> Edit</button>
                                        <button class="dropdown-item" onClick={()=>deleteOption(row.qid)}
                                          ><i class="bx bx-trash me-1"></i> Delete</button>
                                      </div>
          )
        }
      ]
      function fetchSubjects()
      {
        setShowProcess(true)
        axios.get('https://entmcq.vertextechnosys.com/api/questionbank')
              .then((res)=>{
                const data = res.data;
                setSubjects(data);
                setShowProcess(false)
              })
      }

      function fetchCatList()
      {
        setShowProcess(true)
        axios.get('https://entmcq.vertextechnosys.com/api/packages')
              .then((res)=>{
                const data = res.data;
                setCatList(data);
                setShowProcess(false)
              })
      }
    
    function editOption(id)
    {
        window.location.href="quetionbank/"+id;
    }

    function deleteOption(id)
    {
      axios.delete('https://entmcq.vertextechnosys.com/api/questionbank/'+id)
            .then((res) =>{
              console.log(res);
              //alert("Subject added successfully");
              const data = res.data;
              if(data[0].status=="success"){
                window.location.href='/quetionbank';
                
              }
                
              else{
                toast.error('Invalid Details');
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
    const filteredItems = subjects.filter(
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
    const handleChange=(e)=>{
      setFilterText(e.target.value)
      //console.log(sub);
      // filteredItems = quesitons.filter(
      //   item =>
      //     JSON.stringify(item)
      //       .toLowerCase()
      //       .indexOf(sub.toLowerCase()) !== -1
      // );
    }

    function AddLibrary(urlOfTheLibrary) {
        const script = document.createElement('script');
        script.src = urlOfTheLibrary;
        script.async = true;
        document.body.appendChild(script);
      }
      useEffect(()=>{
        fetchSubjects();
        fetchCatList();
      },[])   
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
      <Header/>
        <div class="layout-page">
          
          <Headerpanel/>

          

          
          <div class="content-wrapper">
            

            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Qustion Bank</h4>
              <a href="/addQuetionBank" class="btn btn-danger col-sm-2"><i class="bx bx-plus me-1"></i> Add new</a>
              <select
              class="form-select col-sm-3" 
              id="exampleFormControlSelect1" 
              aria-label="Default select example"
              onChange={handleChange}
              style={{width:25+"%",display:'inline-block',marginLeft:20,}}>
                <option value="">Select Package</option>
              {
                
                  catlist.map((obj)=>{
                    return (
                      <option value={obj.name}>{obj.package_name}</option>
                      )
                    })
              }
              </select>
              <div class=" col-sm-3 input-group" style={{width:30+"%",float:'right'}}>
                        <input type="text" class="form-control" placeholder="Search package" value={filterText} onChange={(e)=>{setFilterText(e.target.value)}}/>
                        <button class="btn btn-outline-primary" type="button" id="button-addon2" style={{margin:0}} onClick={handleClear}>X</button>
              </div>
              <div class="row mt-4">
                       <div class="col-md-12">
                  <div class="card mb-4">
                    <h5 class="card-header">View Question Bank</h5>
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

export default QBList;
