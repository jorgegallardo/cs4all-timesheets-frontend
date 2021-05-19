import { Dropdown, Input, Table, Button } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAllTimesheets = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherTimesheets();
  }, []);

  const fetchTeacherTimesheets = async () => {
    try {
      // const response = await authAxios.get('http://localhost:3008/api/timesheets');
      const response = await axios.get('http://localhost:3008/api/timesheets');
      // const response = await axios.get(
      //   'https://server-mongodb-practice.herokuapp.com/api/timesheets'
      // );
      if (response.data.timesheets === undefined) throw Error;

      // we received a list of events
      setTimesheets(response.data.timesheets);
      setLoading(false);
    } catch (error) {
      console.log('unable to retrieve timesheets');
      console.log(error);
    }
  };

  if (loading) return <h1>loading...</h1>;

  return (
    <>
      <h2>view all timesheets</h2>
      <Dropdown
        text="Filter"
        icon="filter"
        floating
        labeled
        button
        className="icon"
      >
        <Dropdown.Menu>
          <Dropdown.Header content="Find Teacher" />
          <Input icon="search" iconPosition="left" name="search" />
          <Dropdown.Header icon="tags" content="Filter by" />
          <Dropdown.Divider />
          <Dropdown.Item>view all</Dropdown.Item>
          <Dropdown.Item>integrated units</Dropdown.Item>
          <Dropdown.Item>courses</Dropdown.Item>
          <Dropdown.Item>sepjr</Dropdown.Item>
          <Dropdown.Item>cs leads</Dropdown.Item>
          <Dropdown.Item>pending approval</Dropdown.Item>
          <Dropdown.Item>approved, processing</Dropdown.Item>
          <Dropdown.Item>processed</Dropdown.Item>
          <Dropdown.Item>denied</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>CS4All Program</Table.HeaderCell>
            <Table.HeaderCell>PD/Event Title</Table.HeaderCell>
            <Table.HeaderCell>Teacher</Table.HeaderCell>
            <Table.HeaderCell>Timesheet</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {timesheets.length === 0 ? (
          <h1>loading...</h1>
        ) : (
          <Table.Body>
            {timesheets.map((timesheet) => (
              <Table.Row>
                <Table.Cell>{timesheet.date}</Table.Cell>
                <Table.Cell>{timesheet.programTitle}</Table.Cell>
                <Table.Cell>{timesheet.title}</Table.Cell>
                <Table.Cell>
                  {timesheet.firstName} {timesheet.lastName}
                </Table.Cell>
                <Table.Cell>
                  <Button size="mini" color="purple">
                    view
                  </Button>
                </Table.Cell>
                <Table.Cell>{timesheet.status}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
        {/* <Table.Row warning>
            <Table.Cell>5/2/21</Table.Cell>
            <Table.Cell>Units: Programming</Table.Cell>
            <Table.Cell>Jorge Gallardo</Table.Cell>
            <Table.Cell>Johnny Appleseed</Table.Cell>
            <Table.Cell>
              <Button size="mini" color="purple">
                blah.pdf
              </Button>
            </Table.Cell>
            <Table.Cell>pending approval</Table.Cell>
          </Table.Row>
          <Table.Row negative>
            <Table.Cell>5/2/21</Table.Cell>
            <Table.Cell>Units: Programming</Table.Cell>
            <Table.Cell>Jorge Gallardo</Table.Cell>
            <Table.Cell>Johnny Appleseed</Table.Cell>
            <Table.Cell>
              <Button size="mini" color="purple">
                blah.pdf
              </Button>
            </Table.Cell>
            <Table.Cell>denied</Table.Cell>
          </Table.Row>
          <Table.Row positive>
            <Table.Cell>5/1/21</Table.Cell>
            <Table.Cell>Units: Intro to CS</Table.Cell>
            <Table.Cell>Jorge Gallardo</Table.Cell>
            <Table.Cell>Johnny Appleseed</Table.Cell>
            <Table.Cell>
              <Button size="mini" color="purple">
                blah.pdf
              </Button>
            </Table.Cell>
            <Table.Cell>processed</Table.Cell>
          </Table.Row> */}
      </Table>
    </>
  );
};

export default AdminAllTimesheets;
