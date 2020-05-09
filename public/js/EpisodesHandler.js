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
        ajaxPost("index.php", query, function(response){
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

    getEpisode(episodeNumber){
        let query = new FormData();
        query.append("action", "getEpisode");
        query.append("episodeNumber", episodeNumber);
        ajaxPost("index.php", query, function(response){
            let episodeData = JSON.parse(response);
            episodesHandler.displayEpisode(episodeData);
        });
    }

    //gets the next episode to be published on the blog
    getUpcomingEpisode(){
        let query = new FormData();
        query.append("action", "getUpcomingEpisodes");
        query.append("numberOfEpisodes", 1);
        ajaxPost("index.php", query, function(response){
            let upcomingEpisode = JSON.parse(response);
            episodesHandler.displayUpcomingEpisode(upcomingEpisode[0]);
        });
    }

    //get all the episodes that have not been published yet
    getUpcomingEpisodes(){
        let query = new FormData();
        query.append("action", "getUpcomingEpisodes");
        query.append("numberOfEpisodes", 100);
        ajaxPost("index.php", query, function(response){
            let upcomingEpisodes = JSON.parse(response);
            $(episodesHandler.upcomingList).html("");
            episodesHandler.displayUpcomingEpisodesList(upcomingEpisodes);
        });
    }

    //gets the latest episode published on the blog
    getLastPublishedEpisode(){
        let query = new FormData();
        query.append("action", "getPublishedEpisodes");
        query.append("numberOfEpisodes", JSON.stringify(1));
        query.append("sortOrder", "desc");
        ajaxPost("index.php", query, function(response){
            let lastPublishedEpisode = JSON.parse(response);
            //displays the episode and its comments
            $(episodesHandler.currentLocation).html("");
            episodesHandler.displayEpisode(lastPublishedEpisode[0]);
        });
    }

    //gets all the episodes that have been published
    getPublishedEpisodes(sortOrder){
        let query = new FormData();
        query.append("action", "getPublishedEpisodes");
        query.append("numberOfEpisodes", JSON.stringify(null));
        query.append("sortOrder", sortOrder);
        ajaxPost("index.php", query, function(response){
            let publishedEpisodes = JSON.parse(response);
            $(episodesHandler.publishedList).html("");
            episodesHandler.displayPublishedEpisodesList(publishedEpisodes);
        });
    }

    //takes an array of episodes data and displays it in the upcoming list
    displayUpcomingEpisodesList(upcomingEpisodes){
        if(upcomingEpisodes[0] != undefined){
            upcomingEpisodes.forEach(function(episodeData){
                $(episodesHandler.upcomingList).append(episodesHandler.createEpisodesListElement(episodeData));
            });
        }
        else $(episodesHandler.upcomingList).append("Aucun épisode.");
    }

    //displays a one line prensentation of an upcoming episode
    displayUpcomingEpisode(upcomingEpisode){
        if(upcomingEpisode == undefined)
            $(this.upcomingList).append($("<p>").html("Le prochain épisode arrive bientôt."));
        else {
            $(this.upcomingList).append($("<h4>").html("Episode " + upcomingEpisode.number + " : <span>" + upcomingEpisode.title + "</span>"));
            $(this.upcomingList).append($("<p>").html(converter.datetimeToText(upcomingEpisode.publicationDate) + "."));
        }
    }

    //takes an array of episodes data and displays it in the published list
    displayPublishedEpisodesList(publishedEpisodes){
        if(publishedEpisodes[0] != undefined){
            publishedEpisodes.forEach(function(episodeData){
                $(episodesHandler.publishedList).append(episodesHandler.createEpisodesListElement(episodeData));
            });
            if(usersHandler.side == "reader")
                $(episodesHandler.publishedList + " li:first-child div").css("backgroundColor", "#dddddd");
        }
        else $(episodesHandler.publishedList).append("Aucun épisode.");
    }

    //take episode data and return list element
    createEpisodesListElement(episodeData){
        let listElement = $("<li>");
        let contentDiv = $("<div>");
        let buttonsDiv = $("<div>");
        let publicationDate;
        if(usersHandler.side == "reader"){
            publicationDate = "";
        } else{
            publicationDate = ", " + converter.datetimeToText(episodeData.publicationDate);
        }
        let episodeLink = $("<a>");
        episodeLink.href= "#";
        episodeLink.append($("<h4>").html("Episode " + episodeData.number + " : <span>" + episodeData.title + "</span>" + publicationDate + "."));
        let episodePreview = $("<div>").html(episodeData.content); //puts html content in a div in order to get plain text
        episodeLink.append($("<p>").html(episodePreview.text().substr(0, 180) + "..."));
        episodeLink.on("click", function(e){
            if(episodesHandler.side == "reader"){
                episodesHandler.displayEpisode(episodeData);
                //background coloration of the selected list element
                let liElements = episodeLink[0].parentElement.parentElement.parentElement.children;
                for(let i = 0; i < liElements.length; i++){
                    liElements[i].children[0].style.backgroundColor = "#f2f2f2";
                }
                episodeLink[0].parentElement.style.backgroundColor = "#dddddd";
            }
            else if(episodesHandler.side == "author"){
                episodesHandler.workOnExistingEpisode(episodeData);
            }
            e.preventDefault();
        });
        contentDiv.append(episodeLink[0]);
        if(usersHandler.side == "author"){
            buttonsDiv.append($("<button>").html("Modifier").on("click", function(){
                episodesHandler.workOnExistingEpisode(episodeData);
            }));
            buttonsDiv.append($("<button>").html("Supprimer").on("click", function(){
                if(confirm("Voulez-vous supprimer l'épisode " + episodeData.number + ", " + episodeData.title + " ?")){
                    episodesHandler.deleteEpisode(episodeData.id);
                }
            }));
        }
        listElement.append(contentDiv);
        listElement.append(buttonsDiv);
        return listElement;
    }

    //takes episode data and displays its full content
    displayEpisode(episodeData){
        $(this.currentLocation).html("");
        $(this.currentLocation).append($("<h3>").html('Episode ' + episodeData.number + ' - ' + episodeData.title));
        $(this.currentLocation).append($("<div>").html(episodeData.content));
        commentsHandler.displayAddCommentButton(episodeData.id);
        commentsHandler.getEpisodeComments(episodeData.id, 10);
    }

    //displays an empty episode form
    workOnNewEpisode(){
        $(episodesHandler.currentLocation).html("");
        $(episodesHandler.currentLocation).append($("<h5>").html("Création d'un nouvel épisode"));
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
        episodeForm.append($("<button>").html("Annuler").on("click", function(){
            episodesHandler.displayNewEpisodeButton();
        }));
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
        $(episodesHandler.currentLocation).append($("<h5>").html('Mise à jour de l\'épisode ' + episodeData.number + " : " + episodeData.title));
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
        ajaxPost("index.php", query, function(response){
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
        ajaxPost("index.php", query, function(response){
            episodesHandler.getPublishedEpisodes();
            episodesHandler.getUpcomingEpisodes();
            episodesHandler.displayNewEpisodeButton();
        });
    }
}
