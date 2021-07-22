/**
 * Composant categoriesList
 */
 const categoriesList = {

    /**
     * Méthode initilisant notre composant gérant la liste des catégories
     */
    init: function() {
        categoriesList.loadCategoriesFromAPI();
    },


      // ####################################################################
    //                               API
    // ####################################################################
    /**
     * Méthode gérant le téléchargement de la liste des catégories depuis l'API
     */
    loadCategoriesFromAPI: function() {

        let myList = document.querySelector('ul');

        // On prépare la configuration de la requête HTTP
        let config = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
        };

        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch('https://benoclock.github.io/S07-todolist/categories.json', config)
        // Ensuite, lorsqu'on reçoit la réponse au format JSON
        .then(function(response) {
            // On convertit cette réponse en un objet JS et on le retourne
            // console.log(response, response.json);
            return response.json();
        })
        // Ce résultat au format JS est récupéré en argument ici-même
        .then(function(data) {
            // console.log(data);
            // On dispose désormais d'un tableau JS exploitable dans la variable data
            // La suite dépend de l'utilisation qu'on veut faire de ces données
            categoriesList.createSelectCategoriesForHeaderElement(data);
            categoriesList.createSelectCategoriesForAddTaskFormElement(data);
            
            }
        );

    },

    /**
     * Méthode gérant la création d'un élément select pour les catégories dans le header
     * 
     * @param {array} dataCategoryList
     */
    createSelectCategoriesForHeaderElement: function(dataCategoryList) {

        // On crée un nouvel élément HTML 
        newSelectCategoriesElement = document.createElement("select");

        // On lui ajoute un attribut class
        newSelectCategoriesElement.setAttribute("class", "filters__choice");

        // On parcourt les données de l'API
        for (const category of dataCategoryList) {

            // On crée l'élément html <option>
            const newOptionElement = document.createElement("option");

            // Et on lui ajoute le nom de la catégorie
            newOptionElement.textContent = category.name;

            // Enfin on ajoute chaque option comme enfant du select créé précedemment: newSelectCategoriesElement
            newSelectCategoriesElement.append(newOptionElement);

        }
        // console.log(newSelectCategoriesElement);
        categoriesList.addNewSelectCategoriesElementInHeader(newSelectCategoriesElement);
    },

    /**
     * Méthode gérant la création d'un élément select pour les catégories dans le formulaire d'ajout d'une tâche
     * 
     * @param {array} dataCategoryList 
     */
    createSelectCategoriesForAddTaskFormElement: function(dataCategoryList) {

        // On crée deux nouveaux éléments HTML 
        newDivCategoriesElement = document.createElement("div");

        newSelectCategoriesElement = document.createElement("select");

        // On recrée la structure HTML <div> <select>
        newDivCategoriesElement.append(newSelectCategoriesElement);

        // On lui ajoute un attribut class
        newDivCategoriesElement.setAttribute("class", "select");

        newDivCategoriesElement.classList.add("is-small");

        // On parcourt les données de l'API
        for (const category of dataCategoryList) {

            // On crée l'élément html <option>
            const newOptionElement = document.createElement("option");

            // Et on lui ajoute le nom de la catégorie
            newOptionElement.textContent = category.name;

            // Enfin on ajoute chaque option comme enfant du select créé précedemment: newSelectCategoriesElement
            newSelectCategoriesElement.append(newOptionElement);

        }
        // On appelle la méthode permettant d'ajouter l'élément créee dans le formulaire d'ajout de tâche
        categoriesList.addNewSelectCategoriesElementInAddTaskForm(newDivCategoriesElement);
    },

      // ####################################################################
    //                               DOM
    // ####################################################################

    /**
     * Méthode gérant l'ajout du menu déroulant select categories dans le DOM
     * 
     * @param {HTMLElement} newSelectCategoriesElement 
     */
    addNewSelectCategoriesElementInHeader: function(newSelectCategoriesElement) {

        // On cible l'élément parent du menu déroulant dans le header et on lui ajoute comme enfant le menu déroulant généré grâce à l'API : newSelectCategoriesElement
        document.querySelector('.filters .filters__task--category').append(newSelectCategoriesElement);

    },

    /**
     * Méthode gérant l'ajout du menu déroulant div > select categories dans le formulaire d'ajout de tâche
     * 
     * @param {HTMLElement} newDivCategoriesElement 
     */
    addNewSelectCategoriesElementInAddTaskForm: function(newDivCategoriesElement) {
    // On cible l'élément parent du menu déroulant dans le header et on lui ajoute comme enfant le menu déroulant généré grâce à l'API : newDivCategoriesElement
    document.querySelector('.task form .task__category').append(newDivCategoriesElement);
    },
}
