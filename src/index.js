import React from 'react';
import { render } from 'react-dom'
import Asana from 'asana/dist/asana-min'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      project: false,
      tasks: false
    }
    this.auth()
  }

  auth = () => {

      this.client = Asana.Client.create({
          clientId: process.env.ASANA_CLIENT_ID,
          redirectUri: process.env.ASANA_REDIRECT_URL
      })
      this.client.useOauth()
      this.client.authorize()
      .then( () => {

        this.client.projects.findById('735563712461979')
        .then( (project) => {
          this.setState({project: project})
        })

        this.client.tasks.findByProject('735563712461979')
        .then( (tasks) => {
          this.setState({tasks: tasks.data});
        })
    })

  }

  render = () => {

    console.log(this.state);
    return (
      <BrowserRouter>
        <Switch>
          <Route />
        </Switch>
      </BrowserRouter>
    )
  }
}

render(<App />, document.getElementById('app'))