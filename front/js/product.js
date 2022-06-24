// Page produit
// Fonction qui récupère l'id de l'url d'une page produit
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


// Appel de la fonction dans la page produit
let currentUrlWithId = `http://localhost:3000/api/products/${currentId}`
infoProduct(currentUrlWithId)


// localStorage (API navigateurs): pour enregitrer une valeur associée à une clée (valeur = panier)