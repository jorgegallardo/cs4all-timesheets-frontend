import { useState } from 'react';
import { Form, Button, Message, Dropdown } from 'semantic-ui-react';
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
  const history = useHistory();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setFileNumber('');
    setProgram('');
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
      <Message negative>
        <Message.Header>
          jorge's notes - teachers can register here. this is where we can
          capture all of the fields that we need:
        </Message.Header>
        <Message.List>
          <Message.Item>
            <p>first & last name - textbox</p>
          </Message.Item>
          <Message.Item>
            <p>file number - textbox</p>
          </Message.Item>
          <Message.Item>
            <p>
              email & password - textbox - password salted + hashed so that no
              one can see it in the db
            </p>
          </Message.Item>
          <Message.Item>
            <p>
              school - picked from a searchable dropdown - if we have all of the
              schools in the doe as objects, we'll know the district, borough
              office, dbn, principal, address, superintendent, etc.
            </p>
          </Message.Item>
          <Message.Item>
            <p>grade(s) taught - checkboxes</p>
          </Message.Item>
          <Message.Item>
            <p>
              cs4all program - from dropdown - we *could* let teachers create an
              account at their first pd and tell them exactly which program they
              should choose. the alternative is to have a teacher pane in the
              admin console and manually have an admin select their program on
              our end. but that would be hundreds of teachers worth of work.
            </p>
          </Message.Item>
          <Message.Item>
            <p>cs4all point of contact - same "issue" as cs4all program...</p>
          </Message.Item>
        </Message.List>
        <hr />
        <Message.Header>
          i think i like the idea of having teachers create their accounts at
          their first pd w/ our guidance and then have a teacher pane in the
          admin dashboard that allows us to go back in an edit teacher details
          if they made mistakes
        </Message.Header>
      </Message>
      <h1>teacher registration</h1>
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
        <Form.Input
          label="First Name"
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Form.Input
          label="Last Name"
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Form.Input
          label="File Number"
          type="text"
          required
          value={fileNumber}
          onChange={(e) => setFileNumber(e.target.value)}
        />
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

        <Button onClick={handleRegistration}>create an account</Button>
        <p>
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
      </Form>
    </>
  );
};

export default TeacherRegistration;
