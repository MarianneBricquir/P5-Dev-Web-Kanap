// Page d'accueil

// fonction de la page 
formattingProducts();

// Définition des fonctions utilisées

/*************************************************************************************************************/
/* fonction qui récupère les produits depuis l'API
    paramètre : l'url de l'API
    elle retourne un tableau d'objets des produits du site
/*************************************************************************************************************/
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

/*************************************************************************************************************/
/* fonction d'affichage dynamique des produits sur la page
    elle retourne du code html qui récupère dans l'API les informations des produits (img, nom, desc...)
/*************************************************************************************************************/
async function formattingProducts() {
    let display = '';
    const products =  await listAllProducts('http://localhost:3000/api/products'); // permet de charger toutes les données avant de passer à la suite de la fonction
    console.log(products);
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





