import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface PostEvent {
  title: string;
  start: Date;
  end: Date;
  platform: string;
  tags: string[];
  content?: string;
}

const MyCustomToolbar = (toolbarProps: any) => {
  const goToBack = () => {
    const { view, date, onNavigate } = toolbarProps;
    onNavigate('PREV', date, view);
  };

  const goToNext = () => {
    const { view, date, onNavigate } = toolbarProps;
    onNavigate('NEXT', date, view);
  };

  const goToToday = () => {
    const { onNavigate } = toolbarProps;
    onNavigate('TODAY');
  };

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { onView } = toolbarProps;
    onView(e.target.value);
  };

  const label = () => {
    const { date, localizer, view } = toolbarProps;
    const dateFormat = view === 'month' ? 'MMMM YYYY' : 'MMMM D, YYYY';
    return localizer.format(date, dateFormat);
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar-left">
        <button onClick={goToToday}>Today</button>
        <button onClick={goToBack}>&lt;</button>
        <button onClick={goToNext}>&gt;</button>
      </div>
      <div className="toolbar-label">
        <span>{label()}</span>
      </div>
      <div className="toolbar-right">
        <select onChange={handleViewChange} value={toolbarProps.view}>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>
      </div>
    </div>
  );
};

const CustomCalendarPage: React.FC = () => {
  const [events, setEvents] = useState<PostEvent[]>([
    {
      title: 'Team Meeting',
      start: new Date(2024, 10, 14, 10, 0),
      end: new Date(2024, 10, 14, 11, 0),
      platform: 'None',
      tags: []
    },
    {
      title: 'Instagram Post: Holiday Sale',
      start: new Date(2024, 10, 15, 12, 0),
      end: new Date(2024, 10, 15, 12, 30),
      platform: 'Instagram',
      tags: ['holiday', 'sale']
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [newEventStart, setNewEventStart] = useState<Date | null>(null);
  const [newEventEnd, setNewEventEnd] = useState<Date | null>(null);

  // Form state for new event
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  // Selected event for details view
  const [selectedEvent, setSelectedEvent] = useState<PostEvent | null>(null);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setNewEventStart(slotInfo.start);
    setNewEventEnd(slotInfo.end);
    setShowCreateModal(true);
  };

  const handleSaveEvent = () => {
    if (newEventStart && newEventEnd && title.trim() !== '') {
      const newEvent: PostEvent = {
        title,
        start: newEventStart,
        end: newEventEnd,
        platform,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        content
      };

      setEvents((prev) => [...prev, newEvent]);
      closeCreateModal();
    }
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setTitle('');
    setPlatform('Instagram');
    setTags('');
    setContent('');
  };

  const handleSelectEvent = (event: PostEvent) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedEvent(null);
  };

  const formats = {
    timeGutterFormat: 'HH:mm',
    eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }, culture: any, localizer: any) =>
      `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
    dayHeaderFormat: 'dddd, MMM D',
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }, culture: any, localizer: any) =>
      `${localizer.format(start, 'MMM D', culture)} - ${localizer.format(end, 'MMM D', culture)}`
  };
  

  return (
<div className="app-container">
  <div className="calendar-container">
    <h3 className="calendar-header">Plan your content!</h3>
    <Calendar
      localizer={localizer}
      events={events}
      defaultView={Views.WEEK}
      views={['month', 'week', 'day']}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '80vh', margin: '0 auto', width: '900px' }}
      components={{
        toolbar: MyCustomToolbar,
      }}
      selectable
      onSelectSlot={handleSelectSlot}
      onSelectEvent={(event) => handleSelectEvent(event as PostEvent)}
      formats={formats}
    />
  </div>



      {/* Modal for creating new post */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create a New Post</h2>
            <div className="form-field">
              <label>Title:</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title" 
              />
            </div>
            <div className="form-field">
              <label>Platform:</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="Facebook">Facebook</option>
              </select>
            </div>
            <div className="form-field">
              <label>Tags (comma separated):</label>
              <input 
                type="text" 
                value={tags} 
                onChange={(e) => setTags(e.target.value)} 
                placeholder="e.g. social, marketing"
              />
            </div>
            <div className="form-field">
              <label>Content:</label>
              <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Enter post content here"
              />
            </div>
            <div className="modal-buttons">
              <button onClick={handleSaveEvent}>Save</button>
              <button onClick={closeCreateModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for showing event details */}
      {showDetailsModal && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Post Details</h2>
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Platform:</strong> {selectedEvent.platform}</p>
            {selectedEvent.tags.length > 0 && (
              <p><strong>Tags:</strong> {selectedEvent.tags.join(', ')}</p>
            )}
            {selectedEvent.content && (
              <p><strong>Content:</strong><br />{selectedEvent.content}</p>
            )}
            <p>
              <strong>Start:</strong> {moment(selectedEvent.start).format('MMMM D, YYYY h:mm A')}
            </p>
            <p>
              <strong>End:</strong> {moment(selectedEvent.end).format('MMMM D, YYYY h:mm A')}
            </p>

            <div className="modal-buttons">
              <button onClick={closeDetailsModal}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomCalendarPage;
