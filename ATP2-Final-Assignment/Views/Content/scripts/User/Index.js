$(document).ready(function () {
    if (localStorage.authUser == null) {
        window.location.href = "../User/Authenticate.html";
    }


    var loadUser = function () {
        $.ajax({
            url: "https://localhost:44345/api/users/" + localStorage.userId,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + btoa(localStorage.authUser),
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);
                }
                else {
                    $("#msg").html(xhr.status + ":" + xhr.statusText)
                }
            }
        });
    }

    loadUser();

















});