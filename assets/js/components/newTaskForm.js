/**
 * Composant newTaskForm gérant le formulaire d'ajout d'une tâche
 */

const newTaskForm = {
    
    /**
     * Initialisation du composant
     */
    init: function() {
        newTaskForm.bindNewTaskFormEvents();
    },

    // #############################################################
    //                            EVENTS
    // #############################################################

    /**
     * Ajoute tous les écouteurs d'évènements liés au formulaire 
     * d'ajout d'une tâche
     */
    bindNewTaskFormEvents: function() {

        // ----------------------------------------------------------
        // Ecoute de la soumission du formulaire d'ajout d'une tâche
        // ----------------------------------------------------------
        // Si on avait eu besoin d'être encore plus précis sur le sélecteur
        // on aurait également pu rajouter des classes ou même un id
        // sur l'élément form d'ajout d'une tâche dans notre HTML
        const newTaskFormElement = document.querySelector('.task--add form');
        // On ajoute l'écoute de la soumission du formulaire
        newTaskFormElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);
    },

    // #############################################################
    //                            HANDLERS
    // #############################################################

    /**
     * Méthode gérant la soumission du formulaire d'ajout d'une tâche
     * 
     * @param {Event} evt 
     */
    handleNewTaskFormSubmit: function(evt) {

        // On bloque la soumission du formulaire, car on veut traiter
        // les données fournies directement sans recharger la page
        evt.preventDefault();

        // Récupération de l'élément formulaire
        const newTaskFormElement = evt.currentTarget;

        // Récupération du titre de la tâche
        // 2 possibilités :
        // const taskTitleFieldElement = newTaskFormElement.querySelector('input[name="title"]');
        // const taskTitleFieldElement = newTaskFormElement.querySelector('.task__title-field');
        // const newTaskTitle = taskTitleFieldElement.value;
        // On peut aussi l'écrire en 1 seule ligne :
        const newTaskTitle = newTaskFormElement.querySelector('.task__title-field').value;

        // Récupération du nom de la catégorie
        const categoryElement = newTaskFormElement.querySelector('.task__category select');

        const newTaskCategoryId = categoryElement.value;
        // Maintenant que la liste des ctégories contient la valeur de l'id
        // pour chaque option
        // => il faut s'y prendre autrement pour récupérer le nom de la catégorie
        const newTaskCategoryName = categoryElement.querySelector('option:checked').textContent;

        // ------------------------------------------------------------------
        // Appel à l'API pour créer la tâche en BDD
        // ------------------------------------------------------------------

        // On prépare les données de la nouvelle tâche pour les transmettre
        // ensuite lors de la requête à l'API

        const newTaskData = {
            title: newTaskTitle,
            categoryId: newTaskCategoryId
        };
        
        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(newTaskData)
        };
        
        // Exécuter la requête HTTP avec FETCH
        fetch(app.apiBaseURL + '/tasks', fetchOptions)
        .then(
            function(response) {
                // console.log(response);
                // Si HTTP status code n'est pas 201 => Erreur
                if (response.status !== 201) {      
                    alert('Ajout de tâche a échoué');

                    // Ici, idéalement il faudrait déclencher une erreur
                    // pour stopper la suite le fetch et l'exécution des 
                    // then suivant
                } else {
                    // Si c'est ok
                    return response.json();
                }
            }
        )
        // Le résutat JSON a été converti en objet JS
        .then(function(newTaskObject) {
            // console.log(newTaskObject);

            // Création de la nouvelle tâche
            const newTaskElement = task.createTaskElement(newTaskObject.title, newTaskCategoryName, newTaskObject.id, newTaskObject.completion);

            // Affichage de la nouvelle tâche
            tasksList.insertTaskIntoTasksList(newTaskElement);
        });

        
    },


};