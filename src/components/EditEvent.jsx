import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Grid, Radio, Segment } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import { format, formatISO, parseISO } from 'date-fns';


const EditEvent = ({ event, onEventChange }) => {
  const [newEvent, setNewEvent] = useState({...event, facilitators: event.facilitators.map(f => f._id)});
  const [availableFacilitators, setAvailableFacilitators] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(process.env.REACT_APP_API_SERVER + '/users/admin');
      const facilitators = response.data.map((user) => {
        return {
          key: user._id,
          text: `${user.firstName} ${user.lastName}`,
          value: user._id,
        };
      });
      setAvailableFacilitators(facilitators);
    };

    getData();
  }, []);

  useEffect(() => {
    onEventChange(newEvent);
  }, [onEventChange, newEvent])

  const handleChangeField = (fieldName, newValue) => {
    setNewEvent(currEvent => {
      const changedEvent = {...currEvent};
      changedEvent[fieldName] = newValue;
      return changedEvent;
    });
  }

  if (!newEvent) {
    return null;
  }

  return (
    <>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            label="PD/Event Title"
            type="text"
            required
            autoFocus
            value={newEvent.title}
            onChange={(e) => { handleChangeField('title', e.target.value); }}
          />
          <Form.Select
            required
            placeholder="select facilitator(s)"
            fluid
            multiple
            defaultValue={newEvent.facilitators}
            label="CS4All Facilitator(s)"
            options={availableFacilitators}
            onChange={(e, { value }) => { handleChangeField('facilitators', value); }}
          />
        </Form.Group>
        <Form.Group inline>
          <label>CS4All Program <span style={{color: 'red'}}>*</span></label>
          <Form.Field
            control={Radio}
            label="Integrated Units"
            value="units"
            checked={newEvent.category === 'units'}
            onChange={(e, {value}) => handleChangeField('category', value)}
          />
          <Form.Field
            control={Radio}
            label="Courses"
            value="courses"
            checked={newEvent.category === 'courses'}
            onChange={(e, {value}) => handleChangeField('category', value)}
          />
          <Form.Field
            control={Radio}
            label="SEP Jr"
            value="sep-jr"
            checked={newEvent.category === 'sep-jr'}
            onChange={(e, {value}) => handleChangeField('category', value)}
          />
          <Form.Field
            control={Radio}
            label="CS Leads"
            value="cs-leads"
            checked={newEvent.category === 'cs-leads'}
            onChange={(e, {value}) => handleChangeField('category', value)}
          />
          <Form.Field
            control={Radio}
            label="open to all teachers"
            value="all-teachers"
            checked={newEvent.category === 'all-teachers'}
            onChange={(e, {value}) => handleChangeField('category', value)}
          />
        </Form.Group>

        <Segment attached>
          <Grid stackable columns={5}>
            <Grid.Row>
              <Grid.Column width={4}>
                <Form.Field required>
                  <label style={{ textAlign: 'center' }}>PD/Event Date</label>
                  <DatePicker
                    selected={parseISO(newEvent.begin)}
                    onChange={(value) => handleChangeField('begin', formatISO(value))}
                    placeholderText="Choose date"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={4}>
                <Form.Field required>
                  <label style={{ textAlign: 'center' }}>Start Time</label>
                  <DatePicker
                    selected={parseISO(newEvent.begin)}
                    onChange={(value) => handleChangeField('begin', formatISO(value))}
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
              <Grid.Column width={4}>
                <Form.Field required>
                  <label style={{ textAlign: 'center' }}>End Time</label>
                  <DatePicker
                    selected={parseISO(newEvent.end)}
                    onChange={(value) => handleChangeField('end', formatISO(value))}
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
              <Grid.Column width={4}>
                <Form.Field required>
                  <label style={{ textAlign: 'center' }}>Break Hours</label>
                  <Form.Input
                    type="number"
                    required
                    autoFocus
                    value={newEvent.breakHours}
                    onChange={(e) => handleChangeField('breakHours', e.target.value)}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Form>
    </>
  );
};

export default EditEvent;
