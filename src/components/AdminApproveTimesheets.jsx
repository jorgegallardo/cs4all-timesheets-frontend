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
import { format, parseISO } from 'date-fns';

const AdminTimesheetApproval = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherTimesheets();
  }, []);

  const timesheetStatusOptions = [
    { key: 1, text: 'pending', value: 1 },
    { key: 2, text: 'approved', value: 2 },
    { key: 3, text: 'processed', value: 3 },
    { key: 4, text: 'denied', value: 4 },
  ];

  const fetchTeacherTimesheets = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_SERVER + '/timesheets/admin',
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      const timesheets = response.data;

      console.log('timesheets=', timesheets);

      setTimesheets(timesheets);
    } catch (error) {
      console.log('unable to retrieve timesheets');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h1>loading...</h1>;

  return (
    <>
      <h2>my teachers' timesheets</h2>
      {
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
                <Table.Row negative key={timesheet._id}>
                  <Table.Cell>
                    {format(parseISO(timesheet.events[0].begin), 'MM/dd/yy')}
                  </Table.Cell>
                  <Table.Cell>{timesheet.events[0].event.category}</Table.Cell>
                  <Table.Cell>{timesheet.events[0].event.title}</Table.Cell>
                  <Table.Cell>
                    {timesheet.teacher.firstName} {timesheet.teacher.lastName}
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
                        <iframe
                          title="teacher timesheet pdf"
                          src={timesheet.filename + '#toolbar=0'}
                          width="100%"
                          height="300px"
                        ></iframe>
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
                      value={
                        timesheetStatusOptions.find(
                          (opt) => opt.text === timesheet.status
                        ).value
                      }
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
      }
    </>
  );
};

export default AdminTimesheetApproval;
