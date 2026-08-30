import PageLayout from "../components/PageLayout.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import fakeStageData from "../mockData/fakeStageData.js";

function Stages(){
    return (
        <PageLayout title="Sceny">
            <SearchBar />
            <DataTable columns={fakeStageData.columns} data={fakeStageData.data}></DataTable>
        </PageLayout>
    );
}

export default Stages;