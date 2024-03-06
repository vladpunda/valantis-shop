import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.scss";
import { ReactComponent as TodoIcon } from "../../Assets/Icons/Todo.svg";
import { ReactComponent as ListIcon } from "../../Assets/Icons/List.svg";
export default function Navigation() {
  const activeLink = ({ isActive }) => (isActive ? classes.activeLink : "");
  return (
    <div className={classes.sideBar}>
      <div className={classes.linkWrapper}>
        <NavLink to="/" className={activeLink}>
          <ListIcon />
        </NavLink>
        <NavLink to="/home" className={activeLink}>
          <TodoIcon />
        </NavLink>
      </div>
    </div>
  );
}
