import { Menu, Icon } from 'semantic-ui-react';

const AdminMenuBar = (props) => {
  const { activeTab, setActiveTab } = props;

  return (
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
  );
};

export default AdminMenuBar;
