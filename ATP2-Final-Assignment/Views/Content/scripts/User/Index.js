$(document).ready(function () {
    if (localStorage.authUser == null) {
        window.location.href = "../User/Authenticate.html";
    }


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
                    localStorage.authUser = btoa($("#username").val() + ":" + $("#password").val());
                    loadUser();
                    console.log(xhr.responseJSON.password);
                } else {
                    $("#msg").html(xhr.state + ":" + xhr.statusText);
                }
            }
        });
    }












    $("#btnEnableEdit").click(function () {
        $("#btnEditProfile").show();
        $("#password").removeAttr('disabled');
        $(this).hide();
    });


    $("#btnEditProfile").click(function () {


        modifyPost();
        $("#password").attr('disabled', 'disabled');
        $("#btnEnableEdit").show();
        $(this).hide();
    });















});