import React from 'react'
import { NavBar } from '../components/NavBar'
import { Route, Switch } from 'react-router'
import { Home }  from '../components/Home'
import { Counter }  from '../components/Counter'

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