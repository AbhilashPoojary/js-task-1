"use strict";

//selectors signin
const signName = document.getElementById("sign--name");
const signEmail = document.getElementById("sign--email");
const signPsw = document.getElementById("sign--pass");
const signCpsw = document.getElementById("sign--confirm");
const signupBtn = document.querySelector(".signup");
const signupForm = document.querySelector(".signup-form");

//selectors login
const loginEmail = document.getElementById("login--email");
const loginPsw = document.getElementById("login--psw");
const loginBtn = document.querySelector(".login");
const loginform = document.querySelector(".login-form");

//selector dashboard
const fullName = document.getElementById("task-name");
const message = document.getElementById("task-msg");
const checkBox = document.getElementById("flexCheckDefault");
//helper functions
function checkFields(ele) {
  return ele.value !== "";
}
//login
if (loginform) {
  loginform.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!checkFields(loginEmail) || !checkFields(loginPsw)) {
      alert("all fields required");
      return;
    }
    const usersData = JSON.parse(localStorage.getItem("users") || "[]");
    const loginData = usersData.filter(
      (item) => item.email === loginEmail.value
    );
    if (loginData.length === 0) {
      alert("user not found");
      return;
    }
    const { password } = loginData[0];
    if (password !== loginPsw.value) {
      alert("incorrect password");
      return;
    }
    localStorage.setItem("active-user", JSON.stringify(...loginData));
    window.location.href = "dashbord.html";
  });
}

//signup form submit
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      !checkFields(signName) ||
      !checkFields(signEmail) ||
      !checkFields(signPsw) ||
      !checkFields(signCpsw)
    ) {
      alert("all fields required");
      return;
    }
    if (signPsw.value !== signCpsw.value) {
      alert("Password should match with confirm password");
      return;
    }
    const usersData = JSON.parse(localStorage.getItem("users") || "[]");
    const loginData = usersData.filter(
      (item) => item.email === signEmail.value
    );
    if (loginData.length > 0) {
      alert("Email already exists");
      return;
    }
    const userDetail = {
      id: self.crypto.randomUUID(),
      name: signName.value,
      email: signEmail.value,
      password: signPsw.value,
      date: new Date(),
    };
    if (!localStorage.users) {
      localStorage.setItem("users", JSON.stringify([userDetail]));
      window.location.href = "login.html";
      return;
    }
    const store = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify([...store, userDetail]));
    window.location.href = "login.html";
  });
}

//dashboard
if (fullName) {
  fullName.addEventListener("change", function (e) {
    document.querySelector(".card-title").textContent = e.target.value;
  });
}
if (message)
  message.addEventListener("change", function (e) {
    document.querySelector(".custom-card-text").textContent =
      e.target.value + " ♡";
  });

if (checkBox)
  checkBox.addEventListener("click", function (e) {
    if (e.target.id === "flexCheckDefault") {
      document.querySelector(".birthday-card").classList.toggle("d-none");
    }
  });

//item list and bill
const billContainer = document.querySelector(".bill-items");
const billItems = document.querySelector(".bill-card");

let billContent = "";
items.forEach((list) => {
  billContent += `
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="${list.id}" data-amount="${list.price}">
        <label class="form-check-label" for="${list.id}">
          ${list.title}
        </label>
      </div>`;
});
if (billContainer) {
  billContainer.innerHTML = billContent;
  let billChecked = [];
  billContainer.addEventListener("click", function (e) {
    if (e.target?.checked === true) {
      let billCheckedContent = "";
      let obj = {
        name: e.target
          .closest(".form-check")
          .querySelector(".form-check-label")
          .textContent.trim(),
        amount: e.target.dataset.amount,
        id: e.target.id,
      };
      billChecked.push(obj);
      for (let i = 0; i < billChecked.length; i++) {
        billCheckedContent += `<div>
        <span>${billChecked[i].name}</span> : <span>${billChecked[i].amount}</span>
    </div>`;
      }
      billItems.innerHTML = billCheckedContent;
    }
    if (e.target.checked === false) {
      let billCheckedContent = "";
      let obj = {
        name: e.target
          .closest(".form-check")
          .querySelector(".form-check-label")
          .textContent.trim(),
        amount: e.target.dataset.amount,
        id: e.target.id,
      };
      const removeIndex = billChecked.findIndex((x) => x.id === obj.id);
      billChecked.splice(removeIndex, 1);
      for (let i = 0; i < billChecked.length; i++) {
        billCheckedContent += `<div>
        <span>${billChecked[i].name}</span> : <span>${billChecked[i].amount}</span>
    </div>`;
      }
      billItems.innerHTML = billCheckedContent;
    }

    const totalAnount = billChecked.reduce(
      (acc, { amount }) => Number(acc) + Number(amount),
      0
    );
    document.querySelector(".total").innerHTML = `Total bill $ ${totalAnount}`;
    /*  billItems.innerHTML = billCheckedContent; */
  });
}

//

const checkProduct = document.querySelector(".cart-section");
if (checkProduct) {
  //cart functionality
  const productContainer = document.querySelector(".products");
  const productCart = document.querySelector(".cart");
  let productHtml = "";

  items.forEach((item) => {
    if (item.id < 9) {
      productHtml += `
        <div class="card product-card">
        <img src="${item.thumbnail}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.description.substring(0, 20)}</p>
          <span class="prod-amount">$ ${item.price}</span>
          <span class="btn btn-primary btn-sm ms-2 prod-btn float-end" id="${
            item.id
          }">Add to cart</span>
        </div>
      </div>
        `;
    }
  });
  productContainer.innerHTML = productHtml;

  let cartArr = [];

  const createItems = () => {
    let cartHtml = "";
    cartArr.forEach((item) => {
      console.log(item);
      cartHtml += `<div class="cart-row">
                   <div class="cart-item cart-column">
                    <img src="${item.img}" class="cart-item-image"/>
                    <span class="cart-item-title">${item.name}</span>
                   </div>
                   <span class="cart-price cart-column">${item.amount}</span>
                   <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value=${item.quantity} id="${item.id}"/>
            <button class="btn btn-danger" type="button" id="${item.id}">REMOVE</button>
        </div>
          </div>`;
    });
    productCart.innerHTML = cartHtml;
  };
  function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName("cart-items")[0];
    let cartRows = cartItemContainer.getElementsByClassName("cart-row");
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i];
      let priceElement = cartRow.getElementsByClassName("cart-price")[0];
      let quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];
      let price = parseFloat(priceElement.innerText.replace("$", ""));
      let quantity = quantityElement.value;
      total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText =
      "$" + total;
  }

  const prodBtn = document.querySelectorAll(".product-card");
  prodBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (e.target.classList.contains("prod-btn")) {
        let cartItem = {
          name: e.target.closest(".card").querySelector(".card-title")
            .textContent,
          amount: e.target.closest(".card").querySelector(".prod-amount")
            .textContent,
          id: e.target.id,
          img: e.target.closest(".card").querySelector(".card-img-top").src,
          quantity: 1,
        };
        const index = cartArr.findIndex((x) => x.id == cartItem.id);
        index === -1
          ? cartArr.push(cartItem)
          : alert("already this item exists in cart");
        createItems();
        updateCartTotal();
      }
    });
  });

  updateCartTotal();

  function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  }
  function removeArrayItem(id) {
    cartArr = cartArr.filter((item) => item.id != id);
  }

  function hasClass(elem, className) {
    return elem.className.split(" ").indexOf(className) > -1;
  }
  function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
    cartArr.forEach((item) =>
      item.id == input.id ? (item["quantity"] = input.value) : item
    );
  }
  document.addEventListener(
    "click",
    function (e) {
      if (hasClass(e.target, "btn-danger")) {
        removeCartItem(e);
        removeArrayItem(e.target.id);
      }
      if (hasClass(e.target, "cart-quantity-input")) {
        quantityChanged(e);
      }
    },
    false
  );
}

//select functionality
{
  /* <option value="1">Animals</option>
<option value="2">Birds</option>
<option value="3">Movies</option>
<option value="4">colors</option> */
}
const dashboardSection = document.querySelector(".dashbord-section");
if (dashboardSection) {
  let selectData = {
    animals: ["monkey", "donkey", "pig", "dog", "cat"],
    birds: ["crow", "parrot", "Angel", "Chickie", "Feathers", "Pipsqueak"],
    movies: ["Naseeb", "Teesri Kasam", "Zubeidaa", "Udaan", "Black", "Thappad"],
    colors: ["red", "black", "yellow", "blue", "green"],
  };
  const selectParent = document.querySelector(".parent-select");
  const selectChild = document.querySelector(".child-select");
  selectParent.addEventListener("change", function (e) {
    if (e.target.value == 1) {
      let options = "<option>select</option>";
      selectData.animals.forEach((item) => {
        options += `<option>${item}</option>`;
      });
      selectChild.innerHTML = options;
    }
    if (e.target.value == 2) {
      let options = "<option>select</option>";
      selectData.birds.forEach((item) => {
        options += `<option>${item}</option>`;
      });
      selectChild.innerHTML = options;
    }
    if (e.target.value == 3) {
      let options = "<option>select</option>";
      selectData.movies.forEach((item) => {
        options += `<option>${item}</option>`;
      });
      selectChild.innerHTML = options;
    }
    if (e.target.value == 4) {
      let options = "<option>select</option>";
      selectData.colors.forEach((item) => {
        options += `<option>${item}</option>`;
      });
      selectChild.innerHTML = options;
    }
    selectChild.focus();
  });
}

if (localStorage.getItem("active-user")) {
  const store = JSON.parse(localStorage.getItem("active-user") || "[]");
  console.log(store);
  const navName = document.querySelector(".navbar-brand");
  const footName = document.querySelector(".footer-brand");
  navName.textContent = footName.textContent = store.name.capitalise();
}
