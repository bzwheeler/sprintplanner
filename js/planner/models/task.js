define([
    "Backbone",
    "Underscore",
    "ZenAPI"
],
function(Backbone, _, ZenAPI) {
    var Task = Backbone.Model.extend({
        initialize: function() {
        },

        type : function() {
            return 'foo';
        }
    });

    ZenAPI(Task.prototype);

    return Task;
});