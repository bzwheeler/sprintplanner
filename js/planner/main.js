require(['../config'],
    function(config){
    require([
        'jQuery',
        'planner/router',
        'Backbone',
        'jQueryUI',
        'Bootstrap'
    ], function($, Router, Backbone) {
        // this is a fix for bootstrap dropdowns on touch devices
        // https://github.com/twitter/bootstrap/issues/2975#issuecomment-6659992
        $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
        Backbone.history.start();
    });
});
