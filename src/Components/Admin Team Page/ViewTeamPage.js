import React, { useState } from "react";
import classes from "./ViewTeamPage.module.css";
import {
  handleAddSalesExecutive,
  deletDataFromStorage,
} from "../../Handle Storage/ManageSalesExecutive";

export default function ViewTeamPage() {
  let salesTeamDBName = "salesExeData";
  let saledDataList = window.localStorage.getItem(salesTeamDBName);
  let salesDataArray = [];
  if (saledDataList == null || saledDataList === "") {
    // No data Found
  } else {
    saledDataList = JSON.parse(saledDataList);
    saledDataList.map((item) => {
      salesDataArray.push(item);
    });
  }

  const [overlayClass, setoverlayClass] = useState([classes.overlay]);
  const [isoverlayOpen, setisoverlayOpen] = useState(false);
  const [tempDataObj, settempDataObj] = useState({});
  const [isdataDeleted, setisdataDeleted] = useState(false);

  const changeOverLayClass = () => {
    if (isoverlayOpen) {
      setisoverlayOpen(false);
      setoverlayClass([classes.overlay]);
    } else {
      setoverlayClass([classes.overlay_visible]);
      setisoverlayOpen(true);
    }
  };

  const updatSalesExeData = (
    dob,
    experience,
    fName,
    gender,
    id,
    lName,
    password,
    userName
  ) => {
    if (
      fName.toString().trim().length > 3 &&
      lName.toString().trim().length > 3 &&
      userName.toString().trim().length > 3 &&
      password.toString().trim().length > 6 &&
      dob.toString().trim().length > 3 &&
      gender.toString().trim() !== "--select--" &&
      experience > 0
    ) {
      //handleCartClick(id, name, manufactureName, price, stock, discount);
      handleAddSalesExecutive(
        id,
        fName,
        lName,
        userName,
        dob,
        gender,
        experience,
        password
      );
      changeOverLayClass();
    } else {
      console.log("invalid Data");
    }
  };

  const UpdateMedOverlay = (props) => {
    const { dob, experience, fName, gender, id, lName, password, userName } =
      props.dataObj;
    const [innerFName, setinnerFName] = useState(fName);
    const [innerLName, setinnerLName] = useState(lName);
    const [innerUserName, setinnerUserName] = useState(userName);
    const [innerDOB, setinnerDOB] = useState(dob);
    const [innerExperience, setinnerExperience] = useState(experience);
    const [innerGender, setinnerGender] = useState(gender);
    const [innerPassword, setinnerPassword] = useState(password);
    return (
      <div>
        <div className={overlayClass}>
          <div className={classes.overLayCardWrapper}>
            <h2>Update Sales Executive Here</h2>
            <div className={classes.inputDivWrapper}>
              <div className={classes.inputOverLayWrapper}>
                <p>First Name: </p>
                <input
                  type="text"
                  value={innerFName}
                  onChange={(e) => setinnerFName(e.target.value)}
                />
              </div>
              <div className={classes.inputOverLayWrapper}>
                <p>Last Name: </p>
                <input
                  type="text"
                  value={innerLName}
                  onChange={(e) => setinnerLName(e.target.value)}
                />
              </div>
              <div className={classes.inputOverLayWrapper}>
                <p>Username: </p>
                <input
                  type="text"
                  value={innerUserName}
                  onChange={(e) => setinnerUserName(e.target.value)}
                />
              </div>
              <div className={classes.inputOverLayWrapper}>
                <p>DOB: </p>
                <input
                  type="date"
                  value={innerDOB}
                  onChange={(e) => setinnerDOB(e.target.value)}
                />
              </div>
              <div className={classes.inputOverLayWrapper}>
                <p>Gender: </p>
                <select
                  value={innerGender}
                  onChange={(e) => innerGender(e.target.value)}
                  className={classes.selectOptionsWrapper}
                >
                  <option value="select">--select--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className={classes.inputOverLayWrapper}>
                <p>Experience: </p>
                <input
                  type="number"
                  value={innerExperience}
                  onChange={(e) => setinnerExperience(e.target.value)}
                />
              </div>
              <div className={classes.inputOverLayWrapper}>
                <p>Password: </p>
                <input
                  type="password"
                  value={innerPassword}
                  onChange={(e) => setinnerPassword(e.target.value)}
                />
              </div>
              <div className={classes.inventoryBtnWrapper}>
                <button
                  onClick={() => {
                    updatSalesExeData(
                      innerDOB,
                      innerExperience,
                      innerFName,
                      innerGender,
                      id,
                      innerLName,
                      innerPassword,
                      innerUserName
                    );
                  }}
                >
                  Update Sales Executive
                </button>
              </div>
              <div
                className={classes.closeIconWrapper}
                onClick={() => {
                  setisoverlayOpen(false);
                  setoverlayClass([classes.overlay]);
                }}
              >
                <i class="far fa-window-close"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.viewTeamWrapper}>
      {salesDataArray.length > 0 ? (
        <div className={classes.newviewTeamWrapper}>
          {salesDataArray.map((item, pos) => {
            const {
              dob,
              experience,
              fName,
              gender,
              id,
              lName,
              password,
              userName,
            } = item;
            return (
              <div key={pos} className={classes.viewTeamCardWrapper}>
                <h2>{`${fName} ${lName}`}</h2>
                <h3>
                  userName: <span> {userName}</span>{" "}
                </h3>
                <h3>
                  DOB: <span>{dob}</span>
                </h3>
                <h3>
                  Experience: <span>{experience} years</span>{" "}
                </h3>
                <h3>
                  Gender: <span>{gender}</span>{" "}
                </h3>
                <div className={classes.inventoryBtnWrapper}>
                  <button
                    onClick={() => {
                      changeOverLayClass();
                      settempDataObj(item);
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={() => {
                      deletDataFromStorage(id);
                      setisdataDeleted(!isdataDeleted);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
          <UpdateMedOverlay dataObj={tempDataObj && tempDataObj} />
        </div>
      ) : (
        <div>
          <h1>No data found!</h1>
        </div>
      )}
    </div>
  );
}
