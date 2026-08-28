import EmployeeRow from "../components/EmployeeRow.jsx";
import mockEmployees from "../mockData/fakeEmployeeList.js";
import EmployeeSearchBar from "../components/EmployeeSearchBar.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {useState} from "react";
import "../css/Employees.css";

function Employees(){

    const [selectedEmployees, setselectedEmployees] = useState([]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setselectedEmployees(mockEmployees.map(employee => employee.id));
        } else {
            setselectedEmployees([]);
        }
    };

    const handleSelectEmployee = (employeeId) => {
        setselectedEmployees(prev =>
            prev.includes(employeeId)
                ? prev.filter(id => id !== employeeId)
                : [...prev, employeeId]
        );
    };

    return(
        <PageLayout title="Pracownicy Teatru">
            <EmployeeSearchBar />
            <div className="table-responsive tableDiv flex-grow-1">
                <table className="table table-hover table-striped">
                    <thead className="table-primary">
                    <tr>
                        <th>
                            <input type="checkbox"
                                   checked={
                                       selectedEmployees.length === mockEmployees.length
                                   }
                                   onChange={handleSelectAll}
                            />
                        </th>
                        <th>id</th>
                        <th>Nazwisko</th>
                        <th>Zawód</th>
                        <th>Zatrudnienie</th>
                        <th className="text-end">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mockEmployees.map((employee) => (
                        <EmployeeRow key={employee.id}
                                     employee={employee}
                                     checked={selectedEmployees.includes(employee.id)}
                                     onChange={handleSelectEmployee}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-danger btn-sm text-end">
                    Usuń zaznaczonych
                </button>

            </div>
        </PageLayout>
    )
}

export default Employees;