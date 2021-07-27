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
        // Ecoute de l'évènement permettant de compléter une tâche
        // ----------------------------------------------------------------
        // On récupère le bouton permettant de terminer une tâche
        const taskCompleteButtonElement = taskElement.querySelector('.task__button--validate');
        // Différents type de log
        // console.log(taskCompleteButtonElement); // log classique
        // console.warn(taskCompleteButtonElement); // log warning (s'affiche en jaune dans la console)
        // console.error(taskCompleteButtonElement); // log d'erreur (s'affiche en rouge dans la console)
        // les log warning et error donne un peu plus de détails
        // on peut aussi faire un console.log de plusieurs valeurs
        // console.log(taskCompleteButtonElement, taskTitleFieldElement);
        // On ajoute l'écoute du clic sur ce bouton
        taskCompleteButtonElement.addEventListener('click', task.handleCompleteTask);
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
     * Méthode gérant le passage d'une tâche non terminée à une tâche terminée/complétée
     * lors du clic sur le bouton 'complete' de la tâche
     */
    handleCompleteTask: function(evt) {
        console.log('Au clic, je passe dans handleCompleteTask');

        // Récupération du bouton à l'origine de l'évènement
        const taskCompleteButtonElement = evt.currentTarget;
        // Recherce de la tâche à laquelle appartient ce bouton
        const taskElement = taskCompleteButtonElement.closest('.task');
        // Modification de la complétion de la tâche dans le DOM
        task.markTaskAsComplete(taskElement);
    },

    // #############################################################
    //                            DOM
    // #############################################################

    /**
     * Méthode permettant de terminer/compléter une tâche visuellement dans la page
     * 
     * @param {HTMLElement} taskElement 
     */
    markTaskAsComplete: function(taskElement) {
        // On enlève la classe task--todo
        // taskElement.classList.remove('task--todo');
        // On ajoute la classe task--complete
        // taskElement.classList.add('task--complete');
        // On peut aussi le faire en 1 seule ligne avec replace
        // Doc : https://developer.mozilla.org/fr/docs/Web/API/Element/classList
        taskElement.classList.replace('task--todo','task--complete');
    },

    /**
     * Méthode permettant de créer un nouvel élément tâche (sans l'ajouter dans le DOM)
     * 
     * @param {String} newTaskTitle 
     * @param {String} newTaskCategoryName 
     * @param {Number} newTaskId
     * 
     * @return {HTMLElement}
     */
    createTaskElement: function(newTaskTitle, newTaskCategoryName, newTaskId) {

        // --------------------------------------------------
        // Création du clone
        // --------------------------------------------------

        // On crée une copie du template de tâche
        // et on obtient un fragment de document qui n'appartient pas au DOM de la page
        const taskCloneElement = document.getElementById('task-template').content.cloneNode(true);
        // Le taskCloneElement est en fait enrobé dans un #document-fragment
        // Le fragment de document sert de container à l'élément "task"
        // console.log(taskCloneElement);

        // Ainsi, si on veut travailler directement avec l'élément "task"
        // on doit récupérer le contenu à l'intérieur du fragment de document

        // L'élément "task" est le premier enfant du fragment de document
        const newTaskElement = taskCloneElement.firstElementChild;
        // console.log(newTaskElement);

        // --------------------------------------------------
        // Mise à jour des données de la nouvelle tâche
        // --------------------------------------------------

        // Titre de la tâche
        task.updateTaskTitle(newTaskElement, newTaskTitle);

        // Nom de la catégorie
        task.updateTaskCategoryName(newTaskElement, newTaskCategoryName);

        // ID de la tâche
        task.updateTaskId(newTaskElement, newTaskId);

        // ---------------------------------------------------- 
        // On n'oublie pas d'ajouter les écouteurs d'évènement
        // ----------------------------------------------------
        task.bindSingleTaskEvents(newTaskElement);

        // on retourne l'élément nouvelle tâche
        // /!\ A ce stade, l'élément n'a toujours pas été ajouté dans le DOM /!\
        return newTaskElement;
    },

    /**
     * Méthode gérant la mise à jour du titre d'une tâche (DOM ou fragment)
     * 
     * @param {HTMLElement} taskElement La tâche à modifier
     * @param {String} taskTitle Le nouveau titre de la tâche
     */
    updateTaskTitle: function(taskElement, taskTitle) {
        // Récupération de l'élément contenant le titre de la tâche
        const taskTitleLabelElement = taskElement.querySelector('.task__title-label');
        // Mise à jour de sa valeur
        taskTitleLabelElement.textContent = taskTitle;

        // Récupération de l'élément input contenant le titre de la tâche
        const taskTitleFieldElement = taskElement.querySelector('.task__title-field');
        // Mise à jour de l'attribut value
        taskTitleFieldElement.value = taskTitle;
    },

    /**
     * Méthode gérant la mise à jour du nom de la catégorie d'une tâche
     * 
     * @param {HTMLElement} taskElement  La tâche à modifier
     * @param {String} taskCategoryName Le nouveau nom de la catégorie de la tâche
     */
    updateTaskCategoryName: function(taskElement, taskCategoryName) {
        // Mise à jour de l'attribut data-category
        taskElement.dataset.category = taskCategoryName;

        // Récupération de l'élément p contenant le nom de la catégorie
        const taskCategoryNameElement = taskElement.querySelector('.task__category > p');
        // Mise à jour de sa valeur
        taskCategoryNameElement.textContent = taskCategoryName;
    },

    /**
     * Méthode gérant la mise à jour de l'id d'une tâche
     * 
     * @param {HTMLElement} taskElement 
     * @param {Number} taskId 
     */
    updateTaskId: function(taskElement, taskId) {
        // Mise à jour de l'attribut data-id
        taskElement.dataset.id = taskId;
    }
};