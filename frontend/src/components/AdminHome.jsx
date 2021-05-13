import { useState } from 'react';
import { Message, Grid, Menu, Icon, Button, Divider } from 'semantic-ui-react';
import AdminViewAllTimesheets from './AdminViewAllTimesheets';
import AdminPdEventCreator from './AdminPdEventCreator';
import AdminPdEventList from './AdminPdEventList';
import AdminTimesheetApproval from './AdminTimesheetApproval';

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState('approveTimesheets');

  const handleLogout = () => {
    alert('you would be logged out if this was currently working');
  };

  return (
    <>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <h1>welcome, jorge (admin account)</h1>
      <h1>reminders</h1>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Message warning>
            <Message.Header>to do</Message.Header>
            <Message.List>
              <Message.Item>
                there are 932 timesheets awaiting your signature & approval
              </Message.Item>
              <Message.Item>83 teachers are missing OP-175 forms</Message.Item>
            </Message.List>
          </Message>
        </Grid.Column>
        <Grid.Column>
          <Message positive>
            <Message.Header>upcoming pds/events</Message.Header>
            <Message.List>
              <Message.Item>5/5/21 - Units: Abstraction</Message.Item>
            </Message.List>
          </Message>{' '}
        </Grid.Column>
      </Grid>
      <Divider />
      <Menu icon="labeled" widths={4} pointing>
        <Menu.Item
          name="approveTimesheets"
          onClick={() => setActiveTab('approveTimesheets')}
          active={activeTab === 'approveTimesheets'}
        >
          <Icon name="check" />
          approve timesheets
        </Menu.Item>

        <Menu.Item
          name="viewAllTimesheets"
          onClick={() => setActiveTab('viewAllTimesheets')}
          active={activeTab === 'viewAllTimesheets'}
        >
          <Icon name="list" />
          view all timesheets
        </Menu.Item>

        <Menu.Item
          name="createPdEvent"
          onClick={() => setActiveTab('createPdEvent')}
          active={activeTab === 'createPdEvent'}
        >
          <Icon name="calendar alternate" />
          create pd/event
        </Menu.Item>

        <Menu.Item
          name="viewAllPdEvents"
          onClick={() => setActiveTab('viewAllPdEvents')}
          active={activeTab === 'viewAllPdEvents'}
        >
          <Icon name="eye" />
          view all pds/events
        </Menu.Item>
      </Menu>
      {activeTab === 'approveTimesheets' && <AdminTimesheetApproval />}
      {activeTab === 'viewAllTimesheets' && <AdminViewAllTimesheets />}
      {activeTab === 'createPdEvent' && <AdminPdEventCreator />}
      {activeTab === 'viewAllPdEvents' && <AdminPdEventList />}

      {/* future feature
      <h1>teacher lookup</h1>
      <h1>school lookup</h1> */}
    </>
  );
};

export default AdminHome;
