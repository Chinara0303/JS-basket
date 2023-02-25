'use strict';
let cardBtns = document.querySelectorAll("#products a");


let products = [];
if (localStorage.getItem("basket") != null) {
    products = JSON.parse(localStorage.getItem("basket"));
}

cardBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        let prodImg = btn.parentNode.parentNode.firstElementChild.getAttribute("src");
        let prodName = btn.parentNode.parentNode.children[1].firstElementChild.innerText;
        let prodDesc = btn.parentNode.parentNode.children[1].lastElementChild.innerText;
        let prodPrice = btn.parentNode.parentNode.children[2].firstElementChild.innerText;
        let prodId = parseInt(btn.parentNode.parentNode.getAttribute("data-id"))
        let existProduct = products.find(p => p.id == prodId);

        if (existProduct != undefined) {
            existProduct.count += 1;
        }
        else {
            products.push({
                id: prodId,
                img: prodImg,
                name: prodName,
                desc: prodDesc,
                price: prodPrice,
                count: 1
            })
        }
        localStorage.setItem("basket", JSON.stringify(products));
        getProductCount(products);
    })
});

function getProductCount(arr) {
    document.querySelector(".shopping-cart span").innerText = arr.length;
}
getProductCount(products);