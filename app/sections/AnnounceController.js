"use strict";
var AnnounceController = (function () {
    function AnnounceController(scrollMagicController, windowHeight, windowWidth) {
        this.setSelfiePortrait(scrollMagicController);
        this.setCountdownClock();
        this.setMap(windowWidth);
        // this.setBackgroundTween(windowHeight, scrollMagicController)
    }
    ;
    AnnounceController.prototype.setSelfiePortrait = function (scrollMagicController) {
        new ScrollMagic.Scene({
            triggerElement: '#announce'
        }).setTween(TweenMax.to('#announce .selfie-left', 1, { css: { 'left': "30%" } }))
            .addTo(scrollMagicController);
        new ScrollMagic.Scene({
            triggerElement: '#announce'
        }).setTween(TweenMax.to('#announce .selfie-right', 1, { css: { 'left': "70%" } }))
            .addTo(scrollMagicController);
    };
    ;
    AnnounceController.prototype.setCountdownClock = function () {
        var deadline = new Date(2017, 6 - 1, 3); //2017-6-3
        new CountdownClock('clockdiv', deadline);
    };
    ;
    AnnounceController.prototype.setBackgroundTween = function (windowHeight, scrollMagicController) {
        var sectionName = '#announce';
        new ScrollMagic.Scene({
            triggerElement: sectionName,
            triggerHook: "onEnter",
            duration: windowHeight + $(sectionName).height(),
            offset: 0
        })
            .setTween('#announce-background', {
            css: { y: '0%' },
            ease: Linear.easeNone
        })
            .addTo(scrollMagicController)
            .on("enter leave", function (e) {
        });
    };
    ;
    AnnounceController.prototype.setMap = function (windowWidth) {
        var location = '24.984038,121.5379173';
        var size = windowWidth;
        var styles = this.toStaticMapStyle([{ "stylers": [{ "hue": "#baf4c4" }, { "saturation": 10 }] }, { "featureType": "water", "stylers": [{ "color": "#effefd" }] }, { "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }]);
        var mapUrl = "https://maps.googleapis.com/maps/api/staticmap?size=" + size + "x350&scale=2&zoom=12&center=" + location + "&style=" + styles + "&key=AIzaSyDCtN623rQpU2ARtvy-Uhzr-S7xfn5QYCs";
        $('.map').attr('src', mapUrl);
    };
    ;
    AnnounceController.prototype.toStaticMapStyle = function (styles) {
        var result = [];
        styles.forEach(function (v, i, a) {
            var style = '';
            if (v.stylers.length > 0) {
                style += (v.hasOwnProperty('featureType') ? 'feature:' + v.featureType : 'feature:all') + '|';
                style += (v.hasOwnProperty('elementType') ? 'element:' + v.elementType : 'element:all') + '|';
                v.stylers.forEach(function (val, i, a) {
                    var propertyname = Object.keys(val)[0];
                    var propertyval = val[propertyname].toString().replace('#', '0x');
                    style += propertyname + ':' + propertyval + '|';
                });
            }
            result.push('style=' + encodeURIComponent(style));
        });
        return result.join('&');
    };
    ;
    return AnnounceController;
}());
exports.AnnounceController = AnnounceController;
;
var CountdownClock = (function () {
    function CountdownClock(id, endtime) {
        this.endtime = endtime.toString();
        var clock = document.getElementById(id);
        this.daysSpan = clock.querySelector('.days');
        this.hoursSpan = clock.querySelector('.hours');
        this.minutesSpan = clock.querySelector('.minutes');
        this.secondsSpan = clock.querySelector('.seconds');
        this.updateClock();
        this.timeinterval = setInterval(this.updateClock.bind(this), 200);
    }
    ;
    CountdownClock.prototype.updateClock = function () {
        var t = this.getTimeRemaining();
        this.daysSpan.innerHTML = t.days;
        this.hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        this.minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        this.secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        if (t.total <= 0) {
            clearInterval(this.timeinterval);
        }
    };
    ;
    CountdownClock.prototype.getTimeRemaining = function () {
        var t = Date.parse(this.endtime) - Date.parse(new Date().toString());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };
    ;
    return CountdownClock;
}());
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3VuY2VDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQW5ub3VuY2VDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQTtJQUVJLDRCQUNJLHFCQUEwQixFQUMxQixZQUFvQixFQUNwQixXQUFtQjtRQUduQixJQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFCLCtEQUErRDtJQUNsRSxDQUFDOztJQUdPLDhDQUFpQixHQUF6QixVQUEwQixxQkFBMEI7UUFDaEQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2xCLGNBQWMsRUFBRSxXQUFXO1NBQzlCLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQzVFLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2xDLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNsQixjQUFjLEVBQUUsV0FBVztTQUM5QixDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzthQUM3RSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN0QyxDQUFDOztJQUVPLDhDQUFpQixHQUF6QjtRQUNJLElBQUksUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtRQUNuRCxJQUFJLGNBQWMsQ0FBQyxV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