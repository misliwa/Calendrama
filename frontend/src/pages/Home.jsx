import Calendar from "../components/Calendar.jsx";
import {Box, Button, Drawer, Group, Space} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";
import EventForm from "../components/EventForm.jsx";
import {useCrud} from "../hooks/useCrud.jsx";
import {stagesApi} from "../api/stages.js";
import {playsApi} from "../api/plays.js";
import {eventsApi} from "../api/events.js";
import dayjs from "dayjs";

function Home() {
    const [drawerOpened, {open: openDrawer, close: closeDrawer}] = useDisclosure(false);
    const [eventInDrawer, setEventInDrawer] = useState(null);

    const {
        items: stages
    } = useCrud(stagesApi);

    const {
        items: plays
    } = useCrud(playsApi);

    const {
        items: events,
        createItem: createEvent,
        updateItem: updateEvent,
        deleteItem: deleteEvent,
    } = useCrud(eventsApi);

    const handleAddClick = () => {
        setEventInDrawer(null);
        openDrawer();
    }

    const handleEventClick = (info) => {
        const startText = info.event.start ? dayjs(info.event.start).format('YYYY-MM-DD HH:mm:ss') : '';
        const endText = info.event.end ? dayjs(info.event.end).format('YYYY-MM-DD HH:mm:ss') : '';

        const eventData = {
            id: Number(info.event.id),
            title: info.event.title,
            ...info.event.extendedProps,
            start: startText,
            end: endText
        };

        setEventInDrawer(eventData);
        openDrawer();
    };

    const handleSubmit = async (values) => {
        const payload = {
            ...values,
            stageId: Number(values.stageId),
            playId: Number(values.playId),
            start: values.start.replace(" ", "T"),
            end: values.end.replace(" ", "T")
        };

        try {
            if (eventInDrawer) {
                await updateEvent(eventInDrawer.id, payload);
                closeDrawer();
            } else {
                await createEvent(payload);
                closeDrawer();
            }
        } catch (error) {
            console.error('Nie udało się zapisać spektaklu:', error);
        }
    };

    const handleEventDelete = async (eventId) => {
        try{
            await deleteEvent(eventId);
        }catch (error){
            console.error('Nie udało się usunąć spektaklu:', error);
        }
        closeDrawer();
    }

    return (
        <Box h="100%" style={{display: 'flex', flexDirection: 'column', minHeight: 0}}>
            <Calendar
                handleEventClick={handleEventClick}
                events={events}
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
                title={`${eventInDrawer ? 'Edytuj' : 'Nowe'} wydarzenie ${eventInDrawer?.title ?? ''}`}
            >
                <EventForm
                    stages={stages}
                    eventToEdit={eventInDrawer}
                    plays={plays}
                    onSubmit={handleSubmit}
                    onDelete={handleEventDelete}
                />
            </Drawer>
        </Box>
    );
}

export default Home;