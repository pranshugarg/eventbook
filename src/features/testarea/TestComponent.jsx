import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { incrementAsync, decrementAsync,  } from './testActions'
import { openModal, closeModal } from '../modals/modalActions'

//map state to prop function. 
//get state from store..
//data is prop
const mapState = (state) => ({
  data: state.test.data , //specify test reducer
  loading : state.async.loading, //true before action is finished
  buttonName : state.async.elementName 
})


//map dispatch(action) to props
const actions = {
  incrementAsync,
  decrementAsync,
  openModal
}

class TestComponent extends Component {
  render() {
    const {incrementAsync, decrementAsync, data, openModal, loading,  buttonName } = this.props;
    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button name="increment" loading={ buttonName==='increment' && loading} onClick={ (e) => incrementAsync(e.target.name) } color='green' content='Increment'/>
        <Button name="decrement" loading={ buttonName==='decrement' && loading} onClick={ (e) => decrementAsync(e.target.name)} color='red' content='Decrement'/>
        <Button onClick={() => openModal('TestModal', {data: 34})} color="teal" content="Open Modal" />
      </div>
    )
  }
}

// connect higher order component 
//first parameter is "mapstatetoprop" function
export default connect(mapState, actions)(TestComponent)