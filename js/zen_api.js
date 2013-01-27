define([
    'Backbone'
],
function(Backbone) {
    var api_key = document.getElementById('zen_api_key');

    if (api_key && api_key.value && api_key.value != '') {
        api_key = api_key.value;
    } else {
        api_key = null;
    }

    var ZenAPI = function(prototype) {
        if (api_key) {
            var orig_sync = prototype.sync || Backbone.sync;
            prototype.sync = function(method, model, options) {
                options || (options = {});

                var orig_before_send = options.beforeSend;

                options.beforeSend = function(xhr) {
                    xhr.setRequestHeader("X-Zen-ApiKey", api_key);
                    if (orig_before_send) orig_before_send.apply(this, arguments);
                }
                
                return orig_sync.apply(this, arguments);
            }
        }

        return prototype;
    }

    return ZenAPI;
});