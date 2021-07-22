/**
 * Composant tasksList
 */
 const tasksList = {

    /**
     * Méthode initilisant notre composant gérant la liste des tâches
     */
    init: function() {
        tasksList.bindAllTasksEvents();
        tasksList.loadTasksFromAPI();
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
    //                               API
    // ####################################################################
    /**
     * Méthode gérant le téléchargement de la liste des catégories depuis l'API
     */
     loadTasksFromAPI: function() {

        // On prépare la configuration de la requête HTTP
        let config = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
        };

        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch('https://benoclock.github.io/S07-todolist/tasks.json', config)
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
            // On parcourt les données pour générer un élément .task
            for (const currentTask of data) {
                // console.log(task.category.name);
                // On créé un nouveau template pour chaque tâche
                const newTaskElement = task.createTaskElement(currentTask.title, currentTask.category.name); 

                // Puis on affiche toutes les nouvelles tâches
                tasksList.insertTaskIntoTasksList(newTaskElement);
            }
            
        });

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