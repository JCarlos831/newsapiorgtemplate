/*global $ APIKEY*/
$(document).ready(function() {
      $.ajax({
      method: "GET",
      url: "https://newsapi.org/v2/sources",
      data: { category: "technology", country: "us",  language: "en", apiKey: APIKEY},
      success: function(data){
          if(data.status === "ok"){
              console.log(data);
              for(var i = 0; i<data.sources.length; i++){
                  var source = document.createElement("OPTION");
                  source.setAttribute("value", data.sources[i].id);
                  source.innerHTML = data.sources[i].name;
                  document.getElementById("selection").appendChild(source);
              }
          }
      }

    });
    
    $("#source").submit(function(event){
        event.preventDefault();
        document.getElementById("results").innerHTML = "";
        var idName = document.getElementById("selection").value;
        // console.log(idName);
    
      $.ajax({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines",
        data: {sources: idName, apikey: APIKEY},
        success: function(data){
            if(data.status === "ok"){
                console.log(data);
                $("#results");
                for(var i = 0; i < data.articles.length; i++){
                    var article = document.createElement("P");
                    var headlineLink = document.createElement("a");
                    headlineLink.setAttribute("target", "_blank");
                    // article.setAttribute("class", "col-sm-6");
                    // article.innerHTML = data.articles[i].title;
                    // article.innerHTML = data.articles[i].description;
                    headlineLink.href = data.articles[i].url;
                    headlineLink.innerHTML = data.articles[i].title;
                    document.getElementById("results").appendChild(article).appendChild(headlineLink);
                }
            }
        }
  
      });
    });
});