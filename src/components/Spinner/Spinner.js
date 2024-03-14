import classes from './Spinner.module.css';
export const Spinner = () => (
  <div className={classes.backdrop}>
    <span className={classes.spinner} />
  </div>
);