class EpisodesHandler {

    constructor(upcomingList, publishedList, currentLocation, side) {
        //episodes display locations :
        this.upcomingList = upcomingList;
        this.publishedList = publishedList;
        this.currentLocation = currentLocation;
        //reader au author ?
        this.side = side;
    }

    //CREATE

    addEpisode(number, publicationDate, title, content){

        var query = new FormData();
        query.append("action", "addEpisode");
        query.append("number", number);
        query.append("publicationDate", publicationDate);
        query.append("title", title);
        query.append("content", content);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            episodesHandler.getPublishedEpisodes();
            episodesHandler.getUpcomingEpisodes();
            episodesHandler.displayNewEpisodeButton();

        });

    }


    //creates and displays a button that triggers an empty episode form display
    displayNewEpisodeButton(){

        $(episodesHandler.currentLocation).html("");

        let newEpisodeButton = $("<button>").html("Créer un nouvel épisode");
        newEpisodeButton.on("click", function(e){

            episodesHandler.workOnNewEpisode();
            e.target.remove();

        });
        $(episodesHandler.currentLocation).append(newEpisodeButton);

    }


    //READ

    //gets the next episode to be published on the blog
    getUpcomingEpisode(){

        let query = new FormData();
        query.append("action", "getUpcomingEpisodes");
        query.append("numberOfEpisodes", 1);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let upcomingEpisode = JSON.parse(response);

            episodesHandler.displayUpcomingEpisode(upcomingEpisode[0]);

        });

    }


    //get all the episodes that have not been published yet
    getUpcomingEpisodes(){

        let query = new FormData();
        query.append("action", "getUpcomingEpisodes");
        query.append("numberOfEpisodes", 100);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let upcomingEpisodes = JSON.parse(response);

            $(episodesHandler.upcomingList).html("");

            episodesHandler.displayUpcomingEpisodesList(upcomingEpisodes);

        });

    }


    //gets the latest episode published on the blog
    getLastPublishedEpisode(){

        let query = new FormData();
        query.append("action", "getLastPublishedEpisode");

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let lastPublishedEpisode = JSON.parse(response);

            //displays the episode and its comments
            $(episodesHandler.currentLocation).html("");
            episodesHandler.displayEpisode(lastPublishedEpisode);

        });

    }


    //gets all the episodes that have been published
    getPublishedEpisodes(){

        let query = new FormData();
        query.append("action", "getPublishedEpisodes");

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            let publishedEpisodes = JSON.parse(response);

            $(episodesHandler.publishedList).html("");

            episodesHandler.displayPublishedEpisodesList(publishedEpisodes);

        });

    }


    //takes an array of episodes data and displays it in the upcoming list
    displayUpcomingEpisodesList(upcomingEpisodes){

        if(upcomingEpisodes[0] != undefined){

            upcomingEpisodes.forEach(function(episodeData){

                let li = episodesHandler.createEpisodesListElement(episodeData);

                $(episodesHandler.upcomingList).append(li);

            });

        }
        else $(episodesHandler.upcomingList).append("Aucun épisode.");

    }


    //displays a one line prensentation of an upcoming episode
    displayUpcomingEpisode(upcomingEpisode){

        if(upcomingEpisode == undefined)
            $(this.upcomingList).append($("<p>").html("Le prochain épisode arrive bientôt."));
        else {
            let teaserH4 = $("<h4>").html("Episode " + upcomingEpisode.number + " : <span>" + upcomingEpisode.title + "</span>");
            $(this.upcomingList).append(teaserH4);

            let teaserP = $("<p>").html(converter.datetimeToText(upcomingEpisode.publicationDate) + ".");
            $(this.upcomingList).append(teaserP);

        }
    }


    //takes an array of episodes data and displays it in the published list
    displayPublishedEpisodesList(publishedEpisodes){

        if(publishedEpisodes[0] != undefined){

            publishedEpisodes.forEach(function(episodeData){

                let li = episodesHandler.createEpisodesListElement(episodeData);

                $(episodesHandler.publishedList).append(li);

            });

        }
        else $(episodesHandler.publishedList).append("Aucun épisode.");

    }


    //take episode data and return list element
    createEpisodesListElement(episodeData){

        let listElement = document.createElement("li");
        let contentDiv = document.createElement("div");
        let buttonsDiv = document.createElement("div");

        let publicationDate;
        if(usersHandler.side == "reader"){
            publicationDate = "";
        } else{
            publicationDate = ", " + converter.datetimeToText(episodeData.publicationDate);
        }

        let episodeLink = document.createElement("a");
        let episodeTitle = document.createElement("h4");
        episodeTitle.innerHTML = "Episode " + episodeData.number + " : <span>" + episodeData.title + "</span>" + publicationDate + ".";
        episodeLink.append(episodeTitle);
        episodeLink.href = "#";
        //puts html content in a div in order to get text form after
        let episodePreview = document.createElement("div");
        episodePreview.innerHTML = episodeData.content;

        let previewP = document.createElement("p");
        previewP.innerHTML = episodePreview.textContent.substr(0, 256) + "...";
        episodeLink.append(previewP);


        episodeLink.addEventListener("click", function(e){

            if(episodesHandler.side == "reader"){

                episodesHandler.displayEpisode(episodeData);

            }
            else if(episodesHandler.side == "author"){

                episodesHandler.workOnExistingEpisode(episodeData);

            }

            e.preventDefault();

        });
        contentDiv.append(episodeLink);

        if(this.side == "author"){

            let updateButton = document.createElement("button");
            updateButton.innerHTML = "Modifier";
            updateButton.addEventListener("click", function(){

                episodesHandler.workOnExistingEpisode(episodeData);

            });
            buttonsDiv.append(updateButton);

            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Supprimer";
            deleteButton.addEventListener("click", function(){

                let toDelete = confirm("Voulez-vous supprimer l'épisode " + episodeData.number + ", " + episodeData.title + " ?");
                if(toDelete == true){

                    episodesHandler.deleteEpisode(episodeData.id);

                }

            });
            buttonsDiv.append(deleteButton);

        }

        listElement.append(contentDiv);
        listElement.append(buttonsDiv);

        return listElement;

    }


    //takes episode data and displays its full content
    displayEpisode(episodeData){

        $(this.currentLocation).html("");

        let episodeTitle = $("<h3>");
        episodeTitle.html('Episode ' + episodeData.number + ' - ' + episodeData.title);
        $(this.currentLocation).append(episodeTitle);

        let episodeContent = $("<div>");
        episodeContent.html(episodeData.content);
        $(this.currentLocation).append(episodeContent);

        commentsHandler.displayAddCommentButton(episodeData.id);

        commentsHandler.getEpisodeComments(episodeData.id, 10);

    }


    //displays an empty episode form
    workOnNewEpisode(){

        $(episodesHandler.currentLocation).html("");

        $("<h5>").html("Création d'un nouvel épisode").appendTo(episodesHandler.currentLocation);

        episodesHandler.displayEpisodeForm();

    }


    //displays an episode form
    //if episodeData is defined, it fills the inputs and adapt the submit button
    displayEpisodeForm(episodeData){

        let episodeForm = $("<form>", {
            id: "episodeForm",
            action: "#"
        });

        //episode number
        $("<label>", {
            for: "episodeNumber",
            html: "Numéro d'épisode : "
        }).appendTo(episodeForm);
        $("<input>", {
            type: "number",
            name: "episodeNumber",
            required: true
        }).appendTo(episodeForm);

        //title
        $("<label>", {
            for: "title",
            html: "Titre : "
        }).appendTo(episodeForm);
        $("<input>", {
            type: "text",
            name: "title",
            required: true
        }).appendTo(episodeForm);

        //content
        $("<textarea>", {
            id: "episodeContent",
            name: "content",
            required: true
        }).appendTo(episodeForm);

        //datetime
        $("<span>", { html: "Publication le  " }).appendTo(episodeForm);
        //day
        let selectDay = $("<select>", { id: "day" });
        for(let i=1; i <= 31; i++){
            $("<option>", {
                value: i,
                html: i
            }).appendTo(selectDay);
        }
        selectDay.appendTo(episodeForm);

        $("<span>", { html: " / " }).appendTo(episodeForm);
        //month
        let selectMonth = $("<select>", { id: "month" });
        for(let i=1; i <= 12; i++){
            $("<option>", {
                value: i,
                html: i
            }).appendTo(selectMonth);
        }
        selectMonth.appendTo(episodeForm);

        $("<span>", { html: " / " }).appendTo(episodeForm);
        //year
        let selectYear = $("<select>", { id: "year" });
        for(let i=2020; i <= 2025; i++){
            $("<option>", {
                value: i,
                html: i
            }).appendTo(selectYear);
        }
        selectYear.appendTo(episodeForm);

        $("<span>", { html: "  à  " }).appendTo(episodeForm);
        //hour
        let selectHours = $("<select>", { id: "hours" });
        for(let i=0; i <= 23; i++){
            $("<option>", {
                value: i,
                html: i
            }).appendTo(selectHours);
        }
        selectHours.appendTo(episodeForm);

        $("<span>", { html: " h " }).appendTo(episodeForm);
        //minutes
        let selectMinutes = $("<select>", { id: "minutes" });
        $("<option>", {
            value: 0,
            html: "00"
        }).appendTo(selectMinutes);
        for(let i=15; i <= 45; i = i + 15){
            $("<option>", {
                value: i,
                html: i
            }).appendTo(selectMinutes);
        }
        selectMinutes.appendTo(episodeForm);
        //submit
        $("<input>", {
            type: "submit",
            name: "submitButton",
            value: "Publier cet épisode"
        }).appendTo(episodeForm);
        //cancel
        let cancelButton =  $("<button>", { html: "Annuler" });
        cancelButton.on("click", function(){
         episodesHandler.displayNewEpisodeButton();
        });
        cancelButton.appendTo(episodeForm);

        //fills inputs if data given
        if(episodeData != undefined){

            let datetimeNumbers = converter.datetimeToInt(episodeData.publicationDate);

            episodeForm[0].episodeNumber.value = episodeData.number;
            episodeForm[0].title.value = episodeData.title;
            episodeForm[0].content.value = episodeData.content;
            episodeForm[0].day.value = datetimeNumbers.day;
            episodeForm[0].month.value = datetimeNumbers.month;
            episodeForm[0].year.value = datetimeNumbers.year;
            episodeForm[0].hours.value = datetimeNumbers.hours;
            episodeForm[0].minutes.value = datetimeNumbers.minutes;
            episodeForm[0].submitButton.value = "Mettre à jour cet épisode";

        }
        //submit event
        episodeForm.on("submit", function(e){

            tinyMCE.triggerSave();

            let publicationDate = converter.intToDatetime(e.target.day.value, e.target.month.value, e.target.year.value, e.target.hours.value, e.target.minutes.value);

            if(episodeData == undefined)
                episodesHandler.addEpisode(e.target.episodeNumber.value, publicationDate, e.target.title.value, e.target.content.value);

            else if(episodeData != undefined)
                episodesHandler.updateEpisode(episodeData.id, e.target.episodeNumber.value, publicationDate, e.target.title.value, e.target.content.value);

            $("html").animate({
                scrollTop: $("#publishedEpisodes").offset().top
            }, 1000);

            e.preventDefault();

        });

        episodeForm.appendTo(episodesHandler.currentLocation);

        tinymce.remove();

        tinymce.init({
            selector: episodesHandler.currentLocation + ' form textarea',
            menubar: false
        });

    }


    //UPDATE

    //takes episode data and displays a form filled with it
    workOnExistingEpisode(episodeData){

        $(episodesHandler.currentLocation).html("");

        $("<h5>").html('Mise à jour de l\'épisode ' + episodeData.number + " : " + episodeData.title).appendTo(episodesHandler.currentLocation);

        episodesHandler.displayEpisodeForm(episodeData);

        $("html").animate({
            scrollTop: $("#workOnEpisode").offset().top
        }, 1000);

    }


    updateEpisode(episodeId, episodeNumber, publicationDate, title, content){

        var query = new FormData();
        query.append("action", "updateEpisode");
        query.append("id", episodeId);
        query.append("number", episodeNumber);
        query.append("title", title);
        query.append("content", content);
        query.append("publicationDate", publicationDate);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            episodesHandler.getPublishedEpisodes();
            episodesHandler.getUpcomingEpisodes();
            episodesHandler.displayNewEpisodeButton();

        });

    }


    //DELETE

    deleteEpisode(episodeId){

        let query = new FormData();
        query.append("action", "deleteEpisode");
        query.append("episodeId", episodeId);

        ajaxPost("http://localhost/ocp4/index.php", query, function(response){

            episodesHandler.getPublishedEpisodes();
            episodesHandler.getUpcomingEpisodes();
            episodesHandler.displayNewEpisodeButton();

        });

    }

}
