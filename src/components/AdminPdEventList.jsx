import { useState, useEffect } from 'react';
import { Table, Dropdown, Button } from 'semantic-ui-react';
import axios from 'axios';

// const authAxios = axios.create({
//   headers: { 'x-access-token': localStorage.getItem('token') },
// });

const PdEventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

      // we received a list of events
      setEvents(response.data.events);
      setLoading(false);
    } catch (error) {
      console.log('unable to retrieve events');
      console.log(error);
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
            events.map((event) => {
              return (
                <Table.Row key={event.id}>
                  <Table.Cell>{event.date}</Table.Cell>
                  <Table.Cell>{event.program}</Table.Cell>
                  <Table.Cell>{event.title}</Table.Cell>
                  <Table.Cell>{event.startTime}</Table.Cell>
                  <Table.Cell>{event.endTime}</Table.Cell>
                  <Table.Cell>
                    {event.facilitators.length === 1
                      ? event.facilitators.map((facilitator) => (
                          // use actual facilitator ids for keys, not a random num
                          <span key={Math.random()}>{facilitator}</span>
                        ))
                      : event.facilitators.map((facilitator) => (
                          <span key={Math.random()}>{facilitator}, </span>
                          // figure out a way to remove the comma from the last item
                        ))}
                  </Table.Cell>
                  <Table.Cell>
                    <Button color="teal" compact>
                      edit
                    </Button>
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
