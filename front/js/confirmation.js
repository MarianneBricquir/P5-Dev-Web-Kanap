// Comme pour la page produit, on veut récupérer l'id de la commande, que l'on retrouve dans l'url de cette page
function addId(urlPage) {
    let search_params = new URLSearchParams(urlPage.search);
    if (search_params.has('id')) {
        let id = search_params.get('id');
        return id
    };
};

let currentCommandUrl = window.location; // méthode qui permet de récupérer l'url de la page actuelle
let currentCommandId = addId(currentCommandUrl); // on stocke le résultat de la fonction dans la variable currentId
console.log(currentCommandId) ;

// fonction qui affiche le numéro de commande
function displayCommandId(commandId) {
    document.querySelector('#orderId').textContent = `${commandId}`;
};

displayCommandId(currentCommandId);


// effacer le localStorage

function removeOrderedBasketClient (key) {
    localStorage.removeItem(key)
};

removeOrderedBasketClient("basket");
removeOrderedBasketClient("coordonneesClient");