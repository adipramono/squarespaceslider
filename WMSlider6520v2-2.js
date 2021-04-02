<!-- This Code is licensed by Will-Myers.com -->
function wmSliderBuild() {
    //Add Classes To Each Slide
    $(wmSlider).each(function (index) {
        this.autoSlider;
        this.intervalTime = this.sliderTime * 1000;
        let currentSliderObject = this;
        let sliderIndex = wmSlider.indexOf(this);
        sliderIndex++;
        //Create an array of each slide number
        let sliderArray = [];
        for (var i = this.startingSection; i <= this.endingSection; i++) {
            sliderArray.push(i);
        }
        //Add classes to the right sectinons based on Squarespace template
        if ($('main.Index').length) { //Squarespace 7.0 Brine Build
            console.log("7.0");
            $(sliderArray).each(function (i) {
                let slideIndex = i;
                if (currentSliderObject.staticFirst) {
                    console.log('static first');
                    $('.Site-inner--index main.Index > section.Index-page:nth-of-type(' + this + ')')
                        .addClass('slider-' + sliderIndex)
                        .addClass('wm-slide')
                        .attr('data-slide-num', slideIndex);
                    $('.slider-' + sliderIndex + '[data-slide-num="0"]')
                        .removeAttr('data-slide-num')
                        .attr('data-slide', 'static');
                } else {
                    console.log('else');
                    slideIndex++;
                    $('.Site-inner--index main.Index > section.Index-page:nth-of-type(' + this + ')')
                        .addClass('slider-' + sliderIndex)
                        .addClass('wm-slide')
                        .attr('data-slide-num', slideIndex);
                }
            });
        } else { //Squarespace 7.1 Build
            console.log("7.1");
            $(sliderArray).each(function (i) {
                let slideIndex = i;
                if (currentSliderObject.staticFirst) {
                    $('#siteWrapper > main article > section:nth-of-type(' + this + ')')
                        .addClass('slider-' + sliderIndex)
                        .addClass('wm-slide')
                        .attr('data-slide-num', slideIndex);
                    $('.slider-' + sliderIndex + '[data-slide-num="0"]')
                        .removeAttr('data-slide-num')
                        .attr('data-slide', 'static');
                } else {
                    slideIndex++;
                    $('#siteWrapper > main article > section:nth-of-type(' + this + ')')
                        .addClass('slider-' + sliderIndex)
                        .addClass('wm-slide')
                        .attr('data-slide-num', slideIndex);
                }
            });
        }
    });

    //Wrap Each Slide Group Together
    $(wmSlider).each(function (i) {
        let sliderIndex = wmSlider.indexOf(this);
        sliderIndex++;
        $('.slider-' + sliderIndex).wrapAll('<div id="slider-' + sliderIndex + '" class="wm-slider-container" data-slider-timer="' + this.intervalTime + '"></div>"');
        this.element = $('#slider-' + sliderIndex);
        this.selector = '#slider-' + sliderIndex;
    });

    $(wmSlider).each(function () {
        let numOfSlides = $(this.element).find('[data-slide-num]').length;
        this.numOfSlides = numOfSlides;
    });
}

//Build In Next & Previous Arrow Elements
function buildNextPrev() {
    $(wmSlider).each(function (i) {
        let thisSliderId = $(this.element).attr('id');
        let sliderSelector = "#" + thisSliderId;
        let sliderObject = this;

        /* Build Next icon */
        $(sliderSelector).prepend(`
        <div class="slide-btn next-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" width="256" height="256">
            <title>Angle Right</title>
            <path fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M40 31.998L26 18l-4 4.486 9.515 9.512L22 41.513 26 46l14-14.002z" stroke-linejoin="round" stroke-linecap="round"/>
          </svg>
        </div>`);
        /* Build Previous icon */
        $(sliderSelector).prepend(`
        <div class="slide-btn prev-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" width="256" height="256">
            <title>Left</title>
            <path fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M24 32.001L38 46l4-4.485-9.515-9.514L42 22.487 38 18 24 32.001z" stroke-linejoin="round" stroke-linecap="round"/>
          </svg>
        </div>`);

        /* Build Next Click Event*/
        $(sliderSelector).find(' .slide-btn.next-btn').on('click', function () {
            nextSlide(sliderSelector, sliderObject);
        });

        /* BuildmPrevious Click Event */
        $(sliderSelector).find(' .slide-btn.prev-btn').on('click', function () {
            prevSlide(sliderSelector, sliderObject);
        });
    });
}

function nextSlide(sliderSelector, sliderObject) {
    let currentSlide = $(sliderSelector).find('[data-slide="current"]').attr('data-slide-num');
    if ((parseInt(currentSlide)) !== $(sliderSelector).find('[data-slide-num]').length) {
        let nextSlide = parseInt(currentSlide) + 1;
        makeCurrent(sliderSelector, nextSlide, sliderObject);
    } else {
        let nextSlide = 1;
        makeCurrent(sliderSelector, nextSlide, sliderObject);
    };
}

function prevSlide(sliderSelector, sliderObject) {
    let currentSlide = $(sliderSelector).find('[data-slide="current"]').attr('data-slide-num');
    if ((parseInt(currentSlide)) !== 1) {
        let nextSlide = parseInt(currentSlide) - 1;
        makeCurrent(sliderSelector, nextSlide, sliderObject);
    } else {
        let nextSlide = $(sliderSelector).find('[data-slide-num]').length;
        makeCurrent(sliderSelector, nextSlide, sliderObject);
    };
}

//initiate the first slides
function initTheSlides() {
    $('.wm-slider-container').each(function () {
        let numOfSlides = $(this).find('[data-slide-num]').length;
        $(this).find('section[data-slide-num="1"]').attr('data-slide', 'current');
        $(this).find('.slider-dot:first-of-type').addClass('active-dot');
        $(this).find('section[data-slide-num="2"]').attr('data-slide', 'next');
        $(this).find('section[data-slide-num="' + numOfSlides + '"]').attr('data-slide', 'previous');
    });
}

//Build the Play / Pause Button Element
function buildPlayPause() {
    /* Build Play/Pause icon */
    $(wmSlider).each(function () {
        let sliderSelector = '#' + $(this.element).attr('id');
        let sliderObject = this;

        if (this.playPause) {
            $(this.element).prepend('<div class="play-pause-btn"><div class="play-btn"><svg viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" width="256" height="256"><title>Play</title><path fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M24 18l24 14-24 14V18z" stroke-linejoin="round" stroke-linecap="round"/></svg></div><div class="pause-btn"><svg viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" width="256" height="256"><title>Pause</title><path data-name="layer1" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M36 20h4v24h-4zm-12 0h4v24h-4z" stroke-linejoin="round" stroke-linecap="round"/></svg></div></div>');

            /* Play/Pause Button Click */
            $(sliderSelector + ' .play-pause-btn').click(function () {
                if ($(sliderSelector).attr('data-slider-on') == 'true') {
                    stopSlider(sliderObject);
                } else {
                    nextSlide(sliderSelector, sliderObject);
                    startSlider(sliderObject);
                }
            });
        }

        if (this.autoSliderOn) {
            $(sliderSelector + ' .play-pause-btn').addClass('wm-slider-playing');
            $(sliderSelector + ' .pause-btn').css('display', 'block');
            $(sliderSelector + ' .play-btn').css('display', 'none');
        } else {
            $(sliderSelector + ' .play-pause-btn').addClass('wm-slider-paused');
            $(sliderSelector + ' .pause-btn').css('display', 'none');
            $(sliderSelector + ' .play-btn').css('display', 'block');
        }
    });
}

//Build the Slider Dots
function buildSliderDots() {
    $(wmSlider).each(function () {
        let sliderObject = this;
        if (this.sliderDots) {
            $(this.element).prepend('<div class="dots-container"></div>');
            let thisSliderId = '#' + $(this.element).attr('id');
            let arrayDiv = new Array();
            $('.dots-container').prepend(arrayDiv);
            for (var i = 0; i < this.numOfSlides; i++) {
                let nextSlide = i + 1;
                arrayDiv[i] = document.createElement('div');
                arrayDiv[i].className += 'slider-dot';
                arrayDiv[i].className += ' dot-' + nextSlide;
                arrayDiv[i].addEventListener("click", function () {
                    makeCurrent(thisSliderId, nextSlide, sliderObject);
                });
                document.querySelector(thisSliderId + ' .dots-container').appendChild(arrayDiv[i]);
            }
        }
    });
}

function makeCurrent(sliderId, nextSlide, sliderObject) {
    let sliderSelector = sliderId;
    $(sliderSelector + ' .active-dot').removeClass('active-dot');
    $("#wm-slider-container section[data-slide='current']").removeAttr('data-slide', 'current');
    $(sliderSelector + ' .dot-' + nextSlide).addClass('active-dot');

    $(sliderSelector + ' section[data-slide="current"]').removeAttr('data-slide', 'current');
    $(sliderSelector + ' section[data-slide="previous"]').removeAttr('data-slide', 'previous');
    $(sliderSelector + ' section[data-slide="next"]').removeAttr('data-slide', 'next');

    $(sliderSelector + ' section[data-slide-num="' + nextSlide + '"]').attr('data-slide', 'current');
    styleNextPrevSlides(sliderId, nextSlide);

    if ($(sliderSelector).attr('data-slider-on') == 'true') {
        restartSlider(sliderObject);
    }
}

function styleNextPrevSlides(sliderId, currentSlide) {
    if (currentSlide === $(sliderId + ' > section').length) {
        $(sliderId + ' section[data-slide-num=1]').attr('data-slide', 'next');
    } else {
        $(sliderId + ' section[data-slide-num="' + currentSlide + '"]').next().attr('data-slide', 'next');
    }

    if (currentSlide === 1) {
        let numOfSlides = $(sliderId + ' [data-slide-num]').length;
        $(sliderId + ' section[data-slide-num="' + numOfSlides + '"]').attr('data-slide', 'previous');
    } else {
        $(sliderId + ' section[data-slide-num="' + currentSlide + '"]').prev().attr('data-slide', 'previous');
    }
}

/*=========AutoSlider Stuff=============*/
function initAutoSlider() {
    $(wmSlider).each(function () {
        let sliderObject = this;
        let sliderSelector = sliderObject.selector;
        if (sliderObject.autoSliderOn) {
            $(sliderObject.selector).attr('data-slider-on', 'true');
            sliderObject.autoSlider = setInterval(function () {
                nextSlide(sliderSelector, sliderObject);
            }, sliderObject.intervalTime);
        } else {
            $(sliderObject.selector).attr('data-slider-on', 'false');
        }
    });
}

function togglePlayPause(sliderSelector) {
    $(sliderSelector + ' .play-pause-btn').toggleClass('wm-slider-paused');
    $(sliderSelector + ' .play-pause-btn').toggleClass('wm-slider-playing');
    $(sliderSelector + ' .play-btn').toggle();
    $(sliderSelector + ' .pause-btn').toggle();
}

function restartSlider(sliderObject){
    let sliderSelector = sliderObject.selector;
    clearInterval(sliderObject.autoSlider);
    sliderObject.autoSlider = setInterval(function () {
        nextSlide(sliderSelector, sliderObject);
    }, sliderObject.intervalTime);  
}

function startSlider(sliderObject) {
    let sliderSelector = sliderObject.selector;
    $(sliderSelector).attr('data-slider-on', 'true');
    clearInterval(sliderObject.autoSlider);
    sliderObject.autoSlider = setInterval(function () {
        nextSlide(sliderSelector, sliderObject);
    }, sliderObject.intervalTime);
    togglePlayPause(sliderSelector);
}

function stopSlider(sliderObject) {
    let sliderSelector = sliderObject.selector;
    $(sliderSelector).attr('data-slider-on', 'false');
    sliderObject.autoSliderOn == false;
    clearInterval(sliderObject.autoSlider);
    togglePlayPause(sliderObject.selector);
}

function isFirstSection(){

  if ($('body:not(.tweak-transparent-header) .wm-slider-container:first-of-type').is(':first-child')){
    adjustSliderPadding();
    window.addEventListener("resize", adjustSliderPadding);
  } 

  function adjustSliderPadding(){
    let wmHeaderHeight = $('header#header').height() + "px";
    $(':root').css('--wm-header-height', wmHeaderHeight);
    $('.wm-slider-container:first-of-type').addClass('first-section');
  }
}

/*=========Start Stuff============*/
$(function () {
  wmSliderBuild();
  buildNextPrev();
  buildPlayPause();
  buildSliderDots();
  initTheSlides();
  initAutoSlider();
  isFirstSection();
});