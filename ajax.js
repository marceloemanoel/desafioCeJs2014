(function(window){
    window.ajax = function(route, options) {
        var data = options.data || {},
            success = options.success || function(response){},
            error = options.error || function(response){},
            request = new XMLHttpRequest();
        
        request.open(route.method, route.url, true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        request.addEventListener("load", function(evt) {
            success(JSON.parse(request.responseText), request);
        });
        request.addEventListener("error", function(evt) {
            error(request);
        });

        if(method === 'POST') {
            request.send(data);
        }
        else {
            request.send();
        }
    };
})(window);
