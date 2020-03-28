import React, { Component } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions'
import cuid from 'cuid';

//mapstate to props
const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id; 

  let event = {
    title: '',  date: '',city: '',  venue: '',hostedBy: ''
  }
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }
  return { event }
}

//hooking actions to form that'd be dispatched to reducer
const actions = {
   createEvent, updateEvent
}

class EventForm extends Component {
  state = {  ...this.props.event };

  // life cycle methods
  //populate the form(update state in eventform) based on selected event(props received)
  //re-render 
  componentDidMount(){
    if(this.props.selectedEvent !== null){
      this.setState({
        ...this.props.selectedEvent
      })
    }
  }

  onFormSubmit = evt => {
    evt.preventDefault();
    if(this.state.id){
      this.props.updateEvent(this.state);
      this.props.history.goBack();
    }
    else{
      const newEvent = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }

     this.props.createEvent(newEvent);
     this.props.history.push('/events')
    }
  };

  onInputChange = ( {target :{name, value}}  ) => {
      this.setState({
          [name]: value
      });
  }

  render() {
    const { title, date, city, venue, hostedBy } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input name='title' onChange={this.onInputChange} value={title} placeholder="Event Title"  />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input name='date' onChange={this.onInputChange} value={date}   type="date" placeholder="Event Date" />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input name='city' onChange={this.onInputChange} value={city}  placeholder="City event is taking place" />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input name='venue' onChange={this.onInputChange} value={venue} placeholder="Enter the Venue of the event" />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input name='hostedBy' onChange={this.onInputChange} value={hostedBy} placeholder="Enter the name of person hosting" />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
        </Form>
      </Segment>
    );
  }
}
//instead of cancel button, we need to get back
export default connect(mapState, actions)(EventForm);