import { Button, Table } from 'semantic-ui-react';

const TeacherTimesheetSubmissions = () => {
  return (
    <>
      <h2>previously submitted timesheets</h2>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Submitted On</Table.HeaderCell>
            <Table.HeaderCell>PD/Event Title</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Facilitator</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Timesheet</Table.HeaderCell>
            <Table.HeaderCell>Payment Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {/* we can use map to programatically create the rows */}
        <Table.Body>
          <Table.Row>
            <Table.Cell>5/13/21</Table.Cell>
            <Table.Cell>Units: Intro to CS</Table.Cell>
            <Table.Cell>5/2/21</Table.Cell>
            <Table.Cell>Jorge Gallardo</Table.Cell>
            <Table.Cell>3-4pm</Table.Cell>
            <Table.Cell>
              <Button size="mini" color="purple">
                blah.pdf
              </Button>
            </Table.Cell>
            <Table.Cell style={{ color: 'red' }}>pending approval</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>5/10/21</Table.Cell>
            <Table.Cell>Units: Algorithms</Table.Cell>
            <Table.Cell>5/9/21</Table.Cell>
            <Table.Cell>Jorge Gallardo</Table.Cell>
            <Table.Cell>4-5pm</Table.Cell>
            <Table.Cell>
              <Button size="mini" color="purple">
                blah.pdf
              </Button>
            </Table.Cell>
            <Table.Cell style={{ color: 'green' }}>processed</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default TeacherTimesheetSubmissions;
