import { Grid, Menu } from 'semantic-ui-react';

const TeacherDetails = (props) => {
  const { user, teacher } = props;
  return (
    <Grid textAlign="center" columns={4} stackable>
      <Grid.Row>
        <Grid.Column only="tablet computer">
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
        <Grid.Column only="tablet computer">
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
        <Grid.Column only="tablet computer">
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
        <Grid.Column>
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
  );
};

export default TeacherDetails;
