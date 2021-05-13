import { useState, useEffect } from 'react';
import Login from './Login';
import TeacherDashboard from './TeacherDashboard';
import fire, { db } from '../firebase';

const Home = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [fileNumber, setFileNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);
  const clearFormInputs = () => {
    setEmail('');
    setPassword('');
    setFileNumber('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((credential) => {
        console.log('user id is ' + credential.user.uid);
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
          default:
            console.log('something went wrong: ' + err.message);
        }
      });
  };

  const handleRegistration = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        return db.collection('users').doc(credential.user.uid).set({
          fileNumber,
          firstName,
          lastName,
        });
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
          default:
            console.log('something went wrong: ' + err.message);
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const getUserData = () => {
    db.collection('users').onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUserData(items);
      setLoading(false);
    });
  };

  // listener to check for any auth state changes
  // if user is logged in, show things. if logged out, don't show certain things
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      // if the user successfully logs in, clear the form and set the user
      if (user) {
        clearFormInputs();
        setUser(user);
        setUserId(user.uid);
      } else setUser(''); // user is logged out
    });
  };

  useEffect(() => {
    authListener();
    getUserData(); // i THINK this causes a bug when the db is empty. the fix is to refresh after the first user is created.
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
