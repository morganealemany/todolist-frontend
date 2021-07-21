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
        console.log(newTaskFormElement);
        // Dès qu'on clique sur le titre de la tâche, on passe en mode édition
        newTaskFormElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);
    },

    /**
     * Méthode gérant la soumission du formulaire d'ajout d'une nouvelle tâche
     * 
     * @param {Event} evt 
     */
    handleNewTaskFormSubmit: function(evt) {
        evt.preventDefault();
        console.log('Soumission du formulaire');
    },
 
}

