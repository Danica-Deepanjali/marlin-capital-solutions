jQuery(function($) {
  $(document).ready(function() {
    $("#revealContent,#subNav").click(function() {
      $("body").toggleClass("animate");
      $(".cta-section").removeClass("hover");
    });
  });

  $("#revealContent").hover(
    function() {
      $("body:not(.animate) .cta-section").addClass("hover");
    },
    function() {
      $("body:not(.animate) .cta-section").removeClass("hover");
    }
  );
  // scroll on laptops
  $(window)
    .on("resize", function() {
      if ($(window).width() > 991 || $(window).height() > 629) {
        $("body").removeClass("animate");
        //remove accordion properties
        $(".tab-pane-content")
          .removeClass("collapse")
          .removeAttr("data-parent", "#mobile-accordion");
        $("#mobile-accordion .tab-pane.active .collapse-btn").removeAttr("aria-expanded", "true");
        $("#mobile-accordion .tab-pane.active .collapse").removeClass("show");
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
        $("body").on(wheelEvent, function(e) {
          var oEvent = e.originalEvent,
            delta = oEvent.deltaY || oEvent.wheelDelta;
          // deltaY for wheel event
          // wheelData for mousewheel event
          if (delta > 0) {
            $("body").addClass("animate");
          } else {
            $("body").removeClass("animate");
          }
        });
      }
    })
    .resize();

  // tabs to accordion
  $(window)
    .on("resize", function() {
      if ($(window).width() < 992 || $(window).height() < 630) {

        $(".tab-content .tab-pane").removeClass("fade");
        //add accordion properties
        $(".tab-pane-content")
          .addClass("collapse")
          .attr("data-parent", "#mobile-accordion");
        $("#mobile-accordion .tab-pane.active .collapse-btn").attr("aria-expanded", "true");
        $("#mobile-accordion .tab-pane.active .collapse").addClass("show");

        // fix navbar on scroll in mobile devices
        $(window).scroll(function() {
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

// to open link in new tab
function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win.focus();
}
