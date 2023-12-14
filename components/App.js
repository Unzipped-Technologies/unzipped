import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

//Routes
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Safety from './views/Safety';
import HowItWorks from './views/How-it-works';
import FAQS from './views/Faqs';
import Blogone from './views/Blog-1';
import Blogtwo from './views/Blog-2';
import Blogthree from './views/Blog-3';
import OurStory from './views/Our-story';


//styling
import '../assets/scss/App.scss';
import "animate.css/animate.min.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          {/* <div className="main-page"> */}
          <React.Fragment>
            <Switch>
            {/* <Header /> */}
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/safety" component={Safety} />
            <Route path="/faqs" component={FAQS} />
            <Route path="/blog/Unzipped-mission" component={Blogone} />
            <Route path="/blog/quality-at-the-right-price" component={Blogtwo} />
            <Route path="/blog/unmatched-convenience" component={Blogthree} />
            <Route path="/our-story" component={OurStory} />   
            <Redirect to="/" />   
            </Switch>
          {/* </div> */}
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
