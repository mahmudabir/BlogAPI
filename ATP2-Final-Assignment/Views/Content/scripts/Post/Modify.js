$(document).ready(function () {
    if (localStorage.authUser == null) {
        window.location.href = "../User/Authenticate.html";
    }

    var url_string = window.location;
    var url = new URL(url_string);
    var pid = url.searchParams.get("pid");

    if (pid == null) {
        window.location.href = "Index.html";
    }




    var loadPost = function () {
        $.ajax({
            url: "https://localhost:44345/api/posts/" + pid,
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    var str = '';

                    if (localStorage.username == data.user.username) {
                        //str += "<h2>" + data.title + "</h2><hr>"
                        //    + "<textarea id=\"postContent\" rows=\"10\" cols=\"100\">" + data.content + "</textarea><br>";

                        //str += "<hr><button id=\"postModify\">Modify</button></a><br><br>";
                        //$("#divModifyPost").html(str);

                        $("#divModifyPost input").val(data.title);
                        $("#divModifyPost textarea").text(data.content);







                    } else {
                        window.location.href = "Index.html";
                    }
                }
                else {
                    $("#msg").html(xhr.status + ":" + xhr.statusText);
                    window.location.href = "Index.html";
                }
            }
        });
    }

    loadPost();




    var modifyPost = function () {
        $.ajax({
            url: "https://localhost:44345/api/posts/" + pid,
            method: "PUT",
            header: "Content-Type:application/json",
            data: {
                postId: pid,
                title: $("#postTitle").val(),
                content: $("#postContent").val(),

            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    $("#msg").html("Post Modified");
                } else {
                    $("#msg").html(xhr.state + ":" + xhr.statusText);
                }
            }
        });
    }





    $("#postModify").click(function () {
        if (confirm("Do you really want to modify the post?")) {



            modifyPost();


            alert("Post Modified.");
            //window.location.href = "Index.html";
        } else {
            alert("Modify request stopped.");
        }

    });





});