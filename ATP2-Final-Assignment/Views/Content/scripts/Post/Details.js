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


    $("#divNewComment").attr("hidden", "hidden");

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

                    str += "<h2>" + data.title + "</h2><hr>"
                        + "<p>" + data.content + "</p><br>";




                    if (localStorage.username == data.user.username) {
                        str += "<hr><a href=\"Modify.html?pid=" + data.postId + "\"><button class=\"btn btn-primary\">Modify</button></a><br><br>"
                            + "<button class=\"btn btn-danger\" id=\"postDelete\">Delete</button>"
                    } else {

                    }


                    $("#divpostDetails").html(str);

                    $("#postDelete").click(function () {
                        if (confirm("Do you really want to delete the post?")) {

                            var deletePost = function () {
                                $.ajax({
                                    url: "https://localhost:44345/api/posts/" + data.postId,
                                    method: "DELETE",
                                    header: "Content-Type:application/json",
                                    data: {
                                        postId: data.postId,
                                    },
                                    headers: {
                                        'Authorization': 'Basic ' + localStorage.authUser,
                                    },
                                    complete: function (xhr2, status) {
                                        if (xhr2.status == 204) {
                                            $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">Post Deleted</div>");
                                        } else {
                                            $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">" + xhr.status + ":" + xhr.statusText + "</div>");
                                        }
                                    }
                                });
                            }

                            deletePost();


                            alert("Post Deleted.");
                            window.location.href = "Index.html";
                        } else {
                            alert("Delete request stopped.");
                        }

                    });
                }
                else {
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">" + xhr.status + ":" + xhr.statusText + "</div>");
                    window.location.href = "Index.html";
                }
            }
        });
    }

    loadPost();




    var loadAllComments = function () {
        $.ajax({
            url: "https://localhost:44345/api/posts/" + pid + "/comments",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;

                    var str = '';
                    var txt = '';

                    for (var i = 0; i < data.length; i++) {
                        //str += "<p><strong>" + data[i].username + ":      </strong><label>" + data[i].text + "<label></p>";


                        //str += "<tr><td>"
                        //    + data[i].username + "</td><td><p>"
                        //    + data[i].text + "</p></td><td>"
                        //    + data[i].commentTime + "</td>"
                        //    + "<td><a href=\"Comment/Index.html?pid=" + data[i].postId + "&cid=" + data[i].commentId + " \"><button class=\"btn btn-primary\""
                        //    + "\">Details</button></a></td></tr>";


                        txt = data[i].text;

                        str += "<div class=\"card \">"
                            + "<div class=\"card-header\">Posted By:<strong> @"
                            + data[i].username + "</strong>"
                            + "</div>"
                            + "<div class=\"card-body\">"
                            + "<p class=\"card-text\">" + txt.substring(0, 200) + " ..........</p>"
                            + "<a href=\"Comment/Index.html?pid=" + data[i].postId + "&cid=" + data[i].commentId + " \" class=\"btn btn-primary\">Details</a>"
                            + "</div>"
                            + "<div class=\"card-footer text-muted\">Posted On: <strong>"
                            + data[i].commentTime + "</strong>"
                            + "</div >"
                            + " </div ><br><br>";



                    }

                    //$("#allComments tbody").html(str);
                    $("#divpostComments").html(str);
                }
                else {
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">" + xhr.status + ":" + xhr.statusText + "</div>");
                }
            }
        });
    }

    loadAllComments();


    ////////////////////////////////////////



    var createComment = function () {
        $.ajax({
            url: "https://localhost:44345/api/posts/" + pid + "/comments/",
            method: "POST",
            data: {
                text: $("#inputText").val(),
                username: localStorage.username,
                postId: pid,
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    console.log("Comment Posting Success");
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">Successfully Posted</div>");

                    $("#divNewComment").hide();
                    $("#btnNewComment").show();
                    loadAllComments();
                }
                else {
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
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">" + xhr.status + ":" + xhr.statusText + "</div>");
                }
            }
        })
    }

    $("#logout").click(function () {
        loadLogout();
    });




    $("#btnNewComment").click(function () {
        $("#divNewComment").removeAttr("hidden");
        $(this).hide();
    });

    $("#btnCancelComment").click(function () {
        $("#divNewComment").attr("hidden", "hidden");
        $("#btnNewComment").show();
    });


    $("#btnCreateComment").click(function () {
        createComment();
    });


    $("#msg").click(function () {
        $(this).hide();
    });


});