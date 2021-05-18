import { Table, Icon } from 'semantic-ui-react';

const TeacherDetails = () => {
  return (
    <>
      <Table celled striped columns={2} compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">My Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="envelope outline" /> CS4All Program Name
            </Table.Cell>
            <Table.Cell>Integrated Units</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="envelope outline" /> CS4All Point of Contact
            </Table.Cell>
            <Table.Cell>Jorge Gallardo (jgallardo2@schools.nyc.gov)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="envelope outline" /> Email Address
            </Table.Cell>
            <Table.Cell>hgilmore@schools.nyc.gov</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="hashtag" /> File Number
            </Table.Cell>
            <Table.Cell>123456</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="building outline" /> DBN
            </Table.Cell>
            <Table.Cell>17K123</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="building outline" /> Borough Citywide Office
            </Table.Cell>
            <Table.Cell>Brooklyn South</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="building outline" /> District
            </Table.Cell>
            <Table.Cell>17</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="building outline" /> School
            </Table.Cell>
            <Table.Cell>Potato Elementary School</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="building outline" /> Grade Taught
            </Table.Cell>
            <Table.Cell>4th</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default TeacherDetails;
