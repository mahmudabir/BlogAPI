$(document).ready(function () {
    if (localStorage.authUser != null) {
        window.location.href = "../Post/Index.html";
    }

    $("#divregister").hide();


    $("#gotoregister").click(function () {
        $("#divlogin").hide();
        $("#divregister").show();
    })

    $("#gotologin").click(function () {
        $("#divregister").hide();
        $("#divlogin").show();
    })


    var loadLogin = function () {
        $.ajax({
            url: "https://localhost:44345/api/users/login",
            method: "POST",
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            headers: {
                'Authorization': 'Basic ' + btoa($("#username").val() + ":" + $("#password").val()),
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    localStorage.authUser = btoa($("#username").val() + ":" + $("#password").val());
                    var user = xhr.responseJSON;
                    localStorage.userId = user.userId;
                    localStorage.username = user.username;

                    console.log(localStorage.userId);
                    console.log(localStorage.username);
                    console.log(localStorage.authUser);
                    console.log("Logout Success");

                    window.location.href = "../Post/Index.html";
                }
                else {
                    $("#msg").html(xhr.status + ":" + xhr.statusText)
                }
            }
        });
    }

    var loadRegister = function () {
        $.ajax({
            url: "https://localhost:44345/api/users/register",
            method: "POST",
            data: {
                username: $("#regusername").val(),
                password: $("#regpassword").val()
            },
            headers: {
                'Authorization': 'Basic ' + btoa($("#regusername").val() + ":" + $("#regpassword").val()),
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    console.log("Registration Success");

                    window.location.href = "Authenticate.html";
                }
                else {
                    $("#msg").html(xhr.status + ":" + xhr.statusText)
                }
            }
        });
    }



    $("#btnlogin").click(function () {
        loadLogin();
    });
    $("#btnregister").click(function () {
        loadRegister();
    });

});