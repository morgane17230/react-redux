/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

// StyleSheet

import 'src/styles/scheduler.scss';

const Scheduler = ({
  year,
  month,
  date,
  setDate,
  daysInMonth,
  setDaysInMonth,
  getNextDate,
  getPrevDate,
}) => {
  // const [displayMonth, setDisplayMonth] = useState(false);
  // const [displayWeek, setDisplayWeek] = useState(false);
  // const [displayDay, setDisplayDay] = useState(false);

  // Number of Days in Month

  if (month <= 7) {
    if (month % 2 === 0) {
      setDaysInMonth(30);
    }
    else {
      setDaysInMonth(31);
    }
  }
  else if (month % 2 === 1) {
    setDaysInMonth(30);
  }
  else {
    setDaysInMonth(31);
  }
  if (month === 2) {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          setDaysInMonth(28);
        }
        else {
          setDaysInMonth(29);
        }
      }
      else {
        setDaysInMonth(29);
      }
    }
    else {
      setDaysInMonth(28);
    }
  }

  // month display

  const monthArray = [];

  for (let i = 1; i < daysInMonth + 1; i++) {
    monthArray.push(
      <button
        type="button"
        key={i}
        className="scheduler-content-item"
        onClick={() => setDate(i)}
      >
        {new Date(year, month - 1, i).toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
        })}
      </button>,
    );
  }

  // week display

  const weekDays = [];
  const dayHours = [];
  const currentDate = new Date(year, month - 1, date);
  const currentDay = currentDate.getDay();
  const lessDays = currentDay === 0 ? 6 : currentDay - 1;
  for (let h = 8; h < 19; h++) {
    dayHours.push(h, `${h}h30`);
  }
  for (let i = 0; i < 7; i++) {
    const weekDay = new Date(
      new Date(year, month - 1, date + i).setDate(
        new Date(year, month - 1, date + i).getDate() - lessDays,
      ),
    ).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
    });
    weekDays.push(weekDay);
  }

  const weekHoursList = (weekHour, index) => (
    <div key={index} className="scheduler-content-hour">
      <div className="scheduler-content-item">{weekHour}</div>
    </div>
  );

  const weekDayList = (weekDay, index) => (
    <div key={index} className="scheduler-content-item">
      <div className="scheduler-content-header">{weekDay}</div>
    </div>
  );

  return (
    <div className="scheduler">
      <div className="scheduler-header">
        <button
          className="prevyear"
          aria-label="previous year"
          type="button"
          onClick={getPrevDate}
        >
          <Icon path={mdiChevronLeft} title="next date" size={1} />
        </button>
        <span>
          {new Date(
            Date.UTC(year, month, 0, 0, 0, 0),
          ).toLocaleDateString('fr-FR', { month: 'long' })}{' '}
          {year}
        </span>
        <div className="scheduler-header-choice">
          <button aria-label="day" type="button">
            Jour
          </button>
          <button aria-label="week" type="button">
            Semaine
          </button>
          <button aria-label="month" type="button">
            Mois
          </button>
        </div>
        <button
          className="next-year"
          aria-label="next year"
          type="button"
          onClick={getNextDate}
        >
          <Icon path={mdiChevronRight} title="next date" size={1} />
        </button>
      </div>
      <div className="scheduler-content">
        <div className="scheduler-content-header">Heures</div>
        {weekDays.map(weekDayList)}
      </div>
      <div>
        {dayHours.map(weekHoursList)}
      </div>
    </div>
  );
};

Scheduler.propTypes = {
  year: PropTypes.number.isRequired,
  getPrevDate: PropTypes.func.isRequired,
  month: PropTypes.number.isRequired,
  getNextDate: PropTypes.func.isRequired,
  date: PropTypes.number.isRequired,
  setDate: PropTypes.func.isRequired,
  daysInMonth: PropTypes.number.isRequired,
  setDaysInMonth: PropTypes.func.isRequired,
};

export default Scheduler;
