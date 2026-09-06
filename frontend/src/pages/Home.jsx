import Calendar from "../components/Calendar.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {Box, Button, Drawer, Group, ScrollArea, Space} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import EventForm from "../components/EventForm.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import {stagesApi} from "../api/stages.js";
import {playsApi} from "../api/plays.js";

function Home() {
    const [drawerOpened, {open: openDrawer, close: closeDrawer}] = useDisclosure(false);
    const [eventInDrawer, setEventInDrawer] = useState(null);

    const {
        items: stages
    } = useCrud(stagesApi);

    const {
        items: plays
    } = useCrud(playsApi);

    const handleAddClick = () => {
        setEventInDrawer(null);
        openDrawer();
    }

    const handleEventClick = (info) => {
        setEventInDrawer(info.event);
        openDrawer();
    }

    return (
        <Box h="100%" style={{display: 'flex', flexDirection: 'column', minHeight: 0}}>
            <Calendar
                handleEventClick={handleEventClick}
            />

            <Space h="md"/>
            <Group justify="flex-end" style={{flexShrink: 0, paddingTop: '8px'}}>
                <Button type="button" onClick={handleAddClick}>Dodaj</Button>
            </Group>

            <Drawer
                offset={8}
                radius="md"
                opened={drawerOpened}
                onClose={closeDrawer}
                size="xl"
                title={`Wydarzenie ${eventInDrawer?.title ?? ''}`}
            >
                <EventForm
                    stages={stages}
                    eventToEdit={eventInDrawer}
                    plays={plays}
                />
            </Drawer>
        </Box>
    );
}

export default Home;