define([
    'jQuery',
    'Backbone',
    'Underscore',
    'Handlebars',
    'Evented',
    'text!planner/templates/stories.hbs',
    'text!planner/templates/add_story.hbs'
],
function($, Backbone, _, Handlebars, Evented, SprintStoriesTemplate, StoryPickerTemplate) {

    var StoryPicker = Backbone.View.extend({
        events : {
            'click #addStoryBtn' : 'renderStoryPicker'
        },

        subscribers : {
            'task-scheduled' : 'onTaskScheduled'
        },

        template       : Handlebars.compile(SprintStoriesTemplate),
        pickerTemplate : Handlebars.compile(StoryPickerTemplate),

        initialize : function() {
            _.bindAll(this, 'render', 'addStory');
            this.render();

            // register a helper that will be used to display the
            // first task in the story that has not yet been scheduled
            Handlebars.registerHelper('topTask', function(tasks, options) {
                var top   = null,
                    count = 0;

                if (tasks.length) {
                    for(var i=0, l=tasks.length; i<l; i++) {
                        if (!tasks[i].day) {
                            if (!top) top = tasks[i];
                            count++;
                        }
                    }
                }

                if(top) {
                    // add a count of how many tasks have not yet been scheduled
                    top.count = count;
                    return options.fn(top);
                }

                return "";
            });
        },

        addStory : function(event) {
            var storyId = $(event.target).closest('.story').data('id');
            var story   = this.model.get(storyId);

            this.$storyPicker.modal('hide');

            story.schedule();
            story.fetchTasks(this.render);
        },

        renderStoryPicker : function() {
            var self = this;

            if (!this.$storyPicker) {
                this.model.fetch({
                    success : function() {
                        self.$storyPicker = $(self.pickerTemplate({
                            stories : self.model.toJSON()
                        }));
                        self.$storyPicker.find('.story').on('click', self.addStory);
                        $('body').append(self.$storyPicker);
                        self.$storyPicker.modal('show');
                    }
                });
            } else {
                this.$storyPicker.modal('show');
            }
        },

        render : function() {
            this.$el.html(this.template({
                stories : this.model.toJSON()
            }));

            this.$el.find('.task').draggable({
                distance: 10,
                cursorAt: {
                    left: 8,
                    top:8
                },
                helper: function(evt){
                    return $('<div class="sticky_note"></div>');
                }
            });
        },

        onTaskScheduled : function(target, data) {
            this.render();
        }
    });

    Evented(StoryPicker.prototype);

    return StoryPicker;
});