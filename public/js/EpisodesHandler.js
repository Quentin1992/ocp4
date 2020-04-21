class EpisodesHandler {

    constructor(upcomingLocation, publishedLocation, currentLocation, side) {
        //episodes display locations :
        this.upcomingLocation = upcomingLocation;
        this.publishedLocation = publishedLocation;
        this.currentLocation = currentLocation;
        //reader au author ?
        this.side = side;
    }

    //CREATE


    //READ

    //gets the next episode to be display on the blog
    getUpcomingEpisode(){

        let query = new FormData();
        query.append("action", "getUpcomingEpisode");

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let upcomingEpisode = JSON.parse(response);

            $(episodesHandler.upcomingLocation).html();

            episodesHandler.displayUpcomingEpisode(upcomingEpisode);

        });

    }


    //displays a one line prensentation of an episode
    displayUpcomingEpisode(upcomingEpisode){

        let p = document.createElement("p");

        if(upcomingEpisode.title == null)
            p.innerHTML = "Le prochain épisode arrive bientôt."
        else {
            p.innerHTML = "Prochain épisode : " + upcomingEpisode.number
                + " - <span>" + upcomingEpisode.title + "</span>, "
                + upcomingEpisode.publicationDate;
        }
        $(this.upcomingLocation).append(p);
    }


    //gets the latest episode published on the blog
    getLastPublishedEpisode(){

        let query = new FormData();
        query.append("action", "getLastPublishedEpisode");

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let lastPublishedEpisode = JSON.parse(response);

            $(episodesHandler.publishedLocation + " p").remove();

            episodesHandler.displayEpisode(lastPublishedEpisode);

        });

    }


    //gets all the episodes that have been published on the blog
    getPublishedEpisodes(){

        let query = new FormData();
        query.append("action", "getPublishedEpisodes");

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let publishedEpisodes = JSON.parse(response);

            episodesHandler.displayPublishedEpisodesList(publishedEpisodes);

        });

    }


    //displays a one line presentations list of the published episodes
    displayPublishedEpisodesList(publishedEpisodes){

        if(publishedEpisodes[0].title != null){

            $(this.publishedLocation).html("");

            let episodesList = $("<ol>");

            publishedEpisodes.forEach(function(episodeData){

                let listElement = episodesHandler.createEpisodesListElement(episodeData);

                episodesList.append(listElement);

            });

            $(this.publishedLocation).append(episodesList);

        }
        else{

            $(this.publishedLocation).html("");

            let p = document.createElement("p");
            p.innerHTML = "Aucun épisode publié pour le moment";
            $(displayLocation).append(p);

        }
    }


    createEpisodesListElement(episodeData){

        let listElement = document.createElement("li");

        let episodeLink = document.createElement("a");
        episodeLink.innerHTML = episodeData.number + " : " + episodeData.title + ".";
        episodeLink.href = "#";
        episodeLink.addEventListener("click", function(e){

            episodesHandler.displayEpisode(episodeData);

            e.preventDefault();

        });
        listElement.append(episodeLink);

        if(this.side == "author"){

            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Supprimer";
            deleteButton.addEventListener("click", function(){
                episodesHandler.deleteEpisode(episodeData.id, side);
            });
            li.append(deleteButton);

        }

        $(episodesHandler.listLocation).append(listElement);

        return listElement;

    }


    displayEpisode(episodeData){

        $(this.currentLocation).html("");

        let episodeTitle = $("<h3>");
        episodeTitle.html(episodeData.number + ' - ' + episodeData.title);
        $(this.currentLocation).append(episodeTitle);

        let episodeContent = $("<p>");
        episodeContent.html(episodeData.content);
        $(this.currentLocation).append(episodeContent);

        commentsHandler.displayAddCommentButton(episodeData.id);

        commentsHandler.getEpisodeComments(episodeData.id, 10);

    }


    //UPDATE


    //DELETE

    deleteEpisode(episodeId){

        let query = new FormData();
        query.append("action", "deleteEpisode");
        query.append("episodeId", episodeId);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            episodesHandler.getPublishedEpisodes();

        });

    }

}
