import { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) { //when we change something in app; not rendered initially
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }

    render() {
      return this.props.children
      //all react components autoatically have a property called children
    }
  }

  export default withRouter(ScrollToTop)