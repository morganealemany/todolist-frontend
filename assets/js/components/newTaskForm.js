/**
 * Composant newTaskForm
 */
 const newTaskForm = {
 
    /**
     * Méthode initilisant notre composant gérant le formulaire d'ajout d'une tâche
     */
     init: function() {
        
        // ----------------------------------------------------------------
        // Ecoute de l'évènement permettant la soumission du formulaire d'ajout de tâche
        // ----------------------------------------------------------------
        // On récupère l'élément du DOM correspondant au formulaire
        const newTaskFormElement = document.querySelector('form');
        
        // Dès qu'on clique sur le titre de la tâche, on passe en mode édition
        newTaskFormElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);
    },

    /**
     * Méthode gérant la soumission du formulaire d'ajout d'une nouvelle tâche
     * 
     * @param {Event} evt 
     */
    handleNewTaskFormSubmit: function(evt) {
        // On bloque le comportement par défaut (le rechargement de la page) du formulaire
        evt.preventDefault();

        // On récupére l'élément sur lequel l'événement a eu lieu
        const newTaskFormElement = evt.currentTarget;
        console.log(newTaskFormElement);

        // On récupére la valeur de l'input pour le nom de la tâche
        let newTaskTitle = newTaskFormElement.querySelector('input[name="title"]').value;
        
        // Si le champ du formulaire n'est pas renseigné
        if (newTaskTitle === '') {
            // On fait apparaitre un message d'alerte
            window.alert('Tu dois saisir une tâche dans le formulaire');
            // Et on remet le focus sur l'input
            newTaskFormElement.querySelector('input[name="title"]').focus();
        } // sinon on continue notre code pour l'ajout de la tâche

        // On récupére la valeur de l'input select pour le nom de la catégorie
        let newTaskCategory = newTaskFormElement.querySelector('select').value;

        // On se sert de la balise <template> qui contient un morceau de code complet (avec balises etc) et on la clone afin d'ajouter une nouvelle tâche 
        let newTaskElement = document.getElementById('empty-task').content.cloneNode(true);

        // newTaskElement est un clone 'vide', ajoutons les infos dans ses enfants
        newTaskElement.querySelector('.task__title-label').textContent = newTaskTitle;
        newTaskElement.querySelector('.task__category > p').textContent = newTaskCategory;

        // il ne reste plus qu'à ajouter ce template à notre liste
        // pour cela on cible l'élément parent à toutes les tâches
        const tasksListElement = document.querySelector('.tasks');

        // puis on ajoute la nouvelle tâche comme enfant de l'élément parent à toutes les tâches
        tasksListElement.appendChild(newTaskElement);

        // Pour l'UX on vide les inputs une fois qu'une tâche est ajoutée pour les nouvelles saisies
        newTaskFormElement.querySelector('input[name="title"]').value = '';
        newTaskFormElement.querySelector('select').value = 'Choisir une catégorie';

        // On remet le focus sur l'input
        newTaskFormElement.querySelector('input[name="title"]').focus();
    
    },
 
}

