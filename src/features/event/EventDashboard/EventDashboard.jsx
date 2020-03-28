import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'
import cuid from 'cuid';
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

//events(from local component state) moved to eventReducer(initialState)
class EventDashboard extends Component {
  state = {
    //events: eventsFromDashboard,  
    isOpen: false,
    selectedEvent: null
  }

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = 'assets/user.png';
    this.props.createEvent(newEvent);
    this.setState( ({events}) =>  ({
      isOpen: false
    }))
  }

  handleSelectEvent = (eventToOpen)  => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    })
  }

  handleUpdateEvent = (updatedEvent) => { 
    this.props.updateEvent(updatedEvent);
    this.setState( ({events}) => ({
      isOpen: false,
      selectedEvent: null
    }))
  }

  handleDeleteEvent = eventId => {
    this.props.deleteEvent(eventId);
  };

  handleCreateFormOpen =  () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    })
  }

  handleFormCancel =  () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    const { selectedEvent, isOpen} = this.state;
    const {events} = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
            <EventList events={events} selectEvent={this.handleSelectEvent} deleteEvent={this.handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
            <Button onClick={this.handleCreateFormOpen} positive content='Create Event'/>
            {isOpen && 
            <EventForm 
            key = { selectedEvent ? selectedEvent.id : 0 }
            updateEvent = {this.handleUpdateEvent}
            selectedEvent={selectedEvent} 
            createEvent={this.handleCreateEvent}
            cancelFormOpen={this.handleFormCancel}/>}
        </Grid.Column>
      </Grid>
    )
  }
}

// connect is an higher order component 
export default connect(mapState, actions)(EventDashboard);