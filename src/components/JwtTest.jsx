import axios from 'axios';
import { useEffect } from 'react';

const JwtTest = () => {
  const testJWT = async () => {
    try {
      const response = await axios.get('http://localhost:3008/api/isuserauth', {
        headers: { 'x-access-token': localStorage.getItem('token') },
      });
      console.log(response);
      if (response.data === 'failed to authenticate') {
        throw Error;
      }
      alert('login successful');
    } catch (err) {
      console.log(err.message);
      alert('auth failed');
    }
  };

  useEffect(() => {
    testJWT();
  }, []);

  return <div>sup</div>;
};

export default JwtTest;
