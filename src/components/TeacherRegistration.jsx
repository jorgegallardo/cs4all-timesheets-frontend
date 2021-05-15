import { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import axios from 'axios';

const TeacherRegistration = (props) => {
  const { hasAccount, setHasAccount } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fileNumber, setFileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setFileNumber('');
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        'https://server-mongodb-practice.herokuapp.com/api/register',
        {
          email,
          password,
          firstName,
          lastName,
          fileNumber,
        }
      );
      console.log('the response is ' + JSON.stringify(response));
      resetForm();
      alert('your account has been successfully created');
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
          label="Password - DO NOT USE A REAL PASSWORD FOR NOW - CURRENTLY PASSWORDS ARE PLAINTEXT!!!!"
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
