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
                setError(e);
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
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="alert alert-danger">
                    {error.message ?? "Podczas ładowania wystąpił błąd"}
                </div>
            ) : (
                <DataTable
                    columns={stageColumns}
                    data={stages}
                />
            )}

        </PageLayout>
    );
}

export default Stages;