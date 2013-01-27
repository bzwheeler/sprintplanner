define([
    'Backbone',
    'Underscore',
    'planner/models/story',
    "ZenAPI"
], function(Backbone, _, Story, ZenAPI) {
    var Stories = Backbone.Collection.extend({
        model: Story,

        url : function() {
            return 'https://agilezen.com/api/v1/projects/' + this.project_id + '/stories';
        },

        initialize: function(models, options) {
            this.project_id = options.project_id;
        },

        parse : function( payload ) {
            return payload.items;
        },

        comparator: function(story) {
            return story.get('priority');
        }
    });

    ZenAPI(Stories.prototype);

    return Stories;
});