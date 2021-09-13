import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeLoginUserFromRedux } from "../../Redux Files/Actions/changeLoginUser";
import classes from "./TopBar.module.css";

export const TopBar = (props) => {
  const { userPerson } = props;
  const history = useHistory();

  const changeLoginUser = (user) => {
    props.innerChangeLoginUser(user);
  };

  return (
    <div className={classes.topbarWrapper}>
      <div className={classes.topBarLeftDiv}>
        <h1>MediCoz</h1>
      </div>
      <div className={classes.topbarRightDiv}>
        <h3>
          Current user: <span>{userPerson}</span>
        </h3>
        <button
          onClick={() => {
            changeLoginUser("");
            history.push(`/`);
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userPerson: state.user,
});

const mapDispatchToProps = (dispach) => ({
  innerChangeLoginUser: (payload) => dispach(changeLoginUserFromRedux(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
