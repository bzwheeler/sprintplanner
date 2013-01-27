require(['../config'],
    function(config){
    require([
        'jQuery',
        'planner/router',
        'Backbone',
        'jQueryUI',
        'Spotlight',
        'Bootstrap'
    ], function($, Router, Backbone) {
        // pretend we have opacity support so that spotlights will appear even in IE8
        $.support.opacity = true;
        // this is a fix for bootstrap dropdowns on touch devices
        // https://github.com/twitter/bootstrap/issues/2975#issuecomment-6659992
        $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
        Backbone.history.start();
    });
});
