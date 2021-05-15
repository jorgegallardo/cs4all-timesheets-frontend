import { useState } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import AdminViewAllTimesheets from './AdminViewAllTimesheets';
import AdminPdEventCreator from './AdminPdEventCreator';
import AdminPdEventList from './AdminPdEventList';
import AdminTimesheetApproval from './AdminTimesheetApproval';
import AdminMenuBar from './AdminMenuBar';
import AdminReminders from './AdminReminders';

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState('approveTimesheets');

  const handleLogout = () => {
    localStorage.clear();
    alert('you would be logged out if this was currently working');
  };

  return (
    <>
      <Button floated="right" onClick={() => handleLogout()}>
        Log Out
      </Button>
      <h1>welcome, jorge (admin account)</h1>
      <AdminReminders />
      <Divider />
      <AdminMenuBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'approveTimesheets' && <AdminTimesheetApproval />}
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
