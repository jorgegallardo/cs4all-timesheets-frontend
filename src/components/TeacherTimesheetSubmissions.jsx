import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { format, parseISO } from 'date-fns';

const TeacherTimesheetSubmissions = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API_SERVER + '/timesheets/user',
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      const timesheets = response.data;
      setTimesheets(timesheets);
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) return <h1>loading...</h1>;
  return (
    <>
      <h2>previously submitted timesheets</h2>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Submitted On</Table.HeaderCell>
            <Table.HeaderCell>Number of Events</Table.HeaderCell>
            <Table.HeaderCell>PD/Event Date(s)</Table.HeaderCell>
            <Table.HeaderCell>PD/Events Title(s)</Table.HeaderCell>
            <Table.HeaderCell>Timesheet PDF</Table.HeaderCell>
            <Table.HeaderCell>Payment Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {timesheets.map((timesheet) => {
            return (
              <Table.Row key={timesheet._id}>
                <Table.Cell>
                  {format(parseISO(timesheet.created), 'MM/dd/yyyy')}
                </Table.Cell>
                <Table.Cell>{timesheet.events.length}</Table.Cell>

                <Table.Cell>
                  {timesheet.events.map((event, index) => {
                    return `${index > 0 ? ', ' : ''} ${format(
                      parseISO(event.begin),
                      'MM/dd/yyyy'
                    )}`;
                  })}
                </Table.Cell>
                <Table.Cell>
                  {timesheet.events.map(
                    (e, index) => `${index > 0 ? ', ' : ''}${e.event.title}`
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="mini"
                    color="purple"
                    onClick={() => {
                      window.open(timesheet.filename);
                    }}
                  >
                    view
                  </Button>
                </Table.Cell>
                <Table.Cell>{timesheet.status}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <pre>{JSON.stringify(timesheets, null, 2)}</pre>
    </>
  );
};

export default TeacherTimesheetSubmissions;
