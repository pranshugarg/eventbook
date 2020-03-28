import React, { Component } from 'react';
import { Form, Segment, Button , Grid, Header} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions'
import cuid from 'cuid';
import { reduxForm, Field } from 'redux-form'; //reduxForm is high order component
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import moment from 'moment';
import DatePicker from 'react-datepicker';

//mapstate to props
const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id; 

  let event = {};//redux form will take care of initial values

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }
  return {
    initialValues: event
    // event
   }
}

//hooking actions to form that'd be dispatched to reducer
const actions = {
   createEvent, updateEvent
}

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
});

class EventForm extends Component {
  onFormSubmit = values => {
    if(this.props.initialValues.id){
      this.props.updateEvent(values);
      //this.props.history.push(`/events/${this.props.initialValues.id}`);
      //this.props.history.goBack();
      this.props.history.push(`/events`);
    }
    else{
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob'
      }

     this.props.createEvent(newEvent);
     //this.props.history.push(`/events/${newEvent.id}`);
     this.props.history.push(`/events`);
    }
  };
  render() {
    /* {invalid, submitting, pristine}; help submit only after validation
    => won't be able to submit form is in pristine state
    => pristine means we have initialized a form with event values
    */
    const { history, initialValues, invalid, submitting, pristine } = this.props; 
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />

            <Form onSubmit={ this.props.handleSubmit( this.onFormSubmit)}>

              <Field name="title"
                    type="text"
                    component={TextInput}
                    placeholder="Give your event a name"
                />
              
              {/* Removing Form.field(semantic-ui) and using "Field" i.e redux-form-fields */}
              
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Tell us about your event"
              />

              <Header sub color="teal" content="Event Location Details" />

              <Field name="city" type="text" component={TextInput} placeholder="Event City" />
              <Field name="venue" type="text" component={TextInput} placeholder="Event Venue" />
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="yyyy-MM-dd"
                timeFormat='HH:mm'
                showTimeSelect
                placeholder="Date and Time of Event"
              />

              <Button disabled={invalid|| submitting || pristine} positive type="submit">
                Submit
              </Button>
              <Button 
              onClick={initialValues.id ? ()=> history.push(`/events/${initialValues.id}`)  : () => history.push(`/events`) } 
              type="button">Cancel</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

//both "connect" and "reduxForm" are higher order components
export default connect(mapState, actions)(
  reduxForm({ form: 'eventForm', validate })(EventForm)
);