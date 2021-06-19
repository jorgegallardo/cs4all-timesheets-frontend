import { useState, useEffect, useContext } from 'react';
import { Button, Image, Header, Label } from 'semantic-ui-react';
import AdminViewAllTimesheets from './AdminViewAllTimesheets';
import AdminPdEventCreator from './AdminPdEventCreator';
import AdminPdEventList from './AdminPdEventList';
import AdminApproveTimesheets from './AdminApproveTimesheets';
import AdminMenuBar from './AdminMenuBar';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../store/user-context';
import jorge from '../assets/images/jorge.jpg';
import AdminStatistics from './AdminStatistics';

const AdminHome = () => {
  const history = useHistory();
  const params = useParams();
  const [activeTab, setActiveTab] = useState(params.activeTab);
  const [loading, setLoading] = useState(true);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    const loadUserInfo = async () => {
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
    loadUserInfo();
  }, [setUserData]);

  useEffect(() => {
    setActiveTab(params.activeTab);
  }, [params.activeTab]);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return loading ? (
    <h1>loading...</h1>
  ) : (
    <>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <Header as="h2">
        <Image circular src={jorge} />
        Welcome, {userData.firstName} {userData.lastName}
      </Header>
      <Label basic>CS4All Administrator</Label>

      <AdminMenuBar
        activeTab={activeTab}
        setActiveTab={(newTab) => {
          history.push('/admin/' + newTab);
          setActiveTab(newTab);
        }}
      />
      {activeTab === 'approve-timesheets' && <AdminApproveTimesheets />}
      {activeTab === 'timesheets-all' && <AdminViewAllTimesheets />}
      {activeTab === 'event-create' && (
        <AdminPdEventCreator
          onEventCreated={() => {
            setActiveTab('events-all');
          }}
        />
      )}
      {activeTab === 'events-all' && <AdminPdEventList />}
      {activeTab === 'stats' && <AdminStatistics />}
    </>
  );
};

export default AdminHome;
