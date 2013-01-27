define([
    'jQuery',
    'Backbone',
    'Underscore',
    'Handlebars',
    'Evented',
    'text!planner/templates/task.hbs'
],
function($, Backbone, _, Handlebars, Evented, TaskTemplate) {

    var Calendar = Backbone.View.extend({

        taskTemplate : Handlebars.compile(TaskTemplate),

        initialize : function() {
            _.bindAll(this, 'onTaskDrop');

            // make all the days available as drop targets for a task
            this.$el.find('div.day').droppable({
                tolerance: 'pointer',
                drop : this.onTaskDrop
            });
        },

        onTaskDrop : function(evt, object) {
            var $day     = $(evt.target),
                $context = $(object.draggable.context),
                story_id = $context.data('story-id'),
                task_id  = $context.data('id'),
                story    = this.model.get(story_id),
                task     = story.getTask(task_id),
                day      = $day.data('day');

            task.set('day', day);
            task.set('story_color', story.get('color'));

            // remove the old task item
            this.$el.find('.task[data-id=' + task_id + ']').remove();

            var $task = $(this.taskTemplate(task.toJSON()));

            $day.append($task);
            $task.draggable();

            this.pub('task-scheduled', {
                story: story,
                task : task,
                day  : day
            });
        }
    });

    Evented(Calendar.prototype);

    return Calendar;
});