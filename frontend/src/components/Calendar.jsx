import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/react/daygrid';
import timeGridPlugin from '@fullcalendar/react/timegrid';
import interactionPlugin from '@fullcalendar/react/interaction';
import themePlugin from '@fullcalendar/react/themes/monarch';
import '@fullcalendar/react/skeleton.css';
import '@fullcalendar/react/themes/monarch/theme.css';
import '@fullcalendar/react/themes/monarch/palettes/purple.css';

function Calendar() {
    return (
        <FullCalendar
            plugins={[
                themePlugin,
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin
            ]}
            themeSystem="bootstrap5"
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={[
                {
                    title: 'Hamlet',
                    date: '2026-08-15'
                },
                {
                    title: 'Makbet',
                    date: '2026-08-20'
                }
            ]}
        />
    );
}

export default Calendar;