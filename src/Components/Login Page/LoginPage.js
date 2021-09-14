import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./LoginPage.module.css";
import { useHistory } from "react-router-dom";
import { changeLoginUserFromRedux } from "../../Redux Files/Actions/changeLoginUser";

// function LoginPage() {
//   const [userName, setuserName] = useState("");
//   const [password, setpassword] = useState("");
//   const history = useHistory();

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (
//       userName.trim().toLowerCase() === "test-admin" &&
//       password.trim().toLowerCase() === "test-admin"
//     ) {
//       const user = "admin";
//       history.push(`/homepage/${user}`);
//     } else {
//       if (
//         userName.trim().toLowerCase() === "test-sales" &&
//         password.trim().toLowerCase() === "test-sales"
//       ) {
//         const user = "sales";
//         history.push(`/homepage/${user}`);
//       }
//       // he is sales executive
//     }
//   };
//   return (
//     <div className={classes.LoginPageWrapper}>
//       <div className={classes.formWrapper}>
//         <form>
//           <div className={classes.inputWrapper}>
//             <p>Username: </p>
//             <input
//               type="text"
//               value={userName}
//               onChange={(e) => setuserName(e.target.value)}
//             />
//           </div>
//           <div className={classes.inputWrapper}>
//             <p>Password: </p>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setpassword(e.target.value)}
//             />
//           </div>
//           <div>
//             <button type="submit" onClick={handleFormSubmit}>
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

export const LoginPage = (props) => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();
  const [isError, setisError] = useState(false);

  const changeLoginUser = (userType) => {
    props.innerChangeLoginUser(userType);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      userName.trim().toLowerCase() === "test-admin" &&
      password.trim().toLowerCase() === "test-admin"
    ) {
      const user = "admin";
      changeLoginUser(user);
      history.push(`/homepage/${user}`);
      setisError(false);
    } else {
      if (
        userName.trim().toLowerCase() === "test-sales" &&
        password.trim().toLowerCase() === "test-sales"
      ) {
        const user = "sales";
        changeLoginUser(user);
        history.push(`/homepage/${user}`);
        setisError(false);
      } else {
        setisError(true);
      }
      // he is sales executive
    }
  };
  return (
    <div className={classes.LoginPageWrapper}>
      <div className={classes.formWrapper}>
        <form>
          <div className={classes.inputWrapper}>
            <p>Username: </p>
            <input
              type="text"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            <p>Password: </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          {isError ? <ShowErrorText /> : ""}
          <div className={classes.loginBtnWrapper}>
            <button type="submit" onClick={handleFormSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

//const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispach) => ({
  innerChangeLoginUser: (payload) => dispach(changeLoginUserFromRedux(payload)),
});

const ShowErrorText = () => {
  return (
    <div>
      <p className="error_txt">Please enter valid Data</p>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(LoginPage);
