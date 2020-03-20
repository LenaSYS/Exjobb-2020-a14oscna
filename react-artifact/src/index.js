import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return (
        <Message />
    );
  }

  class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
        </div>
      );
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));

