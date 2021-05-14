import { Table, Dropdown, Button, Message } from 'semantic-ui-react';

const PdEventList = () => {
  return (
    <>
      <Message negative>
        <Message.Header>jorge's notes</Message.Header>
        <Message.List>
          <Message.Item>
            <p>
              events should be editable but not easily delete-able (only the
              creator of the event should be able to delete it and there should
              be serious warnings)
            </p>
          </Message.Item>
          <Message.Item>
            <p>
              pressing edit should pop up a modal that would allow for updating
              the fields of the event. gotta make sure to store a ref to the
              event in teacher accounts so any changes are seen across the
              entire system. oh wait, what if a teacher has submitted a
              timesheet already? maybe editing should not be allowed... hmmm...
            </p>
          </Message.Item>
        </Message.List>
      </Message>
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
          <Dropdown.Item>events that i facilitated</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Table compact="very" selectable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>CS4All Program</Table.HeaderCell>
            <Table.HeaderCell>PD/Event Title</Table.HeaderCell>
            <Table.HeaderCell>Start Time</Table.HeaderCell>
            <Table.HeaderCell>End Time</Table.HeaderCell>
            <Table.HeaderCell>Facilitator(s)</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>5/5/21</Table.Cell>
            <Table.Cell>Units</Table.Cell>
            <Table.Cell>Abstraction</Table.Cell>
            <Table.Cell>3:00</Table.Cell>
            <Table.Cell>4:00</Table.Cell>
            <Table.Cell>Jorge Gallardo</Table.Cell>
            <Table.Cell>
              <Button color="teal" compact>
                edit
              </Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>5/4/21</Table.Cell>
            <Table.Cell>Units</Table.Cell>
            <Table.Cell>Algorithms</Table.Cell>
            <Table.Cell>3:00</Table.Cell>
            <Table.Cell>4:00</Table.Cell>
            <Table.Cell>Jorge Gallardo</Table.Cell>
            <Table.Cell>
              <Button color="teal" compact>
                edit
              </Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>5/3/21</Table.Cell>
            <Table.Cell>Units</Table.Cell>
            <Table.Cell>Intro to CS</Table.Cell>
            <Table.Cell>3:00</Table.Cell>
            <Table.Cell>4:00</Table.Cell>
            <Table.Cell>Jorge Gallardo</Table.Cell>
            <Table.Cell>
              <Button color="teal" compact>
                edit
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default PdEventList;
