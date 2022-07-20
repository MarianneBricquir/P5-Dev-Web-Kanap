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
console.log(listBasketProducts);

/*Fonction d'affichage*/
function displayBasketProducts(tableProducts) {
  /*console.log("Salut")
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

let basket = listBasketProducts ;
getNumberProduct(); 


/*Propriété dataset*/
/*Modifier la quantité depuis la page panier dans le local storage*/



/*Au clic sur le bouton supprimer, enlever l'articile du panier et du localStorage*/







