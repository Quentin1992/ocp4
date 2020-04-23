class Converter {

    //turn "2020-01-01 00:00:00" into "le 01/01/2020 à 00:00"
    datetimeToTextConverter(datetime){

        let date = new Date(datetime);

        let day = date.getDate();
        if(day.toString().length < 2) { day = "0" + day; }

        let month = date.getMonth() + 1;
        if(month.toString().length < 2) { month = "0" + month; }

        let year = date.getFullYear();

        let hours = date.getHours();
        if(hours.toString().length < 2) { hours = "0" + hours; }

        let minutes = date.getMinutes();
        if(minutes.toString().length < 2) { minutes = ("0" + minutes); }

        let text = "le " + day + "/" + month + "/" + year + " à " + hours + "h" + minutes;

        return text;

    }


    //turn separate numbers into "2020-01-01 00:00:00" format
    intToDatetimeConverter(day, month, year, hour, minute){

        if(day.length < 2){ day = "0" + day; }
        if(month.length < 2){ month = "0" + month; }
        if(hour.length < 2) { hour = "0" + hour; }
        if(minute.length < 2) { minute = "0" + minute; }

        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":00";

    }


    //turn a "2020-01-01 00:00:00" datetime into separate numbers in array
    datetimeToIntConverter(datetime){

        let date = new Date(datetime);

        let datetimeNumbers = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            hours: date.getHours(),
            minutes: date.getMinutes()
        };

        return datetimeNumbers;

    }

}
