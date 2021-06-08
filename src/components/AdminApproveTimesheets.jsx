import { useState, useEffect, useRef, useContext } from 'react';
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
import SignaturePad from 'signature_pad';
import UserContext from '../store/user-context';

const AdminTimesheetApproval = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [timesheets, setTimesheets] = useState([]);
  const [selectedTimesheet, setSelectedTimesheet] = useState([]);
  const [timesheetOpen, setTimesheetOpen] = useState(false);
  const [signatureOpen, setSignatureOpen] = useState(false);
  const canvas = useRef(null);
  const [signaturePad, setSignaturePad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherTimesheets();
  }, []);

  useEffect(() => {
    if (canvas && canvas.current) {
      setSignaturePad(new SignaturePad(canvas.current));
    }
  }, [signatureOpen]);

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
      setTimesheets(timesheets);
    } catch (error) {
      console.error('unable to retrieve timesheets: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const executeApproval = async (timesheet) => {
    setLoading(true);
    const response = await axios.post(
      process.env.REACT_APP_API_SERVER + '/timesheets/approve',
      {
        timesheetId: timesheet._id,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    console.log('response=' + response);
    alert('timesheet approved');
    fetchTeacherTimesheets();
    setLoading(false);
  };

  const approveTimesheetHandler = async (timesheet) => {
    if (userData.signatureFilename) {
      await executeApproval(timesheet);
      setTimesheetOpen(false);
    } else {
      setSignatureOpen(true);
    }
  };

  const submitSignatureHandler = async (timesheet) => {
    if (signaturePad.isEmpty()) {
      alert('you forgot to sign the pad');
      return;
    }
    const dataUrl = signaturePad.toDataURL();
    const response = await axios.put(
      process.env.REACT_APP_API_SERVER + '/users/signature',
      {
        signatureData: dataUrl,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    signaturePad.clear();
    const signatureFilename = response.data.signatureFilename;
    setUserData((currentUserData) => {
      return {
        ...currentUserData,
        signatureFilename,
      };
    });
    await executeApproval(timesheet);
    setSignatureOpen(false);
    setTimesheetOpen(false);
  };

  return !loading && timesheets.length === 0 ? (
    <div>Congratulations, there are 0 timesheets awaiting approval!</div>
  ) : (
    <>
      <h2>pending timesheets</h2>
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
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {timesheets.map((timesheet) => (
            <Table.Row negative key={timesheet._id}>
              <Table.Cell>
                {format(parseISO(timesheet.events[0].begin), 'MM/dd/yy')}
              </Table.Cell>
              {/* <Table.Cell>{timesheet.events[0].event.category}</Table.Cell> */}
              <Table.Cell>{'should be category?'}</Table.Cell>
              {/* <Table.Cell>{timesheet.events[0].event.title}</Table.Cell> */}
              <Table.Cell>{'should be title'}</Table.Cell>
              <Table.Cell>
                {timesheet.teacher.firstName} {timesheet.teacher.lastName}
              </Table.Cell>
              <Table.Cell>
                <Button
                  size="mini"
                  primary
                  onClick={() => {
                    setSelectedTimesheet(timesheet);
                    setTimesheetOpen(true);
                  }}
                >
                  view & approve or deny
                </Button>

                <Modal
                  closeIcon
                  open={timesheetOpen}
                  onClose={() => setTimesheetOpen(false)}
                >
                  <Modal.Header>
                    Review Teacher Timesheet Submission
                  </Modal.Header>
                  <Modal.Content>
                    <iframe
                      title="teacher timesheet pdf"
                      src={selectedTimesheet.filename + '#toolbar=0'}
                      width="100%"
                      height={window.document.body.clientHeight - 280}
                    ></iframe>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="red" onClick={() => setTimesheetOpen(false)}>
                      Deny
                    </Button>
                    <Button
                      content="One-Click Sign and Approve Timesheet"
                      labelPosition="left"
                      icon="checkmark"
                      onClick={() => approveTimesheetHandler(selectedTimesheet)}
                      positive
                      loading={loading}
                    />
                  </Modal.Actions>

                  <Modal
                    closeIcon
                    open={signatureOpen}
                    onClose={() => setSignatureOpen(false)}
                  >
                    <Modal.Header>
                      We need to add your signature on file
                    </Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <Header>
                          Sign here to save your signature and approve this
                          timesheet:
                        </Header>
                        <canvas
                          ref={canvas}
                          style={{
                            border: '1px solid black',
                            borderRadius: '5px',
                          }}
                          width="345"
                          height="100"
                        />
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        color="red"
                        onClick={() => setSignatureOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        content="Approve Timesheet"
                        labelPosition="left"
                        icon="checkmark"
                        onClick={() =>
                          submitSignatureHandler(selectedTimesheet)
                        }
                        positive
                        loading={loading}
                      />
                    </Modal.Actions>
                  </Modal>
                </Modal>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default AdminTimesheetApproval;
