import EmployeeRow from "./EmployeeRow.jsx";
import {useState} from "react";

function DataTable({columns, data, onDelete}) {

    const [selectedRows, setselectedRows] = useState([]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setselectedRows(data.map(row => row.id));
        } else {
            setselectedRows([]);
        }
    };

    const handleSelectRows = (rowId) => {
        setselectedRows(prev =>
            prev.includes(rowId)
                ? prev.filter(id => id !== rowId)
                : [...prev, rowId]
        );
    };

    return (
        <>
            <div className="table-responsive tableDiv flex-grow-1">
                <table className="table table-hover table-striped">
                    <thead className="table-primary">
                    <tr>
                        <th>
                            <input type="checkbox"
                                   checked={
                                       data.length > 0 &&
                                       selectedRows.length === data.length
                                   }
                                   onChange={handleSelectAll}
                            />
                        </th>
                        {columns.map((column) => (
                                <th key={column.name}>{column.name}</th>
                            )
                        )}
                        <th className="text-end">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (
                        <tr key = {row.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(row.id)}
                                    onChange={() => handleSelectRows(row.id)}
                                />
                            </td>
                            {columns.map(column => (
                                  <td key={column.name}>
                                      {column.getValue(row)}
                                  </td>
                                ))}

                            <td className="text-end">
                                <button className="btn btn-primary btn-sm me-2 user-select-none">
                                    Edytuj
                                </button>

                                <button className="btn btn-danger btn-sm user-select-none" onClick={() => onDelete(row.id)}>
                                    Usuń
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-danger btn-sm text-end">
                    Usuń zaznaczonych
                </button>

            </div>
        </>
    )
        ;
}

export default DataTable;