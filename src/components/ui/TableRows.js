function TableRows({ rowsData, deleteTableRows, handleChange,handleChangesetevent }) {
    return (

        rowsData.map((data, index) => {
            const { ans } = data;
            const { setans } = data;
            return (
                <tr key={index}>
                    <td>
                        <input type="text" value={ans} onChange={(evnt) => (handleChange(index, evnt))} name="ans" className="form-control" />
                    </td>
                    <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button> 
                    {setans === true ?
                    (<button className="btn" onClick={() => (handleChangesetevent(index))}  ><i className="bx bx-check" style={{color:'#48ce00',fontWeight:'bold',fontSize:20,}}></i></button>):(<button className="btn" onClick={() => (handleChangesetevent(index))}  ><i className="bx bx-check" style={{color:'hsl(9deg 10% 80%)',fontWeight:'bold'}}></i></button>)
                    }
                    </td>
                </tr>
            )
        })

    )

}
export default TableRows;