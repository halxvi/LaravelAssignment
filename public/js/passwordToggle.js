$(".toggle-password").click(function () {
    $(this).toggleClass("mdi-eye mdi-eye-off");
    var input = $(this).parent().prev("input");
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});
