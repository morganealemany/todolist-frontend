/**
 * Notre module app (objet Javascript)
 */
const app = {

    /**
     * La méthode init contient le code que l'on veut exécuter au lancement
     * de l'applicatoin
     */
    init: function() {
        tasksList.init();
        newTaskForm.init();
        categoriesList.init();
    }
};

// On ajoute un écouteur d'évènement pour pouvoir lancer l'application
// dès que le DOM est chargé
document.addEventListener('DOMContentLoaded', app.init);