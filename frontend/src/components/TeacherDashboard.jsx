import { Button, Divider } from 'semantic-ui-react';
import TeacherTimesheetSubmissions from './TeacherTimesheetSubmissions';
import TeacherTimesheetGenerator from './TeacherTimesheetGenerator';
import { Grid, Menu, Message } from 'semantic-ui-react';

const TeacherDashboard = (props) => {
  const { user, userId, userData, handleLogout } = props;
  const teacher = userData[0];

  return (
    <section>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <h1>{`welcome, ${teacher.firstName} ${teacher.lastName}`}</h1>
      <Grid textAlign="center" columns={4}>
        <Grid.Row>
          <Grid.Column>
            <Menu fluid vertical>
              <Menu.Item
                className="header"
                style={{ backgroundColor: 'rgba(34, 36, 38, 0.1)' }}
              >
                Email
              </Menu.Item>
              <Menu.Item>{user.email}</Menu.Item>
              <Menu.Item
                className="header"
                style={{ backgroundColor: 'rgba(34, 36, 38, 0.1)' }}
              >
                File Number
              </Menu.Item>
              <Menu.Item>{teacher.fileNumber}</Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column>
            <Menu fluid vertical>
              <Menu.Item
                className="header"
                style={{ backgroundColor: 'rgba(34, 36, 38, 0.1)' }}
              >
                DBN
              </Menu.Item>
              <Menu.Item>12K345</Menu.Item>
              <Menu.Item
                className="header"
                style={{ backgroundColor: 'rgba(34, 36, 38, 0.1)' }}
              >
                School Name
              </Menu.Item>
              <Menu.Item>Potato Elementary School</Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Menu fluid vertical>
              <Menu.Item
                className="header"
                style={{ backgroundColor: 'rgba(34, 36, 38, 0.1)' }}
              >
                Grade Taught
              </Menu.Item>
              <Menu.Item>4th</Menu.Item>
              <Menu.Item
                className="header"
                style={{ backgroundColor: 'rgba(34, 36, 38, 0.1)' }}
              >
                CS4All Program Name
              </Menu.Item>
              <Menu.Item>Integrated Units</Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Menu fluid vertical>
              <Menu.Item
                className="header"
                style={{ backgroundColor: 'rgba(34, 36, 38, 0.1)' }}
              >
                CS4All Point of Contact
              </Menu.Item>
              <Menu.Item>Jorge Gallardo</Menu.Item>
              <Menu.Item>jgallardo2@schools.nyc.gov</Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Message negative>
        <Message.Header>reminder</Message.Header>
        <p>
          your account is currently missing an OP-175 form for school year
          2021-22. please{' '}
          <span
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              color: 'blue',
            }}
          >
            click here
          </span>{' '}
          to generate an up-to-date OP-175.
        </p>
      </Message>
      <TeacherTimesheetGenerator />
      <Divider />
      <TeacherTimesheetSubmissions />
    </section>
  );
};

export default TeacherDashboard;
