import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from './testActions'

//map state to prop function. 
//get state from store..
//data is prop
const mapState = (state) => ({
  data: state.test.data  //specify test reducer
})


//map dispatch(action) to props
const actions = {
  incrementCounter,
  decrementCounter
}

class TestComponent extends Component {
  render() {
    const {incrementCounter, decrementCounter, data} = this.props;
    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color='green' content='Increment'/>
        <Button onClick={decrementCounter} color='red' content='Decrement'/>
      </div>
    )
  }
}

// connect higher order component 
//first parameter is "mapstatetoprop" function
export default connect(mapState, actions)(TestComponent)