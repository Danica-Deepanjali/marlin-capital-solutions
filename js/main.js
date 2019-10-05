jQuery(function($) {
  $(document).ready(function() {
    $("#getStarted,#revealcontent").click(function() {
      $("body").toggleClass("animate");
    });

    // smooth scrolling
    $(document).on("click", "a[href*=letsTalk]", function(event) {
      if ($(this.hash).length) {
        $("html, body").animate(
          {
            scrollTop: $(this.hash).offset().top - 100
          },
          500
        );
      }
    });
  });


  // scroll on laptops

  // checks if the specified event is supported by the browser.
  function isEventSupported(eventName) {
    var el = document.createElement('div');
    eventName = 'on' + eventName;
    var isSupported = (eventName in el);
    if (!isSupported) {
      el.setAttribute(eventName, 'return;');
      isSupported = typeof el[eventName] == 'function';
    }
    el = null;
    return isSupported;
  }

  // in browsers where both events are supported.
  var wheelEvent = isEventSupported('mousewheel') ? 'mousewheel' : 'wheel';

  // Now bind the event to the desired element
  $('body').on(wheelEvent, function (e) {
    var oEvent = e.originalEvent,
      delta = oEvent.deltaY || oEvent.wheelDelta;
    // deltaY for wheel event
    // wheelData for mousewheel event
    if (delta > 0) {
      $("body").addClass('animate');
    } else {
      $("body").removeClass('animate');
    }
  });

  // tabs to accordion
  $(window)
    .on("resize", function() {
      if ($(window).width() < 992) {
        $(".tab-content .tab-pane").removeClass("fade");
        $(".tab-content .tab-pane").on("click", function() {
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
      }
    })
    .resize();
});
