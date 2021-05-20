import { useState } from 'react';
import { Form, Button, Radio, Segment, Divider, Grid } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';

const PdEventCreator = () => {
  const [pdEventTitle, setPdEventTitle] = useState('');
  const [pdEventDate, setPdEventDate] = useState('');
  const [pdEventStartTime, setPdEventStartTime] = useState('');
  const [pdEventEndTime, setPdEventEndTime] = useState('');
  const [value, setValue] = useState('');
  // const [allEvents, setAllEvents] = useState([]);          trying to figure out how to add occurrences
  // const [numOccurences, setNumOccurences] = useState(1);

  const facilitatorOptions = [
    { key: 'AiMei Chang', text: 'AiMei Chang', value: 'AiMei Chang' },
    { key: 'Aja Manso', text: 'Aja Manso', value: 'Aja Manso' },
    { key: 'Amber Laspina', text: 'Amber Laspina', value: 'Amber Laspina' },
    { key: 'Amy Hendershot', text: 'Amy Hendershot', value: 'Amy Hendershot' },
    { key: 'Amy Hobson', text: 'Amy Hobson', value: 'Amy Hobson' },
    { key: 'Angela Lozano', text: 'Angela Lozano', value: 'Angela Lozano' },
    {
      key: 'Christine Nunez',
      text: 'Christine Nunez',
      value: 'Christine Nunez',
    },
    {
      key: 'Christy Crawford',
      text: 'Christy Crawford',
      value: 'Christy Crawford',
    },
    { key: 'Dami Aghedo', text: 'Dami Aghedo', value: 'Dami Aghedo' },
    { key: 'Dan Gaylord', text: 'Dan Gaylord', value: 'Dan Gaylord' },
    { key: 'EJ Park', text: 'EJ Park', value: 'EJ Park' },
    { key: 'Felix Alberto', text: 'Felix Alberto', value: 'Felix Alberto' },
    { key: 'Heather Wilson', text: 'Heather Wilson', value: 'Heather Wilson' },
    { key: 'Hiral Dillon', text: 'Hiral Dillon', value: 'Hiral Dillon' },
    { key: 'Jill Montagna', text: 'Jill Montagna', value: 'Jill Montagna' },
    { key: 'Jorge Gallardo', text: 'Jorge Gallardo', value: 'Jorge Gallardo' },
    { key: 'Jose Olivares', text: 'Jose Olivares', value: 'Jose Olivares' },
    { key: 'Kevin Sukhoo', text: 'Kevin Sukhoo', value: 'Kevin Sukhoo' },
    { key: 'Kylie Davis', text: 'Kylie Davis', value: 'Kylie Davis' },
    {
      key: 'Lionel Bergeron',
      text: 'Lionel Bergeron',
      value: 'Lionel Bergeron',
    },
    { key: 'Marie McAnuff', text: 'Marie McAnuff', value: 'Marie McAnuff' },
    { key: 'Melissa Parker', text: 'Melissa Parker', value: 'Melissa Parker' },
    { key: 'Rachel Morales', text: 'Rachel Morales', value: 'Rachel Morales' },
    { key: 'Roie Parchi', text: 'Roie Parchi', value: 'Roie Parchi' },
    { key: 'Ron Summers', text: 'Ron Summers', value: 'Ron Summers' },
    {
      key: 'Tunisia Mitchell',
      text: 'Tunisia Mitchell',
      value: 'Tunisia Mitchell',
    },
    { key: 'Valerie Brock', text: 'Valerie Brock', value: 'Valerie Brock' },
  ];

  const handlePdEventCreation = () => {
    alert('event would be created now');
  };

  const handleChange = (e, { value }) => setValue(value);

  // const onAddOccurence = () => {
  //   setNumOccurences(numOccurences + 1);
  //   console.log(numOccurences);
  // };

  return (
    <>
      <h2>pd/event creation form</h2>

      <Form>
        <Form.Group widths="equal">
          <Form.Input
            label="PD/Event Title"
            type="text"
            required
            autoFocus
            value={pdEventTitle}
            onChange={(e) => setPdEventTitle(e.target.value)}
          />
          {/* facilitator(s) multiple select */}
          <Form.Select
            required
            placeholder="select facilitator(s)"
            fluid
            multiple
            label="CS4All Facilitator(s)"
            options={facilitatorOptions}
          />
        </Form.Group>
        {/* cs4all program - to do: add required asterisk or switch to dropdown */}
        <Form.Group inline>
          <label>CS4All Program</label>
          <Form.Field
            control={Radio}
            label="Integrated Units"
            value="1"
            checked={value === '1'}
            onChange={handleChange}
          />
          <Form.Field
            control={Radio}
            label="Courses"
            value="2"
            checked={value === '2'}
            onChange={handleChange}
          />
          <Form.Field
            control={Radio}
            label="SEP Jr"
            value="3"
            checked={value === '3'}
            onChange={handleChange}
          />
          <Form.Field
            control={Radio}
            label="open to all teachers"
            value="4"
            checked={value === '4'}
            onChange={handleChange}
          />
        </Form.Group>

        <Segment attached>
          <Grid stackable columns={4}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label style={{ textAlign: 'center' }}>Occurence</label>
                  <h1 style={{ textAlign: 'center', margin: '0' }}>1</h1>
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field required>
                  <label style={{ textAlign: 'center' }}>PD/Event Date</label>
                  <DatePicker
                    selected={pdEventDate}
                    onChange={(date) => setPdEventDate(date)}
                    placeholderText="Choose date"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field required>
                  <label style={{ textAlign: 'center' }}>Start Time</label>
                  <DatePicker
                    selected={pdEventStartTime}
                    onChange={(date) => setPdEventStartTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Start At"
                    dateFormat="h:mm aa"
                    minTime={setHours(setMinutes(new Date(), 0), 8)}
                    maxTime={setHours(setMinutes(new Date(), 0), 21)}
                    placeholderText="Choose start time"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field required>
                  <label style={{ textAlign: 'center' }}>End Time</label>
                  <DatePicker
                    selected={pdEventEndTime}
                    onChange={(date) => setPdEventEndTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="End At"
                    dateFormat="h:mm aa"
                    minTime={setHours(setMinutes(new Date(), 0), 9)}
                    maxTime={setHours(setMinutes(new Date(), 0), 21)}
                    placeholderText="Choose end time"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {/* <Button attached="bottom" onClick={() => onAddOccurence()}> */}
        <Button attached="bottom">add another occurence of this event</Button>

        <Divider />
        <Button color="blue" onClick={handlePdEventCreation}>
          create pd/event
        </Button>
      </Form>
    </>
  );
};

export default PdEventCreator;
