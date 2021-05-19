import { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import { Button, Form, Radio, Step, Segment } from 'semantic-ui-react';
import axios from 'axios';

const TeacherTimesheetGenerator = (props) => {
  const { teacherData } = props;
  const canvas = useRef(null);
  const [signaturePad, setSignaturePad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [value, setValue] = useState('1');
  const handleSelectedEventChange = (event, { value }) => setValue(value);

  useEffect(() => {
    setSignaturePad(new SignaturePad(canvas.current));
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // const response = await authAxios.get('http://localhost:3008/api/events');
      // const response = await axios.get('http://localhost:3008/api/events');
      const response = await axios.get(
        'https://server-mongodb-practice.herokuapp.com/api/events'
      );
      if (response.data.events === undefined) throw Error;
      // the events request to the server must be appropriately structured to only pull the events that would be relevant to the teacher based on the program they're in (and pd/events for "all teachers")

      // we received the events from the server
      setEvents(response.data.events);
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

    try {
      // add more frontend validation checks
      if (signaturePad.isEmpty()) {
        alert('you forgot to sign the pad');
        return;
      }
      const dataUrl = signaturePad.toDataURL();
      signaturePad.clear();

      // process.env.REACT_APP_API_SERVER + '/timesheets'
      const response = await axios.post(
        'http://localhost:3008/api/createtimesheet',
        {
          signatureData: dataUrl,
          // from teacher data
          positionTitle: teacherData.role,
          firstName: teacherData.firstName,
          lastName: teacherData.lastName,
          fileNumber: teacherData.fileNumber,
          program: teacherData.assignedProgramTitle,
          eventId: value,
          // from event data
          // eventId (so we can select it from the radio button and know what we selected)
          // eventDate
          // eventStartTime
          // eventEndTime
          // perhaps we could pull this on the server instead (and minimize potential malicous actors submitting other stuff)... but we still need the eventId & title for the front end. what's the best practice?
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      alert('timesheet submitted');
    } catch (error) {
      console.log(error);
      alert('something went wrong with the timesheet creation');
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
                <Form.Field key={event.id}>
                  <Radio
                    label={`${event.date} - ${event.program}: ${event.title} [${event.startTime}-${event.endTime}]`}
                    name="radioGroup"
                    value={event.id}
                    checked={value === event.id}
                    onChange={handleSelectedEventChange}
                  />
                </Form.Field>
              ))
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
            <Button onClick={handleSubmit} primary>
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
