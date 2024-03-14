import React from 'react';
import classes from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/selectors';
import { changeFilter } from '../../redux/filterSlice';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handleFilterChange = ({ target: { value } }) =>
    dispatch(changeFilter(value.toLowerCase().trim()));

  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor="filter">
        Find contact by Name:
      </label>
      <input
        className={classes.input}
        type="text"
        id="filter"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};