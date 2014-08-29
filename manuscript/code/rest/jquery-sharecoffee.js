
// verbose programming model
function readListMetadataVerbose(onSuccess, onError){
    var properties = ShareCoffee.REST.build.read.for.jQuery(
    {
        url: 'web/lists/?$Select=Id,Name,Description'
    });

    $.ajax(properties)
    .done(onSuccess)
    .fail(onError);
}

// shorter programming model
function readListMetadataShort(onSuccess, onError){

    $.ajax(ShareCoffee.REST.build.read.for.jQuery({
        url: 'web/lists/?$Select=Id,Name,Description'
    })).done(onSuccess).fail(onError);
}

// shortest programming model
function readListMetadataShortest(onSuccess, onError){

    $.ajax($s.REST.build.read.f.jQuery({
        url: 'web/lists/?$Select=Id,Name,Description'
    })).done(onSuccess).fail(onError);
}