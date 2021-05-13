import { Button, Divider } from 'semantic-ui-react';
import TeacherDetails from './TeacherDetails';
import TeacherMenu from './TeacherMenu';
import { Message } from 'semantic-ui-react';

const TeacherDashboard = (props) => {
  const { user, userId, userData, handleLogout } = props;
  const teacher = userData[0];

  return (
    <>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <h1>{`welcome, ${teacher.firstName} ${teacher.lastName}`}</h1>
      <TeacherDetails user={user} userId={userId} teacher={teacher} />

      <Message warning>
        <Message.Header>reminder</Message.Header>
        <p>
          your account is currently missing an OP-175 form for school year
          2021-22. please{' '}
          <span
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              color: 'blue',
            }}
          >
            click here
          </span>{' '}
          to generate an up-to-date OP-175.
        </p>
      </Message>
      <Divider />
      <TeacherMenu />
    </>
  );
};

export default TeacherDashboard;
