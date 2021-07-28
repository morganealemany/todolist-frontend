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

        

        // Création de la nouvelle tâche
        const newTaskElement = task.createTaskElement(newTaskTitle, newTaskCategoryName);

        // Affichage de la nouvelle tâche
        tasksList.insertTaskIntoTasksList(newTaskElement);
    },


};