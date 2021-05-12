import { Button, Divider } from 'semantic-ui-react';
import TeacherSubmissions from './TeacherSubmissions';
import TimesheetGenerator from './TimesheetGenerator';
import { Grid, Menu } from 'semantic-ui-react';

const TeacherDashboard = (props) => {
  const { user, userId, userData, handleLogout } = props;
  const teacher = userData[0];

  return (
    <section>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <h1>{`welcome ${teacher.firstName} ${teacher.lastName}`}</h1>
      <Grid textAlign="center" columns={4}>
        <Grid.Row>
          <Grid.Column>
            <Menu fluid vertical>
              <Menu.Item
                className="header"
                style={{ backgroundColor: '#bde9ba' }}
              >
                Email
              </Menu.Item>
              <Menu.Item>{user.email}</Menu.Item>
              <Menu.Item
                className="header"
                style={{ backgroundColor: '#bde9ba' }}
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
                style={{ backgroundColor: '#bde9ba' }}
              >
                DBN
              </Menu.Item>
              <Menu.Item>12K345</Menu.Item>
              <Menu.Item
                className="header"
                style={{ backgroundColor: '#bde9ba' }}
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
                style={{ backgroundColor: '#bde9ba' }}
              >
                Grade Taught
              </Menu.Item>
              <Menu.Item>4th</Menu.Item>
              <Menu.Item
                className="header"
                style={{ backgroundColor: '#bde9ba' }}
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
                style={{ backgroundColor: '#bde9ba' }}
              >
                CS4All Point of Contact
              </Menu.Item>
              <Menu.Item>Jorge Gallardo</Menu.Item>
              <Menu.Item>jgallardo2@schools.nyc.gov</Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <TimesheetGenerator />
      <Divider />
      <TeacherSubmissions />
    </section>
  );
};

export default TeacherDashboard;
