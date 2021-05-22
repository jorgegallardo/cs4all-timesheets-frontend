import { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import { Message, Button, Form, Radio, Step, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { parseISO, format } from 'date-fns';
import DatePicker from 'react-datepicker';

const TeacherTimesheetGenerator = (props) => {
  const { onSubmitTimesheet } = props;
  const canvas = useRef(null);
  const [signaturePad, setSignaturePad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [value, setValue] = useState('1');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventOriginalTimes, setSelectedEventOriginalTimes] = useState(null);
  const [selectedBeginTime, setSelectedBeginTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());

  const handleSelectedEventChange = (event, { value }) => {
    console.log('value=', value);
    const selectedEvent = events.find((e) => e._id === value);
    setSelectedEvent(selectedEvent);
    setSelectedBeginTime(parseISO(selectedEvent.begin));
    setSelectedEndTime(parseISO(selectedEvent.end));
    setSelectedEventOriginalTimes({
      ...selectedEvent,
      begin: selectedEvent.begin,
      end: selectedEvent.end,
    });
    setValue(value);
  };

  useEffect(() => {
    setSignaturePad(new SignaturePad(canvas.current));
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_SERVER + '/events?skipSubmittedEvents=true', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      //console.log('response.data=', response.data);
      const events = response.data.map((event) => {
        return {
          ...event,
          displayBegin: format(parseISO(event.begin), 'h:mm aaa'),
          displayEnd: format(parseISO(event.end), 'h:mm aaa'),
          displayDate: format(parseISO(event.begin), 'MM/dd/yy'),
          beginTime: format(parseISO(event.begin), 'HH:mm'),
          endTime: format(parseISO(event.end), 'HH:mm'),
        };
      });
      //console.log('events=', events);
      setEvents(events);
      setLoading(false);
    } catch (error) {
      console.log('unable to retrieve events');
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    // steps:
    // 1. on component load: grab/load the logged in user's (teacher) info.
    // 2. on component load: hit the db and download the events that are relevant to that teacher
    // 3. display events as radio button options
    // 4. when a radio button is selected, load that info in preparation for POST request
    // 5. frontend validation checks (empty signature, missing info (if db calls fail?), etc.) - disable submit timesheet button until everything is correctly filled out
    // 6. submit timesheet --> POST request to /api/createtimesheet

    // questions:
    // 1. are we exposing too much about the backend to the clients?
    // 2. is this where a react context comes into play... so that we have access to the user throughout the entire application (all child components) once they log in?

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

      console.log('selectedEvent=', selectedEvent);

      setLoading(true);

      const response = await axios.post(process.env.REACT_APP_API_SERVER + '/timesheets',
        {
          signatureData: dataUrl,
          events: [
            {
              ...selectedEvent,
              event: selectedEvent._id,
              begin: selectedBeginTime,
              end: selectedEndTime,
            },
          ],
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
      console.log(error);
      alert('something went wrong with the timesheet creation');
    } finally {
      setLoading(false);
    }
  };

  if (loading && canvas === null) return <h1>loading...</h1>;

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

        <Segment attached>
          <Form>
            {events.length === 0 ? (
              <h1>loading...</h1>
            ) : (
              events.map((event) => (
                <Form.Field key={event._id}>
                  <Radio
                    label={`${event.displayDate} - ${event.category}: ${event.title} [${event.displayBegin}-${event.displayEnd}]`}
                    name="radioGroup"
                    value={event._id}
                    checked={value === event._id}
                    onChange={handleSelectedEventChange}
                  />
                </Form.Field>
              ))
            )}

            {selectedEvent && (
              <>
                <Message
                  header="TIME ADJUSTMENT"
                  content={`${selectedEvent.title} was held from ${selectedEventOriginalTimes.displayBegin}
                  until ${selectedEventOriginalTimes.displayEnd} on ${selectedEvent.displayDate}. However,
                  if you entered the meeting late or left early, please change
                  your start and end times below. All times will be matched to
                  our Zoom attendance statistics for verification. Your timesheet will be denied if your start or end times are outside the margin of error.`}
                />

                <Form.Field width={3}>
                  <label>Start Time</label>
                  <DatePicker
                    selected={selectedBeginTime}
                    onChange={(date) => setSelectedBeginTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Start time"
                    dateFormat="h:mm aa"
                  />
                </Form.Field>
                <Form.Field width={3}>
                  <label>End Time</label>
                  <DatePicker
                    selected={selectedEndTime}
                    onChange={(date) => setSelectedEndTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="End time"
                    dateFormat="h:mm aa"
                  />
                </Form.Field>
                <Message
                  color="yellow"
                  header="IMPORTANT"
                  content="By signing below and pressing the submit timesheet button, you
                  attest to attending the selected CS4All PD/event and understand that if you
                  are lying, CS4All will sue you to the fullest extent possible
                  under federal (and UFT) law."
                />

                <p></p>
              </>
            )}

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
            <Button onClick={handleSubmit} primary loading={loading}>
              submit timesheet
            </Button>
            <Button onClick={() => signaturePad.clear()}>
              clear signature pad
            </Button>
          </Form>
        </Segment>
      </div>
    </>
  );
};

export default TeacherTimesheetGenerator;
