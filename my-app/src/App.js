import React from "react";
import { BrowserRouter as Router,Route,Redirect , Switch} from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Home/home";
import 'mdbreact/dist/css/mdb.css';
import "./App.css";
// import Reminder from "./components/Reminder/reminder";
//import TaskList from "./components/TaskList/taskList";
//import TaskDetail from "./components/TaskList/taskDetail";
//import TaskForm from './components/Task/taskForm';
// <AuthRoute path="/task" component={TaskForm} />
         // <AuthRoute path="/taskList" component={TaskList} />
         // <AuthRoute path="/task-detail/:id" component={TaskDetail} />
import Register from "./components/Auth/Register";
import GuestRoute from "./components/GuestRoute";
import AuthRoute from "./components/AuthRoute";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import ForgetPassword from './components/Auth/forgetpassword';
import ResetPassword from './components/Auth/resetPassword';
import AdminPage from "./components/Adminpage/adminpage"
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <Router>
      <Layout>
        <div>
        <Switch>
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <GuestRoute path="/forget-password" component={ForgetPassword} />
          <GuestRoute path="/change-password/:slug" component={ResetPassword} />
          <AuthRoute path="/home" component={Home} />
          <PrivateRoute path="/admin" component={AdminPage} />
          <Redirect to="/" component={Home} />
          </Switch>
        </div>
        <Route path="/" exact component={Home} />
       </Layout>
    </Router>
  );
}

export default App;
