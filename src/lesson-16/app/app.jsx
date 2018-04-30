import * as React from 'react';
import { render } from 'react-dom';

import './app.scss';
import { Header } from './components/header/header.jsx';
import { Content } from './components/content/content.jsx';

class App extends React.Component {
  render() {
    return <div className="app">
      <Header />
      <Content />
    </div>;
  }
}

render(<App/>, document.getElementById('test'));