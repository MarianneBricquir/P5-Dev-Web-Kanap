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

/*
function displayBasketProducts(tableProducts) {
  let display = ``;
  for (product of tableProducts) {
      display += `<article class="cart__item" data-id="${basketProduct.id}" data-color="${basketProduct.color}">
      <div class="cart__item__img">
        <img src="${tableProducts.productdetail.imageUrl}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${basketProduct.id}</h2>
          <p>${tableProducts.color}</p>
          <p>${tableProducts.productdetail.price}</p>
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
  document.querySelector("#cart__items").innerHTML = display
};*/

tableProducts = [];

function getProductsBasket() {
  for (basketProduct of listBasketProducts) {
    fetch(`http://localhost:3000/api/products/${basketProduct.id}`)
      .then((response) =>
        response.json()
          .then((apiBasketProduct => {
              /*console.log(apiBasketProduct);*/
              tableProducts.push({ id_test : basketProduct.id, choosedColor: basketProduct.color, choosedQuantity: basketProduct.quantity, productdetail:apiBasketProduct});
          })))
      /*.catch(error => console.log(`Erreur : ` + err));*/
  }
}

getProductsBasket()
console.log(tableProducts)

