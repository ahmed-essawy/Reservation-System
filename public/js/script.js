$(function () {
    if (localStorage.getItem("User")) {
        $("#loginbtn > li").toggle();
        $("#loginbtn > li #username").text(JSON.parse(localStorage.getItem("User")).name);
        if (window.location.hash == '#/login' || window.location.hash == '#/register')
            window.location = "/admincp";
    }
})
function logout() {
    localStorage.removeItem("User");
    window.location = "/";
}
function html_resp(msg, cssClass) {
    $("#response").text(msg).addClass(cssClass).fadeOut(4000, () => {
        $("#response").text("").removeClass(cssClass).show();
    });
}