import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header';
import DataTable from 'react-data-table-component';
import Headerpanel from '../Headerpanel';
function QBList() {
    const [subjects,setSubjects]=useState([])
    const [catlist,setCatList] = useState([]);
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
            name:'No. of Qus.',
            selector: row=>row.no_of_question,
            sortable:true,
            wrap:true,
            maxWidth:'200px',
            cell:row=>(
              <div>{row.no_of_question}</div>
            )
          },
          {
            name:'Category',
            selector: row=>row.cname,
            sortable:true,
            wrap:true,
            maxWidth:'200px',
            cell:row=>(
              <div>{row.cname}</div>
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
        axios.get('https://entmcq.vertextechnosys.com/api/questionbank')
              .then((res)=>{
                const data = res.data;
                setSubjects(data);
              })
      }

      function fetchCatList()
      {
        axios.get('https://entmcq.vertextechnosys.com/api/category')
              .then((res)=>{
                const data = res.data;
                setCatList(data);
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
                alert("Bank Deleted successfully");
                
              }
                
              else{
                alert("Bank Delete failed");
              }
              fetchSubjects();
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
        <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
      <Header/>
        <div class="layout-page">
          
          <Headerpanel/>

          

          
          <div class="content-wrapper">
            

            <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Dashboard /</span> Qustion Bank</h4>
              <a href="/addCategory" class="btn btn-danger col-sm-2"><i class="bx bx-plus me-1"></i> Add new</a>
              <select
              class="form-select col-sm-3" 
              id="exampleFormControlSelect1" 
              aria-label="Default select example"
              onChange={handleChange}
              style={{width:25+"%",display:'inline-block',marginLeft:20,}}>
                <option value="">Select quesiton Bank Name</option>
              {
                
                  catlist.map((obj)=>{
                    return (
                      <option value={obj.name}>{obj.name}</option>
                      )
                    })
              }
              </select>
              <div class=" col-sm-3 input-group" style={{width:30+"%",float:'right'}}>
                        <input type="text" class="form-control" placeholder="Search Admin" value={filterText} onChange={(e)=>{setFilterText(e.target.value)}}/>
                        <button class="btn btn-outline-primary" type="button" id="button-addon2" style={{margin:0}} onClick={handleClear}>X</button>
              </div>
              <div class="row">
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
