import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import TeacherHome from './components/TeacherHome';
import AdminHome from './components/AdminHome';
import Homepage from './components/Homepage';
import Schools from './components/Schools';
import UserContext from './store/user-context';
import { useState } from 'react';

const App = () => {
  const [userData, setUserData] = useState("en");
  const value = { userData, setUserData };

  return (
    <UserContext.Provider value={value}>
      <Container>
        <Router>
          <Switch>
            {/* <Route exact path="/">
              <JwtTest />
            </Route> */}
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/teacher">
              <TeacherHome />
            </Route>
            <Route path="/admin">
              <AdminHome />
            </Route>
            <Route path="/schools">
              <Schools />
            </Route>
          </Switch>
        </Router>
      </Container>
    </UserContext.Provider>
  );
};

export default App;
