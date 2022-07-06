// Affichage du tableau récapitulatif des achats dans la page panier
// on récupère le panier depuis la page "Panier"
let listBasketProducts = JSON.parse(localStorage.getItem("basket"));
console.log(listBasketProducts);

/*
let listAllProducts = function listAllProducts (apiUrl){
  return fetch(apiUrl)
      .then( (response) => {
          return response.json();
      })
      .then((products) => {
          console.log(products);
          return products;
      })
};

console.log(listAllProducts)
*/

function displayBasketProducts() {
  if (listBasketProducts.lenght == 0){
    document.querySelector("#cart__items").innerHTML = `<article class="cart__item>Votre panier est vide</artcile>`
  }else {
    let display = ``;
    for (product of listBasketProducts) {
      display += `<article class="cart__item" data-id="{product.id}" data-color="{product.color}">
      <div class="cart__item__img">
        <img src="../images/product01.jpg" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.id}</h2>
          <p>${product.color}</p>
          <p>42,00 €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article> `
    }
    document.querySelector("#cart__items").innerHTML = display
  }
}

displayBasketProducts();


/*
<!--  -->
*/