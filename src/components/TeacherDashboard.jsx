import { Button, Divider, Message } from 'semantic-ui-react';
import TeacherMenu from './TeacherMenu';

const TeacherDashboard = (props) => {
  const { userData, handleLogout } = props;
  const teacher = userData[0];

  return (
    <>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <h1>{`welcome, ${teacher.firstName} ${teacher.lastName} (teacher account)`}</h1>

      <Message warning>
        <Message.Header>reminders</Message.Header>
        <Message.List>
          <Message.Item>
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
          </Message.Item>
        </Message.List>
        <Divider />
        <Message.Header>upcoming PDs/Events</Message.Header>
        <Message.List>
          <Message.Item>
            <p>May 20, 2021 - Units: Intro to Minecraft from 4-5pm</p>
          </Message.Item>
        </Message.List>
      </Message>
      <Divider />
      <TeacherMenu />
    </>
  );
};

export default TeacherDashboard;
