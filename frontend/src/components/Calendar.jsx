import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/react/daygrid';
import timeGridPlugin from '@fullcalendar/react/timegrid';
import interactionPlugin from '@fullcalendar/react/interaction';
import themePlugin from '@fullcalendar/react/themes/monarch';
import '@fullcalendar/react/skeleton.css';
import '@fullcalendar/react/themes/monarch/theme.css';
import '@fullcalendar/react/themes/monarch/palettes/purple.css';
import plLocale from '@fullcalendar/react/locales/pl';

function Calendar({handleEventClick, events}) {
    return (
        <FullCalendar
            height={700}
            contentHeight={450}
            eventClick={handleEventClick}
            locale={plLocale}
            plugins={[
                themePlugin,
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin
            ]}

            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={events}
        />
    );
}

export default Calendar;