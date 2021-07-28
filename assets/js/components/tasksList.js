/**
 * Composant tasksList
 */
 const tasksList = {

    /**
     * Méthode initilisant notre composant gérant la liste des tâches
     */
    init: function() {
        // Plus besoin d'ajouter les écouteurs d'évènement à ce stade
        // car ils seront ajoutés lors de la création des tâches
        // dans createTaskElement
        // tasksList.bindAllTasksEvents();
        tasksList.loadTasksFromAPI();
    },

    // ###############################################################
    //                            AJAX/API
    // ###############################################################

    /**
     * Méthode effectuant le chargement de la liste des tâches depuis l'API
     */
     loadTasksFromAPI: function() {
        
        // On prépare la configuration de la requête HTTP
        const config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
  
        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch(app.apiBaseURL + '/tasks', config)
        // Ensuite, lorsqu'on reçoit la réponse au format JSON
        .then(function(response) {
            // On convertit cette réponse en un objet JS et on le retourne
            return response.json();
        })
        // Ce résultat au format JS est récupéré en argument ici-même
        .then(function(tasksListFromAPI) {
            // On dispose désormais d'un tableau JS exploitable dans la variable tasksListFromAPI
            // console.log(tasksListFromAPI);

            // Pour chaque tâche de la liste retournée
            for (const singleTask of tasksListFromAPI) {
                console.log(singleTask);
                // on crée un nouvel élément "task"
                const newTaskElement = task.createTaskElement(singleTask.title, singleTask.category.name, singleTask.id, singleTask.completion, singleTask.status);
                // et on l'insère dans le DOM
                tasksList.insertTaskIntoTasksList(newTaskElement);
            }
        });
    },

    // ####################################################################
    //                               EVENTS
    // ####################################################################

    /**
     * Ajoute les écouteurs d'évènements sur toutes les tâches de la liste
     */
    bindAllTasksEvents: function() {
        // On récupère dans un tableau tous les éléments du DOM correspondant aux tâches
        // Par choix de nommage, nos variables utilisent :
        // - le suffixe 'Element' s'il s'agit d'un élément du DOM
        // - le suffixe 'List' s'il s'agit d'un tableau/d'une liste
        const taskElementsList = document.querySelectorAll('.tasks .task');

        // On veut ajouter les écouteurs d'évènements sur chaque tâche de la liste
        for (const taskElement of taskElementsList) {
            // console.log(taskElement);
            task.bindSingleTaskEvents(taskElement);
        }
    },

    // ####################################################################
    //                               DOM
    // ####################################################################

    /**
     * Ajoute un élément task dans la liste des tâches
     * 
     * @param {HTMLElement} taskElement L'élément tâche à ajouter
     */
    insertTaskIntoTasksList: function(taskElement) {
        
        // Récupération de l'élément contenant la liste des tâches
        const tasksListElement = document.querySelector('.tasks');

        // Insertion de la tâche dans la liste
        // https://developer.mozilla.org/fr/docs/Web/API/ParentNode/prepend
        tasksListElement.prepend(taskElement);
    },
};