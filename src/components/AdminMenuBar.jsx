import { Menu, Icon } from 'semantic-ui-react';

const AdminMenuBar = (props) => {
  const { activeTab, setActiveTab } = props;

  return (
    <Menu icon="labeled" widths={4} pointing>
      <Menu.Item
        name="approveTimesheets"
        onClick={() => setActiveTab('approve-timesheets')}
        active={activeTab === 'approve-timesheets'}
      >
        <Icon name="check" />
        approve timesheets
      </Menu.Item>

      <Menu.Item
        name="viewAllTimesheets"
        onClick={() => setActiveTab('timesheets-all')}
        active={activeTab === 'timesheets-all'}
      >
        <Icon name="list" />
        view all timesheets
      </Menu.Item>

      <Menu.Item
        name="createPdEvent"
        onClick={() => setActiveTab('event-create')}
        active={activeTab === 'event-create'}
      >
        <Icon name="calendar alternate" />
        create pd/event
      </Menu.Item>

      <Menu.Item
        name="viewAllPdEvents"
        onClick={() => setActiveTab('events-all')}
        active={activeTab === 'events-all'}
      >
        <Icon name="eye" />
        view all pds/events
      </Menu.Item>
    </Menu>
  );
};

export default AdminMenuBar;
