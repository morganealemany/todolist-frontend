/**
 * Composant tasksList
 */
 const tasksList = {

    /**
     * Méthode initialisant notre composant gérant la liste des tâches
     */
    init: function() {

        tasksList.bindAllTasksEvents();
    },
    //===========================================
    //                  EVENTS
    //===========================================
    /**
     * Ajoute les écouteurs d'événements sur toutes les tếches de la liste
     * 
     */
    bindAllTasksEvents: function() {
        // On récupére dans un tableau tous les éléments du DOM correspondant aux tâches
        const taskElementsList = document.querySelectorAll('.tasks .task');

        // On veut ajouter les écouteurs d'événements sur chaque tâche de la liste
        for (const taskElement of taskElementsList) {
            // console.log(taskElement);
            task.bindSingleTaskEvents(taskElement);
        }
    },

};