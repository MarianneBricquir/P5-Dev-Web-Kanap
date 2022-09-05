// Page produit
// Fonction qui récupère l'id de l'url d'une page produit (on teste ici si l'id existe)
// paramètre : url de la page
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

/* Test 1 - avec InnerHTML :
// Fonction : appel à l'API pour récupérer les informations et les transcrire dans le html
// paramètre de la fonction : url de l'api et l'id du produit récupéré
function infoProduct(urlWithId) {
    fetch(urlWithId)
        .then((response) =>
            response.json()
                .then(data => {
                    console.log(data);
                    document.querySelector('title').textContent = `${data.name}`;
                    document.querySelector('.item__img').innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}, ${data.name}">`;
                    document.querySelector('#title').textContent = `${data.name}`;
                    document.querySelector('#price').textContent = `${data.price}`;
                    document.querySelector('#description').textContent = `${data.description}`;
                    let colorOptions = data.colors;
                    let colorLength = colorOptions.length;
                    console.log(colorOptions);
                    let option = '<option value="">--SVP, choisissez une couleur --</option>';
                    for (let c = 0; c < colorLength; c++) {
                        let choose = colorOptions[c];
                        option += `<option value="${choose}">${choose}</option>`
                    }
                    document.querySelector("#colors").innerHTML = option; // comprendre le appendChild 
                    // tester createElement()
                }));
}
*/

/* Test 2 - avec appendChild :
// Fonction : appel à l'API pour récupérer les informations et les transcrire dans le html
// paramètre de la fonction : url de l'api et l'id du produit récupéré
function infoProduct(urlWithId) {
    fetch(urlWithId)
        .then((response) =>
            response.json()
                .then(data => {
                    document.querySelector('title').textContent = `${data.name}`;
                    document.querySelector('.item__img').innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}, ${data.name}">`;
                    document.querySelector('#title').textContent = `${data.name}`;
                    document.querySelector('#price').textContent = `${data.price}`;
                    document.querySelector('#description').textContent = `${data.description}`;
                    let colorOptions = data.colors;
                    let colorLength = colorOptions.length;
                    select =  document.querySelector("#colors")
                    for (let c = 0; c < colorLength; c++) {
                        let option = document.createElement('option');
                        let optionValue = colorOptions[c];
                        option.innerHTML += optionValue ;
                        select.appendChild(option);
                    }
                }));
}


// Appel de la fonction dans la page produit
let currentUrlWithId = `http://localhost:3000/api/products/${currentId}`
infoProduct(currentUrlWithId)
*/

/* Test 3 : on créé une fonction avec l'affichage des infos d'un produit avec appendChild dans la boucle*/
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

// Fonction : appel à l'API avec id spécifique pour récupérer les infos d'un canapé selon son id
// paramètre de la fonction : url de l'api et l'id du produit récupéré
function displayProduct(urlWithId) {
    fetch(urlWithId)
        .then((response) =>
            response.json()
                .then((specificProduct => {
                    formattingInfosProduct(specificProduct);
                })))
        .catch(error => console.log(`Erreur : ` + err));
};

displayProduct(`http://localhost:3000/api/products/${currentId}`)


// au click sur ajouter au panier => enregistrer l'article dans le panier
// récupérer les données renseignées par le client et envoi du panier

/*
à chaque fois que l'utilisateur click sur le bouton "Ajouter au panier" : 
ajouter les élément récupérer avec btnAddToBasket sous la forme d'un tableau
source : https://buzut.net/realiser-un-panier-en-javascript/ 

let basket = 
btnAddToBasket.addEventListener("click", () => {
    myProduct = [
        {
            "id":currentId,
            "color":document.querySelector("#colors").value,
            "quantity":document.querySelector("#quantity").value

        }
    ];
    console.log(myProduct);
})
*/



/*Variable correspondant au bouton "Ajouter au panier"*/
let btnAddToBasket = document.querySelector("#addToCart");
console.log(btnAddToBasket);

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