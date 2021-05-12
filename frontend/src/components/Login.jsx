import { Form, Button } from 'semantic-ui-react';

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleRegistration,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    fileNumber,
    setFileNumber,
    firstName,
    setFirstName,
    lastName,
    setLastName,
  } = props;

  return (
    <section>
      {hasAccount ? (
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
            <p>{emailError}</p>
            <Form.Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>{passwordError}</p>
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
              onClick={() => setHasAccount(!hasAccount)}
            >
              sign up
            </span>
          </p>
        </>
      ) : (
        <>
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
            <p>{emailError}</p>
            <Form.Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>{passwordError}</p>
            <Form.Input
              label="File Number"
              type="text"
              required
              value={fileNumber}
              onChange={(e) => setFileNumber(e.target.value)}
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
      )}
    </section>
  );
};

export default Login;
