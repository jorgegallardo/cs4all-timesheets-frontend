import { useContext, useState } from 'react';
import { Form, Button, Grid, Segment, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import UserContext from '../store/user-context';

const Login = (props) => {
  const { hasAccount, setHasAccount } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [adminDetails, setAdminDetails] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    programTitle: '',
  });
  const { setUserData } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);

  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const isAdmin = !!urlParams.get('admin');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const cs4AllProgramOptions = [
    {
      key: 'integrated-units',
      text: 'Integrated Units',
      value: 'integrated-units',
    },
    { key: 'courses', text: 'Courses', value: 'courses' },
    { key: 'sep-jr', text: 'SEP Jr', value: 'sep-jr' },
    { key: 'cs-leads', text: 'CS Leads', value: 'cs-leads' },
  ];

  const handleLogin = async () => {
    try {
      setSubmitted(true);
      const response = await axios.post(
        process.env.REACT_APP_API_SERVER + '/users/login',
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      const currentUser = response.data.currentUser;
      console.log('currentUser=', currentUser);
      localStorage.setItem('token', token);
      setUserData(currentUser);
      resetForm();
      if (currentUser.role === 'admin') {
        history.push('/admin');
      } else {
        history.push('/teacher');
      }
    } catch (err) {
      setPassword('');
      alert('login failed');
    } finally {
      setSubmitted(false);
    }
  };

  const handleAdminRegistration = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_SERVER + '/users/adminsignup',
        { adminDetails }
      );
      const tokenFromServer = response.data.token;
      localStorage.setItem('token', tokenFromServer);
      resetForm();
      alert('admin account successfully created');
      history.push('/admin');
    } catch (err) {
      alert('something went wrong');
      console.log(err);
    }
  };

  return (
    <>
      {!isAdmin && (
        <>
          <h1>log in</h1>
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
            <Button color="blue" onClick={handleLogin} type="submit" loading={submitted}>
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
      )}
      {isAdmin && (
        <>
          <h1>create cs4all admin</h1>
          <Segment attached>
            <Form>
              <Grid stackable columns={2}>
                <Grid.Column>
                  <Form.Input
                    required
                    label="Email Address"
                    type="email"
                    value={adminDetails.email}
                    onChange={(e) =>
                      setAdminDetails({
                        ...adminDetails,
                        email: e.target.value,
                      })
                    }
                  />
                  <Form.Input
                    required
                    label="Password"
                    type="password"
                    value={adminDetails.password}
                    onChange={(e) =>
                      setAdminDetails({
                        ...adminDetails,
                        password: e.target.value,
                      })
                    }
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    required
                    label="First Name"
                    type="text"
                    value={adminDetails.firstName}
                    onChange={(e) =>
                      setAdminDetails({
                        ...adminDetails,
                        firstName: e.target.value,
                      })
                    }
                  />
                  <Form.Input
                    required
                    label="Last Name"
                    type="text"
                    value={adminDetails.lastName}
                    onChange={(e) =>
                      setAdminDetails({
                        ...adminDetails,
                        lastName: e.target.value,
                      })
                    }
                  />
                  <Form.Field>
                    <label>CS4All Program</label>
                    <Dropdown
                      placeholder="Select your program name."
                      fluid
                      selection
                      options={cs4AllProgramOptions}
                      onChange={(e, { value }) =>
                        setAdminDetails({
                          ...adminDetails,
                          programTitle: value,
                        })
                      }
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid>
            </Form>
          </Segment>
          <Button
            secondary
            onClick={handleAdminRegistration}
            type="submit"
            attached="bottom"
          >
            create cs4all administrator account
          </Button>
        </>
      )}
    </>
  );
};

export default Login;
