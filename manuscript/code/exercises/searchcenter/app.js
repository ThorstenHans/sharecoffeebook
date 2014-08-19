var SearchService = function () {

    this.doSearch = function (queryText, onResultsReceived, onError) {

        var options = new ShareCoffee.QueryProperties();
        options.querytext = queryText;

        $.ajax(ShareCoffee.REST.build.read.for.jQuery(options))
            .done(onResultsReceived)
            .fail(onError);
    };
};

var onResultsReceived = function(data) {
    var resultArea = $("#results");
    resultArea.empty();
    $(".panel-danger").hide();
    var template = "<div class='panel panel-default'><div class='panel-body'>{0}</div></div>";
    var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
    for (var i = 0; i < results.length; i++) {
        var itemTitle = results[i].Cells.results[3].Value;
        resultArea.append(template.replace("{0}", itemTitle));
    }
    
};

var onSearchError = function(req, textStatus, errorThrown) {
    $("#search-error").text("Error: " + textStatus);
    $(".panel-danger").show();
    console.log(errorThrown);
};

$(document).ready(function (e) {
    var searchService = new SearchService();
    $("#do-search").click(function () {
        var queryText = $("#query-text").val();
        searchService.doSearch(queryText, onResultsReceived, onSearchError);
 
        return false;
    });
});