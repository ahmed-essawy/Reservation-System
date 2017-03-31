$(function () {
    if (localStorage.getItem("User")) {
        $("#loginbtn > li").toggle();
        $("#loginbtn > li #username").text(JSON.parse(localStorage.getItem("User")).name);
    }
})
function login() {
    var data = $("#loginform").serializeArray();
    $.post('logindata', { username: data[0]['value'], password: data[1]['value'] }, data => {
        if (data.correct) {
            localStorage.setItem("User", JSON.stringify(data.user));
            window.location = "/admincp";
        } else {
            $("#loginform > div").html("<h5 class=\"alert alert-danger\">Username or password is wrong</h5>");
        }
    });
}
function logout() {
    localStorage.removeItem("User");
    window.location = "/";
} 