import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/home/Home";
import SignUp from "./components/signUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import BackOffice from "./components/backOffice/BackOffice";
import Assessment from "./components/assessment/Assessment";
import Main from "./components/main/Main";
import "./App.css";
import "./components/buttons/custumButtons.css";
import { getFunction } from "./components/CRUDFunctions";
import DashBoard from "./components/dashboard/DashBoard";

class App extends React.Component {
  state = {
    candidate: {},
    auth: false,
    admin: false,
  };

  getId = async (id) => {
    const candidate = await getFunction("candidates/" + id);
    if (candidate?.role) {
      localStorage.setItem("user", JSON.stringify(candidate));
      this.setState({ candidate, auth: true, admin: candidate.role === "admin" ? true : false });

      return candidate;
    }
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role) {
      this.setState({ user, auth: true, admin: user.role === "admin" ? true : false });
    }
  }
  logOut = () => {
    this.setState({ candidate: {}, auth: false, admin: false });
    localStorage.removeItem("user");
  };
  render() {
    const { candidate, auth, admin } = this.state;
    return (
      <div className='App'>
        <Router>
          <NavBar user={candidate} logOut={this.logOut} />
          <Route path='/' exact render={(props) => <Home user={candidate} {...props} />} />
          <Route path='/signUp' exact render={(props) => <SignUp {...props} getId={this.getId} />} />
          <Route path='/logIn' exact render={(props) => <LogIn {...props} getId={this.getId} />} />
          <Route path='/office' exact render={(props) => auth && admin && <BackOffice admin={candidate} {...props} getId={this.getId} />} />
          <Route path='/dashboard' exact render={(props) => auth && !admin && <DashBoard admin={candidate} {...props} getId={this.getId} />} />
          <Route path='/main' exact render={(props) => auth && !admin && <Main user={candidate} {...props} />} />
          <Route path='/assessment/:id' exact render={(props) => auth && !admin && <Assessment getId={this.getId} user={candidate} logOut={this.logOut} {...props} />} />
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
