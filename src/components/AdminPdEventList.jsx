import React, { useState, useEffect, useContext } from 'react';
import { Table, Dropdown, Button, Modal } from 'semantic-ui-react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import EditEvent from './EditEvent';
import UserContext from '../store/user-context';

// const authAxios = axios.create({
//   headers: { 'x-access-token': localStorage.getItem('token') },
// });

const filterByOptions = [
  'all events',
  'integrated units',
  'courses',
  'sepJr',
  'cs leads',
  'events that I facilitated',
];

const PdEventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [editOpen, setEditOpen] = useState([]);
  const [newEvent, setNewEvent] = useState({});
  const [filterBy, setFilterBy] = useState(filterByOptions[0]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const newFilteredEvents = [...events].filter(event => {
      if (filterBy === 'all events') {
        return true;
      } else if (filterBy === 'integrated units' && event.category === 'units') {
        return true;
      } else if (filterBy === 'courses' && event.category === 'courses') {
        return true;
      } else if (filterBy === 'sepJr' && event.category === 'sep-jr') {
        return true;
      } else if (filterBy === 'cs leads' && event.category === 'cs-leads') {
        return true;
      } else if (filterBy === 'events that I facilitated' && event.facilitators.filter(f => f._id === userData._id).length > 0) {
        return true;
      }
      return false;
    });
    setFilteredEvents(newFilteredEvents);
  }, [events, filterBy, userData._id]);

  const loadData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_SERVER + '/events');
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
      setEvents(events);
      setEditOpen(events.map(e => false));
      setLoading(false);
    } catch (error) {
      console.log('unable to retrieve events');
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmitEdit = async () => {
    try {
      setSubmitted(true);
      console.log('newEvent=', newEvent);
      const response = await axios.put(process.env.REACT_APP_API_SERVER + '/events/' + newEvent._id, newEvent, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      console.log('status=', response.status);
      setEditOpen(events.map(e => false));
      loadData();
    } finally {
      setSubmitted(false);
    }
  };

  if (loading) return <h1>loading...</h1>;

  return (
    <>
      <h2>all pds/events</h2>
      <Dropdown
        text={'Filter: ' + filterBy}
        icon="filter"
        floating
        labeled
        button
        className="icon"
      >
        <Dropdown.Menu>
          <Dropdown.Header icon="tags" content="Filter by" />
          <Dropdown.Divider />
          {filterByOptions.map((option, index) => {
            return (<Dropdown.Item key={index} onClick={() => setFilterBy(option)}>{option}</Dropdown.Item>);
          })}
        </Dropdown.Menu>
      </Dropdown>

      <Table compact="very" selectable celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>CS4All Program</Table.HeaderCell>
            <Table.HeaderCell>PD/Event Title</Table.HeaderCell>
            <Table.HeaderCell>Start Time</Table.HeaderCell>
            <Table.HeaderCell>End Time</Table.HeaderCell>
            <Table.HeaderCell>Facilitator(s)</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredEvents &&
            filteredEvents.map((event, index) => {
              return (
                <Table.Row key={event._id}>
                  <Table.Cell>{event.displayDate}</Table.Cell>
                  <Table.Cell>{event.category}</Table.Cell>
                  <Table.Cell>{event.title}</Table.Cell>
                  <Table.Cell>{event.displayBegin}</Table.Cell>
                  <Table.Cell>{event.displayEnd}</Table.Cell>
                  <Table.Cell>
                    {event.facilitators.map(
                      (facilitator, index) => {
                        return (
                          <span key={facilitator._id}>
                            {(index > 0 ? ', ' : '') +
                              facilitator.firstName +
                              ' ' +
                              facilitator.lastName}
                          </span>
                        );
                      }
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Button color="teal" compact onClick={() => setEditOpen(prevOpens => {
                      const newEditOpens = [...prevOpens];
                      newEditOpens[index] = true;
                      return newEditOpens;
                    })}>
                      edit
                    </Button>

                    <Modal
                      closeIcon
                      open={editOpen[index]}
                      onClose={() => setEditOpen(prevOpens => {
                        const newEditOpens = [...prevOpens];
                        newEditOpens[index] = false;
                        return newEditOpens;
                      })}
                    >
                      <Modal.Header>
                        Edit your event
                      </Modal.Header>
                      <Modal.Content>
                        <Modal.Description>

                          <EditEvent event={event} onEventChange={(newEvent) => setNewEvent(newEvent)} />
                          
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color="red" onClick={() => setEditOpen(prevOpens => {
                          const newEditOpens = [...prevOpens];
                          newEditOpens[index] = false;
                          return newEditOpens;
                        })}>
                          Cancel
                        </Button>
                        <Button
                          content="Save"
                          labelPosition="left"
                          icon="checkmark"
                          onClick={() => handleSubmitEdit(event)}
                          positive
                          loading={submitted}
                        />
                      </Modal.Actions>
                    </Modal>

                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>      
    </>
  );
};

export default PdEventList;
