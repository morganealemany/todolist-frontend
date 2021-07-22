/**
 * Composant categoriesList
 */
 const categoriesList = {

    /**
     * Méthode initilisant notre composant gérant la liste des catégories
     */
    init: function() {
        categoriesList.loadCategoriesFromAPI();
    },

    loadCategoriesFromAPI: function() {
        console.log('loadCategoriesFromAPI');

        let myList = document.querySelector('ul');

        // On prépare la configuration de la requête HTTP
        let config = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
        };

        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch('https://benoclock.github.io/S07-todolist/categories.json', config)
        // Ensuite, lorsqu'on reçoit la réponse au format JSON
        .then(function(response) {
            // On convertit cette réponse en un objet JS et on le retourne
            console.log(response, response.json);
            return response.json();
        })
        // Ce résultat au format JS est récupéré en argument ici-même
        .then(function(data) {
            console.log(data);
            // On dispose désormais d'un tableau JS exploitable dans la variable data
            // La suite dépend de l'utilisation qu'on veut faire de ces données
            
            }
        );

    },
}
