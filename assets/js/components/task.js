/**
 * Composant task
 */
const task = {

    //===========================================
    //                  EVENTS
    //===========================================
    /**
     * Ajout de tous les couteurs d'événements liées à une tâche
     * 
     * @param {HTMLElement} taskElement // L'élément du DOM correspondant à la tâche
     */
    bindSingleTaskEvents: function(taskElement) {

        // ------------------------------------------------------
        // Ecoute de l'événement permettant l'édition du titre de la tâche
        // ------------------------------------------------------
        const taskTitleLabelElement = taskElement.querySelector('.task__title-label');

        // Dès qu'on clique sur le titre on passe en mode édition
        taskTitleLabelElement.addEventListener('click',task.handleEnableTaskTitleEditMode);

        // ------------------------------------------------------
        // Ecoute de l'événement permettant de valider le nouveau nom de la tâche
        // ------------------------------------------------------

        const taskTitleFieldElement = taskElement.querySelector('.task__title-field');
        // On ajoute l'écoute de la perte de focus du champ (par exemple, si on clique
        // en dehors du champ input)
        taskTitleFieldElement.addEventListener('blur', task.handleValidateNewTaskTitle);

        taskTitleFieldElement.addEventListener('keydown', task.handleValideNewTaskTitleOnEnterKey);

    },

    /**
     * Méthode gérant le passage en mode éditon du titre de la tâche
     * 
     * @param {Event} evt 
     */
    handleEnableTaskTitleEditMode: function(evt) {

        // - Pour passer visuellement en mode édition du titre de la tâche, on va devoir
        // ajouter la classe 'task--edit' sur l'élément tâche
        // - Pour cela, on a donc besoin d'accéder à l'élément tâche contenant l'élément titre

        // On commence par récupérer l'élément titre sur lequel l'événement click s'est produit
        
        const taskTitleLabelElement = evt.currentTarget;

        // On cherche ensuite dans les ancêtres de l'élément titre, le premier élément du DOM qui possède la classe 'task'
        const taskElement = taskTitleLabelElement.closest('.task');

        // Enfin on ajoute la classe 'task--edit' sur l'élément de tâche
        taskElement.classList.add('task--edit');

        taskElement.querySelector('.task__title-field').focus();
    },

    /**
     * Méthode gérant la validation du nouveau titre de la tâche sur l'événement 'blur'
     * 
     * @param {Event} evt 
     */
    handleValidateNewTaskTitle: function(evt) {
        console.log('Validation du champ titre de la tâche');

        // On récupère l'élément input
        const taskTitleFieldElement = evt.currentTarget;

        // On récupère la valeur de l'élément input
        const newTaskTitle = taskTitleFieldElement.value;

        // On récupère l'élément titre de la tâche (celui affiché à l'utilisateur)
        // => possible avec https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling
        const taskTitleLabelElement = taskTitleFieldElement.previousElementSibling;

        taskTitleLabelElement.textContent = newTaskTitle;

        // Pour quitter le mode édition, il faut enlever la classe 'task--edit'
        // sur l'élément 'task'
        const taskElement = taskTitleFieldElement.closest('.task');
    
        taskElement.classList.remove('task--edit')
    },

    /**
     * Méthode gérant la validation du nouveau titre de la tâche sur l'événement 'keydown' (seule la touche Entrée permettra de valider la modification)
     * 
     * @param {Event} evt 
     */
    handleValideNewTaskTitleOnEnterKey: function(evt) {
        // - Si l'utilisateur a tapé sur la touche Entrée (du clavier ou du pavé nuémrique)
        // - alors on renvoit directement l'évènement sur la méthode handleValidateNewTaskTitle
        // => cela nous évite de dupliquer du code
        // - Sinon, on ne fait rien :)
        console.log('Tu viens de taper sur la touche : ' + evt.key);
        if (evt.key === 'Enter') {
            task.handleValidateNewTaskTitle(evt);
        }
    }

};