/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

// StyleSheet

import 'src/styles/datepicker.scss';

const DatePicker = ({
  year,
  month,
  date,
  // setDate,
  daysInMonth,
  setDaysInMonth,
  getNextDate,
  getPrevDate,
}) => {
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

  const days = [];
  const start = new Date(year, month - 1);
  const dayOfWeek = start.getDay();

  const lessDays = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const moreDays = dayOfWeek < 6 ? 5 - dayOfWeek : 6;

  const totalDays = daysInMonth === 31
    ? daysInMonth + lessDays + moreDays
    : daysInMonth + lessDays + moreDays + 1;

  for (let i = 0; i < totalDays; i++) {
    const weekDay = new Date(
      new Date(year, month - 1, date + i).setDate(
        new Date(year, month - 1, date + i).getDate() - lessDays,
      ),
    );
    days.push(Date.parse(weekDay));
  }

  const dayList = (day) => (
    <div
      key={day}
      className={
              new Date(day).getMonth() + 1 === month
                ? 'datepicker-content-item'
                : 'datepicker-content-item out'
          }
    >
      {new Date(day).toLocaleDateString('fr-FR', { day: 'numeric' })}
    </div>
  );

  return (
    <div className="datepicker">
      <div className="datepicker-header">
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
        <button
          className="next-year"
          aria-label="next year"
          type="button"
          onClick={getNextDate}
        >
          <Icon path={mdiChevronRight} title="next date" size={1} />
        </button>
      </div>
      <div className="datepicker-content-header">
        <div>Lun</div>
        <div>Mar</div>
        <div>Mer</div>
        <div>Jeu</div>
        <div>Ven</div>
        <div>Sam</div>
        <div>Dim</div>
      </div>
      <div className="datepicker-content">{days.map(dayList)}
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  year: PropTypes.number.isRequired,
  getPrevDate: PropTypes.func.isRequired,
  month: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  getNextDate: PropTypes.func.isRequired,
  // setDate: PropTypes.func.isRequired,
  daysInMonth: PropTypes.number.isRequired,
  setDaysInMonth: PropTypes.func.isRequired,
};

export default DatePicker;
