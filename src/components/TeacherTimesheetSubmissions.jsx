import axios from 'axios';
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
            <Table.HeaderCell>PD/Event(s)</Table.HeaderCell>

            <Table.HeaderCell>Timesheet PDF</Table.HeaderCell>
            <Table.HeaderCell>Payment Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {timesheets.map((timesheet) => {
            return (
              <Table.Row key={timesheet._id}>
                <Table.Cell>{timesheet.created}</Table.Cell>
                <Table.Cell>{'insert pd/event title(s)'}</Table.Cell>

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
