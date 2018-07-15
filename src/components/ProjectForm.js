import React from 'react';
import { Link } from 'react-router-dom'

export default class ProjectForm extends React.Component{
  // 735563712461979
  constructor(props){
    super(props)
    // console.log(window.localStorage);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.projectId.value
    const path = `/projects/${id}`
    this.props.history.push(path)
  }

  render(){
    return (

          <form className="ProjectForm" onSubmit={this.handleSubmit}>
            <img 
              className="ProjectForm__logo"
              src="/img/logo.svg"
              alt="Asana"
            />
            <label 
                className="ProjectForm__label" 
                htmlFor="project-id"
            >
              Enter Project ID
            </label>

            <input
                className="ProjectForm__input"
                id="project-id"
                name="project-id"
                ref={ (input) => this.projectId = input } 
                type="number" 
            />

            <button 
              className="ProjectForm__submit"
              type="submit"
            >
              Get Project Tasks
            </button>

          </form>

    )
  }
}