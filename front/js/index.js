let url = `http://localhost:3000/api/products`;

fetch(url)
    .then((response) =>
        response.json()
            .then((data => {
                console.log(data);
                let affichage = '';
                        for (let product of data) {
                            affichage += `<a href="./product.html?${product._id}">
                            <article>
                              <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
                              <h3 class="productName">${product.name}</h3>
                              <p class="productDescription">${product.description}</p>
                            </article>
                            </a>
                          `
                        }
                        document.querySelector("#items").innerHTML = affichage;
            })))
    .catch(error => console.log(`Erreur : ` + err));