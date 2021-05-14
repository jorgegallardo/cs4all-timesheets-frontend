import { useState } from 'react';
import { Form, Button, Radio, Message } from 'semantic-ui-react';

const PdEventCreator = () => {
  const [pdEventTitle, setPdEventTitle] = useState('');
  const [pdEventDate, setPdEventDate] = useState('');
  const [pdEventStartTime, setPdEventStartTime] = useState('');
  const [pdEventEndTime, setPdEventEndTime] = useState('');
  const [value, setValue] = useState('');

  const facilitatorOptions = [
    { key: 'valerie', text: 'valerie', valerieue: 'valerie' },
    { key: 'kevin', text: 'kevin', value: 'kevin' },
    { key: 'felix', text: 'felix', value: 'felix' },
    { key: 'marie', text: 'marie', value: 'marie' },
    { key: 'amy', text: 'amy', value: 'amy' },
    { key: 'dan', text: 'dan', value: 'dan' },
    { key: 'jorge', text: 'jorge', value: 'jorge' },
  ];

  const handlePdEventCreation = () => {
    alert('event would be created at this point');
  };

  const handleChange = (e, { value }) => setValue(value);

  return (
    <>
      <Message negative>
        <Message.Header>jorge's notes</Message.Header>
        <Message.List>
          <Message.Item>
            <p>
              creating a PD/Event here will cause all of the teachers in the
              selected program to see this PD as an option for when they are
              trying to submit a per session timesheet. if you select "general"
              as the cs4all program, ALL of the teachers participating in cs4all
              training will see that PD/Event. use "general" for events such as
              Teacher Con, CS Ed Week training, CS First, Minecraft, etc.
            </p>
          </Message.Item>
        </Message.List>
      </Message>
      <h2>create pd/event</h2>

      <Form>
        <Form.Input
          label="pd/event title"
          type="text"
          required
          autoFocus
          value={pdEventTitle}
          onChange={(e) => setPdEventTitle(e.target.value)}
        />
        <Form.Input
          label="pd/event date"
          type="text"
          required
          value={pdEventDate}
          onChange={(e) => setPdEventDate(e.target.value)}
        />
        <Form.Input
          label="pd/event start time"
          type="text"
          required
          value={pdEventStartTime}
          onChange={(e) => setPdEventStartTime(e.target.value)}
        />
        <Form.Input
          label="pd/event end time"
          type="text"
          required
          value={pdEventEndTime}
          onChange={(e) => setPdEventEndTime(e.target.value)}
        />
        <Form.Group inline>
          <label>CS4All Program</label>
          <Form.Field
            control={Radio}
            label="integrated units"
            value="1"
            checked={value === '1'}
            onChange={handleChange}
          />
          <Form.Field
            control={Radio}
            label="courses"
            value="2"
            checked={value === '2'}
            onChange={handleChange}
          />
          <Form.Field
            control={Radio}
            label="sepJr"
            value="3"
            checked={value === '3'}
            onChange={handleChange}
          />
          <Form.Field
            control={Radio}
            label="general"
            value="4"
            checked={value === '4'}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Select
          placeholder="select facilitator(s)"
          fluid
          multiple
          label="CS4All Facilitator(s)"
          options={facilitatorOptions}
        />

        <Button onClick={handlePdEventCreation}>create pd/event</Button>
      </Form>
    </>
  );
};

export default PdEventCreator;
