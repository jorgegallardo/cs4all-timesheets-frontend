import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Button,
  Dropdown,
  Segment,
  Grid,
  Divider,
} from 'semantic-ui-react';
import axios from 'axios';

const TeacherRegistration = (props) => {
  const { hasAccount, setHasAccount } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fileNumber, setFileNumber] = useState('');
  const [cs4AllProgramTitle, setCs4AllProgramTitle] = useState('');
  const [cs4AllPointOfContact, setCs4AllPointOfContact] = useState('');
  const [school, setSchool] = useState('');
  const [availableSchools, setAvailableSchools] = useState([]);
  const [availableAdmins, setAvailableAdmins] = useState([]);
  const [gradesTaught, setGradesTaught] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(process.env.REACT_APP_API_SERVER + '/schools');
      const schools = response.data.map((school) => {
        return {
          key: school._id,
          text: `${school.name} - ${school.dbn}`,
          value: school._id,
        };
      });
      setAvailableSchools(schools);

      response = await axios.get(process.env.REACT_APP_API_SERVER + '/users/admin');
      const admins = response.data.map((admin) => {
        return {
          key: admin._id,
          text: `${admin.firstName} ${admin.lastName}`,
          value: admin._id,
        };
      });
      setAvailableAdmins(admins);
      
    };

    getData();
  }, []);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setFileNumber('');
    setCs4AllProgramTitle('');
    setCs4AllPointOfContact('');
    setSchool('');
    setGradesTaught([]);
  };

  const cs4AllProgramOptions = [
    {
      key: 'Integrated Units',
      text: 'Integrated Units',
      value: 'Integrated Units',
    },
    {
      key: 'Courses',
      text: 'Courses',
      value: 'Courses',
    },
    {
      key: 'SEP Jr',
      text: 'SEP Jr',
      value: 'SEP Jr',
    },
    {
      key: 'CS Leads',
      text: 'CS Leads',
      value: 'CS Leads',
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

  // const cs4AllStaffOptions = [
  //   { key: 'AiMei Chang', text: 'AiMei Chang', value: 'AiMei Chang' },
  //   { key: 'Amy Hobson', text: 'Amy Hobson', value: 'Amy Hobson' },
  //   {
  //     key: 'Christine Nunez',
  //     text: 'Christine Nunez',
  //     value: 'Christine Nunez',
  //   },
  //   { key: 'Dan Gaylord', text: 'Dan Gaylord', value: 'Dan Gaylord' },
  //   { key: 'EJ Park', text: 'EJ Park', value: 'EJ Park' },
  //   { key: 'Felix Alberto', text: 'Felix Alberto', value: 'Felix Alberto' },
  //   { key: 'Jorge Gallardo', text: 'Jorge Gallardo', value: 'Jorge Gallardo' },
  //   { key: 'Jose Olivares', text: 'Jose Olivares', value: 'Jose Olivares' },
  //   { key: 'Kevin Sukhoo', text: 'Kevin Sukhoo', value: 'Kevin Sukhoo' },
  //   { key: 'Marie McAnuff', text: 'Marie McAnuff', value: 'Marie McAnuff' },
  //   { key: 'Melissa Parker', text: 'Melissa Parker', value: 'Melissa Parker' },
  //   { key: 'Valerie Brock', text: 'Valerie Brock', value: 'Valerie Brock' },
  // ];

  // should be pulled in from db
  // const schoolOptions = [
  //   { key: 'school1', text: 'school1', value: 'school1' },
  //   { key: 'school2', text: 'school2', value: 'school2' },
  // ];

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_SERVER + '/users/signup',
        {
          email,
          password,
          firstName,
          lastName,
          fileNumber,
          cs4AllProgramTitle,
          cs4AllPointOfContact,
          school,
          gradesTaught,
        }
      );
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
      <Segment attached>
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
                  options={cs4AllProgramOptions}
                  onChange={(e, { value }) => setCs4AllProgramTitle(value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>CS4All Point of Contact</label>
                <Dropdown
                  placeholder="select your cs4all point of contact"
                  fluid
                  selection
                  options={availableAdmins}
                  onChange={(e, { value }) => setCs4AllPointOfContact(value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Your School</label>
                <Dropdown
                  placeholder="find your school"
                  fluid
                  search
                  selection
                  options={availableSchools}
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
                onChange={(e, { value }) => setGradesTaught(value)}
              />

              <p style={{ color: 'red' }}>
                NOTE: the CREATE ACCOUNT button below should be disabled until
                all of the fields are filled/selected. grades taught not yet
                hooked up.
              </p>

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
      <Button attached="bottom" color="blue" onClick={handleRegistration}>
        create an account
      </Button>
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
