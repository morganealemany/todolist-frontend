/**
 * Composant task
 */
const task = {

    // #############################################################
    //                            EVENTS
    // #############################################################

    /**
     * Ajoute tous les écouteurs d'évènements liés à une tâche
     * 
     * @param {HTMLElement} taskElement L'élément du DOM correspond à la tâche
     */
    bindSingleTaskEvents: function(taskElement) {

        // ----------------------------------------------------------------
        // Ecoute de l'évènement permettant l'édition du titre de la tâche
        // ----------------------------------------------------------------
        // On récupère l'élément du DOM correspondant au titre de la tâche
        const taskTitleLabelElement = taskElement.querySelector('.task__title-label');
        // Dès qu'on clique sur le titre de la tâche, on passe en mode édition
        taskTitleLabelElement.addEventListener('click', task.handleEnableTaskTitleEditMode);

        // ----------------------------------------------------------------
        // Ecoute de l'évènement permettant de valider le nouveau nom de
        // la tâche
        // ----------------------------------------------------------------
        // On récupère le champ input permettant de modifier le titre de la tâche
        const taskTitleFieldElement = taskElement.querySelector('.task__title-field');
        // On ajoute l'écoute de la perte de focus du champ (par exemple, si on clique
        // en dehors du champ input)
        taskTitleFieldElement.addEventListener('blur', task.handleValidateNewTaskTitle);

        // On ajoute l'écoute de la saisie d'une touche du clavier
        taskTitleFieldElement.addEventListener('keydown', task.handleValideNewTaskTitleOnEnterKey);

        // ----------------------------------------------------------------
        // Ecoute de l'évènement permettant de terminer une tâche
        // ----------------------------------------------------------------
        // On récupère l'élément du DOM correspondant au titre de la tâche
        const taskButtonValidateElement = taskElement.querySelector('.task__button--validate');
        // Dès qu'on clique sur le titre de la tâche, on passe en mode édition
        taskButtonValidateElement.addEventListener('click', task.handleCompleteTask);
        
    },

    /**
     * Méthode gérant le passage en mode édition du titre de la tâche
     * 
     * @param {Event} evt 
     */
    handleEnableTaskTitleEditMode: function(evt) {

        // - Pour passer visuellement en mode édition du titre de la tâche, on va devoir
        // ajouter la classe 'task--edit' sur l'élément tâche
        // - Pour cela, on a donc besoin d'accéder à l'élément tâche contenant l'élément titre
        
        // On commence par récupérer l'élément titre sur lequel l'évènement click s'est produit
        const taskTitleLabelElement = evt.currentTarget;

        // On chercher ensuite dans les ancêtres de l'élément titre, le premier élément du DOM
        // qui possède la classe 'task'
        // Doc de closest : https://developer.mozilla.org/fr/docs/Web/API/Element/closest
        const taskElement = taskTitleLabelElement.closest('.task');

        // Enfin, on ajoute la classe 'task--edit' sur l'élément de tâche
        // Doc de classList : https://developer.mozilla.org/fr/docs/Web/API/Element/classList
        taskElement.classList.add('task--edit');

        // Bonus UX : on met le focus sur le champ input pour pouvoir directement
        // modifier le titre de la tâche sans avoir à cliquer une deuxième fois
        // dans le champ
        // Doc : https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
        taskElement.querySelector('.task__title-field').focus();
    },

    /**
     * Méthode gérant la validation du nouveau titre de la tâche sur l'évènement 'blur'
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
        taskElement.classList.remove('task--edit');
    },

    /**
     * Méthode gérant la validation du nouveau titre de la tâche sur l'évènement 'keydown'
     * (seule la touche Entrée qui permettra de valider la modification)
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
    },

    /**
     * Méthode gérant la complétion d'un tâche lors de l'événement click sur le bouton
     * 
     * @param {Event} evt 
     */
    handleCompleteTask: function(evt) {
        console.log('Clic sur le bouton valider la tâche');
    }
};