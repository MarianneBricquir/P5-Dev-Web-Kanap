/********************************************** Page Panier ***************************************************/

// on récupère le panier depuis la page "Panier"
let listBasketProducts = JSON.parse(localStorage.getItem("basket"));

/* fonction qui permet d'aller chercher les éléments d'un seul produit dans l'API*/
/*Paramètre : id du produit*/
function getOneProduct(idProduct) {
  return fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then((response) =>
      response.json()
        .then((apiBasketProduct => {
          return apiBasketProduct
        })))
};


/*************************************************************************************************************/
/*Fonction d'affichage des produits du local storage*/
async function displayBasketProducts() {
  /* vérifier s'il y a un produit dans le panier ?
     if (listBasketProducts = true){
     console.log(listBasketProducts)
  }*/
  let display = ``;
  for (let basketProduct of listBasketProducts) { // On fait une boucle for sur les produits contenus dans le local storage
    let product = await getOneProduct(basketProduct.id); // on récupère les informations d'un produit avec la fonction getOneProduct
    display += `<article class="cart__item" data-id="${basketProduct.id}" data-color="${basketProduct.color}">
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${basketProduct.color}</p>
          <p>${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basketProduct.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article> `
  }
  document.querySelector("#cart__items").innerHTML = display;
};

// Appel de la fonction pour afficher les produits sur la page Panier
displayBasketProducts();



/*************************************************************************************************************/
/* Afficher le nombre de produits et le prix total */
async function getTotalQuantitytAndPrice() {
  let totalQuantity = 0;
  let totalPrice = 0;
  for (let basketProduct of listBasketProducts) {
    let product = await getOneProduct(basketProduct.id);
    /*console.log(product);*/
    totalQuantity = totalQuantity + basketProduct.quantity;
    totalPrice += product.price * basketProduct.quantity;
  }
  document.querySelector("#totalQuantity").innerHTML = totalQuantity;
  document.querySelector("#totalPrice").innerHTML = totalPrice
};

// appel de la fonction pour afficher le prix total
getTotalQuantitytAndPrice();


/*************************************************************************************************************/
/*Modifier la quantité depuis la page panier dans le local storage*/
/*addEventListener de type change*/
function modifyText() {
  /*for (let basketProduct of listBasketProducts) {
    if(basketProduct.quantity )
  }*/
}


function getInputQuantity() {
  let inputQuantity = document.getElementsByClassName("itemQuantity");
  console.log(inputQuantity); // type : HTMLCollection
  /*for (let value of inputValueQuantity) {

  }*/
  
};

getInputQuantity()



/*************************************************************************************************************/
/*Supprimer un produit de la page panier et du local storage*/
function removeProduct(basket) {

}

/* https://www.javascripttutorial.net/javascript-dom/javascript-change-event/
let select = document.querySelector('#lang');
select.addEventListener('change', function () {
            result.textContent = this.value;});*/



