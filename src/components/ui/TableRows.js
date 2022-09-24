function TableRows({ rowsData, deleteTableRows, handleChange,handleChangesetevent }) {
    return (

        rowsData.map((data, index) => {
            const { ans } = data;
            return (
                <tr key={index}>
                    <td>
                        <input type="text" value={ans} onChange={(evnt) => (handleChange(index, evnt))} name="ans" className="form-control" />
                    </td>
                    <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button> <button className="btn" onClick={() => (handleChangesetevent(index))}  ><i className="bx bx-check" style={{color:'#66c732',fontWeight:'bold'}}></i></button></td>
                </tr>
            )
        })

    )

}
export default TableRows;