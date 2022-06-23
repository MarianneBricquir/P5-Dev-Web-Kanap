// fonction qui permet d'afficher les produits sur la page d'accueil de façon dynamique
// Paramètre : url de l'api
function listProduct (url) {
    fetch(url)
        .then((response) =>
            response.json()
                .then((data => {
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
listProduct(`http://localhost:3000/api/products`);







