import React, { useState, useEffect } from 'react';
import { Table, Dropdown, Button, Modal } from 'semantic-ui-react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import EditEvent from './EditEvent';

// const authAxios = axios.create({
//   headers: { 'x-access-token': localStorage.getItem('token') },
// });

const PdEventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [editOpen, setEditOpen] = useState([]);
  const [newEvent, setNewEvent] = useState({});

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
        text="Filter"
        icon="filter"
        floating
        labeled
        button
        className="icon"
      >
        <Dropdown.Menu>
          <Dropdown.Header icon="tags" content="Filter by" />
          <Dropdown.Divider />
          <Dropdown.Item>all events</Dropdown.Item>
          <Dropdown.Item>integrated units</Dropdown.Item>
          <Dropdown.Item>courses</Dropdown.Item>
          <Dropdown.Item>sepJr</Dropdown.Item>
          <Dropdown.Item>cs leads</Dropdown.Item>
          <Dropdown.Item>events that i facilitated</Dropdown.Item>
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
          {events &&
            events.map((event, index) => {
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
