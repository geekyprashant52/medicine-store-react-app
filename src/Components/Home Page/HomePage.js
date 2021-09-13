import React, { useState } from "react";
import { useParams } from "react-router";
import classes from "./HomePage.module.css";
import { useHistory } from "react-router-dom";
import { handleCartClick } from "../../Handle Storage/ManageLocalStorage";
import { handleAddSalesExecutive } from "../../Handle Storage/ManageSalesExecutive";
import { handleAddOrderData } from "../../Handle Storage/ManageCreateOrder";

export default function HomePage() {
  let medName = "",
    medMfdName = "",
    medStock = 0,
    medPrice = 0,
    medDiscount = 0;

  let exefName = "",
    exelName = "",
    exeuserName = "",
    exedob = "",
    exegender = "",
    exeexperience = 0,
    exepassword = "";

  let medicineName = "medicineData";
  let medicineList = window.localStorage.getItem(medicineName);
  let medicineArray = [];
  if (medicineList == null || medicineList === "") {
    // No data Found
  } else {
    medicineList = JSON.parse(medicineList);
    medicineList.map((item) => {
      medicineArray.push(item);
    });
  }

  //   console.log(medicineArray);

  const userType = useParams().user;
  const [isoverlayOpen, setisoverlayOpen] = useState(false);
  const [overlayClass, setoverlayClass] = useState([classes.overlay]);
  const [isoverlayOpen2, setisoverlayOpen2] = useState(false);
  const [overlayClass2, setoverlayClass2] = useState([classes.overlay]);
  const [isoverlayOpen3, setisoverlayOpen3] = useState(false);
  const [overlayClass3, setoverlayClass3] = useState([classes.overlay]);
  const history = useHistory();

  const changeOverLayClass = () => {
    if (isoverlayOpen) {
      if (
        (medName.toString().trim().length > 3,
        medMfdName.toString().trim().length > 3,
        medStock > 0,
        medPrice > 0,
        medDiscount > 0 && medDiscount <= 100)
      ) {
        setisoverlayOpen(false);
        setoverlayClass([classes.overlay]);
        //console.log("valid Data");
        let id = "id" + new Date().getTime();
        //let newPrice = medPrice - (medPrice * medDiscount) / 100;
        handleCartClick(
          id,
          medName,
          medMfdName,
          medPrice,
          medStock,
          medDiscount
        );
      } else {
        console.log("invalid Data");
      }
    } else {
      setoverlayClass([classes.overlay_visible]);
      setisoverlayOpen(true);
    }
  };
  const changeOverLayClass2 = () => {
    if (isoverlayOpen2) {
      if (
        exefName.toString().trim().length > 3 &&
        exelName.toString().trim().length > 3 &&
        exeuserName.toString().trim().length > 3 &&
        exedob.toString().trim().length > 3 &&
        exegender.toString().trim() !== "--select--" &&
        exepassword.toString().trim().length > 6 &&
        exeexperience > 0
      ) {
        setisoverlayOpen2(false);
        setoverlayClass2([classes.overlay]);
        let id = "id" + new Date().getTime();
        handleAddSalesExecutive(
          id,
          exefName,
          exelName,
          exeuserName,
          exedob,
          exegender,
          exeexperience,
          exepassword
        );
      } else {
        console.log("invalid Data" + exedob);
      }
    } else {
      setoverlayClass2([classes.overlay_visible]);
      setisoverlayOpen2(true);
    }
  };

  const AddMedicineOverLay = () => {
    return (
      <div className={overlayClass}>
        <div className={classes.overLayCardWrapper}>
          <h2 className={classes.addmedicinesText}>Add Medicines Here</h2>
          <div className={classes.inputsDivWrapper}>
            <div className={classes.inputOverLayWrapper}>
              <p>Name: </p>
              <input
                onChange={(e) => {
                  let value = e.target.value;
                  medName = value;
                }}
                type="text"
              />
            </div>
            <div className={classes.inputOverLayWrapper}>
              <p>Manufacturer Name: </p>
              <input
                onChange={(e) => (medMfdName = e.target.value)}
                type="text"
              />
            </div>
            <div className={classes.inputOverLayWrapper}>
              <p>Price: </p>
              <input
                onChange={(e) => (medPrice = e.target.value)}
                type="number"
              />
            </div>
            <div className={classes.inputOverLayWrapper}>
              <p>Stock/Quantity: </p>
              <input
                onChange={(e) => (medStock = e.target.value)}
                type="number"
              />
            </div>
            <div className={classes.inputOverLayWrapper}>
              <p>Discount(%): </p>
              <input
                onChange={(e) => (medDiscount = e.target.value)}
                type="number"
              />
            </div>
            <div className={classes.addMedicineWrapper}>
              <button onClick={changeOverLayClass}>Add Medicine</button>
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
    );
  };
  const AddSalesOverLay = () => {
    return (
      <div className={overlayClass2}>
        <div className={classes.overLayCardWrapper}>
          <h2 className={classes.addmedicinesText}>Add Sales Executive Here</h2>
          <div className={classes.inputsDivWrapper}>
            <div className={classes.inputOverLayWrapper}>
              <p>First Name: </p>
              <input
                type="text"
                onChange={(e) => (exefName = e.target.value)}
              />
            </div>
            <div className={classes.inputOverLayWrapper}>
              <p>Last Name: </p>
              <input
                type="text"
                onChange={(e) => (exelName = e.target.value)}
              />
            </div>
            <div className={classes.inputOverLayWrapper}>
              <p>Username: </p>
              <input
                type="text"
                onChange={(e) => (exeuserName = e.target.value)}
              />
            </div>
            <div className={classes.inputOverLayWrapper}>
              <p>DOB: </p>
              <input type="date" onChange={(e) => (exedob = e.target.value)} />
            </div>
            <div className={classes.inputOverLayWrapper}>
              <p>Gender: </p>
              <select
                className={classes.selectOptionsWrapper}
                onChange={(e) => (exegender = e.target.value)}
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
                onChange={(e) => (exeexperience = e.target.value)}
              />
            </div>
            <div className={classes.inputOverLayWrapper}>
              <p>Password: </p>
              <input
                type="password"
                onChange={(e) => (exepassword = e.target.value)}
              />
            </div>
            <div className={classes.addMedicineWrapper}>
              <button onClick={changeOverLayClass2}>Add Sales Executive</button>
            </div>

            <div
              className={classes.closeIconWrapper}
              onClick={() => {
                setisoverlayOpen2(false);
                setoverlayClass2([classes.overlay]);
              }}
            >
              <i class="far fa-window-close"></i>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const changeOverLayClass3 = (
    inputOrderDataRows,
    inputOrderMedCustomerName,
    inputordermedCustomerNum
  ) => {
    if (isoverlayOpen3) {
      if (
        inputOrderDataRows.length > 0 &&
        inputOrderMedCustomerName.toString().trim().length > 3 &&
        inputordermedCustomerNum.toString().trim().length >= 10
      ) {
        let id = "id" + new Date().getTime();
        handleAddOrderData(
          id,
          inputOrderMedCustomerName,
          inputordermedCustomerNum,
          inputOrderDataRows
        );

        setisoverlayOpen3(false);
        setoverlayClass3([classes.overlay]);
        console.log("valid Data");
      } else {
        console.log("Invalid Data");
      }
    } else {
      setoverlayClass3([classes.overlay_visible]);
      setisoverlayOpen3(true);
    }
  };

  const CreateOrderOverlay = () => {
    const [innerName, setinnerName] = useState("");
    const [innerCustomerNum, setinnerCustomerNum] = useState("");
    const [innerOrderRows, setinnerOrderRows] = useState([]);
    let innerorderMedName = "",
      innerordermedQuantity = 0;
    let innertempPrice = 0;
    let medicinePriceNameObj = {};

    const deleteMedicineFromTable = (medName) => {
      let tempArr = innerOrderRows.filter(
        (item) => item.tempMedName != medName
      );
      setinnerOrderRows(tempArr);
    };

    return (
      <div className={overlayClass3}>
        <div className={classes.overLayCardWrapper}>
          <h2>Create Order Here</h2>
          <div className={classes.inputsDivWrapper}>
            <div className={classes.inputOverLayWrapper}>
              <p>Customer Name: </p>
              <input
                type="text"
                value={innerName}
                onChange={(e) => setinnerName(e.target.value)}
              />
            </div>
            <div className={classes.inputOverLayWrapper}>
              <p>Conatct Number: </p>
              <input
                type="number"
                value={innerCustomerNum}
                onChange={(e) => {
                  setinnerCustomerNum(e.target.value);
                }}
              />
            </div>
            <div className={classes.inputOverLayWrapperForMedicine}>
              <div>
                <p>Select Medicine: </p>
                <select
                  onChange={(e) => {
                    innerorderMedName = e.target.value;
                  }}
                  className={classes.selectOptionsWrapper2}
                >
                  <option value="select">--select--</option>
                  {medicineArray &&
                    medicineArray.map((item, pos) => {
                      let { name, price } = item;
                      medicinePriceNameObj[name] = price;
                      //innertempPrice = price;
                      return (
                        <option key={pos} value={name}>
                          {`${name} (₹${price})`}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div>
                <p>Quantity: </p>
                <input
                  type="number"
                  onChange={(e) => (innerordermedQuantity = e.target.value)}
                />
              </div>
            </div>
            <div className={classes.inventoryBtnWrapper2}>
              <button
                onClick={() => {
                  console.log(medicinePriceNameObj);
                  if (
                    innerorderMedName.toString().trim() !== "--select--" &&
                    innerordermedQuantity > 0
                  ) {
                    let tempObj = {
                      tempMedName: innerorderMedName,
                      tempMedQuantity: innerordermedQuantity,
                      tempMedTotalPrice:
                        Number(medicinePriceNameObj[innerorderMedName]) *
                        Number(innerordermedQuantity),
                    };
                    let tempArr = innerOrderRows;
                    tempArr = [...tempArr, tempObj];
                    setinnerOrderRows(tempArr);
                  }
                }}
              >
                Add Row
              </button>
            </div>
            <div className={classes.orderTableWrapper}>
              {innerOrderRows && (
                <table>
                  <thead>
                    <tr>
                      <th>Medicine Name</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {innerOrderRows &&
                      innerOrderRows.map((item, pos) => {
                        const {
                          tempMedName,
                          tempMedQuantity,
                          tempMedTotalPrice,
                        } = item;
                        let totalCost =
                          medicineArray[pos].price * Number(tempMedQuantity);
                        return (
                          <tr key={pos}>
                            <td>{tempMedName}</td>
                            <td>{tempMedQuantity}</td>
                            <td>{tempMedTotalPrice}</td>
                            <td>
                              <button
                                onClick={() => {
                                  deleteMedicineFromTable(tempMedName);
                                }}
                                className={classes.deleteBtn}
                              >
                                delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
            <div className={classes.inventoryBtnWrapper}>
              <button
                onClick={() =>
                  changeOverLayClass3(
                    innerOrderRows,
                    innerName,
                    innerCustomerNum
                  )
                }
              >
                Add Order
              </button>
            </div>
            <div
              className={classes.closeIconWrapper}
              onClick={() => {
                setisoverlayOpen3(false);
                setoverlayClass3([classes.overlay]);
              }}
            >
              <i class="far fa-window-close"></i>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleViewInventory = () => {
    history.push(`/inventory`);
  };
  const handleViewTeam = () => {
    history.push(`/viewteam`);
  };
  const handleViewOrders = () => {
    history.push(`/vieworder`);
  };

  return (
    <div>
      {userType === "admin" ? (
        <div className={classes.HomePageWrapper}>
          <h1>Welcome Store Manager</h1>
          <div className={classes.btnDivWrapper}>
            <div className={classes.btnWrapper}>
              <button onClick={changeOverLayClass}>Add Medicines</button>
            </div>
            <div className={classes.btnWrapper}>
              <button onClick={handleViewInventory}>View/Edit Inventory</button>
            </div>
            <div className={classes.btnWrapper}>
              <button onClick={changeOverLayClass2}>Add Sales Executive</button>
            </div>
            <div className={classes.btnWrapper}>
              <button onClick={handleViewTeam}>View/Edit Team</button>
            </div>
            <div className={classes.btnWrapper}>
              <button onClick={handleViewOrders}>View/Edit Orders</button>
            </div>
          </div>

          <AddMedicineOverLay />
          <AddSalesOverLay />
        </div>
      ) : (
        <div className={classes.HomePageWrapper}>
          <h1>Welcome To Sales Executive Page</h1>
          <div className={classes.inputsDivWrapper}>
            <div className={classes.btnWrapper}>
              <button onClick={changeOverLayClass3}>Create Order</button>
            </div>
            <div className={classes.btnWrapper}>
              <button onClick={handleViewOrders}>View Order</button>
            </div>
          </div>

          <CreateOrderOverlay />
        </div>
      )}
    </div>
  );
}
