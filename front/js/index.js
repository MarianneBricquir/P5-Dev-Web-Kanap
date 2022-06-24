// fonction qui permet d'afficher les produits sur la page d'accueil de façon dynamique
// Paramètre : url de l'api
/*function listProduct (apiUrl) {
    fetch(apiUrl)
        .then((response) =>
            response.json()
                .then((data => {
                    // pour l'afffichage des infos des produits dans les cartes - voir pour sortir cette fonction 
                    let affichage = '';
                            for (let product of data) {
                                affichage += `<a href="./product.html?id=${product._id}">
                                <article>
                                  <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
                                  <h3 class="productName">${product.name}</h3>
                                  <p class="productDescription">${product.description}</p>
                                </article>
                                </a>`
                            }
                            document.querySelector("#items").innerHTML = affichage;
                })))
        .catch(error => console.log(`Erreur : ` + err));
}

// Appel de la fonction
const API = `http://localhost:3000/api/products`
listProduct(API);*/

/* Test 2
// fonction qui formate l'affichage des produits sur la page d'accueil
function formattingProducts(products) {
    let display = '';
    for (let product of products) {
        display += `<a href="./product.html?id=${product._id}">
                                <article>
                                  <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
                                  <h3 class="productName">${product.name}</h3>
                                  <p class="productDescription">${product.description}</p>
                                </article>
                                </a>`
    }
    document.querySelector("#items").innerHTML = display;
};

// appel à l'api pour affichage des produits sur la page d'accueil
function displayAllProducts(apiUrl) {
    fetch(apiUrl)
        .then((response) =>
            response.json()
                .then((products => {
                    formattingProducts(products);
                })))
        .catch(error => console.log(`Erreur : ` + err));
};

let apiUrl = `http://localhost:3000/api/products`
displayAllProducts(apiUrl);
*/


/* Test 3*/
//fonction qui permet de récupérer les produits
function listAllProducts (apiUrl){
    return fetch(apiUrl)
        .then( (response) => {
            return response.json();
        })
        .then((products) => {
            console.log(products);
            return products;
        })
};

// fonction qui permet l'affichage des produits sur la page d'accueil
async function formattingProducts() {
    let display = '';
    const products =  await listAllProducts('http://localhost:3000/api/products'); // permet de charger toutes les données avant de passer à la suite de la fonction
    for (let product of products) {
        display += `<a href="./product.html?id=${product._id}">
                                <article>
                                  <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
                                  <h3 class="productName">${product.name}</h3>
                                  <p class="productDescription">${product.description}</p>
                                </article>
                                </a>`
    }
    document.querySelector("#items").innerHTML = display;
};

formattingProducts();






