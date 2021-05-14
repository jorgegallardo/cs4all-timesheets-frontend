import { useState } from 'react';
import Login from './Login';
import TeacherRegistration from './TeacherRegistration';

const Homepage = () => {
  const [hasAccount, setHasAccount] = useState(false);

  return (
    <>
      {hasAccount ? (
        <Login hasAccount={hasAccount} setHasAccount={setHasAccount} />
      ) : (
        <TeacherRegistration
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
        />
      )}
    </>
  );
};

export default Homepage;
