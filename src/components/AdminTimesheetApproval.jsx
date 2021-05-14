import React from 'react';
import { Dropdown, Input, Table, Button, Message } from 'semantic-ui-react';

const AdminTimesheetApproval = () => {
  const timesheetStatusOptions = [
    { key: 1, text: 'pending approval', value: 1 },
    { key: 2, text: 'approved, processing', value: 2 },
    { key: 3, text: 'processed', value: 3 },
    { key: 4, text: 'denied', value: 4 },
  ];

  return (
    <>
      <Message negative>
        <Message.Header>jorge's notes</Message.Header>
        <Message.List>
          <Message.Item>
            <p>
              cs4all admin can create a signature and when they press on the
              timesheet's .pdf, a modal should open that displays the teacher's
              pdf and allows the admin to press a button and automatically
              sign/date/approve it, deny it, or mark it processed? (this
              functionality has not yet been created)
            </p>
          </Message.Item>
          <Message.Item>
            <p>
              "pending approval" should be the default in the dropdown in the
              status... unless i remove the dropdown and replace it with another
              way of changing the status
            </p>
          </Message.Item>
          <Message.Item>
            <p>
              only the timesheets that are sign-able/approve-able by the
              appropriate cs4all staff member should appear here (eg.
              facilitated event or cs4all point person for the teacher in
              question).
            </p>
          </Message.Item>
        </Message.List>
      </Message>
      <h2>approve timesheets</h2>
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
            <Table.HeaderCell>PD/Event</Table.HeaderCell>
            <Table.HeaderCell>Facilitator(s)</Table.HeaderCell>
            <Table.HeaderCell>Teacher</Table.HeaderCell>
            <Table.HeaderCell>Timesheet</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
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
            <Table.Cell>
              <Dropdown options={timesheetStatusOptions} selection fluid />
            </Table.Cell>
          </Table.Row>
          <Table.Row negative>
            <Table.Cell>5/1/21</Table.Cell>
            <Table.Cell>Units: Intro to CS</Table.Cell>
            <Table.Cell>Jorge Gallardo</Table.Cell>
            <Table.Cell>Johnny Appleseed</Table.Cell>
            <Table.Cell>
              <Button size="mini" color="purple">
                blah.pdf
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Dropdown options={timesheetStatusOptions} selection fluid />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default AdminTimesheetApproval;
