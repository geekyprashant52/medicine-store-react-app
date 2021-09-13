import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./ViewOrder.module.css";
import {
  handleAddOrderData,
  deletDataFromStorage,
} from "../../Handle Storage/ManageCreateOrder";

// export default function ViewOrder() {
//   let viewOrderName = "medicineOrderData";
//   let orderDataList = window.localStorage.getItem(viewOrderName);
//   let orderDataArray = [];
//   if (orderDataList == null || orderDataList === "") {
//     // No data Found
//   } else {
//     orderDataList = JSON.parse(orderDataList);
//     orderDataList.map((item) => {
//       orderDataArray.push(item);
//     });
//   }
//   return (
//     <div>
//       <h1>View Orders</h1>
//       {orderDataArray.length > 0 ? (
//         <div>
//           {orderDataArray.map((item) => {
//             const { customeName, customerContact, id, orderArr } = item;
//             let finalPrice = 0;
//             return (
//               <div className={classes.viewOrderCard}>
//                 <h3>Customer Name: {customeName}</h3>
//                 <h3>Conatct Num: {customerContact}</h3>
//                 <h3>Orders</h3>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Medicine Name</th>
//                       <th>Quantity</th>
//                       <th>Total Price</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {orderArr &&
//                       orderArr.map((item, pos) => {
//                         const {
//                           tempMedName,
//                           tempMedQuantity,
//                           tempMedTotalPrice,
//                         } = item;
//                         // let totalCost =
//                         //   medicineArray[pos].price * Number(tempMedQuantity);
//                         finalPrice += Number(tempMedTotalPrice);
//                         return (
//                           <tr key={pos}>
//                             <td>{tempMedName}</td>
//                             <td>{tempMedQuantity}x</td>
//                             <td>{tempMedTotalPrice}</td>
//                           </tr>
//                         );
//                       })}
//                   </tbody>
//                 </table>
//                 <h3>Final Price: {finalPrice}</h3>
//                 <div>
//                   <button>edit</button>
//                   <button>delete</button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div>
//           <h1>No Data Found</h1>
//         </div>
//       )}
//     </div>
//   );
// }

export const ViewOrder = (props) => {
  const { userType } = props;
  let viewOrderName = "medicineOrderData";
  let orderDataList = window.localStorage.getItem(viewOrderName);
  let orderDataArray = [];
  if (orderDataList == null || orderDataList === "") {
    // No data Found
  } else {
    orderDataList = JSON.parse(orderDataList);
    orderDataList.map((item) => {
      orderDataArray.push(item);
    });
  }

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

  //update order
  const updateOrderData = (
    customeNamein,
    customerContactin,
    idin,
    orderArrin
  ) => {
    if (
      customeNamein.toString().trim().length > 3 &&
      customerContactin.toString().trim().length >= 10 &&
      orderArrin.length > 0
    ) {
      handleAddOrderData(idin, customeNamein, customerContactin, orderArrin);
      setisoverlayOpen(false);
      setoverlayClass([classes.overlay]);
    } else {
      console.log("Invalid Data");
    }
  };
  //overLay
  const CreateOrderOverlay = (props) => {
    const { customeName, customerContact, id, orderArr } = props.dataObj;
    const [innerName, setinnerName] = useState(customeName);
    const [innerCustomerNum, setinnerCustomerNum] = useState(customerContact);
    const [innerOrderRows, setinnerOrderRows] = useState(orderArr);
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
      <div className={overlayClass}>
        <div className={classes.overLayCardWrapper}>
          <h2>Update Order Here</h2>
          <div className={classes.inputDivWrapper}>
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
            <p className={classes.selectMessage}>
              *please select medicine & its quantity
            </p>
            <div className={classes.inputOverLayWrapperForMedicine}>
              <div>
                <p>Select Medicine: </p>
                <select
                  onChange={(e) => {
                    innerorderMedName = e.target.value;
                  }}
                  className={classes.selectOptionsWrapper}
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
            <div className={classes.inventoryBtnWrapper}>
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
                        return (
                          <tr key={pos}>
                            <td>{tempMedName}</td>
                            <td>{tempMedQuantity}</td>
                            <td>{tempMedTotalPrice}</td>
                            <td>
                              <button
                                className={classes.deleteBtn}
                                onClick={() => {
                                  deleteMedicineFromTable(tempMedName);
                                }}
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
                onClick={() => {
                  console.log("Update Clicked");
                  updateOrderData(
                    innerName,
                    innerCustomerNum,
                    id,
                    innerOrderRows
                  );
                }}
              >
                Update Order
              </button>

              <div
                className={classes.closeIconWrapper}
                onClick={() => {
                  changeOverLayClass();
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
    <div className={classes.ViewOrdersWrapper}>
      <h1 className={classes.viewOrderText}>View Orders for</h1>
      <h1 className={classes.viewOrderText}>{userType}</h1>
      {orderDataArray.length > 0 ? (
        <div className={classes.newViewOrdersWrapper}>
          {orderDataArray.map((item) => {
            const { customeName, customerContact, id, orderArr } = item;
            let finalPrice = 0;
            return (
              <div className={classes.viewOrderCard}>
                <h3>
                  Customer Name:{" "}
                  <span>
                    {" "}
                    <h2> {customeName}</h2>
                  </span>{" "}
                </h3>
                <h3>
                  Conatct Num: <span> {customerContact}</span>
                </h3>
                <h3>Orders</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Medicine Name</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderArr &&
                      orderArr.map((item, pos) => {
                        const {
                          tempMedName,
                          tempMedQuantity,
                          tempMedTotalPrice,
                        } = item;
                        // let totalCost =
                        //   medicineArray[pos].price * Number(tempMedQuantity);
                        finalPrice += Number(tempMedTotalPrice);
                        return (
                          <tr key={pos}>
                            <td>{tempMedName}</td>
                            <td>{tempMedQuantity}x</td>
                            <td>{tempMedTotalPrice}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <h3 className={classes.finalPriceWrapper}>
                  Final Price: <span>{finalPrice}</span>{" "}
                </h3>
                {userType === "admin" && (
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
                )}
              </div>
            );
          })}
          <CreateOrderOverlay dataObj={tempDataObj} />
        </div>
      ) : (
        <div>
          <h1>No Data Found</h1>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userType: state.user,
});

export default connect(mapStateToProps, null)(ViewOrder);
