import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Divider, Label } from 'semantic-ui-react';
import UserContext from '../store/user-context';
import TeacherMenu from './TeacherMenu';

const TeacherHome = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { userData, setUserData } = useContext(UserContext);

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
  
      setUserData(userInfo);
      setLoading(false);
    };

    loadData();
  }, [setUserData]);

  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <h1>{`Welcome, ${userData.firstName} ${userData.lastName}`}</h1>

      <Label basic>
        CS4All Program:<Label.Detail>{userData.programTitle}</Label.Detail>
      </Label>
      <Label basic>
        CS4All Point of Contact:<Label.Detail>{userData.pointOfContact ? (userData.pointOfContact.firstName + ' ' + userData.pointOfContact.lastName) : ''}</Label.Detail>
      </Label>
      <Divider />
      <TeacherMenu />
    </>
  );
};

export default TeacherHome;
