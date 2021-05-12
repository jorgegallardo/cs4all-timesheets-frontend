import { Button, Divider } from 'semantic-ui-react';
import TeacherSubmissions from './TeacherSubmissions';
import TimesheetGenerator from './TimesheetGenerator';

const TeacherDashboard = (props) => {
  const { user, userId, userData, handleLogout } = props;
  const teacher = userData[0];

  return (
    <section>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <h1>{`welcome ${teacher.firstName} ${teacher.lastName}`}</h1>
      <p>userId: {userId} -- should not be seen by the user in production</p>
      <p>File Number: {teacher.fileNumber}</p>
      <p>Email: {user.email}</p>
      <Divider />
      <TimesheetGenerator />
      <Divider />
      <TeacherSubmissions />
    </section>
  );
};

export default TeacherDashboard;
