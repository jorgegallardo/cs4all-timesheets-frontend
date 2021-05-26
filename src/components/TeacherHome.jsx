import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Divider, Label, Header, Image } from 'semantic-ui-react';
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
      const response = await axios.get(
        process.env.REACT_APP_API_SERVER + '/users/userInfo',
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const userInfo = response.data;

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

      <Header as="h2">
        <Image
          circular
          src="https://react.semantic-ui.com/images/avatar/large/patrick.png"
        />
        {`Welcome, ${userData.firstName} ${userData.lastName}`}
      </Header>

      <Label basic>
        CS4All Program:<Label.Detail>{userData.programTitle}</Label.Detail>
      </Label>
      <Label basic>
        CS4All Point of Contact:
        <Label.Detail>
          {userData.pointOfContact
            ? userData.pointOfContact.firstName +
              ' ' +
              userData.pointOfContact.lastName
            : ''}
        </Label.Detail>
      </Label>
      <Divider />
      <TeacherMenu />
    </>
  );
};

export default TeacherHome;
