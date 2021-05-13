import React from 'react';
import { Dropdown, Input, Table, Button } from 'semantic-ui-react';

const AdminAllTimesheets = () => {
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
            <Table.HeaderCell>PD/Event</Table.HeaderCell>
            <Table.HeaderCell>Facilitator</Table.HeaderCell>
            <Table.HeaderCell>Teacher</Table.HeaderCell>
            <Table.HeaderCell>Timesheet</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row warning>
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
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default AdminAllTimesheets;
