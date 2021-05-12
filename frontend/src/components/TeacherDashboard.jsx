import { Button } from 'semantic-ui-react';

const TeacherDashboard = (props) => {
  const { user, userId, userData, handleLogout } = props;
  const teacher = userData[0];

  return (
    <section>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <h1>{`Welcome ${teacher.firstName} ${teacher.lastName}!`}</h1>
      <p>userId: {userId} -- should not be seen by the user in production</p>
      <p>File Number: {teacher.fileNumber}</p>
      <p>Email: {user.email}</p>
    </section>
  );
};

export default TeacherDashboard;
