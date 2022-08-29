/********************************************** Page Panier ***************************************************/

// on récupère le panier depuis la page "Panier"
let listBasketProducts = JSON.parse(localStorage.getItem("basket"));
console.log("Objet listBasketProducts");
console.log(listBasketProducts)


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
/*************************************************************************************************************/

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


/*************************************************************************************************************/
/* Afficher le nombre de produits et le prix total */
/*************************************************************************************************************/

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
/*************************************************************************************************************/

async function getInputQuantity() {
  await displayBasketProducts();
  let inputQuantity = document.getElementsByClassName("itemQuantity");
  for (let item of inputQuantity) {
    console.log(item.value);
    item.addEventListener('change', function (e) {
      /*if (typeof item.value == "number" && item.value > 0 && item.value <= 100) {
      }
      else {
        alert(`Vous devez renseigner une qunatité inférieure ou égale à 100`);
      }*/
      alert(`Vous venez de modifier la quantité du produit à ${item.value}`)
      // dataset 
      const article = e.target.closest("article.cart__item");
      /*console.log("affichage d'article");
      console.log(article);*/
      // method getAttribute
      const id = article.getAttribute("data-id");
      const color = article.getAttribute("data-color");
      /*console.log("afficher id et color");
      console.log(id, color);*/
      // récupérer le local storage et vérifier si produit avec id + color existe
      changedProduct =
      {
        "id": id,
        "color": color,
        "quantity": item.value
      };
      /*console.log("product");
      console.log(changedProduct);*/
      // console.log(changedProduct.id) ;
      // rechercher dans le localStorage
      let foundChangedProduct = listBasketProducts.find(p => p.id == changedProduct.id && p.color == changedProduct.color);
      // si ça existe : récupérer la valeur de la quantité changée : item.value
      if (foundChangedProduct != undefined) {
        let basket = new Basket();
        foundChangedProduct.quantity = parseInt(changedProduct.quantity)
        console.log(foundChangedProduct.quantity)
        // remplacer la quantite
        // save les infos modifiees !! sans écraser l'ancien panier
        //localStorage.setItem("basket", JSON.stringify(foundChangedProduct))
        
      }
    });
  }
}

getInputQuantity()


/*************************************************************************************************************/
/*Supprimer un produit de la page panier et du local storage*/
/* ajout d'une propriété dataset à la classe deleteItem ?*/

/* A créer quelque part
let dataId = document.createElement('data-id');
select.appendChild(dataId);
*/
/*
let removeButton = document.getElementsByClassName("deleteItem");
console.log("Elements deleteItem correspondant au texte Supprimer");
console.log(removeButton);
*/
/*
let removeButton2 = document.querySelectorAll(".deleteItem");
console.log(removeButton2) // ne foctionne pas - pb de la fonction displayBasketProducts() qui est asynchrone ?
*/

/* pour chaque click sur supprimer : récupérer les élements dans le local storage */

/*
async function removeProductFromBasket() {
  
}
*/
/*************************************************************************************************************/
/*Passer la commande
- récupérer et analyser les données saisies
- message d'erreur si besoin (avec les expressions régulières en JS - regex - lire la documentation)
- constituer un objet contact à partir des données du formulaire et un tableau de produits
*/



/*constante pour chaque entrée du formulaire*/
const prenom = document.querySelector("#firstName");
const nom = document.querySelector("#lastName");
const adresse = document.querySelector("#address");
const ville = document.querySelector("#city");
const email = document.querySelector("#email");

/*controle des valeurs rentrée par l'utilisateur*/

let nameRegex = /^[a-zA-Z-\s]+$/; // demandr à Terrence pour au moins 3 caractères ? 

prenom.addEventListener('change', function (e) {
  let firstNameError = document.getElementById("firstNameErrorMsg");
  if (prenom.value.trim() == "") { // la fonction trim retire les espaces initiaux et finaux
    firstNameError.innerHTML = "Votre prénom est requis";
  }
  else if (nameRegex.test(prenom.value) == true) {
    firstNameError.innerHTML = "Le champ est ok";
  }
  else if (nameRegex.test(prenom.value) == false) {
    firstNameError.innerHTML = "Le champ n'est pas valide : le prénom doit comporter uniquement des lettres et des tirets";
  }
});


nom.addEventListener('change', function (e) {
  let lastNameError = document.getElementById("lastNameErrorMsg");
  if (nom.value.trim() == "") { // la fonction trim retire les espaces initiaux et finaux
    lastNameError.innerHTML = "Votre nom est requis";
  }
  else if (nameRegex.test(nom.value) == true) {
    lastNameError.innerHTML = "Le champ est ok";
  }
  else if (nameRegex.test(nom.value) == false) {
    lastNameError.innerHTML = "Le champ n'est pas valide : le nom doit comporter uniquement des lettres et des tirets";
  }
});

const passerCommande = document.querySelector("#order");




/*console.log(passerCommande);*/
passerCommande.addEventListener('click', function (e) {
  // stop le comportement par défaut
  // e.preventDefault();

  // ajout du controle des saisies utilisateur avant envoie du formulaire

  // récupération des valeurs du formulaire dans le local storage
  const coordonneesClient = {
    prenom: prenom.value,
    nom: nom.value,
    adresse: adresse.value,
    ville: ville.value,
    email: email.value
  };
  /*
  console.log("coordonneesClient");
  console.log(coordonneesClient);
  */

  // récupération des valeurs du formulaire dans le local storage
  localStorage.setItem("coordonneesClient", JSON.stringify(coordonneesClient));

  // Formulaire + produits du panier dans un objet à envoyer vers le serveur
  const commandePourServeur = {
    listBasketProducts,
    coordonneesClient
  };
  /*
  console.log("commandePourServeur");
  console.log(commandePourServeur);
  */
  // Envoi de la commande au serveur

});








/* Si changement de page : garder le contenu du formulaire stocké dans le localStorage */
