import Asana from 'asana/dist/asana-min'

const client = Asana.Client.create( {
        clientId: process.env.ASANA_CLIENT_ID,
        redirectUri: process.env.ASANA_REDIRECT_URL
    } );

const auth = () => {
  // set after load redirect url
  client.useOauth()
  return client.authorize()
}

const getProject = ( projectId ) => {

  return new Promise((resolve, reject) => {
    
    const project = client.projects.findById( projectId )
    const tasks = client.tasks.findByProject( projectId )

    Promise.all( [ project, tasks ] )
    .then( (values) => {
      resolve( {
        name: values[0].name,
        id: values[0].id,
        tasks: values[1].data
      } )
    })
  })
    
}

const asana = {
  auth: auth,
  getProject: getProject
}
 
export default asana



        // this.client.projects.findById('735563712461979')
        // .then( (project) => {
        //   this.setState({project: project})
        // })

        // this.client.tasks.findByProject('735563712461979')
        // .then( (tasks) => {
        //   this.setState({tasks: tasks.data});
        // })
