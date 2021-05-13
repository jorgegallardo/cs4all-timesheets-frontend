import {
  Message,
  Grid,
  Image,
  Checkbox,
  Form,
  Table,
  Dropdown,
  Menu,
  Icon,
  Button,
  Input,
} from 'semantic-ui-react';
import AdminAllTimesheets from './AdminAllTimesheets';
import AdminPdEventCreator from './AdminPdEventCreator';
import AdminPdEventList from './AdminPdEventList';
import AdminTimesheetApproval from './AdminTimesheetApproval';

const AdminHome = () => {
  const handleItemClick = () => {
    console.log('clicked');
  };

  return (
    <>
      <h1>welcome, jorge</h1>
      <Message warning>
        <Message.Header>to do</Message.Header>
        <Message.List>
          <Message.Item>
            there are 932 timesheets awaiting your signature & approval
          </Message.Item>
          <Message.Item>83 teachers are missing OP-175 forms</Message.Item>
        </Message.List>
      </Message>

      <Message>
        <Message.Header>upcoming pds/events</Message.Header>
        <Message.List>
          <Message.Item>5/5/21 - Units: Abstraction</Message.Item>
        </Message.List>
      </Message>

      <Menu icon="labeled" widths={4} pointing>
        <Menu.Item name="approve timesheets" onClick={handleItemClick} active>
          <Icon name="check" />
          approve timesheets
        </Menu.Item>

        <Menu.Item name="view all timesheets" onClick={handleItemClick}>
          <Icon name="list" />
          view all timesheets
        </Menu.Item>

        <Menu.Item name="create pd/event" onClick={handleItemClick}>
          <Icon name="calendar alternate" />
          create pd/event
        </Menu.Item>

        <Menu.Item name="create pd/event" onClick={handleItemClick}>
          <Icon name="eye" />
          view all pds/events
        </Menu.Item>
      </Menu>

      <h1>approve timesheets</h1>
      <AdminTimesheetApproval />

      <h1>view all timesheets</h1>
      <AdminAllTimesheets />

      <h1>create pd/event</h1>
      <AdminPdEventCreator />

      <h1>view all pds/events</h1>
      <AdminPdEventList />
      <p>
        view all or filtered/sorted by program or by whether you are the
        facilitator
      </p>
      {/* future feature
      <h1>teacher lookup</h1>
      <h1>school lookup</h1> */}
    </>
  );
};

export default AdminHome;
