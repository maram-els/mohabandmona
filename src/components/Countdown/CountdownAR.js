import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Countdown.css'

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    const egyptTimezoneOffset = 3 * 60 * 60 * 1000; // in milliseconds

    // Get the current time in UTC
    const now = new Date();
    const nowUTC = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const nowInEgypt = new Date(nowUTC.getTime() + egyptTimezoneOffset);

    const targetDate = new Date(new Date(endDate).getTime());

    let diff = (targetDate - nowInEgypt) / 1000;
    if (diff <= 0) return false;

    const timeLeft = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };

    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = Math.floor(diff);

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const { days, hours, min, sec } = this.state;

    return (
      <div className="Countdown">
        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{this.addLeadingZeros(days)}</strong>
            <span>يوم</span>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{this.addLeadingZeros(hours)}</strong>
            <span>ساعة</span>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{this.addLeadingZeros(min)}</strong>
            <span>دقيقة</span>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{this.addLeadingZeros(sec)}</strong>
            <span>ثانية</span>
          </span>
        </span>
      </div>
    );
  }
}

Countdown.propTypes = {
  date: PropTypes.string.isRequired,
};

Countdown.defaultProps = {
  date: new Date().toISOString(),
};

export default Countdown;