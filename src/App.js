import "./App.css";
import React from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import { Redirect, Route, withRouter } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/Login";
import { connect } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader  from "./components/Common/Preloader/Preloader";
import store from "./redux/redux-store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {withSuspense} from "./hoc/withSuspense";


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {


  catchAllUnHandledError = (promisesRejectionEvent) => {
    alert("Some error occured")
  }

  componentDidMount() {
    this.props.initializeApp();

    window.addEventListener("unhandledrejection", this.catchAllUnHandledError())
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnHandledError())
  }

  render() {

    if (!this.props.initialized){
      return <Preloader />
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
          <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
          <Route exact path="/" render={() => <Redirect to={"/profile" }/>}/>
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/login" render={() => <LoginPage />} />
          {/* <Route path="*" render={() => <div>404 NOT FOUND</div>} /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

let AppContainer = compose(connect(mapStateToProps, { initializeApp }), withRouter)(App);

const FirstApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default FirstApp;
