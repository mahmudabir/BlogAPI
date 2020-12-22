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
                    console.log("Login Success");

                    window.location.href = "../Post/Index.html";
                }
                else {
                    //$("#msg").show();
                    //$("#msg").html(xhr.status + ":" + xhr.statusText);
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">" + xhr.status + ":" + xhr.statusText + "</div>");
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

                    //window.location.href = "Authenticate.html";
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">Successfully Registered</div>");
                }
                else {
                    //$("#msg").show();
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">" + xhr.status + ":" + xhr.statusText + "</div>");
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

    $("#btnlogin2").click(function () {
        loadLogin();
    });
    $("#btnregister2").click(function () {
        loadRegister();
    });

    $("#msg").click(function () {
        $(this).hide();
    });
});