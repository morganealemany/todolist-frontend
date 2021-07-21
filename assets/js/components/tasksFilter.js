/**
 * Composant tasksFilter
 */
 const tasksFilter = {

    /**
     * Méthode initilisant notre composant gérant les filtres de tâches
     */
    init: function() {
        tasksFilter.bindAllTasksFilterEvents();
    },

    // ####################################################################
    //                               EVENTS
    // ####################################################################

    /**
     * Ajoute les écouteurs d'évènements sur toutes les tâches de la liste
     */
    bindAllTasksFilterEvents: function() {
        // On récupère dans un tableau tous les éléments du DOM correspondant aux tâches
        // Par choix de nommage, nos variables utilisent :
        // - le suffixe 'Element' s'il s'agit d'un élément du DOM
        // - le suffixe 'List' s'il s'agit d'un tableau/d'une liste
        const taskFilterElementsList = document.querySelectorAll('.filters__task button');
      
        // On veut ajouter les écouteurs d'évènements sur chaque tâche de la liste
        for (const taskFilterElement of taskFilterElementsList) {
           
            taskFilterElement.addEventListener('click', tasksFilter.handleFilterTasks);
        }
    },

    /**
     * Méthode gérant la filtration des tâches en fonction du filtre sélectionné
     * 
     * @param {Event} evt 
     */
    handleFilterTasks: function(evt) {
        // on récupére le dataset de l'élément sur lequel l'événement a eu lieu
        const currentFilterTaskElement = evt.currentTarget;
        // console.log(currentFilterTaskElement);

        // on récupére le dataset correspondant au filtre courant
        let currentFilterTaskElementDataSet = currentFilterTaskElement.dataset.filter;
        // console.log(currentFilterTaskElementDataSet);

        // on conditionne la suite de notre code à la valeur du dataset et donc du filtre
        if (currentFilterTaskElementDataSet === 'todo') {
            // console.log('les taches incomplétes');

            // On sélectionne toutes les tâches qui ne sont pas todo, cela nous revoit un tableau
            const tasksList = document.querySelectorAll('.tasks .task--complete, .tasks .task--edit, .tasks .task--archive');
            // Puis on boucle sur le tableau pour appliquer un style='display: none' à toutes les tâches ne correspondant pas au filtre séléctionné
            for (const task of tasksList) {
                task.setAttribute('style', 'display: none');
            }
            // On applique le CSS sur le bouton du filtre en lui ajoutant les classes correspondantes
            currentFilterTaskElement.classList.add('is-info');
            currentFilterTaskElement.classList.add('is-selected');

        }
        else if (currentFilterTaskElementDataSet === 'complete') {
            // console.log('les taches complétes');
            // On sélectionne toutes les tâches qui ne sont pas complete, cela nous revoit un tableau
            const tasksList = document.querySelectorAll('.tasks .task--todo, .tasks .task--edit, .tasks .task--archive');
            // Puis on boucle sur le tableau pour appliquer un style='display: none' à toutes les tâches ne correspondant pas au filtre séléctionné
            for (const task of tasksList) {
                task.setAttribute('style', 'display: none');
            }
              // On applique le CSS sur le bouton du filtre en lui ajoutant les classes correspondantes
              currentFilterTaskElement.classList.add('is-info');
              currentFilterTaskElement.classList.add('is-selected');
        } 
        else {
            // console.log('toutes les tâches');
              // On applique le CSS sur le bouton du filtre en lui ajoutant les classes correspondantes
              currentFilterTaskElement.classList.add('is-info');
              currentFilterTaskElement.classList.add('is-selected');
        }
    },

};