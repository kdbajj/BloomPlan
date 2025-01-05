import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface MiniCalendarProps {
  onSelectDate: (date: Date) => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ onSelectDate }) => {
  const events = []; // You can add events if needed

  return (
    <div className="mini-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={['week']}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 300, width: '100%' }}
        onSelectEvent={(event) => onSelectDate(event.start)}
        onSelectSlot={(slotInfo) => onSelectDate(slotInfo.start)}
        selectable
      />
    </div>
  );
};

export default MiniCalendar;