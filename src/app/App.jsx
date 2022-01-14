import React from 'react';
import UsersListPage from './components/page/userListPage/usersListPage';
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
                    <Route path='/login:type?' component={Login} />
                    <Route path='/users/:userId?' component={UsersListPage} />
                </Switch>
            </div>
        </BrowserRouter>

    );
};

export default App;
