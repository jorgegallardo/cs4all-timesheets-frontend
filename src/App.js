import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import TeacherHome from './components/TeacherHome';
import AdminHome from './components/AdminHome';
import Homepage from './components/Homepage';
import UserContext from './store/user-context';
import { useState } from 'react';
import Splash from './components/Splash';

const App = () => {
  const [userData, setUserData] = useState('en');
  const value = { userData, setUserData };

  return (
    <UserContext.Provider value={value}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
          <Route path="/login">
            <Container>
              <Homepage />
            </Container>
          </Route>
          <Route path="/teacher/:activeTab">
            <Container>
              <TeacherHome />
            </Container>
          </Route>
          <Route path="/teacher" exact>
            <Redirect to="/teacher/generateTimesheet" />
          </Route>
          <Route path="/admin/:activeTab">
            <Container>
              <AdminHome />
            </Container>
          </Route>
          <Route path="/admin" exact>
            <Redirect to="/admin/approveTimesheets" />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
