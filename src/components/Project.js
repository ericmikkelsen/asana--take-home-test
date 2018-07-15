import React from 'react';
import Task from './Task';
import Layout from './Layout'

const getProjectKey = ( projectId ) => {
  return `project-${projectId}`
}

const setLocalProject = ( project ) => {
  const key = getProjectKey(project.id)
  localStorage.setItem( key, JSON.stringify(project) )
  return project.id
}

const getLocalProject = ( projectId ) => {
  const project = localStorage.getItem( getProjectKey(projectId) )
  return ( project ? JSON.parse( project ) : false )
}

const shouldUpdateProject = ( project ) => {

  const localProject = getLocalProject( getProjectKey( project.id ) );
  if ( !localProject ) {
    setLocalProject( project );
    return true
  } else {
    return ( JSON.stringify(project) !== JSON.stringify(localProject) ) ? true : false;
  }

}

export default class Project extends React.Component{
  // 735563712461979
  constructor(props) {
    super(props);
    this.state = { 
      project: getLocalProject( this.props.match.params.project ),
      localKeys: Object.keys(window.localStorage),
      showHidden: false
    };
    this.props.getProject( this.props.match.params.project )
    .then( (project) => {
        shouldUpdateProject(project) && this.setState( {project: project} )
    } )
    this.toggleHidden 
  }

  hiddenTasks = () => {
    const tasks = this.state.project.tasks
    const keys = this.state.localKeys;
    const hiddenTasks = tasks.find( (task) => {
      return keys.indexOf(`hidden-${task.id}`) > -1;
    });
    return !hiddenTasks ? false : true;
  }

  toggleHidden = () => {
    const showHidden = !this.state.showHidden
    this.setState( { showHidden: showHidden } )
  }

  shouldComponentUpdate( nextProps, nextState ) {
    return nextState.showHidden !== this.state.showHidden;
  }

  render(){
    const project = this.state.project
    const hiddenTasks = this.hiddenTasks()
    const showHidden = this.state.showHidden
    return(
      <Layout history={this.props.history}>
          <header class="Project__header">
            <p className="Project__kicker">Project Name: </p>
            <h1 className="Project__name" >{project.name}</h1>
            <button 
              className="Project__showHidden"
              onClick={ this.toggleHidden } 
            >
              { this.state.showHidden ? '- Hide Hidden Tasks' : '+ Show Hidden tasks' }
            </button>
          </header>
          <ul className="Tasks">
            { project.tasks.map( task => 
                <Task project={project.id} id={task.id} name={task.name} showHidden={showHidden}/>
            )}
          </ul>

      </Layout>
    )
  }
}