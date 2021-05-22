import { useEffect, useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import TeacherTimesheetSubmissions from './TeacherTimesheetSubmissions';
import TeacherTimesheetGenerator from './TeacherTimesheetGenerator';
import TeacherDetails from './TeacherDetails';
import { useHistory, useParams } from 'react-router';

const TeacherMenu = () => {
  const history = useHistory();
  const params = useParams();
  const [activeTab, setActiveTab] = useState(params.activeTab);

  useEffect(() => {
    setActiveTab(params.activeTab);
  }, [params.activeTab]);

  return (
    <>
      <Menu icon="labeled" widths={3} pointing>
        <Menu.Item
          name="approveTimesheets"
          onClick={() => {
            history.push('/teacher/generateTimesheet');
            setActiveTab('generateTimesheet')
          }}
          active={activeTab === 'generateTimesheet'}
        >
          <Icon name="plus" />
          submit timesheet
        </Menu.Item>

        <Menu.Item
          name="viewAllTimesheets"
          onClick={() => {
            history.push('/teacher/submittedTimesheets');
            setActiveTab('submittedTimesheets')
          }}
          active={activeTab === 'submittedTimesheets'}
        >
          <Icon name="list" />
          view submitted timesheets
        </Menu.Item>
        <Menu.Item
          name="myDetails"
          onClick={() => {
            history.push('/teacher/myDetails');
            setActiveTab('myDetails')
          }}
          active={activeTab === 'myDetails'}
        >
          <Icon name="info circle" />
          my details
        </Menu.Item>
      </Menu>
      {activeTab === 'generateTimesheet' && (
        <TeacherTimesheetGenerator onSubmitTimesheet={() => setActiveTab('submittedTimesheets')} />
      )}
      {activeTab === 'submittedTimesheets' && <TeacherTimesheetSubmissions />}
      {activeTab === 'myDetails' && <TeacherDetails />}
    </>
  );
};

export default TeacherMenu;
