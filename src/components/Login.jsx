import { useState } from 'react';
import { Form, Button, Divider } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const { hasAccount, setHasAccount } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

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
      const response = await axios.post(
        process.env.REACT_APP_API_SERVER + '/v1/users/login',
        {
          email,
          password,
        }
      );
      const tokenFromServer = response.data.token;
      localStorage.setItem('token', tokenFromServer);
      resetForm();
      alert('login successful');
      history.push('/teacher');
    } catch (err) {
      alert(err.message);
      resetForm();
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
      <Divider />
      <h1>for dev purposes:</h1>
      <Button
        content="go to teacher dashboard"
        onClick={() => history.push('/teacher')}
      />
      <Button
        content="go to admin dashboard"
        secondary
        onClick={() => history.push('/admin')}
      />
    </>
  );
};

export default Login;
