"use strict";

let table = document.querySelector("table")
let tableBody = document.querySelector("tbody");
let alertInfo = document.querySelector(".alert-info");
let clearBtn = document.querySelector(".clear-cart");
let products = JSON.parse(localStorage.getItem("basket"));

if (products != null) {
    table.classList.remove("d-none");
    alertInfo.classList.add("d-none");
    for (const product of products) {
        //add products to table
        tableBody.innerHTML +=
            `
        <tr class="item">
            <td class="d-none">${product.id}</td>
            <td>
                <div class="img"><img src="${product.img}" alt=""></div>
            </td>
            <td>${product.name}</td>
            <td class="w-50">${product.desc}</td>
            <td>${product.price} </td>
            <td><div class="count"><span class="reduce">-</span><span class="quantity">${product.count}</span><span class="increase">+</span></div></td>
            <td><i class="fa-solid fa-trash-can text-danger del"></i></td>
        </tr>
        `
        //delete product
        delProducts(document.querySelectorAll(".del"));
        //total price
        totalPrice(products);
        //increase decrease count
        reduceCount(document.querySelectorAll(".reduce"))
        increaseCount(document.querySelectorAll(".increase"));
    }
}
else {
    table.classList.add("d-none");
    alertInfo.classList.remove("d-none");
    clearBtn.classList.add("d-none")
}
//get count
function getProductCount(arr) {
    if (arr != null) {
        document.querySelector(".shopping-cart span").innerText = arr.length;
    }
}
getProductCount(products);
//delete products
function delProducts(arr) {
    for (const item of arr) {
        item.addEventListener("click", function () {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id == item.parentNode.parentNode.firstElementChild.innerText) {
                    products.splice(i, 1);
                    localStorage.setItem("basket", JSON.stringify(products));
                    window.location.reload();
                    if (products.length == 0) {
                        localStorage.clear();
                    }
                }
            }
        })
    }
}
//clear cart 
function clearCart() {
    clearBtn.onclick = () => {
        localStorage.clear();
        window.location.reload();
    }
}
//total price
function totalPrice(products){
    let totalPrice = 0;
    let total = document.querySelector(".total span");
    for (let i = 0; i < products.length; i++) {
        totalPrice += parseInt(products[i].price) * parseInt(products[i].count);
        total.innerText = `${totalPrice} ₼`;
    }
}
//decrease count
function reduceCount(arr){
    arr.forEach(btn => {
        btn.addEventListener("click", function () {
            let quantity = btn.nextElementSibling;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id == btn.parentNode.parentNode.parentNode.firstElementChild.innerText) {
                    if (quantity.innerText == 0 && products[i].count == 0) {
                        return;
                    }
                    quantity.innerText--;
                    products[i].count--;
                    totalPrice(products);
                    localStorage.setItem("basket", JSON.stringify(products));
                }
            }
        })
    });
}
//increase count
function increaseCount(arr){
    arr.forEach(btn => {
        btn.addEventListener("click", function () {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id == this.parentNode.parentNode.parentNode.firstElementChild.innerText) {
                    btn.previousElementSibling.innerText++;
                    products[i].count++;
                    totalPrice(products);
                    localStorage.setItem("basket", JSON.stringify(products));
                }
            }

        })
    });
}