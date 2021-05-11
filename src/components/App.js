import React from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import LiveStreaming from './LiveStreaming';
import Socket from './Socket';
import UrlTest from './UrlTest'
import MenuDetail from './MenuDetail';

function App() {
  return (
    <Router>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/menu">
          <button>Menu</button>
        </Link>
        <Link to="/livestream">
          <button>Live Streaming</button>
        </Link>
        <Link to="/socket">
          <button>Socket</button>
        </Link>
        <Link to="/urltest">
          <button>Url Test</button>
        </Link>
      </header>
      <hr />
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/menu" component={Menu} />
        <Route path="/livestream" component={LiveStreaming} />
        <Route path="/socket" component={Socket} />
        <Route path="/urltest/:isTrue" component={UrlTest} />
        <Route path="/menu/:id" component={MenuDetail} />
      </main>
    </Router>
  );
}

export default App;
