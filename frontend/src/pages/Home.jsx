import Calendar from "../components/Calendar.jsx";
import PageLayout from "../components/PageLayout.jsx";

function Home(){
    return (
            <PageLayout title="Kalendarz Przedstawień">
                <Calendar />
            </PageLayout>
    );
}

export default Home;