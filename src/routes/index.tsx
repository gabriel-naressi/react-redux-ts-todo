import React from 'react'
import { Route, Switch } from 'react-router'
import NavBar from '../components/NavBar'
import Home  from '../components/Home'
import Counter  from '../features/counter/Counter'

const routes = (
  <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/counter" component={Counter} />
    </Switch>
  </div>
)

export default routes