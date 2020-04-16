class Comments{

    //CREATE

    addComment(content, author, episodeId, callback){

        var query = new FormData();
        query.append("action", "addComment");
        query.append("content", content);
        query.append("author", author);
        query.append("episodeId", episodeId);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            var commentData = JSON.parse(response);

            callback(commentData);

        });
    };


    //READ

    // getLastCommentOfEpisode($episodeNumber){
    //
    //     let query = new FormData();
    //     query.append("action", "getEpisodeComments");
    //     query.append("episodeNumber", $episodeNumber);
    //     query.append("numberOfComments", 1);
    //
    //     ajaxPost("http://localhost/ocp4/index.php", query, function(response){
    //
    //         commentData = JSON.parse(response);
    //         return commentData;
    //
    //     });
    //
    //     return commentData;
    //
    // }


    displayComment(commentData, where){

        let li = document.createElement("li");
        //create and add comment title and content
        let div = document.createElement("div");
        div.innerHTML = commentData.author + ", " + commentData.creationDate;
        let p = document.createElement("p");
        p.innerHTML = commentData.content;
        li.append(div);
        li.append(p);

        //insert the new comment
        $(where).prepend(li);

    };


    limitListLength(list, maxLength){

        if($(list + " li").length == maxLength + 1)
            $(list + " li").last().remove();

    };

}
