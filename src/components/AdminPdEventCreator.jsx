import { useEffect, useState } from 'react';
import { Form, Button, Radio, Segment, Divider, Grid, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import axios from 'axios';

const initialOccurrence = {
  breakHours: 0
};

const PdEventCreator = ({ onEventCreated }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [category, setCategory] = useState('');
  const [availableFacilitators, setAvailableFacilitators] = useState([]);
  const [facilitators, setFacilitators] = useState([]);
  const [occurrences, setOccurrences] = useState([{...initialOccurrence}]);

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

  const handlePdEventCreation = async () => {
    if (!eventTitle || !category || facilitators.length === 0 || occurrences.length === 0 || occurrences.find(o => !o.begin || !o.end || (o.breakHours + '').length === 0 )) {
      alert('Please fill out all fields');
      return;
    }

    await axios.post(process.env.REACT_APP_API_SERVER + '/events/batch',
      {
        facilitators,
        occurrences,
        category,
        eventTitle
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );

    alert('event created!')

    onEventCreated();
  };

  const handleChangeCategory = (e, { value }) => setCategory(value);

  const handleAddOccurrence = () => {
    setOccurrences(occurrences => {
      const newOccurrences = occurrences.concat({...initialOccurrence});
      return newOccurrences;
    });
  };

  const handleRemoveOccurrence = (index) => {
    setOccurrences(occurrences => {
      const newOccurrences = occurrences.filter((_, i) => i !== index);
      return newOccurrences;
    });
  };

  const handleChangeDate = (index, newDate) => {
    setOccurrences(occurrences => {
      const newOccurrences = [...occurrences];
      newOccurrences[index].begin = newDate;
      return newOccurrences;
    });
  }

  const handleChangeBeginTime = (index, newTime) => {
    setOccurrences(occurrences => {
      const newOccurrences = [...occurrences];
      newOccurrences[index].begin = newTime;
      return newOccurrences;
    });
  }

  const handleChangeEndTime = (index, newTime) => {
    setOccurrences(occurrences => {
      const newOccurrences = [...occurrences];
      newOccurrences[index].end = newTime;
      return newOccurrences;
    });
  }

  const handleChangeBreakHours = (index, newBreakHours) => {
    setOccurrences(occurrences => {
      const newOccurrences = [...occurrences];
      newOccurrences[index].breakHours = newBreakHours;
      return newOccurrences;
    });
  }

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
            value={eventTitle}
            onChange={(e) => { setEventTitle(e.target.value); }}
          />
          <Form.Select
            required
            placeholder="select facilitator(s)"
            fluid
            multiple
            label="CS4All Facilitator(s)"
            options={availableFacilitators}
            onChange={(e, { value }) => { setFacilitators(value); }}
          />
        </Form.Group>
        <Form.Group inline>
          <label>CS4All Program <span style={{color: 'red'}}>*</span></label>
          <Form.Field
            control={Radio}
            label="Integrated Units"
            value="units"
            checked={category === 'units'}
            onChange={handleChangeCategory}
          />
          <Form.Field
            control={Radio}
            label="Courses"
            value="courses"
            checked={category === 'courses'}
            onChange={handleChangeCategory}
          />
          <Form.Field
            control={Radio}
            label="SEP Jr"
            value="sep-jr"
            checked={category === 'sep-jr'}
            onChange={handleChangeCategory}
          />
          <Form.Field
            control={Radio}
            label="CS Leads"
            value="cs-leads"
            checked={category === 'cs-leads'}
            onChange={handleChangeCategory}
          />
          <Form.Field
            control={Radio}
            label="open to all teachers"
            value="all-teachers"
            checked={category === 'all-teachers'}
            onChange={handleChangeCategory}
          />
        </Form.Group>

        <Segment attached>
          <Grid stackable columns={5}>
            {occurrences.map((occurrence, index) => {
              return (
                <Grid.Row key={index}>
                  <Grid.Column width={3}>
                    <Form.Field>
                      <label style={{ textAlign: 'center' }}>Occurrence</label>
                      <h1 style={{ textAlign: 'center', margin: '0' }}>{index + 1}</h1>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Form.Field required>
                      <label style={{ textAlign: 'center' }}>PD/Event Date</label>
                      <DatePicker
                        selected={occurrence.begin}
                        onChange={(date) => handleChangeDate(index, date)}
                        placeholderText="Choose date"
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Form.Field required>
                      <label style={{ textAlign: 'center' }}>Start Time</label>
                      <DatePicker
                        selected={occurrence.begin}
                        onChange={(date) => handleChangeBeginTime(index, date)}
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
                  <Grid.Column width={3}>
                    <Form.Field required>
                      <label style={{ textAlign: 'center' }}>End Time</label>
                      <DatePicker
                        selected={occurrence.end}
                        onChange={(date) => handleChangeEndTime(index, date)}
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
                  <Grid.Column width={3}>
                    <Form.Field required>
                      <label style={{ textAlign: 'center' }}>Break Hours</label>
                      <Form.Input
                        type="number"
                        required
                        autoFocus
                        value={occurrence.breakHours}
                        onChange={(e) => { handleChangeBreakHours(index, e.target.value); }}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={1}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center'
                    }}>
                      <h3
                        style={{ textAlign: 'center', margin: '0', cursor: 'pointer' }}
                        onClick={() => { handleRemoveOccurrence(index); }}
                      ><Icon name="trash" /></h3>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              );
            })}
            
          </Grid>
        </Segment>
        <Button attached="bottom" onClick={() => handleAddOccurrence()}>add another occurrence of this event</Button>

        <Divider />
        <Button color="blue" onClick={handlePdEventCreation}>
          create pd/event
        </Button>
      </Form>
    </>
  );
};

export default PdEventCreator;
