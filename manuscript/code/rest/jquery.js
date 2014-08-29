function readListMetadata(onSuccess, onError){

    var requestUri = getRequestUri("/web/lists/?$Select=Id,Title,Description");
    $.ajax({
        url: requestUri,
        type: "GET",
        contentType: 'application/json',
        headers: { 
            "Accept": "application/json;odata=verbose" 
        }
    })
    .done(onSuccess)
    .fail(onError);
}

function getRequestUri(appendix){

    if ((typeof _spPageContextInfo !== "undefined" && 
        _spPageContextInfo !== null) && 
        (_spPageContextInfo.webAbsoluteUrl != null)) {
        return  _spPageContextInfo.webAbsoluteUrl + appendix;
    }else{
        var appWebUrl = 
            decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
        return appWebUrl + appendix;
    }
}


function getQueryStringParameter(name){ 

    var params =
        document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == name)
            return singleParam[1];
    }
}