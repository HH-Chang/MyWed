﻿$(function () {

    var scrollMagicController = new ScrollMagic.Controller();


    /**
     * header
     */
    var $header = $('header');
    var $video = $header.find('video');
    $video.on('ended', function () {
        $video.fadeOut();
        $header.addClass('img-background');
        setTimeout(function () {
            $header.toggleClass('img-background');
            $video[0].play();
        }, 3000);
    });
    $video.on('play', function () {
        $video.fadeIn();
        $header.removeClass('img-background');
    });
    $video[0].play();
    var header = {
        imgScene: new ScrollMagic.Scene({
            triggerElement: 'header img',
            duration: 1600,
            offset: 0
        }),
        imgAction: TweenMax.to('header img', 0.5, {
            autoAlpha: 0,
            scale: 0.1,
            force3D: true
        }),
        navScene: new ScrollMagic.Scene({
            triggerElement: 'main',
            duration: 100,
            offset: 0
        }),
        navAction: TweenMax.to('nav', 0.5, {
            autoAlpha: 1,
            force3D: true
        })
    };
    header.imgScene
        .setTween(header.imgAction)
        .addTo(scrollMagicController);

    header.navScene
        .setTween(header.navAction)
        .addTo(scrollMagicController);




    //var tween1 = TweenMax.to('#animation-1', 0.5, {
    //    backgroundColor: 'rgb(255, 39, 46)',
    //    scale: 2,
    //    rotation: 360
    //});

    //var scene1 = new ScrollMagic.Scene({
    //    triggerElement: '#scene-1',
    //    offset: 10
    //}).setClassToggle('body', 'scene-1-active')
    //    .setTween(tween1)
    //    .addTo(scrollMagicController);


    //var tween2 = TweenMax.to('#animation-2', 1.5, {
    //    backgroundColor: 'rgb(0, 255, 187)',
    //    scale: 5,
    //    rotation: 1080
    //});

    //var scene2 = new ScrollMagic.Scene({
    //    triggerElement: '#scene-2',
    //    offset: 30
    //}).setClassToggle('body', 'scene-2-active')
    //    .setTween(tween2)
    //    .addTo(scrollMagicController);


    //var tween3 = TweenMax.to('#animation-3', 1, {
    //    backgroundColor: 'rgb(17, 0, 98)',
    //    scale: 10,
    //    rotation: 720
    //});

    //var scene3 = new ScrollMagic.Scene({
    //    triggerElement: '#scene-3',
    //    offset: 60
    //}).setClassToggle('body', 'scene-3-active')
    //    .setTween(tween3)
    //    .addTo(scrollMagicController);



    /** 
     * 倒數計時
     */
    function CountdownClock(id, endtime) {
        this.endtime = endtime;
        this.timeinterval = null;

        var clock = document.getElementById(id);
        this.daysSpan = clock.querySelector('.days');
        this.hoursSpan = clock.querySelector('.hours');
        this.minutesSpan = clock.querySelector('.minutes');
        this.secondsSpan = clock.querySelector('.seconds');

        this.updateClock();
        this.timeinterval = setInterval(this.updateClock.bind(this), 300);
    };
    CountdownClock.prototype.updateClock = function () {
        var t = this.getTimeRemaining(this.endtime);

        this.daysSpan.innerHTML = t.days;
        this.hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        this.minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        this.secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(this.timeinterval);
        }
    };
    CountdownClock.prototype.getTimeRemaining = function () {
        var t = Date.parse(this.endtime) - Date.parse(new Date());
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

    var deadline = new Date(2017, 6 - 1, 3); //2017-6-3
    new CountdownClock('clockdiv', deadline);



    /**
     * maps
     */
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        var location = new google.maps.LatLng('24.984038', '121.5379173');
        var mapOptions = {
            zoom: 12, draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true, center: location,
            styles: [{ "featureType": "landscape", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] }, { "featureType": "poi", "stylers": [{ "saturation": -100 }, { "lightness": 51 }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "road.arterial", "stylers": [{ "saturation": -100 }, { "lightness": 30 }, { "visibility": "on" }] }, { "featureType": "road.local", "stylers": [{ "saturation": -100 }, { "lightness": 40 }, { "visibility": "on" }] }, { "featureType": "transit", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "administrative.province", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }]
        };

        var mapElement = $('.map')[0];

        var map = new google.maps.Map(mapElement, mapOptions);

        //var marker = new google.maps.Marker({
        //    position: location,
        //    map: map,
        //    title: '豪鼎飯店(北新店)'
        //});
        //var info = new google.maps.InfoWindow({
        //    content:
        //        '<a href="' +
        //        'https://www.google.com.tw/maps/place/%E8%B1%AA%E9%BC%8E%E9%A3%AF%E5%BA%97+%E5%8C%97%E6%96%B0%E6%97%97%E8%89%A6%E9%A4%A8/@24.984038,121.5379173,17z/data=!3m1!4b1!4m5!3m4!1s0x346801fed70ad06d:0x2b2b0cae3db1b50c!8m2!3d24.984038!4d121.540106' +
        //        '" target="_blank">豪鼎飯店(北新店)</a>'
        //});
        //info.open(map, marker);
    };

});