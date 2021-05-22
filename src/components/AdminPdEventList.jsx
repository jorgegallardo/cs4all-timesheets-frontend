import { useState, useEffect } from 'react';
import { Table, Dropdown, Button } from 'semantic-ui-react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

// const authAxios = axios.create({
//   headers: { 'x-access-token': localStorage.getItem('token') },
// });

const PdEventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setLoading(false);
      } catch (error) {
        console.log('unable to retrieve events');
        console.log(error);
      }
    };

    loadData();
  }, []);

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
