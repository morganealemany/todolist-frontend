/**
 * Composant tasksList
 */
 const tasksList = {

    /**
     * Méthode initilisant notre composant gérant la liste des tâches
     */
    init: function() {
        tasksList.bindAllTasksEvents();
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
            console.log(taskElement);
            task.bindSingleTaskEvents(taskElement);
        }
    },
};