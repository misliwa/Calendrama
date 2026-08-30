import PageLayout from "../components/PageLayout.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import {useEffect, useState} from "react";
import {getStages} from "../api/stages.js";

function Stages(){
    const [stages, setStages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const stageColumns = [
        {
            name: "id",
            getValue: stage => stage.id
        },
        {
            name: "Nazwa",
            getValue: stage => stage.name
        },
        {
            name: "Opis",
            getValue: stage => stage.description
        },
    ];

    useEffect(() => {
        const loadStages = async () => {
            try {
                const stages = await getStages();
                setStages(stages);
            }catch (e){
                console.log(e.status + " " + e.code + " " + e.message);
            }finally {
                setLoading(false);
            }
        }
        loadStages();
    }, []);
    return (
        <PageLayout title="Sceny">
            <SearchBar />
            {error && <div>{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <DataTable columns={stageColumns} data={stages}></DataTable>
            )}

        </PageLayout>
    );
}

export default Stages;