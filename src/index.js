import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import asana from './modules/asana'

import Project from './components/Project'
import Projects from './components/Projects'
import Home from './components/Home'

import "./css/main.css"

asana.auth();

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render = () => {
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/projects" exact component={Projects} />
            <Route path="/projects/:project" render={ (props) => <Project {...props} getProject={ asana.getProject }/> }/> 
          </Switch>
      </BrowserRouter>
    )
  }
}

render(<App />, document.getElementById('app'))