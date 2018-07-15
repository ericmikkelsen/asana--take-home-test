import React from 'react';
import Layout from './Layout'

export default class Projects extends React.Component{
  // 735563712461979
  constructor(props){
    super(props)
    // console.log(window.localStorage);
  }

  render(){
    return (
      <Layout history={this.props.history}>


      </Layout>
    )
  }
}