import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Divider, Message, Label } from 'semantic-ui-react';
import TeacherMenu from './TeacherMenu';

const TeacherHome = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [teacherData, setTeacherData] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    setTeacherData({
      role: 'teacher',
      firstName: 'happy',
      lastName: 'gilmore',
      fileNumber: '1234567',
      assignedProgramTitle: 'Integrated Units',
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
      <Label color="purple">
        CS4All Program:<Label.Detail>Integrated Units</Label.Detail>
      </Label>
      <Label color="purple">
        CS4All Point of Contact:<Label.Detail>Jorge Gallardo</Label.Detail>
      </Label>
      {/* <Label basic color="purple">
        CS4All Program:<Label.Detail>Integrated Units</Label.Detail>
      </Label>
      <Label basic color="purple">
        CS4All Point of Contact:<Label.Detail>Jorge Gallardo</Label.Detail>
      </Label> */}

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
      <TeacherMenu teacherData={teacherData} />
    </>
  );
};

export default TeacherHome;
