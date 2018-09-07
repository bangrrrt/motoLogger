import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Waypoint from 'react-waypoint';
import scrollIntoView from 'scroll-into-view';

import LoginScreenContainer from '../../../loginScreen/loginScreenContainer';
import RegisterScreen from '../../../registerScreen/registerScreen';
import OilChangeLog from '../../../../images/homeScreenImages/oil_change_log.png';
import BatteryLog from '../../../../images/homeScreenImages/new_battery.png';
import ChainLog from '../../../../images/homeScreenImages/chain_log.png';
import RadiatorLog from '../../../../images/homeScreenImages/radiator_log.png';
import SparkPlugsLog from '../../../../images/homeScreenImages/spark_plugs_log.png';

import './body.css';

class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      threshold: 0,
      oil: false,
      gears: false,
      sell: false,
      register: false
    };
  }

  componentDidMount() {
    const threshold = window.innerHeight / 2;
    const scrollPosition = window.scrollY;

    this.setThreshold(threshold);

    if (scrollPosition > threshold && !this.props.isHeaderVisible) {
      this.props.toggleHeaderVisibility(true);
    }
  }

  setThreshold = (threshold) => {
    this.setState({ threshold });
  }

  setVisibleWaypoint = (element) => {
    this.setState({ [element]: true });
  }

  scrollToElement = (elementName) => {
    const element = document.getElementById(elementName);
    scrollIntoView(element, {
      time: 200
    });
  }

  render() {
    const { toggleHeaderVisibility } = this.props;
    const {
      threshold,
      oil,
      gears,
      sell,
      register
    } = this.state;

    const oilTextClasses = classNames('hs-body-oil-text-wrapper', {
      fadeInRight: oil
    });

    const oilImageClasses = classNames('hs-body-oil-image', {
      fadeInDown: oil
    });

    const gearsImageClasses = classNames('hs-body-gears-image', {
      fadeInDown: gears
    });

    const gearsTextClasses = classNames('hs-body-gears-text-wrapper', {
      fadeInLeft: gears
    });

    const sellTextClasses = classNames('hs-body-sell-text-wrapper', {
      fadeInRight: sell
    });

    const sellImageClasses = classNames('hs-body-sell-image', {
      fadeInDown: sell
    });

    const registerTextClasses = classNames('hs-body-register-text-wrapper', {
      fadeInLeft: register
    });

    const registerFormClasses = classNames('hs-body-register-form', {
      fadeInDown: register
    });

    return (
      <div className="hs-body">
        <Waypoint
          key="login"
          onEnter={() => toggleHeaderVisibility(false)}
          onLeave={() => toggleHeaderVisibility(true)}
          topOffset={threshold / 0.6}
        >
          <div id="login" className="hs-body-hero-image-wrapper">
            <div className="hs-body-hero-image-content fadeInDown">
              <Image
                className="hs-body-hero-image-logo"
                responsive
                src="https://raw.githubusercontent.com/bangrrrt/motoLogger/master/client/src/images/motoLogger-logo.png"
                alt="motoLogger"
              />
              <h2 className="hs-body-hero-image-slogan">Fix it, Log it</h2>
            </div>
            <div className="hs-body-hero-image fadeInDownBig">
              <LoginScreenContainer />
              <div className="hs-body-hero-image-register">
                <h5>Don't have an account?</h5>
                <h3 className="hs-body-hero-image-register-title">
                  <button
                    onClick={() => this.scrollToElement('register')}
                    className="hs-body-hero-image-register-title-link"
                  >
                    Register Now
                  </button>
                </h3>
              </div>
            </div>
            <button
              className="hs-body-hero-image-learn-more"
              onClick={() => this.scrollToElement('features')}
            >
              <div className="hs-body-hero-image-learn-more-text">Need<br />Convincing?</div>
              <i className="hs-body-hero-image-learn-icon glyphicon glyphicon-arrow-down" />
            </button>
          </div>
        </Waypoint>
        <Waypoint
          key="oil"
          onEnter={() => this.setVisibleWaypoint('oil')}
          bottomOffset={threshold}
        >
          <div id="features" className="hs-body-oil-content">
            <div className="hs-body-oil-image-wrapper">
              <Image
                className={oilImageClasses}
                src={OilChangeLog}
              />
            </div>
            <div className={oilTextClasses}>
              <h1 className="hs-body-title-text">Easily Track Motorcycle Maintenance</h1>
              <p>Whether she&#39;s a new bike or old, you do your own maintenance or not,
                keeping a log of what changed will come in handy down the road. Never forget
                the model number of your favorite oil filter. Look back to see what you paid
                when you took your bike to the mechanic to prevent getting ripped off by a new
                mechanic.
              </p>
            </div>
          </div>
        </Waypoint>
        <Waypoint
          onEnter={() => this.setVisibleWaypoint('gears')}
          bottomOffset={threshold}
        >
          <div className="hs-body-gears-content">
            <div className={gearsTextClasses}>
              <h1 className="hs-body-title-text">Create A Log For Everything</h1>
              <p>Some maintenance might be straight forward, but maybe you learned some new tricks
                along the way. Take advantage of the notes section to learn from your own mistakes
                or happy accidents.
              </p>
            </div>
            <div className="hs-body-gear-image-wrapper">
              <Image
                className={gearsImageClasses}
                src={BatteryLog}
              />
            </div>
          </div>
        </Waypoint>
        <Waypoint
          onEnter={() => this.setVisibleWaypoint('sell')}
          bottomOffset={threshold}
        >
          <div className="hs-body-sell-content">
            <div className="hs-body-sell-image-wrapper">
              <Image
                id="hs-body-sell-chain-image"
                className={sellImageClasses}
                src={ChainLog}
              />
              <Image
                id="hs-body-sell-radiator-image"
                className={sellImageClasses}
                src={RadiatorLog}
              />
              <Image
                id="hs-body-sell-spark-plug-image"
                className={sellImageClasses}
                src={SparkPlugsLog}
              />
            </div>
            <div className={sellTextClasses}>
              <h1 className="hs-body-title-text">Sell With Confidence</h1>
              <p className="hs-body-paragraph-text">Documenting your maintenance will allow the buyer to see the real value of your motorcycle and that it&#39;s more than just a used bike. When it&#39;s time for them to throw down money they&#39;ll feel a sense of confidence knowing they aren&#39;t about to get ripped off. Sharing this info will also give them a good idea of what might need to be repaired and that you&#39;re looking out for them.</p>
            </div>
          </div>
        </Waypoint>
        <Waypoint
          onEnter={() => this.setVisibleWaypoint('register')}
          bottomOffset={threshold}
        >
          <div id="register" className="hs-body-register-content">
            <div className={registerTextClasses}>
              <h1 className="hs-body-title-text">Relax</h1>
              <p className="hs-body-paragraph-text">Forget about all your worries and enjoy the ride. After all you earned it by maintaining and logging your maintenance, <em>right?</em></p>
            </div>
            <div className={registerFormClasses}>
              <RegisterScreen />
            </div>
          </div>
        </Waypoint>
      </div>
    );
  }
}

const { func, bool } = PropTypes;

Body.propTypes = {
  /**
   * True if the header is visible
   */
  isHeaderVisible: bool.isRequired,
  /**
   * Action that handles showing and hiding the header
   */
  toggleHeaderVisibility: func.isRequired
};

Body.defaultProps = {
};

export default Body;
