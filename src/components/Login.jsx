import { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';

const Login2 = (props) => {
  const { hasAccount, setHasAccount } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = async () => {
    try {
      // const response = await axios.post(
      //   'https://server-mongodb-practice.herokuapp.com/api/login',
      //   {
      //     email,
      //     password,
      //   }
      // );
      const response = await axios.post('http://localhost:3008/api/login', {
        email,
        password,
      });
      console.log('login response is ' + JSON.stringify(response));
      resetForm();
      alert('login successful');
    } catch (err) {
      console.log(err.message);
      alert('login failed');
    }
  };

  return (
    <>
      <h1>log in with your teacher account</h1>
      <Form>
        <Form.Input
          label="Email Address"
          type="email"
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="blue" onClick={handleLogin} type="submit">
          sign in
        </Button>
        <p>
          don't have an account?{' '}
          <span
            style={{
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => setHasAccount(!hasAccount)}
          >
            sign up
          </span>
        </p>
      </Form>
    </>
  );
};

export default Login2;
