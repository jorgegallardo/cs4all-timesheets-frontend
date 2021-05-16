import { useState } from 'react';
import {
  Form,
  Button,
  Dropdown,
  Segment,
  Grid,
  Divider,
} from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const TeacherRegistration = (props) => {
  const { hasAccount, setHasAccount } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fileNumber, setFileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [program, setProgram] = useState('');
  const [pointOfContact, setPointOfContact] = useState('');
  const [school, setSchool] = useState('');
  // const [grades, setGrades] = useState([]);
  const history = useHistory();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setFileNumber('');
    setProgram('');
    setPointOfContact('');
    setSchool('');
  };

  const cs4allPrograms = [
    {
      key: 'units',
      text: 'units',
      value: 'units',
    },
    {
      key: 'courses',
      text: 'courses',
      value: 'courses',
    },
    {
      key: 'sep jr',
      text: 'sep jr',
      value: 'sep jr',
    },
    {
      key: 'cs leads',
      text: 'cs leads',
      value: 'cs leads',
    },
  ];

  const gradeOptions = [
    { key: 'K', text: 'Kindergarten', value: 'Kindergarten' },
    { key: '1', text: '1st', value: '1st' },
    { key: '2', text: '2nd', value: '2nd' },
    { key: '3', text: '3rd', value: '3rd' },
    { key: '4', text: '4th', value: '4th' },
    { key: '5', text: '5th', value: '5th' },
    { key: '6', text: '6th', value: '6th' },
    { key: '7', text: '7th', value: '7th' },
    { key: '8', text: '8th', value: '8th' },
    { key: '9', text: '9th', value: '9th' },
    { key: '10', text: '10th', value: '10th' },
    { key: '11', text: '11th', value: '11th' },
    { key: '12', text: '12th', value: '12' },
  ];

  const cs4allStaff = [
    { key: 'jorge gallardo', text: 'jorge gallardo', value: 'jorge gallardo' },
    { key: 'someone else', text: 'someone else', value: 'someone else' },
  ];

  const schoolOptions = [
    { key: 'school1', text: 'school1', value: 'school1' },
    { key: 'school2', text: 'school2', value: 'school2' },
  ];

  const handleRegistration = async () => {
    try {
      // const response = await axios.post(
      //   'https://server-mongodb-practice.herokuapp.com/api/register',
      //   {
      //     email,
      //     password,
      //     firstName,
      //     lastName,
      //     fileNumber,
      //   }
      // );
      const response = await axios.post('http://localhost:3008/api/register', {
        email,
        password,
        firstName,
        lastName,
        fileNumber,
        program,
        pointOfContact,
        school,
      });
      const tokenFromServer = response.data.token;
      localStorage.setItem('token', tokenFromServer);
      resetForm();
      alert('your account has been successfully created');
      history.push('/teacher');
    } catch (err) {
      alert('something went wrong');
      console.log(err);
    }
  };

  return (
    <>
      <h1>teacher registration</h1>
      <Segment>
        <Form>
          <Grid stackable columns={2}>
            <Grid.Column>
              <Form.Input
                required
                label="Email Address"
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                required
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Input
                required
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Input
                required
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Form.Input
                required
                label="File Number"
                type="text"
                value={fileNumber}
                onChange={(e) => setFileNumber(e.target.value)}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field required>
                <label>CS4All Program</label>
                <Dropdown
                  placeholder="select the cs4all program you're enrolled in"
                  fluid
                  selection
                  options={cs4allPrograms}
                  onChange={(e, { value }) => setProgram(value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>CS4All Point of Contact</label>
                <Dropdown
                  placeholder="select your cs4all point of contact"
                  fluid
                  selection
                  options={cs4allStaff}
                  onChange={(e, { value }) => setPointOfContact(value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Your School</label>
                <Dropdown
                  placeholder="find your school"
                  fluid
                  search
                  selection
                  options={schoolOptions}
                  onChange={(e, { value }) => setSchool(value)}
                />
              </Form.Field>

              <Form.Select
                required
                placeholder="select the grade(s) you teach"
                fluid
                multiple
                label="Grade(s) Taught"
                options={gradeOptions}
              />

              <p style={{ color: 'red' }}>
                NOTE: the CREATE ACCOUNT button below should be disabled until
                all of the fields are filled/selected
              </p>

              <Button fluid onClick={handleRegistration}>
                create an account
              </Button>

              <p style={{ marginTop: '10px' }}>
                already have an account?{' '}
                <span
                  style={{
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  sign in
                </span>
              </p>
            </Grid.Column>
          </Grid>
        </Form>
      </Segment>
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

export default TeacherRegistration;
