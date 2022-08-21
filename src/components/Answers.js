import React, { useState } from 'react';
import Header from "./Header";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Headerpanel from "./Headerpanel";
function Questions(){
    const [value, setValue] = useState('');
    return(
        <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">

        <Header/>
        <div className="layout-page">

        <Headerpanel/>
          <div className="content-wrapper">

            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Forms /</span> Input groups</h4>

              <div className="row">
                <div className="col-md-9">
                  <div className="card mb-4">
                    <h5 className="card-header">Add Questions</h5>
                    <div className="card-body demo-vertical-spacing demo-only-element">
                        <div>
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Question</label>
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                          </div>
                        <div>
                            <label htmlFor="defaultFormControlInput" className="form-label">Answer Option</label>
                            <input
                              type="text"
                              className="form-control"
                              id="defaultFormControlInput"
                              placeholder="John Doe"
                              aria-describedby="defaultFormControlHelp"
                            />
                            
                          </div>
                          <div>
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Exaplaination</label>
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="exampleFormControlSelect1" className="form-label">Status</label>
                            <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example">
                              <option value ="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>

                      <div className="mb-3">
                        <button className="btn btn-primary d-grid w-100" type="submit" style={{backgroundColor: "#188ccc"}}>Sign in</button>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>

              

             
              

              
            </div>
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                
              </div>
            </footer>

            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>

      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
    )
}

export default Questions;