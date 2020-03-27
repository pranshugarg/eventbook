import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';
import NavBar from '../../features/nav/NavBar/NavBar';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={HomePage} />
        
        <Route path="/(.+)" render = { () => (    
          <Fragment>
            <NavBar />
            <Container className="main">
              <Route path="/events" component={EventDashboard} />
              <Route path="/event/:id" component={EventDetailedPage} />
              <Route path="/people" component={PeopleDashboard} />
              <Route path="/profile/:id" component={UserDetailedPage} />
              <Route path="/settings" component={SettingsDashboard} />
              <Route path="/createEvent" component={EventForm} />
            </Container>
          </Fragment>
        )} />

      </Fragment>
    );
  }
}

export default App;
