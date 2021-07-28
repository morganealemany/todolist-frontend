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

        // ----------------------------------------------------------------
        // Ecoute de l'évènement permettant de rendre une tâche incomplète
        // ----------------------------------------------------------------
        taskElement.querySelector('.task__button--incomplete').addEventListener('click', task.handleUncompleteTask);

        // ----------------------------------------------------------------
        // Ecoute de l'évènement permettant d'archiver une tâche
        // ----------------------------------------------------------------
        taskElement.querySelector('.task__button--archive').addEventListener('click', task.handleArchiveTask);
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

        // On a également besoin d'accéder à l'élément tâche pour :
        // - mettre à jour le titre de la la tâche
        // - quitter le "mode édition"
        const taskElement = taskTitleFieldElement.closest('.task');

        // On récupère l'id de la tâche nécessaire pour la requête à l'API
        const taskId = taskElement.dataset.id;

        // -------------------------------------------------------------------
        // Requête à l'API pour mettre à jour le titre de la tâche en BDD
        // -------------------------------------------------------------------

        // On stocke les données à transférer
        const taskData = {
            title: newTaskTitle
        };

        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(taskData)
        };

        // Exécuter la requête HTTP avec FETCH
        fetch(app.apiBaseURL + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                // console.log(response);

                // Si HTTP status code à 204 => (No Content)
                if (response.status == 204) {
                    console.log('La mise à jour en bdd a été effectuée');

                    // On récupère l'élément titre de la tâche affiché à l'utilisateur
                    // - soit avec previousElementSibling => https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling
                    const taskTitleLabelElement = taskTitleFieldElement.previousElementSibling;
                    // - soit directement à partir du taskElement
                    // const taskTitleLabelElement = taskElement.querySelector('.task__title-label');

                    // Puis remplace son contenu par le nouveau titre
                    taskTitleLabelElement.textContent = newTaskTitle;

                    // On quitte le "mode édition"
                    taskElement.classList.remove('task--edit');
                }
                else {
                    alert('La mise à jour a échoué');
                }
            }
        );
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
        // Recherche de la tâche à laquelle appartient ce bouton
        const taskElement = taskCompleteButtonElement.closest('.task');

        // Récupération de l'id de la tâche
        // https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset
        const taskId = taskElement.dataset.id;

        // ------------------------------------------------------------------
        // Mise à jour de la complétion de la tâche en BDD via appel à l'API
        // ------------------------------------------------------------------

        // On stocke les données à transférer
        const taskData = {
            completion: 100
        };
        
        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(taskData)
        };
        
        // Exécuter la requête HTTP avec FETCH
        fetch(app.apiBaseURL + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                console.log(response);
                // Si HTTP status code à 204 => OK
                if (response.status == 204) {      
                    
                    // Modification de la complétion de la tâche dans le DOM
                    task.updateTaskCompletion(taskElement, 100);
                }
                else {
                    alert('La modification a échoué');
                }
            }
        );
    },

    /**
     * Méthode gérant le passage d'une tâche terminée à une tâche non terminée
     * lors du clic sur le bouton 'incomplete' de la tâche
     */
    handleUncompleteTask: function(evt) {

        // Récupération du bouton à l'origine de l'évènement
        const taskUncompleteButtonElement = evt.currentTarget;
        // Recherche de la tâche à laquelle appartient ce bouton
        const taskElement = taskUncompleteButtonElement.closest('.task');

        // Récupération de l'id de la tâche
        // https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset
        const taskId = taskElement.dataset.id;

        // ------------------------------------------------------------------
        // Mise à jour de la complétion de la tâche en BDD via appel à l'API
        // ------------------------------------------------------------------

        // On stocke les données à transférer
        const taskData = {
            completion: 0
        };
        
        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(taskData)
        };
        
        // Exécuter la requête HTTP avec FETCH
        fetch(app.apiBaseURL + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                console.log(response);
                // Si HTTP status code à 204 => OK
                if (response.status == 204) {      
                    
                    // Modification de la complétion de la tâche dans le DOM
                    task.updateTaskCompletion(taskElement, 0);
                }
                else {
                    alert('La modification a échoué');
                }
            }
        );
    },

    /**
     * 
     * Méthod handler permettant d'archiver une tâche
     * 
     * @param {Event} evt 
     */
    handleArchiveTask: function(evt) {

        // On récupère l'élément du DOM sur lequel l'événement a eu lieu
        const taskArchiveButtonElement = evt.currentTarget;
        console.log(taskArchiveButtonElement);

        // On récupère l'id de la tâche en cours (celle à laquelle appartient le bouton où l'événement a eu lieu)
        const taskElement = taskArchiveButtonElement.closest('.task');
        console.log(taskElement);

        // Récupération de l'id de la tâche en cours
        const taskId = taskElement.dataset.id;
        console.log(taskId);

        // Puis on lance la méthode HTTP avec le bon EndPOint : PATCH
        // ------------------------------------------------------------------
        // Mise à jour de la complétion de la tâche en BDD via appel à l'API
        // ------------------------------------------------------------------

        // On stocke les données à transférer
        const taskData = {
            status: 2
        };
        
        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(taskData)
        };
        
        // Exécuter la requête HTTP avec FETCH
        fetch(app.apiBaseURL + '/tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                console.log(response);
                // Si HTTP status code à 204 => OK
                if (response.status == 204) {      
                    alert('L\'archivage a été effectué avec succès')
                    
                    // Modification de l'affichage de la tâche
                    task.updateTaskStatus(taskElement, 2);
                }
                else {
                    alert('L\'archivage a échoué');
                }
            }
        );

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
     * Méthode permettant marquer une tâche incomplète visuellement dans la page
     * 
     * @param {HTMLElement} taskElement 
     */
     markTaskAsUncomplete: function(taskElement) {
        taskElement.classList.replace('task--complete','task--todo');
    },

    /**
     * Méthode permettant de créer un nouvel élément tâche (sans l'ajouter dans le DOM)
     * 
     * @param {String} newTaskTitle 
     * @param {String} newTaskCategoryName 
     * @param {Number} newTaskId
     * @param {Number} newTaskCompletion
     * 
     * @return {HTMLElement}
     */
    createTaskElement: function(newTaskTitle, newTaskCategoryName, newTaskId, newTaskCompletion, newTaskStatus) {

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

        // Complétion de la tâche
        task.updateTaskCompletion(newTaskElement, newTaskCompletion);

        // Statut de la tâche
        task.updateTaskStatus(newTaskElement, newTaskStatus);

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
    },

    /**
     * Méthode permettant de modifier la complétion d'une tâche
     * 
     * @param {HTMLElement} taskElement 
     * @param {Number} newCompletion 
     */
    updateTaskCompletion: function(taskElement, newCompletion) {

        if (newCompletion === 100) {
            task.markTaskAsComplete(taskElement);
        } else {
            task.markTaskAsUncomplete(taskElement);
        }

        // Bonus mettre à jour la barre de progression
        taskElement.querySelector('.progress-bar__level').style.width = newCompletion + '%';
    },

    updateTaskStatus: function(taskElement, newStatus) {

        // Si le statut de la tâche est égal à 2 (archivée)
        if (newStatus === 2) {
            // On ajoute la classe task--archive à l'élément pour modifier l'affichage
            taskElement.classList.add('task--archive');
        }
        // Si le statut de la tâche est égale à 1 (non archivée)
        if (newStatus === 1) {
            // On supprime la classe task--archive de l'élément pour modifier l'affichage
            taskElement.classList.remove('task--archive');
        }
    },


};