import axios from 'axios';
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
    const loadData = async () => {
      const token = localStorage.getItem('token');
      console.log('token=', token);
  
      const response = await axios.get(process.env.REACT_APP_API_SERVER + '/users/userInfo', {
        headers: {
          'Authorization': token
        }
      });

      const userInfo = response.data;
  
      console.log('response=', response.data);
  
      setTeacherData(userInfo);
      setLoading(false);
    };

    loadData();
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
        CS4All Program:<Label.Detail>{teacherData.programTitle}</Label.Detail>
      </Label>
      <Label basic>
        CS4All Point of Contact:<Label.Detail>{teacherData.pointOfContact ? (teacherData.pointOfContact.firstName + ' ' + teacherData.pointOfContact.lastName) : ''}</Label.Detail>
      </Label>
      <Divider />
      <TeacherMenu teacherData={teacherData} />
    </>
  );
};

export default TeacherHome;
