import React from 'react';
import Users from './components/users';
import NavBar from './components/navBar';
import Login from './layout/login';
import User from './layout/user';
import Main from './layout/main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <h1>Fast-company</h1>
                <Switch>
                    <Route path='/main' component={Main} />
                    <Route path='/login' component={Login} />
                    <Route path='/users' component={User} />
                </Switch>
                <Users />
            </div>
        </BrowserRouter>

    );
};

export default App;
