import classes from "./Button.module.scss";
import PropTypes from "prop-types";

function Button({ children, onClick, disabled }) {
  return (
    <button disabled={disabled} className={classes.button} onClick={onClick}>
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
export default Button;
