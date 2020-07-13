/**
 * Template Name: Rapid - v2.1.0
 * Template URL: https://bootstrapmade.com/rapid-multipurpose-bootstrap-business-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function ($) {
  // Preloader (if the #preloader div exists)
  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });

  $(document).on("ready", function () {
    $("li.profileSideBar").click(function () {
      $(".profileSideBar").removeClass("activeSideBar");
      $(this).addClass("activeSideBar");
    });
  });
})(jQuery);
