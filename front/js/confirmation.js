// Page de confirmation de la commande

// Variables 
let currentCommandUrl = window.location; // on stocke dans une variable l'url de la page actuelle pour pouvoir récupérer l'id
let currentCommandId = addId(currentCommandUrl); // on stocke le résultat de la fonction addId dans la variable currentId

// Les fonctions de la page : on affiche le numéro de commande et on réinitialise le localStorage
displayCommandId(currentCommandId);
removeOrderedBasketClient("basket");
removeOrderedBasketClient("coordonneesClient");

/*************************************************************************************************************/
/* fonction qui récupère l'id de la commande depuis l'url de la page
/*************************************************************************************************************/
function addId(urlPage) {
    let search_params = new URLSearchParams(urlPage.search);
    if (search_params.has('id')) {
        let id = search_params.get('id');
        return id
    };
};

/*************************************************************************************************************/
/* fonction permettant d'afficher le numéro de la commande
/* paramètre : l'identifiant de la commande récupéré depuis l'url de la page (currentCommandId)
/*************************************************************************************************************/
function displayCommandId(commandId) {
    document.querySelector('#orderId').textContent = `${commandId}`;
};

/*************************************************************************************************************/
/* fonction pour réinitialiser le localStorage une fois la commande effectuée
/* paramètre : la clé de l'objet contenu dans le localStorage 
/*************************************************************************************************************/
function removeOrderedBasketClient (key) {
    localStorage.removeItem(key)
};
