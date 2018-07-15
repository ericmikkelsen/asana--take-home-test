import React from 'react'
import ProjectForm from './ProjectForm'

const Layout = (props) => (

  <div class="Layout">
    <aside class="Layout__sidebar">
      <ProjectForm history={props.history} />
    </aside>

    <main class="Layout__main">
        {props.children}
    </main>
  </div>
)

export default Layout
