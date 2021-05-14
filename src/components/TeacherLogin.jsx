import { Form, Button } from 'semantic-ui-react';

const TeacherLogin = (props) => {
  const { email, password, handleLogin, setEmail, setPassword } = props;
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
      </Form>
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
          onClick={() => {
            console.log('hahahhaha');
            // setHasAccount(!hasAccount);
          }}
        >
          sign up
        </span>
      </p>
    </>
  );
};

export default TeacherLogin;
