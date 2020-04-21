$(document).ready(function() {
  $("textarea").on("input", function() { // add class to textarea
    const characters = 140;
    const counter = $(this).closest("section.new-tweet").find("#counter");
    const length = $(this).val().length;
    const remaining = characters - length;  
    counter.text(remaining);
    if (remaining < 0) {
      counter.addClass("negative")
    } else if (remaining > 0) {
      counter.removeClass("negative");
    }
  });
});
