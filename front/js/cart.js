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


/* function qui permet d'aller chercher les éléments d'un seul produit*/
function getOneProduct (idProduct) {
  return fetch(`http://localhost:3000/api/products/${idProduct}`)
      .then((response) =>
        response.json()
          .then((apiBasketProduct => {
            return apiBasketProduct
          })))
};

/*Fonction d'affichage*/
async function displayBasketProducts() {
  /* vérifier s'il y a un produit dans le panier ?
     if (listBasketProducts = true){
     console.log(listBasketProducts)
  }*/
  let display = ``;
  console.log(listBasketProducts);
  for (basketProduct of listBasketProducts) {
    let product = await getOneProduct(basketProduct.id) ;
    /*console.log(product.choosedQuantity);*/
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
  document.querySelector("#cart__items").innerHTML = display ;
  /*document.querySelector("#totalQuantity").innerHTML = getNumberProduct();
  document.querySelector("#totalQuantity").innerHTML = getTotalPrice();*/
};


displayBasketProducts();

/*********************************************************************************************************************************************************************** */
// Session mentorat du 19/08

async function getTotalQuantitytAndPrice () {
  let totalQuantity = 0;
  let totalPrice = 0;
  for (basketProduct of listBasketProducts) {
    /*let product = await getOneProduct(basketProduct.id) ;*/
    /*console.log(product);*/
    totalQuantity = totalQuantity + basketProduct.quantity ;
    /*totalPrice += product.price * basketProduct.quantity;*/
    console.log(basketProduct);
    console.log(basketProduct.quantity);
  }
  document.querySelector("#totalQuantity").innerHTML = totalQuantity;
  /*document.querySelector("#totalPrice").innerHTML = totalPrice*/
};

// appel de la fonction pour afficher le prix total
getTotalQuantitytAndPrice();



/*********************************************************************************************************************************************************************** */

/* Afficher le nombre de produit et le prix total */
/*
let productsPrices = listBasketProducts.map((Object.quantity) => {
  return listBasketProducts.quantity
})
console.log(productsPrices)
*/

/*
function getNumberProducts(basket) {
  let canapesTotalQuantity = [] ;
  for (canape of basket) {
    canapesTotalQuantity.push(canape.quantity);
  };
  document.querySelector("#totalQuantity").innerHTML = `${eval(canapesTotalQuantity.join("+"))}`; // methode eval js qui permet d'évaluer la chaîne de caractère et méthode join
};

getNumberProducts(listBasketProducts);
*/
/*
Const variable = new classe()
Variable.getNumberProduct() 
*/

/*Test 2 à partir des objets du tableau table product - servira pour récupérer le prix total aussi*/
/*
function getNumberProducts(tableProducts) {
  let canapesTotalQuantity = [] ;
  for (canape of tableProducts) {
    canapesTotalQuantity.push(canape.choosedQuantity);
  };
  document.querySelector("#totalQuantity").innerHTML = `${eval(canapesTotalQuantity.join("+"))}`; // methode eval js qui permet d'évaluer la chaîne de caractère et méthode join
};

getNumberProducts(tableProducts)
*/

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
console.log(listBasketProducts);
console.log(tableProducts);

listBasketProducts.forEach(object =>{
  console.log(object);
});
*/

/*Pourquoi ce truc ci-dessous ne marche pas ???*/
/*console.log(tableProducts);
tableProducts.forEach(object =>{
  console.log(object);
});
*/


/*
function getPriceProducts(basket) {
  let canapesTotalPrice = [] ;
  for (canape of basket) {
    canapesTotalPrice .push(canape.price);
  };
//};


/*Modifier la quantité depuis la page panier dans le local storage*/
/*addEventListener de type change*/
/*
let inputQuantity = document.getElementsByClassName("itemQuantity");
console.log(inputQuantity); // type : HTMLCollection
*/
/*Propriété dataset : data-value ?*/

/*
changedQuantity.addEventListener('change', function(){
  modifier le DOM avec le chiffre rentré par l'utilisateur
  Pousser ce chiffre dans le local storage
});
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



