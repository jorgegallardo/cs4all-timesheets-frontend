import { useState, useEffect } from 'react';
import Login from './Login';
import TeacherDashboard from './TeacherDashboard';

const Home = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError] = useState('');
  const [passwordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [fileNumber, setFileNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);

  const handleLogin = () => {};

  const handleRegistration = () => {};

  const handleLogout = () => {
    localStorage.clear();
    alert('user would be logged out');
  };

  useEffect(() => {
    setUser({
      firstName: 'happy',
      lastName: 'gilmore',
      fileNumber: '1234567',
      email: 'a@b.com',
    });
    setUserId('asdfasdf');
    setUserData([
      {
        firstName: 'happy',
        lastName: 'gilmore',
        fileNumber: '1234567',
      },
    ]);
    setLoading(false);
    //  authListener();
    //  getUserData(); // i THINK this causes a bug when the db is empty. the fix is to refresh after the first user is created.
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      {user ? (
        <TeacherDashboard
          user={user}
          userId={userId}
          userData={userData}
          handleLogout={handleLogout}
        />
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleRegistration={handleRegistration}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          fileNumber={fileNumber}
          setFileNumber={setFileNumber}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
        />
      )}
    </>
  );
};

export default Home;
