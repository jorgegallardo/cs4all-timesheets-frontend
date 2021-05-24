import { useState, useEffect, useContext } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import AdminViewAllTimesheets from './AdminViewAllTimesheets';
import AdminPdEventCreator from './AdminPdEventCreator';
import AdminPdEventList from './AdminPdEventList';
import AdminApproveTimesheets from './AdminApproveTimesheets';
import AdminMenuBar from './AdminMenuBar';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../store/user-context';

const AdminHome = () => {
  const history = useHistory();
  const params = useParams();
  const [activeTab, setActiveTab] = useState(params.activeTab);
  const [loading, setLoading] = useState(true);
  const { userData, setUserData } = useContext(UserContext);

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

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    setActiveTab(params.activeTab);
  }, [params.activeTab]);

  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <h1>
        welcome, {userData.firstName} ({userData.role} account)
      </h1>
      <Divider />
      <AdminMenuBar
        activeTab={activeTab}
        setActiveTab={(newTab) => {
          history.push('/admin/' + newTab);
          setActiveTab(newTab);
        }}
      />
      {activeTab === 'approveTimesheets' && <AdminApproveTimesheets />}
      {activeTab === 'viewAllTimesheets' && <AdminViewAllTimesheets />}
      {activeTab === 'createPdEvent' && (
        <AdminPdEventCreator
          onEventCreated={() => {
            setActiveTab('viewAllPdEvents');
          }}
        />
      )}
      {activeTab === 'viewAllPdEvents' && <AdminPdEventList />}
      {/* future features
      <h1>teacher lookup</h1>
      <h1>school lookup</h1> */}
    </>
  );
};

export default AdminHome;
