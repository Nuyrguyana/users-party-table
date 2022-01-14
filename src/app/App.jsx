import React from 'react';
import UsersMainComponent from './components/page/userListPage/usersMainComponent';
import NavBar from './components/ui/navBar';
import Login from './layout/login';
import Main from './layout/main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Switch>
                    <Route path='/' exact component={Main} />
                    <Route path='/login' component={Login} />
                    <Route path='/users/:userId?' component={UsersMainComponent} />
                </Switch>
            </div>
        </BrowserRouter>

    );
};

export default App;
