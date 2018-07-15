import React from 'react';

const hiddenStatus = ( id ) => {
    return localStorage.getItem( `hidden-${id}`) || false
}

const toggleHidden = ( id ) => {
    if( hiddenStatus( id ) ){
        localStorage.removeItem( `hidden-${id}` )
        return false
    } else {
        localStorage.setItem( `hidden-${id}`, true )
        return true
    }
}

class Task extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hidden: hiddenStatus( props.id )
        }
    }

    taskLink = ( project, task ) => {
        return `https://app.asana.com/0/${project}/${task}`
    }

    toggleHide = () => {
        this.setState( { hidden: toggleHidden( this.props.id ) } )
    }

    render(){
        const props = this.props
        const showHidden = props.showHidden ? 'Task--showHidden' : '';

        return  (
            <li className={`Task ${showHidden}`} hidden={this.state.hidden}>
                <a  
                    className="Task__link"
                    href={ this.taskLink( props.project, props.id ) }
                >
                    { props.name }
                </a>
                <button 
                    className="Task__hide"
                    onclick={this.toggleHide}
                >
                    {this.state.hidden ? '+ Show' : '- Hide' } Task
                </button>
            </li>
        )
    }

}

export default Task
