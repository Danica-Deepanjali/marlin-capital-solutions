jQuery(function ($) {
  $(document).ready(function () {
    $("#getStarted,#revealContent,#subNav").click(function () {
      $("body").toggleClass("animate");
      $(".cta-section").removeClass('hover');
    });
  });

  // // smooth scrolling on mobile
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 120
          }, 500, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });

  $('#revealContent').hover(
    function () {$("body:not(.animate) .cta-section").addClass('hover') },
    function () {$("body:not(.animate) .cta-section").removeClass('hover') }
  )
  // scroll on laptops
  $(window)
    .on("resize", function () {
      if ($(window).width() > 991 || $(window).height() > 629) {
        $("body").removeClass("animate");
        // checks if the specified event is supported by the browser.
        function isEventSupported(eventName) {
          var el = document.createElement("div");
          eventName = "on" + eventName;
          var isSupported = eventName in el;
          if (!isSupported) {
            el.setAttribute(eventName, "return;");
            isSupported = typeof el[eventName] == "function";
          }
          el = null;
          return isSupported;
        }

        // in browsers where both events are supported.
        var wheelEvent = isEventSupported("mousewheel")
          ? "mousewheel"
          : "wheel";
        // Now bind the event to the desired element
        $("body").on(wheelEvent, function (e) {
          var oEvent = e.originalEvent,
            delta = oEvent.deltaY || oEvent.wheelDelta;
          // deltaY for wheel event
          // wheelData for mousewheel event
          if (delta > 0) {
            $("body").addClass("animate");
            $(".cta-section").removeClass('hover');
          } else {
            $("body").removeClass("animate");
          }
        });
      }
    })
    .resize();

  // tabs to accordion
  $(window)
    .on("resize", function () {
      if ($(window).width() < 992 || $(window).height() < 630) {
        $(".tab-content .tab-pane").removeClass("fade");
        $(".tab-content .tab-pane").on("click", function () {
          var container = $(this).parents(".tabbed-content"),
            currId = $(this).attr("id"),
            items = container.find(".tab-pane");
          container.find(".nav-tabs a").removeClass("active");
          items.removeClass("active");
          $(this).addClass("active");
          container
            .find('.nav-tabs a[href$="#' + currId + '"]')
            .addClass("active");
        });

        // fix navbar on scroll in mobile devices
        $(window).scroll(function () {
          var topbar = $(".topbar");
          topbarHeight = $(".topbar").height();
          if ($(this).scrollTop() > topbarHeight) {
            topbar.addClass("sticky");
          } else {
            topbar.removeClass("sticky");
          }
        });

      }
    })
    .resize();
});
