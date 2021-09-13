const itemName = "medicineData";
let cartCount = 0;
const handleCartClick = (id, name, manufactureName, price, stock, discount) => {
  let productArr = [];
  let productObj = {
    id: id,
    name: name,
    manufactureName: manufactureName,
    stock: stock,
    price: price,
    discount: discount,
    count: 1,
  };
  let productList = window.localStorage.getItem(itemName);
  if (productList === null || productList === "") {
    productArr.push(productObj);
    window.localStorage.setItem(itemName, JSON.stringify(productArr));
  } else {
    //console.log(productList);
    addDataToStorage(productObj);
    let dataList = JSON.parse(window.localStorage.getItem(itemName));
    let count = 0;
    dataList.map((item) => {
      count += item.count;
    });
    cartCount = count;
  }
};

const addDataToStorage = (obj) => {
  //test code
  let isMatched = false; //initialy set it to false
  let productList = JSON.parse(window.localStorage.getItem(itemName));

  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id === obj.id) {
      productList[i] = obj;
      window.localStorage.setItem(itemName, JSON.stringify(productList));
      isMatched = true;
      break;
    }
  }

  if (!isMatched) {
    //if id is not matched then we are adding it to storage
    productList.push(obj);
    window.localStorage.setItem(itemName, JSON.stringify(productList));
    //console.log("Id not Matched!");
  }
};

const deletDataFromStorage = (id) => {
  let productList = JSON.parse(window.localStorage.getItem(itemName));
  let newList = productList.filter((item) => item.id != id);
  window.localStorage.setItem(itemName, JSON.stringify(newList));
  //console.log(productList[0].id === id);
};

export { handleCartClick, cartCount, deletDataFromStorage };
