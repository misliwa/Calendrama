import fakeEmployeeData from "../mockData/fakeEmployeeData.js";
import DataTable from "../components/DataTable.jsx";
import PageLayout from "../components/PageLayout.jsx";
import "../css/Employees.css";
import SearchBar from "../components/SearchBar.jsx";

function Employees(){
    return(
        <PageLayout title="Pracownicy Teatru">
            <SearchBar />
            <DataTable columns={fakeEmployeeData.columns} data={fakeEmployeeData.data}></DataTable>

        </PageLayout>
    )
}

export default Employees;