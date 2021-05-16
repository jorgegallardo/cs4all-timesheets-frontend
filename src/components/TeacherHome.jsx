import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Divider, Message } from 'semantic-ui-react';
import TeacherMenu from './TeacherMenu';

const TeacherHome = () => {
  const history = useHistory();
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    setTeacherData({
      firstName: 'happy',
      lastName: 'gilmore',
      fileNumber: '1234567',
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <h1>{`welcome, ${teacherData.firstName} ${teacherData.lastName} (teacher account)`}</h1>

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

export default TeacherHome;
