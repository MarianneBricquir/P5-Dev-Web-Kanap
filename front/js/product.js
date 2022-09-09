// Page produit

// définitions des classes et fonctions 
/*************************************************************************************************************/
/* Création d'une classe Basket pour le panier et de méthodes associées :
   enregistrement du panier et ajout d'un produit avec la contrainte même id, couleur différente
/*************************************************************************************************************/
class Basket {
    constructor() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            this.basket = [];
        } else {
            this.basket = JSON.parse(basket);
        }
    }

    // méthode de la classe qui permet de sauvegarder le panier dans le localStorage
    save() {
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }

    // méthode de la classe qui permet d'ajouter un objet au localStorage 
    // paramètre : product qui est un objet contenant l'id, la couleur et la quantité du produit à ajouter
    add(product) {
        let foundProduct = this.basket.find(p => p.id == product.id && p.color == product.color)
        // .find : fonction qui travaille sur les tableaux et qui permet de chercher un élément dans un tableau par rapport à une condition
        if (foundProduct != undefined) {
            foundProduct.quantity = foundProduct.quantity + parseInt(product.quantity);
        } else {
            /*product.quantity = 1;*/
            this.basket.push(product)
        }
        this.save();
    }
}

/*************************************************************************************************************/
/* fonction qui récupère l'id de l'url d'une page produit (on teste ici si l'id existe)
   paramètre : url de la page
/*************************************************************************************************************/
function addId(urlPage) {
    let search_params = new URLSearchParams(urlPage.search);
    if (search_params.has('id')) {
        let id = search_params.get('id');
        return id
    };
};

let currentUrl = window.location; // méthode qui permet de récupérer l'url de la page actuelle
let currentId = addId(currentUrl); // on stocke le résultat de la fonction dans la variable currentId
//console.log(currentId) // pour vérifier que l'on récupère bien l'id

/*************************************************************************************************************/
/* fonction pour l'affichage des infos d'un produit avec appendChild dans la boucle for
   paramètre : le produit spécifique dont on cherche à afficher es informations
/*************************************************************************************************************/
function formattingInfosProduct(specificProduct) {
    document.querySelector('title').textContent = `${specificProduct.name}`;
    document.querySelector('.item__img').innerHTML = `<img src="${specificProduct.imageUrl}" alt="${specificProduct.altTxt}, ${specificProduct.name}">`;
    document.querySelector('#title').textContent = `${specificProduct.name}`;
    document.querySelector('#price').textContent = `${specificProduct.price}`;
    document.querySelector('#description').textContent = `${specificProduct.description}`;
    let colorOptions = specificProduct.colors;
    let colorLength = colorOptions.length;
    select = document.querySelector("#colors")
    for (let c = 0; c < colorLength; c++) {
        let option = document.createElement('option');
        let optionValue = colorOptions[c];
        option.innerHTML += optionValue;
        select.appendChild(option);
    }
}

/*************************************************************************************************************/
/* fonction : appel à l'API avec id spécifique pour récupérer les infos d'un canapé selon son id
    paramètre de la fonction : url de l'api avec l'id du produit récupéré
/*************************************************************************************************************/
function displayProduct(urlWithId) {
    fetch(urlWithId)
        .then((response) =>
            response.json()
                .then((specificProduct => {
                    formattingInfosProduct(specificProduct); // Appel de la fonction pour l'affichage des infos du produit
                })))
        .catch(error => console.log(`Erreur : ` + err));
};

// Appel de la fonction
displayProduct(`http://localhost:3000/api/products/${currentId}`)

/*************************************************************************************************************/
/* fonction : appel à l'API avec id spécifique pour récupérer les infos d'un canapé selon son id
    paramètre de la fonction : url de l'api et l'id du produit récupéré
/*************************************************************************************************************/

/*Variable correspondant au bouton "Ajouter au panier"*/
let btnAddToBasket = document.querySelector("#addToCart");

/*Initialisation de la classe Panier*/
let basket = new Basket();

/*Ajout du produit au click sur le btn*/
let myProduct = btnAddToBasket.addEventListener("click", () => {
    product = 
        {
            "id":currentId,
            "color":document.querySelector("#colors").value,
            "quantity":parseInt(document.querySelector("#quantity").value)
        }
    ;
    /*Condition pour ajouter le produit : que l'utilisateur ait choisi une couleur et une quantité*/
    if (product.color != "" && product.quantity > 0 && product.quantity <= 100 ){
        basket.add(product)
        alert("Le produit a bien été ajouter à votre panier")
    }else{
        alert("Veuillez choisir une couleur et une quantité entre 0 et 100")
    }
});