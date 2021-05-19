import { useState, useEffect } from 'react';
import {
  Dropdown,
  Input,
  Table,
  Button,
  Modal,
  Header,
} from 'semantic-ui-react';
import axios from 'axios';

const AdminTimesheetApproval = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherTimesheets();
  }, []);

  const timesheetStatusOptions = [
    { key: 1, text: 'pending approval', value: 1 },
    { key: 2, text: 'approved, processing', value: 2 },
    { key: 3, text: 'processed', value: 3 },
    { key: 4, text: 'denied', value: 4 },
  ];

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
      <h2>approve timesheets</h2>
      {timesheets.length === 0 ? (
        <h1>loading...</h1>
      ) : (
        <>
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
              <Dropdown.Item>events i facilitated</Dropdown.Item>
              <Dropdown.Item>my teachers</Dropdown.Item>
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

            <Table.Body>
              {timesheets.map((timesheet) => (
                <Table.Row negative key={timesheet.id}>
                  <Table.Cell>{timesheet.date}</Table.Cell>
                  <Table.Cell>{timesheet.programTitle}</Table.Cell>
                  <Table.Cell>{timesheet.title}</Table.Cell>
                  <Table.Cell>
                    {timesheet.firstName} {timesheet.lastName}
                  </Table.Cell>
                  <Table.Cell>
                    <Modal
                      closeIcon
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      open={open}
                      trigger={
                        <Button size="mini" color="purple">
                          view
                        </Button>
                      }
                    >
                      <Modal.Header>
                        Review Teacher Timesheet Submission
                      </Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Header>
                            teacher timesheet PDF will be displayed here
                          </Header>
                          <p>
                            note: perhaps we should add a note field in a future
                            version IF the timesheet is to be denied
                          </p>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color="red" onClick={() => setOpen(false)}>
                          Deny
                        </Button>
                        <Button
                          content="One-Click Sign and Approve Timesheet"
                          labelPosition="left"
                          icon="checkmark"
                          onClick={() => setOpen(false)}
                          positive
                        />
                      </Modal.Actions>
                    </Modal>
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      options={timesheetStatusOptions}
                      selection
                      fluid
                    />
                  </Table.Cell>
                </Table.Row>
              ))}

              {/* <Table.Row negative>
                <Table.Cell>5/1/21</Table.Cell>
                <Table.Cell>Units: Intro to CS</Table.Cell>
                <Table.Cell>Johnny Appleseed</Table.Cell>
                <Table.Cell>Jorge Gallardo</Table.Cell>
                <Table.Cell>
                  <Button size="mini" color="purple">
                    view
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Dropdown options={timesheetStatusOptions} selection fluid />
                </Table.Cell>
              </Table.Row> */}
            </Table.Body>
          </Table>
        </>
      )}
    </>
  );
};

export default AdminTimesheetApproval;
