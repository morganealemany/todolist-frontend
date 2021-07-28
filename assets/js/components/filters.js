/**
 * Composant filters
 */
 const filters = {
 

    /**
     * Méthode initilisant notre composant gérant les filtres de tâches archivées
     */
     init: function() {
        filters.bindAllArchiveTasksFilterEvents();
    },

    // On définit une propriété booléenne valant false par défaut : on n'affiche pas les tâches archivées.
    showArchivedTasks: false,

    /**
     * Ajoute les écouteurs d'événements sur les filtres pour les tâches archivées
     */
    bindAllArchiveTasksFilterEvents: function() {

        // ----------------------------------------------------------------
        // Ecoute de l'évènement permettant d'afficher les tâches archivées
        // ----------------------------------------------------------------
        document.querySelector('.filters__task--archived').addEventListener('click', filters.handleShowArchiveTasks);
    },

    /**
     * Méthode handler permettant d'afficher les tâches archivées ou les tâches actives
     * 
     * @param {Event} evt 
     */
    handleShowArchiveTasks: function(evt) {

        // Si la valeur de showArchivedTasks vaux false
        if (filters.showArchivedTasks === false ) {
            // Alors elle devient true
            filters.showArchivedTasks = true;
        }
        // Sinon c'est que la valeur de showArchivedTasks vaux true
        else {
            // Elle devient alors false
            filters.showArchivedTasks = false;
        }
        console.log(filters.showArchivedTasks);
        // On sélectionne toutes les tâches de notre liste
        const allTasksFromList = document.querySelectorAll('.tasks .task');

        // On boucle sur le tableau des tâches
        for (const taskElement of allTasksFromList) {
            
            // Si showArchivedTasks vaux false
            if (filters.showArchivedTasks === false) {
                
                // On cache les tâches archivées et on affiche les tâches non-archivées
                tasksList.hideArchiveTasks(taskElement);
            } 
            // Sinon c'est que showArchivedTasks vaux true
            else {
                // On affiche les tâches archivées et on cache les tâches non-archivées
                tasksList.hideNonArchiveTasks(taskElement);
            }
            // et on l'insère dans le DOM
            tasksList.insertTaskIntoTasksList(taskElement);
        }
    },
}
            
        


