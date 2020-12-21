$(document).ready(function () {
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

                    str += "<h2>" + data.username + "</h2><hr>"
                        + "<p>" + data.text + "</p><br>";


                    if (localStorage.username == data.post.user.username) {
                        if (localStorage.username == data.username) {
                            str += "<hr><a href=\"Modify.html?pid=" + data.postId + "&cid=" + data.commentId + "\"><button class=\"btn btn-primary\">Modify</button></a><br><br>";
                            str += "<button class=\"btn btn-danger\" id=\"commentDelete\">Delete</button>";
                        } else {
                            str += "<button class=\"btn btn-danger\" id=\"commentDelete\">Delete</button>";
                        }
                    } else {
                        if (localStorage.username == data.username) {
                            str += "<hr><a href=\"Modify.html?pid=" + data.postId + "&cid=" + data.commentId + "\"><button class=\"btn btn-primary\">Modify</button></a><br><br>";
                            str += "<button class=\"btn btn-danger\" id=\"commentDelete\">Delete</button>";
                        } else {

                        }
                    }



                    $("#divpostComment").html(str);

                    $("#commentDelete").click(function () {
                        if (confirm("Do you really want to delete the comment?")) {

                            var deletePost = function () {
                                $.ajax({
                                    url: "https://localhost:44345/api/posts/" + data.postId + "/comments/" + data.commentId,
                                    method: "DELETE",
                                    header: "Content-Type:application/json",
                                    data: {
                                        commentId: data.commentId,
                                    },
                                    headers: {
                                        'Authorization': 'Basic ' + localStorage.authUser,
                                    },
                                    complete: function (xhr2, status) {
                                        if (xhr2.status == 204) {
                                            $("#msg").html("Comment Deleted");
                                        } else {
                                            $("#msg").html(xmr2.state + ":" + xhr2.statusText);
                                        }
                                    }
                                });
                            }

                            deletePost();


                            alert("Comment Deleted.");
                            window.location.href = "../Details.html?pid=" + pid;
                        } else {
                            alert("Delete request stopped.");
                        }

                    });
                }
                else {
                    $("#msg").html(xhr.status + ":" + xhr.statusText);
                    window.location.href = "../Index.html";
                }
            }
        });
    }

    loadComment();



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





});