/*global $ APIKEY*/
$(document).ready(function() {
    
    var idName = document.getElementById("selection").value;
    
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
    
      $.ajax({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines?sources=" + idName,
        data: { sources: idName, category: "technology", country: "us", language: "en", apiKey: APIKEY},
        success: function(data){
            if(data.status === "ok"){
                console.log(data);
                $("#results");
                for(var i = 0; i < data.articles.length; i++){
                    var article = document.createElement("P");
                    article.innerHTML = data.articles[i].title;
                    document.getElementById("results").appendChild(article);
                }
            }
        }
  
      });
    });
});