$(function () {
    if (localStorage.getItem("User")) {
        $("#loginbtn > li").toggle();
        $("#loginbtn > li #username").text(JSON.parse(localStorage.getItem("User")).name);
        if (window.location.pathname == '/login' || window.location.pathname == '/register')
            window.location = "/admincp";
    }
})
function login() {
    var data = $("#loginform").serializeArray();
    $.post('loginuser', { username: data[0]['value'], password: data[1]['value'] }, data => {
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
function register() {
    var data = $("#loginform").serializeArray();
    $.post('registeruser', { name: data[0]['value'], username: data[1]['value'], password: data[2]['value'] }, data => {
        if (data.correct) {
            localStorage.setItem("User", JSON.stringify(data.user));
            window.location = "/admincp";
        }
    });
}