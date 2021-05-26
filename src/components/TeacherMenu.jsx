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
            history.push('/teacher/generate-timesheet');
            setActiveTab('generate-timesheet');
          }}
          active={activeTab === 'generate-timesheet'}
        >
          <Icon name="plus" />
          submit timesheet
        </Menu.Item>

        <Menu.Item
          name="viewAllTimesheets"
          onClick={() => {
            history.push('/teacher/submitted-timesheets');
            setActiveTab('submitted-timesheets');
          }}
          active={activeTab === 'submitted-timesheets'}
        >
          <Icon name="list" />
          view submitted timesheets
        </Menu.Item>
        <Menu.Item
          name="my-details"
          onClick={() => {
            history.push('/teacher/my-details');
            setActiveTab('my-details');
          }}
          active={activeTab === 'my-details'}
        >
          <Icon name="info circle" />
          my details
        </Menu.Item>
      </Menu>
      {activeTab === 'generate-timesheet' && (
        <TeacherTimesheetGenerator
          onSubmitTimesheet={() => setActiveTab('submitted-timesheets')}
        />
      )}
      {activeTab === 'submitted-timesheets' && <TeacherTimesheetSubmissions />}
      {activeTab === 'my-details' && <TeacherDetails />}
    </>
  );
};

export default TeacherMenu;
