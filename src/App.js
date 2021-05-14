import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import TeacherHome from './components/TeacherHome';
import AdminHome from './components/AdminHome';
import Homepage from './components/Homepage';

const App = () => {
  return (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/teacher">
            <TeacherHome />
          </Route>
          <Route path="/admin">
            <AdminHome />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
