import React from 'react';
import MainUsers from './components/mainUsers';
import NavBar from './components/navBar';
import Login from './layout/login';
// import Users from './layout/user';
import Main from './layout/main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Switch>
                    <Route path='/main' component={Main} />
                    <Route path='/users' component={MainUsers} />
                    <Route path='/login' component={Login} />
                </Switch>
                {/* <MainUsers /> */}
            </div>
        </BrowserRouter>

    );
};

export default App;
