define([
    "Backbone",
    "Underscore",
    "planner/models/task_collection",
    "ZenAPI"
],
function(Backbone, _, TaskCollection, ZenAPI) {
    var Story = Backbone.Model.extend({
        initialize: function() {
            this.task_collection = new TaskCollection({
                project_id : this.get('project').id,
                story_id   : this.get('id')
            });
        },

        fetchTasks : function(callback) {
            var self = this;
            
            this.task_collection.fetch({
                success:function() {
                    callback();
                }
            });

            return this;
        },

        getTask : function(task_id) {
            return this.task_collection.get(task_id);
        },

        schedule : function() {
            this.set('scheduled', 1);
        },

        toJSON : function() {
            var rtn = _.clone(this.attributes);
            rtn.tasks = this.task_collection.toJSON();
            return rtn;
        }
    });

    Story.prototype.toJSON

    ZenAPI(Story.prototype);

    return Story;
});