define([
    'Backbone',
    'Underscore',
    'planner/models/task',
    "ZenAPI"
], function(Backbone, _, Task, ZenAPI) {
    var Tasks = Backbone.Collection.extend({
        model: Task,

        url : function() {
            return 'https://agilezen.com/api/v1/projects/' + this.project_id + '/stories/' + this.story_id + '/tasks';
        },

        initialize: function(options) {
            this.project_id = options.project_id;
            this.story_id   = options.story_id;
        },

        parse : function( payload ) {
            var items = payload.items;

            // add the story id to each task
            for(var i=0; i < items.length; i++) {
                items[i].story_id = this.story_id;
            }

            return items;
        },

        comparator: function(task) {
            return task.get('status');
        }
    });

    ZenAPI(Tasks.prototype);

    return Tasks;
});