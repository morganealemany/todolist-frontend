/**
 * Notre module app (objet JS)
 */
const app = {

    /**
     * La méthode init contient le code que l'on veut exécuter au lancement de l'application
     */
    init: function() {
        tasksList.init();
    }
};  

// On ajoute un écouteur d'événement pour pouvoir lancer l'application dès que le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', app.init);