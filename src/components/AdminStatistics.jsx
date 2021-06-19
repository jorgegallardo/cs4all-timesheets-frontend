import { Card, Statistic } from 'semantic-ui-react';

const items = [
  {
    header: 'Project Report - April',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    meta: 'ROI: 30%',
  },
  {
    header: 'Project Report - May',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
  },
];

const AdminStatistics = () => {
  return (
    <Card.Group centered>
      <Card>
        <Card.Content textAlign="center">
          <Statistic size="huge" color="orange">
            <Statistic.Label>Pending Timesheets</Statistic.Label>
            <Statistic.Value>91,499</Statistic.Value>
          </Statistic>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content textAlign="center">
          <Statistic size="huge" color="green">
            <Statistic.Label>Approved Timesheets</Statistic.Label>
            <Statistic.Value>499</Statistic.Value>
          </Statistic>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content textAlign="center">
          <Statistic size="huge" color="blue">
            <Statistic.Label>Users</Statistic.Label>
            <Statistic.Value>204</Statistic.Value>
          </Statistic>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default AdminStatistics;
