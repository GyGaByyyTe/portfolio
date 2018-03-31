module.exports = function () {
 
    (function () {
        function id(v) { return document.getElementById(v); }
        function loadBar() {
            var progress = id("js-load-percent"),
                preloader = id("js-preloader"),
                images = document.images,
                imagesLoadedCount = 0,
                imagesTotalCount = images.length;
            if (imagesTotalCount === 0) {
                doneLoading();
            }

            function imageLoaded() {
                imagesLoadedCount += 1;
                var percentage = Math.ceil(100 / imagesTotalCount * imagesLoadedCount);
                progress.innerHTML = percentage+" %";
                if( imagesLoadedCount === imagesTotalCount) {
                    doneLoading();
                }
            }

            function doneLoading() {                
                setTimeout(function() {
                    if (!preloader.classList.contains('done')) {
                        preloader.classList.add('done');
                    }          
                }, 1000);
            }

            for ( var i = 0; i < imagesTotalCount; i++) {
                var imageClone = new Image();
                imageClone.onload = imageLoaded;
                imageClone.onerror = imageLoaded;
                imageClone.src = images[i].src;
            }   
        }
        document.addEventListener('DOMContentLoaded', loadBar, false);
    }());

};