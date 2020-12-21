$(document).ready(function () {
    if (localStorage.authUser == null) {
        window.location.href = "../User/Authenticate.html";
    }


    $("#btnEditProfile").attr("hidden", "hidden");
    $("#password").attr("readonly", "readonly");

    var loadUser = function () {
        $.ajax({
            url: "https://localhost:44345/api/users/" + localStorage.userId,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    $("#userID").text(data.userId);
                    $("#username").val(data.username);
                    $("#password").val(data.password);
                }
                else {
                    $("#msg").html(xhr.status + ":" + xhr.statusText)
                }
            }
        });
    }

    loadUser();





    var modifyPost = function () {
        $.ajax({
            url: "https://localhost:44345/api/users/" + localStorage.userId,
            method: "PUT",
            header: "Content-Type:application/json",
            data: {
                userId: localStorage.userId,
                username: $("#username").val(),
                password: $("#password").val(),

            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    $("#msg").html("User Modified");
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">Password Updated</div>");
                    localStorage.authUser = btoa($("#username").val() + ":" + $("#password").val());
                    loadUser();
                    console.log(xhr.responseJSON.password);
                } else {
                    //$("#msg").html(xhr.state + ":" + xhr.statusText);
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">" + xhr.status + ":" + xhr.statusText + "</div>");
                }
            }
        });
    }


    var loadLogout = function () {
        $.ajax({
            url: "https://localhost:44345/api/users/logout",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xmlhttp, status) {
                if (xmlhttp.status == 200) {
                    console.log("Logout Success");
                    localStorage.clear();
                    console.log(localStorage.user);
                    window.location.href = "https://localhost:44345/Views/Index.html";
                } else {
                    $("#msg").html(xmlhttp.status + ":" + xmlhttp.statusText)
                }
            }
        })
    }

    $("#logout").click(function () {
        loadLogout();
    });









    $("#btnEnableEdit").click(function () {
        $("#password").removeAttr('disabled');
        $("#password").removeAttr('readonly');
        $("#password").attr('type', 'text');
        $("#btnEditProfile").removeAttr('hidden');
        $(this).hide();
    });


    $("#btnEditProfile").click(function () {


        modifyPost();
        $("#password").attr('disabled', 'disabled');
        $("#password").attr('type', 'password');
        $("#btnEnableEdit").show();
        $(this).hide();
    });















});