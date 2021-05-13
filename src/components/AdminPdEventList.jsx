import { Table, Dropdown, Button } from 'semantic-ui-react';

const PdEventList = () => {
  const timesheetStatusOptions = [
    { key: 1, text: 'pending approval', value: 1 },
    { key: 2, text: 'approved, processing', value: 2 },
    { key: 3, text: 'processed', value: 3 },
    { key: 4, text: 'denied', value: 4 },
  ];

  return (
    <>
      <h2>view all pds/events</h2>
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
          <Dropdown.Item>events i facilitated</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>PD/Event</Table.HeaderCell>
            <Table.HeaderCell>Facilitator</Table.HeaderCell>
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
            <Table.Cell>Johnny Appleseed</Table.Cell>
            <Table.Cell>Jorge Gallardo</Table.Cell>
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

export default PdEventList;
