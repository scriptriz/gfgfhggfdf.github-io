if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

jQuery( document ).ready(function() {
    var mainVideo = document.getElementById("mindgrub-video");
    var pathToVideoDir = 'https://mindgrub.com/sites/default/files/homepage-video';

    var pathsToVideoFiles = {
        MP4smallVersionSrc : pathToVideoDir + '/MG_Video_640.mp4',
        MP4mediumVersionSrc : pathToVideoDir + '/MG_Video_1200.mp4',
        MP4largeVersionSrc : pathToVideoDir + '/MG_Video_1920.mp4',
        WEBMsmallVersionSrc : pathToVideoDir + '/MG_Video_640.webm',
        WEBMmediumVersionSrc : pathToVideoDir + '/MG_Video_1200.webm',
        fallbackSrc : "http://akendos.com/lightbulb.gif"
    };

    var timeConfig = {
        delayBeforeTextAppears : 550,
        verticalBarsSpeed : 450,
        verticalBarsDelay : -100,
        headingsSpeed : 300,
        headingsDelay : 100,
        subtitlesSpeed : 120,
        subtitlesDelay : 20,
        linksSpeed : 120,
        delayBeforeFadingOut : 3600,
        fadeOutSpeed : 800,
        delayBetweenSlides : 2000
    }

    var hasVideoStarted = false;
    var videoWillPlay = false;

    setVideoSources(mainVideo, pathsToVideoFiles);
    resetAnimation(timeConfig);

    mainVideo.onloadedmetadata = function() {
        videoWillPlay = true;
    };
  
  mainVideo.onplaying = function () {
    
      //alert('pla');
  }

    mainVideo.oncanplay = function() {
        if(!hasVideoStarted) {
            resetAnimation(timeConfig);
            startTextWithDelay(timeConfig);
            hasVideoStarted = true;
        }
    };

    mainVideo.onended = function() {
        mainVideo.play();
        resetAnimation(timeConfig);
        startTextWithDelay(timeConfig);
    };

    /*
    * reload video when the window is resized
    * including basic debounce code
    */
    /*var body = document.querySelector('body');
    var resizeId;
    body.onresize = function(){
        hasVideoStarted = false;
        clearTimeout(resizeId);
        resizeId = setTimeout(function (){
            resetAnimation(timeConfig);
            setVideoSources(mainVideo, pathsToVideoFiles);
            mainVideo.load();
        }, 500);
    }*/

    /*
    * load fallback GIF after 3/4 of a second and start Text animation over it
    */
    /*setTimeout(function (){
        if(!hasVideoStarted && !videoWillPlay) {
            mainVideo.poster = pathsToVideoFiles.fallbackSrc;
            startTextOnFallBack (timeConfig)
        }
    }, 750);*/

});

/*function startTextOnFallBack (timeConfig) {
    startAnimation(timeConfig);
    setInterval( function() {
        resetAnimatedElements(timeConfig);
        startAnimation(timeConfig);
    }, 22000);
}*/

function startTextWithDelay(timeConfig) {
    setTimeout(function(){
        startAnimation(timeConfig);
    }, timeConfig.delayBeforeTextAppears);
}

function setVideoSources(video, paths) {
    removeChildrenBySelector(video, "source");

    var sourceMP4 = document.createElement("source");
    sourceMP4.type = "video/mp4";

    var sourceWEBM = document.createElement("source");
    sourceWEBM.type = "video/webm";

    var body = document.querySelector('body');

    if ( jQuery(window).width() <= 640 ) {
        sourceMP4.src = paths.MP4smallVersionSrc;
        sourceWEBM.src = paths.WEBMsmallVersionSrc;
    } else if( jQuery(window).width() > 640 && jQuery(window).width() < 1200 ) {
        sourceMP4.src= paths.MP4mediumVersionSrc;
        sourceWEBM.src= paths.WEBMmediumVersionSrc;
    }else {
        sourceMP4.src= paths.MP4largeVersionSrc;
    }

    video.appendChild(sourceMP4);
    if(sourceWEBM.src !== undefined && sourceWEBM.src !== '') {
        video.appendChild(sourceWEBM);
    }

}

function resetAnimation(times){
    stopAllTimeouts();
    resetAnimatedElements(times);
}

function resetAnimatedElements(times){
    setTransitionsDuration(times);
    removeTransitionClasses();
    adjustVerticalBarsHeight();
}

function startAnimation(times) {

    var overrideTransitionDuration = true;

    toggleVisibleContainer(".container-1");
    applyTransitionCssClass(".container-1 .vertical-bar", "fadeInAndGrow", times.verticalBarsSpeed, times.verticalBarsDelay)
    .then(function(){return applyTransitionCssClass(".container-1 .overlay-heading", "fadeInAndSlideUp", times.headingsSpeed, times.headingsDelay)})
    .then(function(){return applyTransitionCssClass(".container-1 .overlay-subtitle", "fadeInAndSlideUp", times.subtitlesSpeed, times.subtitlesDelay)})
    .then(function(){return applyTransitionCssClass(".container-1 .overlay-link", "fadeInAndSlideUp", times.linksSpeed, times.delayBeforeFadingOut)})
    .then(function(){return applyTransitionCssClass(".container-1 *", "fadeOut", times.fadeOutSpeed, times.delayBetweenSlides, overrideTransitionDuration)})
    .then(function(){toggleVisibleContainer(".container-2")})
    .then(function(){return applyTransitionCssClass(".container-2 .vertical-bar", "fadeInAndGrow", times.verticalBarsSpeed, times.verticalBarsDelay)})
    .then(function(){return applyTransitionCssClass(".container-2 .overlay-heading", "fadeInAndSlideUp", times.headingsSpeed, times.headingsDelay)})
    .then(function(){return applyTransitionCssClass(".container-2 .overlay-subtitle", "fadeInAndSlideUp", times.subtitlesSpeed, times.subtitlesDelay)})
    .then(function(){return applyTransitionCssClass(".container-2 .overlay-link", "fadeInAndSlideUp", times.linksSpeed, times.delayBeforeFadingOut)})
    .then(function(){return applyTransitionCssClass(".container-2 *", "fadeOut", times.fadeOutSpeed, times.delayBetweenSlides-800, overrideTransitionDuration)})
    .then(function(){toggleVisibleContainer(".container-3")})
    .then(function(){return applyTransitionCssClass(".container-3 .vertical-bar", "fadeInAndGrow", times.verticalBarsSpeed, times.verticalBarsDelay)})
    .then(function(){return applyTransitionCssClass(".container-3 .overlay-heading", "fadeInAndSlideUp", times.headingsSpeed, times.headingsDelay)})
    .then(function(){return applyTransitionCssClass(".container-3 .overlay-subtitle", "fadeInAndSlideUp", times.subtitlesSpeed, times.subtitlesDelay)})
    .then(function(){return applyTransitionCssClass(".container-3 .overlay-link", "fadeInAndSlideUp", times.linksSpeed, times.delayBeforeFadingOut)})
    .then(function(){return applyTransitionCssClass(".container-3 *", "fadeOut", times.fadeOutSpeed, overrideTransitionDuration)});

}

function setTransitionsDuration(times) {
    var verticalBars = document.querySelectorAll(".vertical-bar");
    var headings = document.querySelectorAll(".overlay-heading");
    var subtitles = document.querySelectorAll(".overlay-subtitle");
    var links = document.querySelectorAll(".overlay-link");

    setTransitionsDurationOnElements(verticalBars, times.verticalBarsSpeed);
    setTransitionsDurationOnElements(headings, times.headingsSpeed);
    setTransitionsDurationOnElements(subtitles, times.subtitlesSpeed);
    setTransitionsDurationOnElements(links, times.linksSpeed);
}

function setTransitionsDurationOnElements(elements, duration) {
    if(elements.length>0){
        elements.forEach(function(element) {
            element.style.transitionDuration = duration + "ms";
        });
    }
}

function applyTransitionCssClass(elementSelector, transitionCssClass, transitionDuration, delay, overrideTransitionDuration) {

    if(overrideTransitionDuration === undefined){
        overrideTransitionDuration = false;
    }

    var elements = document.querySelectorAll(elementSelector);
    if(elements.length>0){
        elements.forEach(function(element) {
            if(overrideTransitionDuration) {
                element.style.transitionDuration = transitionDuration + "ms";
            }
            element.classList.add(transitionCssClass);
        });
    }

    return new Promise(function (resolve, reject) {
        setTimeout(resolve, transitionDuration + delay);
    });
}

function adjustVerticalBarsHeight() {
    var containers = document.querySelectorAll(".container");

    if(containers.length>0){
        containers.forEach(function(container) {
            container.querySelector('.vertical-bar').style.height = getHeadingComputedHeight(container) + 'px';
        });
    }
}

function toggleVisibleContainer(container) {
    collapseContainers();
    var activeContainer = document.querySelector(container);
    activeContainer.style.height = 'auto';
    activeContainer.style.overflow = 'visible';
}

function collapseContainers() {
    var containers = document.querySelectorAll('.container');

    if(containers.length>0){
        containers.forEach(function(container) {
            container.style.height = 0;
            container.style.overflow = 'hidden';
        });
    }
}

function getHeadingComputedHeight(parent) {
    return jQuery(parent).find('.overlay-heading').innerHeight();
}

function hideElements(elementSelector) {
    var elements = document.querySelectorAll(elementSelector);

    if(elements.length>0){
        elements.forEach(function(element) {
            element.style.display = 'none';
        });
    }
}

function removeTransitionClasses() {
    var elements = document.querySelectorAll('.container *');

    if(elements.length>0){
        elements.forEach(function(element) {
            element.classList.remove('fadeInAndSlideUp');
            element.classList.remove('fadeOut');
            element.classList.remove('fadeInAndGrow');
        });
    }
}

function removeChildrenBySelector(parent, childrenSelector){
    var children = parent.querySelectorAll(childrenSelector);

    if(children.length>0){
        children.forEach(function(child) {
            parent.removeChild(child);
        });
    }
}

function stopAllTimeouts()
{
    var id = window.setTimeout(null,0);
    while (id--)
    {
        window.clearTimeout(id);
    }
}
