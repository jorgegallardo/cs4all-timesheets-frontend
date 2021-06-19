import { Card, Statistic } from 'semantic-ui-react';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  Label,
  Legend,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    submitted: 120,
    processed: 80,
    amt: 2400,
  },
  {
    name: 'Feb',
    submitted: 300,
    processed: 220,
    amt: 2210,
  },
  {
    name: 'Mar',
    submitted: 400,
    processed: 300,
    amt: 2290,
  },
  {
    name: 'Apr',
    submitted: 550,
    processed: 400,
    amt: 2000,
  },
  {
    name: 'May',
    submitted: 650,
    processed: 500,
    amt: 2181,
  },
  {
    name: 'Jun',
    submitted: 800,
    processed: 600,
    amt: 2500,
  },
  {
    name: 'Jul',
    submitted: 900,
    processed: 700,
    amt: 2100,
  },
  {
    name: 'Aug',
    submitted: 1200,
    processed: 1100,
    amt: 2100,
  },
  {
    name: 'Sep',
    submitted: 1500,
    processed: 1200,
    amt: 2100,
  },
  {
    name: 'Oct',
    submitted: 1800,
    processed: 1400,
    amt: 2100,
  },
  {
    name: 'Nov',
    submitted: 2100,
    processed: 2000,
    amt: 2100,
  },
  {
    name: 'Dec',
    submitted: 2200,
    processed: 2000,
    amt: 2100,
  },
];

const AdminStatistics = () => {
  return (
    <>
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
      <br />
      <h2>last 12 months</h2>
      <ResponsiveContainer height={400} width="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F2701D" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#F2701D" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#23BA46" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#23BA46" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" height={50}>
            <Label value="Month" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis
            label={{
              value: 'Timesheets',
              angle: -90,
              position: 'insideLeft',
            }}
            width={70}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="submitted"
            stroke="#F2701D"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="processed"
            stroke="#23BA46"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default AdminStatistics;
