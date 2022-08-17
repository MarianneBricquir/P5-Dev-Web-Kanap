// Affichage du tableau récapitulatif des achats dans la page panier
// on récupère le panier depuis la page "Panier"
/*fonction avec 
argument : le produit à afficher dans le tableau

créer une fonction qui permet de récupérer la liste des produits en fonction de l'id
function getProductPanier()
parcourir le tableau du localStorage, récupérer l'id appel la fonction fetch avec l'id
récupérer cette information dans un tableau
appel de la fonction displayBasketPorducts à la fin de cette première fct
*/

let listBasketProducts = JSON.parse(localStorage.getItem("basket"));
/*console.log(listBasketProducts);*/

/*Fonction d'affichage*/
function displayBasketProducts(tableProducts) {
  /* vérifier s'il y a un produit dans le panier ?
     if (listBasketProducts = true){
     console.log(listBasketProducts)
  }*/
  let display = ``;
  for (product of tableProducts) {
      display += `<article class="cart__item" data-id="${product.productDetail._id}" data-color="${product.choosedColor}">
      <div class="cart__item__img">
        <img src="${product.productDetail.imageUrl}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.productDetail.name}</h2>
          <p>${product.choosedColor}</p>
          <p>${product.productDetail.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.choosedQuantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article> `
    }
  document.querySelector("#cart__items").innerHTML = display ;
  /*document.querySelector("#totalQuantity").innerHTML = getNumberProduct();
  document.querySelector("#totalQuantity").innerHTML = getTotalPrice();*/
};

/*Initialisation de tableProducts*/
let tableProducts = [];

/*Fonction pour récupérer les infos depuis l'API*/
async function getProductsBasket() {
  for (basketProduct of listBasketProducts) {
    /*let productLocalStorage = basketProduct*/
    await fetch(`http://localhost:3000/api/products/${basketProduct.id}`)
      .then((response) =>
        response.json()
          .then((apiBasketProduct => {
            /*console.log(productLocalStorage)*/
           /*console.log(apiBasketProduct);*/
            tableProducts.push({ choosedColor: basketProduct.color, choosedQuantity: basketProduct.quantity, productDetail: apiBasketProduct });
          })))
          displayBasketProducts(tableProducts)
  }
};

getProductsBasket();



/* Afficher le nombre de produit et le prix total */
console.log(listBasketProducts);
console.log(tableProducts);


function getNumberProducts(basket) {
  let canapesTotalQuantity = [] ;
  basket.forEach((canape) => {
    canapesTotalQuantity.push(canape.quantity);
  });
  document.querySelector("#totalQuantity").innerHTML = `${eval(canapesTotalQuantity.join("+"))}`; // methode eval js qui permet d'évaluer la chaîne de caractère et méthode join
};

/*Test 2 à partir des objets du tableau table product - servira pour récupérer le prix total aussi*/
  let canapesTotalQuantity2 = [] ;
  for (object of tableProducts) {
  };
  console.log(canapesTotalQuantity2)


  /*
  document.querySelector("#totalQuantity").innerHTML = `${eval(canapesTotalQuantity.join("+"))}`; // methode eval js qui permet d'évaluer la chaîne de caractère et méthode join
*/

/**/
function getPriceProducts(basket) {
  basket.forEach((canape) => {
    canapesTotalQuantity.push(canape.price);
  });
  document.querySelector("#totalPrice").innerHTML = `${eval(canapesTotalQuantity.join("+"))}`; // methode eval js qui permet d'évaluer la chaîne de caractère et méthode join
};

getNumberProducts(listBasketProducts) 








/*Propriété dataset*/
/*Modifier la quantité depuis la page panier dans le local storage*/
/*addEventListener de type change*/


/*Questions à Terrence : 
- créer la fonction changeQuantity avec addEventListener événement change
mais la difficulté : ce changement s'oppère dans le DOM par l'utilisateur : comment récupérer cette quantité inscrite dans la div de class '.itemQuantity' ?
puis changer le local storage en conséquence ?
push.newQuantity 


Au clic sur le bouton supprimer, enlever l'article du panier et du localStorage
- créer une fonction removeFromBasket 
removeFromBasket(product) {
        this.basket = this.basket.filter(p => p.id != product.id || p.color != product.color)
        this.save();
    }
avec une écoute sur le bouton de la class deleteItem
*/


/*
let myProduct = btnAddToBasket.addEventListener("click", () => {
  product = 
      {
          "id":currentId,
          "color":document.querySelector("#colors").value,
          "quantity":parseInt(document.querySelector("#quantity").value)
      }
  ;*/

/* https://www.javascripttutorial.net/javascript-dom/javascript-change-event/
let select = document.querySelector('#lang');
select.addEventListener('change', function () {
            result.textContent = this.value;});*/








