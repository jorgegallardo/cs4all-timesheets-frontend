import { useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import TeacherTimesheetSubmissions from './TeacherTimesheetSubmissions';
import TeacherTimesheetGenerator from './TeacherTimesheetGenerator';
import TeacherDetails from './TeacherDetails';

const TeacherMenu = () => {
  const [activeTab, setActiveTab] = useState('generateTimesheet');

  return (
    <>
      <Menu icon="labeled" widths={3} pointing>
        <Menu.Item
          name="approveTimesheets"
          onClick={() => setActiveTab('generateTimesheet')}
          active={activeTab === 'generateTimesheet'}
        >
          <Icon name="plus" />
          submit timesheet
        </Menu.Item>

        <Menu.Item
          name="viewAllTimesheets"
          onClick={() => setActiveTab('submittedTimesheets')}
          active={activeTab === 'submittedTimesheets'}
        >
          <Icon name="list" />
          view submitted timesheets
        </Menu.Item>
        <Menu.Item
          name="myDetails"
          onClick={() => setActiveTab('myDetails')}
          active={activeTab === 'myDetails'}
        >
          <Icon name="info circle" />
          my details
        </Menu.Item>
      </Menu>
      {activeTab === 'generateTimesheet' && <TeacherTimesheetGenerator />}
      {activeTab === 'submittedTimesheets' && <TeacherTimesheetSubmissions />}
      {activeTab === 'myDetails' && <TeacherDetails />}
    </>
  );
};

export default TeacherMenu;
