import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import { connect } from 'react-redux';
import { deleteEvent, createEvent, updateEvent } from '../eventActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import EventActivity from '../EventActivity/EventActivity'

//map state to props
const mapState = state => ({
  events: state.events,
  loading: state.async.loading
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
    const {events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true}/>
    
    return (
      <Grid>
        <Grid.Column width={10}>
            <EventList events={events}  deleteEvent={this.handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity/>
        </Grid.Column>
      </Grid>
    )
  }
}

// connect is an higher order component 
export default connect(mapState, actions)(EventDashboard);