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
    },
}
