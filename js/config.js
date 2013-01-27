require.config({
    baseUrl: 'js/',
    paths: {
        text:         'vendor/require/text',
        jQuery:       'vendor/jquery/jquery-1.9.0.min',
        jQueryUI:     'vendor/jquery/jquery-ui-1.10.0.custom.min',
        Underscore:   'vendor/underscore/underscore.min',
        Backbone:     'vendor/backbone/backbone.min',
        Bootstrap:    'vendor/bootstrap/bootstrap.min',
        Handlebars:   'vendor/handlebars/handlebars',
        Evented:      'common/utils/event_manager',
        ZenAPI:       'zen_api'
    },
    shim: {
        'Backbone': {
            deps:    ['Underscore', 'jQuery'],
            exports: 'Backbone'
        },
        'Handlebars': {
            exports: 'Handlebars'
        },
        'jQuery': {
            exports: function() {
                return jQuery.noConflict();
            }
        },
        'jQueryUI': {
            deps : ['jQuery']
        },
        'Underscore': {
            exports: '_'
        },
        'Bootstrap': {
            deps: ['jQuery']
        }
    }
});