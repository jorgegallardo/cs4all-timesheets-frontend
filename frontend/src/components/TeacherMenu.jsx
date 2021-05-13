import { useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import TeacherTimesheetSubmissions from './TeacherTimesheetSubmissions';
import TeacherTimesheetGenerator from './TeacherTimesheetGenerator';

const TeacherMenu = () => {
  const [activeTab, setActiveTab] = useState('generateTimesheet');

  return (
    <>
      <Menu icon="labeled" widths={2} pointing>
        <Menu.Item
          name="approveTimesheets"
          onClick={() => setActiveTab('generateTimesheet')}
          active={activeTab === 'generateTimesheet'}
        >
          <Icon name="plus" />
          create a timesheet
        </Menu.Item>

        <Menu.Item
          name="viewAllTimesheets"
          onClick={() => setActiveTab('submittedTimesheets')}
          active={activeTab === 'submittedTimesheets'}
        >
          <Icon name="list" />
          view previously submitted timesheets
        </Menu.Item>
      </Menu>
      {activeTab === 'generateTimesheet' && <TeacherTimesheetGenerator />}
      {activeTab === 'submittedTimesheets' && <TeacherTimesheetSubmissions />}
    </>
  );
};

export default TeacherMenu;
