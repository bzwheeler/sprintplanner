define([
    'jQuery',
    'Backbone',
    'planner/models/story_collection',
    'planner/views/calendar',
    'planner/views/story_picker'
], function($, Backbone, StoryCollection, CalendarView, StoryListView) {

    var Router = Backbone.Router.extend({
        routes : {
            'project/:id' : 'startApp'
        },

        startApp : function(project_id) {
            this.init(project_id);
        },

        init : function(project_id) {
            if (this.initialized) return;
            this.initialized = true;

            this.initModels(project_id);
            this.initViews(project_id);
        },

        initModels : function(project_id) {
            this.stories = new StoryCollection([], {
                project_id : project_id
            });
        },

        initViews : function(project_id) {
            this.story_picker = new StoryListView({
                project_id : project_id,
                model     : this.stories,
                el        : '#stories'
            });

            this.calendar = new CalendarView({
                el    : '#calendar',
                model : this.stories
            });
        }
    });

    return new Router();
});