import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import { connect } from 'react-redux';
import { deleteEvent, createEvent, updateEvent } from '../eventActions'


//map state to props
const mapState = state => ({
  events: state.events
});

//action would be dispatched to reducer
const actions = {
  deleteEvent, createEvent, updateEvent
}

class EventDashboard extends Component {
  handleDeleteEvent = eventId => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const {events} = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
            <EventList events={events}  deleteEvent={this.handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2> Activity Feed </h2>
        </Grid.Column>
      </Grid>
    )
  }
}

// connect is an higher order component 
export default connect(mapState, actions)(EventDashboard);