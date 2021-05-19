import { useState, useEffect } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import AdminViewAllTimesheets from './AdminViewAllTimesheets';
import AdminPdEventCreator from './AdminPdEventCreator';
import AdminPdEventList from './AdminPdEventList';
import AdminApproveTimesheets from './AdminApproveTimesheets';
import AdminMenuBar from './AdminMenuBar';
import AdminReminders from './AdminReminders';
import { useHistory } from 'react-router-dom';

const AdminHome = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('approveTimesheets');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <h1>welcome, jorge (admin account)</h1>
      <AdminReminders />
      <Divider />
      <AdminMenuBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'approveTimesheets' && <AdminApproveTimesheets />}
      {activeTab === 'viewAllTimesheets' && <AdminViewAllTimesheets />}
      {activeTab === 'createPdEvent' && <AdminPdEventCreator />}
      {activeTab === 'viewAllPdEvents' && <AdminPdEventList />}
      {/* future features
      <h1>teacher lookup</h1>
      <h1>school lookup</h1> */}
    </>
  );
};

export default AdminHome;
