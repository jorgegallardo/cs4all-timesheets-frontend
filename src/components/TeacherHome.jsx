import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Divider, Label } from 'semantic-ui-react';
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
      <h1>{`Welcome, ${teacherData.firstName} ${teacherData.lastName}`}</h1>

      <Label basic>
        CS4All Program:<Label.Detail>Integrated Units</Label.Detail>
      </Label>
      <Label basic>
        CS4All Point of Contact:<Label.Detail>Jorge Gallardo</Label.Detail>
      </Label>
      <Divider />
      <TeacherMenu teacherData={teacherData} />
    </>
  );
};

export default TeacherHome;
