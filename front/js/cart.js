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
/*Fonction d'affichage de toutes les informations du panier du client*/
/*************************************************************************************************************/
async function displayInfoBasket() {
  await displayBasketProducts()
  await getTotalQuantitytAndPrice();
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
}

/*************************************************************************************************************/
/* Afficher le nombre de produits et le prix total */
/*************************************************************************************************************/

async function getTotalQuantitytAndPrice() {
  let totalQuantity = 0;
  let totalPrice = 0;
  for (let basketProduct of listBasketProducts) {
    let product = await getOneProduct(basketProduct.id);
    totalQuantity = totalQuantity + basketProduct.quantity;
    totalPrice += product.price * basketProduct.quantity;
  }
  document.querySelector("#totalQuantity").innerHTML = totalQuantity;
  document.querySelector("#totalPrice").innerHTML = totalPrice
};

/*************************************************************************************************************/
/*Modifier la quantité depuis la page panier dans le local storage*/
/*************************************************************************************************************/

async function changedProductQuantity() {
  await displayInfoBasket();
  let inputQuantity = document.getElementsByClassName("itemQuantity");
  for (let item of inputQuantity) {
    item.addEventListener('change', function (e) {
      if (item.value > 0 && item.value <= 100) {
        alert(`Vous venez de modifier la quantité du produit à ${item.value}`)
        // dataset 
        const article = e.target.closest("article.cart__item");
        // method getAttribute
        const id = article.getAttribute("data-id");
        const color = article.getAttribute("data-color");
        // paramètres du produit modifié
        changedProduct =
        {
          "id": id,
          "color": color,
          "quantity": item.value
        };
        // rechercher dans le localStorage
        let foundChangedProduct = listBasketProducts.find(p => p.id == changedProduct.id && p.color == changedProduct.color);
        // si ça existe : récupérer la valeur de la quantité changée : item.value
        if (foundChangedProduct != undefined) {
          foundChangedProduct.quantity = parseInt(changedProduct.quantity) // récupère la valeur de la nouvelle quantité
          localStorage.setItem("basket", JSON.stringify(listBasketProducts)); // enregistre cette nouvelle quantité dans le basket
        };
        displayInfoBasket();
        changedProductQuantity();
      }
      else {
        alert(`Vous devez saisir une quantité entre 1 et 100`)
      }
    });
  }
}

changedProductQuantity();

/*************************************************************************************************************/
/*Supprimer un produit de la page panier et du local storage*/
/* pour chaque click sur supprimer : récupérer les élements dans le local storage */



async function removeProductFromBasket() {
  await displayBasketProducts();
  await changedProductQuantity()
  let removeButtons = document.getElementsByClassName("deleteItem");
  console.log(removeButtons);
  for (let btn of removeButtons) {
    btn.addEventListener('click', function (e) {
      alert("Vous avez supprimer le produit de votre panier");
      const article = e.target.closest("article.cart__item");
      const id = article.getAttribute("data-id");
      const color = article.getAttribute("data-color");
      productToRemove =
      {
        "id": id,
        "color": color
      };
      // avec la method filter
      let productsToKeep = listBasketProducts.filter(p => p.id != productToRemove.id && p.color != productToRemove.color)
      // sauvegarde : ;
      localStorage.setItem("basket", JSON.stringify(productsToKeep))
      // faire un remove pour le supprimer du dom ou réactualiser la page
      location.reload(true);
    });
  };
};

removeProductFromBasket();

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
let nameAndCityRegex = /^s*[a-zéèàA-Z-\s]{3,25}$/;
let adresseRegex = /^[0-9]{1,3}[a-zA-Z-\s]{5,30}$/;
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

let firstNameError = document.getElementById("firstNameErrorMsg");
prenom.value = "";
prenom.addEventListener('change', function (e) {
  if (prenom.value.trim() == "") { // la fonction trim retire les espaces initiaux et finaux
    firstNameError.innerHTML = "Votre prénom est requis";
  }
  else if (nameAndCityRegex.test(prenom.value) == true) {
    firstNameError.innerHTML = "";
  }
  else if (nameAndCityRegex.test(prenom.value) == false) {
    firstNameError.innerHTML = "Votre prénom doit comporter au moins 3 caractères et moins de 25 et uniquement des lettres et des tirets";
  }
});

let lastNameError = document.getElementById("lastNameErrorMsg");
nom.addEventListener('change', function (e) {
  if (nom.value.trim() == "") { // la fonction trim retire les espaces initiaux et finaux
    lastNameError.innerHTML = "Votre nom est requis";
  }
  else if (nameAndCityRegex.test(nom.value) == true) {
    lastNameError.innerHTML = "";
  }
  else if (nameAndCityRegex.test(nom.value) == false) {
    lastNameError.innerHTML = "Votre nom doit comporter au moins 3 caractères et moins de 25 et uniquement des lettres et des tirets";
  }
});

let adressError = document.getElementById("addressErrorMsg");
adresse.addEventListener('change', function (e) {
  if (adresse.value.trim() == "") { // la fonction trim retire les espaces initiaux et finaux
    adressError.innerHTML = "Votre adresse est requise";
  }
  else if (adresseRegex.test(adresse.value) == true) {
    adressError.innerHTML = "";
  }
  else if (adresseRegex.test(adresse.value) == false) {
    adressError.innerHTML = "Votre adresse n'est pas valide : elle doit commencer par un chiffre, le nom de la rue doit comporter entre 5 et 30 caractères et uniquement des lettres et des tirets";
  }
});

let cityError = document.getElementById("cityErrorMsg");
ville.addEventListener('change', function (e) {
  if (ville.value.trim() == "") { // la fonction trim retire les espaces initiaux et finaux
    cityError.innerHTML = "Votre ville est requise";
  }
  else if (nameAndCityRegex.test(ville.value) == true) {
    cityError.innerHTML = "";
  }
  else if (nameAndCityRegex.test(ville.value) == false) {
    cityError.innerHTML = "Votre ville doit comporter au moins 3 caractères et moins de 25 et uniquement des lettres et des tirets";
  }
});


/*Création d'une variable globale*/
let emailError = document.getElementById("emailErrorMsg");
email.addEventListener('change', function (e) {
  if (email.value.trim() == "") { // la fonction trim retire les espaces initiaux et finaux
    emailError.innerHTML = "Votre adresse email est requise";
  }
  else if (emailRegex.test(email.value) == true) {
    emailError.innerHTML = "";
  }
  else if (emailRegex.test(email.value) == false) {
    emailError.innerHTML = "Veuillez rentrer une adresse email valide, par exemple : pierre@gmail.com";
  }
});

/*si emailError.innerHTML = "Le champ est ok" est vide = alors on envoie la commande*/



const passerCommande = document.querySelector("#order");

/*console.log(passerCommande);*/
passerCommande.addEventListener('click', function (e) {
  // stop le comportement par défaut
  // e.preventDefault();
  // ajout du controle des saisies utilisateur avant envoie du formulaire
  if (firstNameError.innerHTML == "" && lastNameError.innerHTML == "" && adressError.innerHTML == "" && cityError.innerHTML == "" && emailError.innerHTML == "") {
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

    // Envoyer la commande sur le serveur et rediriger le client vers la page confirmation
    // fetch avec un then : dans le return url avec id commande reçu de l'api





  } else {
    alert("Le formulaire n'est pas correctement renseigné");
  }





  /*
  console.log("commandePourServeur");
  console.log(commandePourServeur);
  */
  // Envoi de la commande au serveur

});








/* Si changement de page : garder le contenu du formulaire stocké dans le localStorage */