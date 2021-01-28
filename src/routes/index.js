import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AdminLogin from '../pages/AdminLogin';
import ContactHistory from '../pages/ContactHistory';
import Home from '../pages/Home';
import Register from '../pages/RegisterNewUser';
import Users from '../pages/Users';
const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/history" component={ContactHistory} />
            <Route path="/users" component={Users} />
            <Route path="/admin-login" component={AdminLogin} />
        </Switch>
    )
}

export default Routes;
