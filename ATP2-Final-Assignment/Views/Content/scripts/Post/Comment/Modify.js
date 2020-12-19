﻿$(document).ready(function () {
    if (localStorage.authUser == null) {
        window.location.href = "../User/Authenticate.html";
    }

    var url_string = window.location;
    var url = new URL(url_string);
    var pid = url.searchParams.get("pid");
    var cid = url.searchParams.get("cid");

    console.log("pid=" + pid);
    console.log("cid=" + cid);


    if (pid == null || cid == null) {
        window.location.href = "Index.html";
    }





    var loadComment = function () {
        $.ajax({
            url: "https://localhost:44345/api/posts/" + pid + "/comments/" + cid,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    var str = '';

                    if (localStorage.username == data.username) {
                        //str += "<h2>" + data.title + "</h2><hr>"
                        //    + "<textarea id=\"postContent\" rows=\"10\" cols=\"100\">" + data.content + "</textarea><br>";

                        //str += "<hr><button id=\"postModify\">Modify</button></a><br><br>";
                        //$("#divModifyPost").html(str);

                        $("#divModifyComment h2").text(data.username);
                        $("#divModifyComment textarea").text(data.text);
                    } else {
                        window.location.href = "../Post/Details.html?pid=" + pid;
                    }
                }
                else {
                    $("#msg").html(xhr.status + ":" + xhr.statusText);
                    //window.location.href = "Index.html";
                }
            }
        });
    }

    loadComment();





    var modifyComment = function () {
        $.ajax({
            url: "https://localhost:44345/api/posts/" + pid + "/comments/" + cid,
            method: "PUT",
            header: "Content-Type:application/json",
            data: {
                commentId: cid,
                username: localStorage.username,
                text: $("#commentText").val(),


            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    $("#msg").html("Comment Modified");
                } else {
                    $("#msg").html(xhr.state + ":" + xhr.statusText);
                }
            }
        });
    }





    $("#commentModify").click(function () {
        if (confirm("Do you really want to modify the comment?")) {



            modifyComment();


            alert("Comment Modified.");
            //window.location.href = "Index.html?pid=" + pid + "&cid=" + cid;
        } else {
            alert("Modify request stopped.");
        }

    });




});