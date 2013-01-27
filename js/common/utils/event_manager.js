define([
    'Underscore',
    'Backbone'
],
function(_, Backbone) {

    var manager = {};
    _.extend(manager, Backbone.Events);

    function sub() {
        manager.on.apply(manager, arguments);
    }

    function unsub() {
        manager.off.apply(manager, arguments);
    }

    function pub() {
        var args = [].slice.call(arguments);
        args.splice(1, 0, this);
        // to avoid race conditions with dom updates
        // publish on a delay so that the current stack can clear
        // and the dom can fully re-render if needed
        setTimeout(function() {
            manager.trigger.apply(manager, args);    
        }, 1);
    }

    function setup(self, subscribers) {
        _.each(subscribers, function(value, key){
            sub(key, _.bind(self[value], self));
        });
    }

    var EventManager = function(obj) {
        obj.sub   = obj.subscribe   = sub;
        obj.unsub = obj.unsubscribe = unsub;
        obj.pub   = obj.publish     = pub;
        if( obj.initialize && typeof obj.initialize == 'function' && obj.subscribers && typeof obj.subscribers == 'object' ) {
            var orig = obj.initialize;
            obj.initialize = function() {
                // call the original initialize routine
                orig.apply(this, arguments);
                setup(this, this.subscribers);
            };
        }
        return obj;
    }
    
    return EventManager;
});