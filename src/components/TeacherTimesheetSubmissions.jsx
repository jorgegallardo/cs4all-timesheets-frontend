import axios from 'axios';
import { parseISO, format } from 'date-fns';
import { useState, useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';

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
            <Table.HeaderCell>PD/Event Title</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Start Time</Table.HeaderCell>
            <Table.HeaderCell>End Time</Table.HeaderCell>
            <Table.HeaderCell>Facilitator(s)</Table.HeaderCell>
            <Table.HeaderCell>Timesheet</Table.HeaderCell>
            <Table.HeaderCell>Payment Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {timesheets.map((timesheet) => {
            return (
              <Table.Row key={timesheet._id}>
                <Table.Cell>{timesheet.created}</Table.Cell>
                <Table.Cell>{timesheet.events[0].event.title}</Table.Cell>
                <Table.Cell>
                  {format(parseISO(timesheet.events[0].begin), 'MM/dd/yy')}
                </Table.Cell>
                <Table.Cell>
                  {format(parseISO(timesheet.events[0].begin), 'h:mm aaa')}
                </Table.Cell>
                <Table.Cell>
                  {format(parseISO(timesheet.events[0].end), 'h:mm aaa')}
                </Table.Cell>
                <Table.Cell>
                  {timesheet.events[0].event.facilitators.map(
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
                  <Button
                    size="mini"
                    color="purple"
                    onClick={() => {
                      window.open(timesheet.filename);
                    }}
                  >
                    download
                  </Button>
                </Table.Cell>
                <Table.Cell>{timesheet.status}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default TeacherTimesheetSubmissions;
