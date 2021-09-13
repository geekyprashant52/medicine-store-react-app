import React, { useState } from "react";
import classes from "./AdminInventory.module.css";
import {
  handleCartClick,
  deletDataFromStorage,
} from "../../Handle Storage/ManageLocalStorage";

export default function AdminInventory() {
  let medicineInventoryName = "medicineData";
  let medicineList = window.localStorage.getItem(medicineInventoryName);
  let medicineArray = [];
  if (medicineList == null || medicineList === "") {
    // No data Found
  } else {
    medicineList = JSON.parse(medicineList);
    medicineList.map((item) => {
      medicineArray.push(item);
    });
  }

  //all useStates
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

  const updateMedData = (discount, id, manufactureName, name, price, stock) => {
    if (
      name.toString().trim().length > 3 &&
      manufactureName.toString().trim().length > 3 &&
      price > 0 &&
      stock > 0 &&
      discount > 0 &&
      discount <= 100
    ) {
      handleCartClick(id, name, manufactureName, price, stock, discount);
      changeOverLayClass();
    } else {
      console.log("invalid Data");
    }
  };

  const UpdateMedOverlay = (props) => {
    const { discount, id, manufactureName, name, price, stock } = props.dataObj;
    const [innerMedName, setinnerMedName] = useState(name);
    const [innerMedmfdname, setInnerMedmfdname] = useState(manufactureName);
    const [innerMedPrice, setinnerMedPrice] = useState(price);
    const [innerMedDiscount, setinnerMedDiscount] = useState(discount);
    const [innerMedStock, setinnerMedStock] = useState(stock);
    return (
      <div>
        <div className={overlayClass}>
          <div className={classes.overLayCardWrapper}>
            <h2>Update Medicines Here</h2>
            <div className={classes.inputDivWrapper}>
              <div className={classes.inputOverLayWrapper}>
                <p>Name: </p>
                <input
                  type="text"
                  value={innerMedName}
                  onChange={(e) => setinnerMedName(e.target.value)}
                />
              </div>
              <div className={classes.inputOverLayWrapper}>
                <p>Manufacturer Name: </p>
                <input
                  type="text"
                  value={innerMedmfdname}
                  onChange={(e) => setInnerMedmfdname(e.target.value)}
                />
              </div>
              <div className={classes.inputOverLayWrapper}>
                <p>Price: </p>
                <input
                  type="number"
                  value={innerMedPrice}
                  onChange={(e) => setinnerMedPrice(e.target.value)}
                />
              </div>
              <div className={classes.inputOverLayWrapper}>
                <p>Stock/Quantity: </p>
                <input
                  type="number"
                  value={innerMedStock}
                  onChange={(e) => setinnerMedStock(e.target.value)}
                />
              </div>
              <div className={classes.inputOverLayWrapper}>
                <p>Discount(%): </p>
                <input
                  type="number"
                  value={innerMedDiscount}
                  onChange={(e) => setinnerMedDiscount(e.target.value)}
                />
              </div>
              <div className={classes.inventoryBtnWrapper}>
                <button
                  onClick={() =>
                    updateMedData(
                      innerMedDiscount,
                      id,
                      innerMedmfdname,
                      innerMedName,
                      innerMedPrice,
                      innerMedStock
                    )
                  }
                >
                  Update Medicine
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
    <div className={classes.AdminInventoryWrapper}>
      {medicineArray.length > 0 ? (
        medicineArray.map((item, pos) => {
          const { discount, id, manufactureName, name, price, stock } = item;
          return (
            <div key={pos} className={classes.AdminInventoryCard}>
              <h2>{name}</h2>
              <h3>
                Mfd: <span>{manufactureName}</span>{" "}
              </h3>
              <h3>
                Price: <span>₹{price}</span>{" "}
              </h3>
              <h3>
                Discount: <span>{discount}%</span>{" "}
              </h3>
              <h3>
                Available Stock: <span>{stock}</span>{" "}
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
                    //console.log("data Deleted" + isdataDeleted);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <h1>No data Found</h1>
        </div>
      )}
      <UpdateMedOverlay dataObj={tempDataObj && tempDataObj} />
    </div>
  );
}
