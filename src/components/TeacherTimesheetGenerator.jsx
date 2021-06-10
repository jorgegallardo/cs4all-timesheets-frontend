import { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import {
  Message,
  Button,
  Form,
  //Radio,
  Step,
  Segment,
  Checkbox,
} from 'semantic-ui-react';
import axios from 'axios';
import { parseISO, format } from 'date-fns';
import DatePicker from 'react-datepicker';

let setMonth = [];
let sameMonths = false;

const TeacherTimesheetGenerator = (props) => {
  const { onSubmitTimesheet } = props;
  const canvas = useRef(null);
  const [signaturePad, setSignaturePad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  //const [value, setValue] = useState('1');
  //const [selectedEvent, setSelectedEvent] = useState(null);
  //const [selectedEventOriginalTimes, setSelectedEventOriginalTimes] = useState(null);
  //const [selectedBeginTime, setSelectedBeginTime] = useState(new Date());
  //const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    setSignaturePad(new SignaturePad(canvas.current));
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_SERVER + '/events?skipSubmittedEvents=true',
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      const events = response.data.map((event) => {
        return {
          ...event,
          event: event._id,
          displayBegin: format(parseISO(event.begin), 'h:mmaaa'),
          displayEnd: format(parseISO(event.end), 'h:mmaaa'),
          displayDate: format(parseISO(event.begin), 'MM/dd/yy'),
          beginTime: format(parseISO(event.begin), 'HH:mm'),
          endTime: format(parseISO(event.end), 'HH:mm'),
        };
      });

      setEvents(events);
      setLoading(false);
    } catch (error) {
      console.error('unable to retrieve events: ' + error);
    }
  };

  const handleMultipleSelect = (event) => {
    const currentIndex = selectedEvents.indexOf(event);
    const checkedEvents = [...selectedEvents];
    let monthOfSelectedEvent = event.displayDate.slice(0, 2); // extract the month, push it to monthOfSelectedEvent

    // if the event isn't in the array of events (by checking the currentIndex), then we're activating an event
    if (currentIndex === -1) {
      setMonth.push(monthOfSelectedEvent);
      sameMonths = setMonth.every((month) => month === monthOfSelectedEvent);
      if (sameMonths) {
        checkedEvents.push(event); // selected, push to checkedEvents array
      } else {
        setMonth.splice(currentIndex, 1);
        alert('you may only submit timesheets from the same month');
        return;
      }
    } else {
      checkedEvents.splice(currentIndex, 1); // remove event from checkedEvents array
      setMonth.splice(currentIndex, 1); // remove the event month from array
    }

    setSelectedEvents(checkedEvents);
  };

  const handleTimeEdit = (event, startOrEnd, newDateTime) => {
    const currentIndex = selectedEvents.indexOf(event);
    const checkedEvents = [...selectedEvents];

    if (startOrEnd === 'start')
      checkedEvents[currentIndex].begin = newDateTime.toISOString();
    else checkedEvents[currentIndex].end = newDateTime.toISOString();

    setSelectedEvents(checkedEvents);
  };

  const handleMultipleSubmit = async () => {
    if (loading) {
      return;
    }
    try {
      // add more frontend validation checks
      if (signaturePad.isEmpty()) {
        alert('you forgot to sign the pad');
        return;
      }
      const dataUrl = signaturePad.toDataURL();
      setLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_API_SERVER + '/timesheets/multiple',
        {
          signatureData: dataUrl,
          events: selectedEvents,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      signaturePad.clear();
      console.log(response.data);
      alert('timesheet submitted');
      onSubmitTimesheet();
    } catch (error) {
      console.error(error);
      alert('something went wrong with the timesheet creation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>instructions</h2>
      <div>
        <Step.Group ordered fluid attached="top" widths={3}>
          <Step active>
            <Step.Content>
              <Step.Title>select</Step.Title>
              <Step.Description>
                the cs4all pd or event you attended from the list below
              </Step.Description>
            </Step.Content>
          </Step>

          <Step active>
            <Step.Content>
              <Step.Title>sign</Step.Title>
              <Step.Description>
                the signature pad using your mouse, touchpad, or finger
              </Step.Description>
            </Step.Content>
          </Step>

          <Step active>
            <Step.Content>
              <Step.Title>submit</Step.Title>
              <Step.Description>
                press the submit timesheet button!
              </Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>

        <Segment attached="bottom">
          <Form>
            {events.map((event, index) => (
              <div key={event._id} style={{ marginBottom: '15px' }}>
                <Form.Field>
                  <Checkbox
                    label={`${event.displayDate} - ${event.category}: ${event.title} [${event.displayBegin}-${event.displayEnd}]`}
                    onChange={() => handleMultipleSelect(event)}
                    checked={selectedEvents.includes(event)}
                  />
                </Form.Field>
                {selectedEvents.includes(event) && (
                  <>
                    <Message
                      color="yellow"
                      header="NOTE"
                      content={`If you arrived to the event late or left early, please edit your start and end times below, rounding to the nearest 15 minutes. All times will be matched to our Zoom attendance statistics for verification. Your timesheet will be DENIED if your start or end times are outside the margin of error.`}
                    />
                    <Form.Field width={3}>
                      <label>Edit Your Start Time</label>
                      <DatePicker
                        selected={parseISO(event.begin)}
                        onChange={(startTime) =>
                          handleTimeEdit(event, 'start', startTime)
                        }
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Start time"
                        dateFormat="h:mmaaa"
                      />
                    </Form.Field>
                    <Form.Field width={3}>
                      <label>Edit Your End Time</label>
                      <DatePicker
                        selected={parseISO(event.end)}
                        onChange={(endTime) =>
                          handleTimeEdit(event, 'end', endTime)
                        }
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="End time"
                        dateFormat="h:mmaaa"
                      />
                    </Form.Field>
                  </>
                )}
              </div>
            ))}

            <Form.Group>
              <Form.Field>
                <h5 style={{ marginBottom: '4px' }}>Sign Below</h5>
                <canvas
                  ref={canvas}
                  style={{
                    border: '1px solid black',
                    borderRadius: '5px',
                  }}
                  width="345"
                  height="100"
                />
              </Form.Field>
            </Form.Group>
            <Button onClick={handleMultipleSubmit} primary loading={loading}>
              submit timesheet
            </Button>
            <Button onClick={() => signaturePad.clear()}>
              clear signature pad
            </Button>
          </Form>
        </Segment>
      </div>
      <pre>{JSON.stringify(events, null, 2)}</pre>
    </>
  );
};

export default TeacherTimesheetGenerator;
