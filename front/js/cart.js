/********************************************** Page Panier ***************************************************/

// Variable Panier (récupérer depuis le localStorage)
let listBasketProducts = JSON.parse(localStorage.getItem("basket"));

/*************************************************************************************************************/
/*Fonction d'affichage de toutes les informations du panier du client*/
/*************************************************************************************************************/
async function displayInfoBasket() {
    await displayBasketProducts();
    await getTotalQuantitytAndPrice();
};

/* On charge les autres fonctions qui permettent à l'utilisateur
de modifier la quantité ou de supprimer un produit*/
changedProductQuantity();
removeProductFromBasket();

/*************************************************************************************************************/
/* fonction qui permet d'aller chercher les éléments d'un seul produit dans l'API
/* paramètre : id du produit
/*************************************************************************************************************/

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

/**************************  Fonctionnalités de modifications du panier sur la page **************************/
/*************************************************************************************************************/
/*Modifier la quantité depuis la page panier dans le local storage*/
/*************************************************************************************************************/
async function changedProductQuantity() {
    await displayInfoBasket();
    let inputQuantity = document.getElementsByClassName("itemQuantity");
    console.log(inputQuantity)
    for (let item of inputQuantity) {
        item.addEventListener('change', function (e) {
            if (item.value > 0 && item.value <= 100) {
                alert(`Vous venez de modifier la quantité du produit à ${item.value}`)
                // méthode Element.closest() : permet de cibler l'élément le + proche ancêtre qui est l'article article.cart_item
                const article = e.target.closest("article.cart__item");
                console.log(article)
                // méthode getAttribute (dataset)
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

                // Appel des fonctions pour actualiser le DOM
                displayInfoBasket(); // actualisation du DOM
                changedProductQuantity(); // ajout de la fonction sur l'input de la quantité après réactualisation
                removeProductFromBasket(); // ajout de la fonction sur l'input de la quantité après réactualisation
            }
            else {
                alert("Vous devez saisir une quantité entre 1 et 100 ou supprimer le produit")
                // Appel des fonctions pour actualiser le DOM
                displayInfoBasket(); // actualisation du DOM
                changedProductQuantity(); // ajout de la fonction sur l'input de la quantité après réactualisation
                removeProductFromBasket(); // ajout de la fonction sur l'input de la quantité après réactualisation
            }
        });
    }
}

/*************************************************************************************************************/
/* Supprimer un produit de la page panier et du local storage au click sur "Supprimer" */
/*************************************************************************************************************/
async function removeProductFromBasket() {
    await displayInfoBasket();
    let removeButtons = document.getElementsByClassName("deleteItem");
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
            let productsToKeep = listBasketProducts.filter(p => p.id != productToRemove.id || p.color != productToRemove.color)
            // sauvegarde : ;
            localStorage.setItem("basket", JSON.stringify(productsToKeep))
            // faire un remove pour le supprimer du dom ou réactualiser la page
            location.reload(true);
        });
    };
};

/********************************************  Passer la commande ********************************************/
/* Constante pour chaque entrée du formulaire */
const prenom = document.querySelector("#firstName");
const nom = document.querySelector("#lastName");
const adresse = document.querySelector("#address");
const ville = document.querySelector("#city");
const email = document.querySelector("#email");

/* Controle des valeurs rentrées par l'utilisateur avec les expressions régulières */
let nameAndCityRegex = /^s*[a-zéèàA-Z-\s]{3,25}$/;
let adresseRegex = /^[0-9]{1,3}[a-zA-Z-\s]{5,30}$/;
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

/* Controle et message d'erreur pour le champ Prénom */
prenom.value = "";
let firstNameError = document.getElementById("firstNameErrorMsg");
prenom.addEventListener('change', function (e) {
    if (nameAndCityRegex.test(prenom.value) == true) {
        firstNameError.innerHTML = "";
    }
    else if (nameAndCityRegex.test(prenom.value) == false) {
        firstNameError.innerHTML = "Votre prénom doit comporter au moins 3 caractères et moins de 25 et uniquement des lettres et des tirets";
    }
});

/* Controle et message d'erreur pour le champ Nom */
nom.value = "";
let lastNameError = document.getElementById("lastNameErrorMsg");
nom.addEventListener('change', function (e) {
    if (nameAndCityRegex.test(nom.value) == true) {
        lastNameError.innerHTML = "";
    }
    else if (nameAndCityRegex.test(nom.value) == false) {
        lastNameError.innerHTML = "Votre nom doit comporter au moins 3 caractères et moins de 25 et uniquement des lettres et des tirets";
    }
});

/* Controle et message d'erreur pour le champ Adresse */
adresse.value = "";
let adressError = document.getElementById("addressErrorMsg");
adresse.addEventListener('change', function (e) {
    if (adresseRegex.test(adresse.value) == true) {
        adressError.innerHTML = "";
    }
    else if (adresseRegex.test(adresse.value) == false) {
        adressError.innerHTML = "Votre adresse n'est pas valide : elle doit commencer par un chiffre, le nom de la rue doit comporter entre 5 et 30 caractères et uniquement des lettres et des tirets";
    }
});

/* Controle et message d'erreur pour le champ Ville */
ville.value = "";
let cityError = document.getElementById("cityErrorMsg");
ville.addEventListener('change', function (e) {
    if (nameAndCityRegex.test(ville.value) == true) {
        cityError.innerHTML = "";
    }
    else if (nameAndCityRegex.test(ville.value) == false) {
        cityError.innerHTML = "Votre ville doit comporter au moins 3 caractères et moins de 25 et uniquement des lettres et des tirets";
    }
});

/* Controle et message d'erreur pour le champ Email*/
email.value = "";
let emailError = document.getElementById("emailErrorMsg");
email.addEventListener('change', function (e) {
    if (emailRegex.test(email.value) == true) {
        emailError.innerHTML = "";
    }
    else if (emailRegex.test(email.value) == false) {
        emailError.innerHTML = "Veuillez rentrer une adresse email valide, par exemple : pierre@gmail.com";
    }
});

/* Constante pour la sélection du bouton "Commander" */
const passerCommande = document.querySelector("#order");

/* Variable qui stocke toutes les entrées du formulaire */
let allFormInputs = document.querySelectorAll("form input[type=text], form input[type=email]");
//console.log(allFormInputs);


/*************************************************************************************************************/
/* fonction de type addEventListener au click sur le bouton "Commander!"
    paramètre : l'évenement 'click'
/*************************************************************************************************************/
passerCommande.addEventListener('click', function (e) {
    e.preventDefault(); // stop le comportement par défaut
    // création d'une variable qui stocke les coordonnées du client dans le formation attendu par l'objet contact dans l'API
    let coordonneesClient = {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value
    };
    // 1ère condition : le panier est vide -> message d'alerte au client
    if (listBasketProducts == undefined) {
        alert("Votre panier est vide");
    }

    // 2ème condition : le panier contient des articles 
    else {

        // Vérification de la valeur des champs
        // Condition 1 : le formulaire ne contient pas de champ non renseigné
        if (coordonneesClient.firstName != "" && coordonneesClient.lastName != "" && coordonneesClient.address != "" && coordonneesClient.city != "" && coordonneesClient.email != "") {
            // Vérification des messages d'erreur provenant de la non validation avec la fonction test de la Regex spécifique : 
            // Condition 1 = erreurs : afficher une alerte pour l'utilisateur
            if (firstNameError.innerHTML != "" || lastNameError.innerHTML != "" || adressError.innerHTML != ""
                && cityError.innerHTML != "" || emailError.innerHTML != "") {
                alert("Le formulaire n'est pas correctement renseigné");
            }

            // Condition 2 = pas d'erreurs, l'ensemble des entrées est valide : envoi du formulaire possible
            else if (firstNameError.innerHTML == "" && lastNameError.innerHTML == "" && adressError.innerHTML == ""
                && cityError.innerHTML == "" && emailError.innerHTML == "") {
                // enregistrement de ces valeurs avec les méthodes setItem et stringify
                localStorage.setItem("coordonneesClient", JSON.stringify(coordonneesClient));
                console.log(coordonneesClient);
                // récupération des id des produits du paniers
                let idOrderedProduct = [];
                for (let orderedProduct of listBasketProducts) {
                    // insertion de chaque id des produits du panier dans le tableau créé
                    idOrderedProduct.push(orderedProduct.id)
                };
                // Données à envoyer à l'API
                const infoOrder = {
                    contact: coordonneesClient,
                    products: idOrderedProduct
                };
                //console.log(infoOrder);
                // Envoi de la commande sur le serveur et redirection du client vers la page confirmation
                // requete fetch https://www.geeksforgeeks.org/get-and-post-method-using-fetch-api/
                fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }, // envoi des données au format des données
                    body: JSON.stringify(infoOrder), // stringify permet de convertir en chaîne de caractère
                })
                    .then((response) => response.json())
                    .then((promise) => {
                        let responseApi = promise;
                        // changer de page
                        window.location = `http://127.0.0.1:5501/front/html/confirmation.html?id=${responseApi.orderId}`
                    })
            }
        }

        // Vérification de la valeur des champs
        // Condition 2 : le formulaire contient au moins un champ vide
        else {
            alert("Veuillez renseigner tous les champs du formulaire")
        }
    }
});