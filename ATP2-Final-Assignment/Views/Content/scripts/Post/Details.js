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

                    str += "<h2>" + data.title + "</h2><hr>"
                        + "<p>" + data.content + "</p><br>";

                    str += "<hr><a href=\"Modify.html?pid=" + data.postId + "\"><button>Modify</button></a><br><br>"
                        + "<button id=\"postDelete\">Delete</button>"

                    //onclick =\"return confirm('are you sure?')\"

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
                                            $("#msg").html("Post Deleted");
                                        } else {
                                            $("#msg").html(xmr2.state + ":" + xhr2.statusText);
                                        }
                                    }
                                })
                            }

                            deletePost();


                            alert("Post Deleted.");
                        } else {
                            alert("Delete request stopped.");
                        }

                    });
                }
                else {
                    $("#msg").html(xhr.status + ":" + xhr.statusText);
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
                'Authorization': 'Basic ' + btoa(localStorage.authUser),
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    var data = xhr.responseJSON;

                    var str = '';
                    str += "<h3>Comments</h3>";

                    for (var i = 0; i < data.length; i++) {
                        str += "<p>" + data[i].text + "</p><br>";
                        console.log(i);
                    }



                    $("#divpostComments").html(str);
                }
                else {
                    $("#msg").html(xhr.status + ":" + xhr.statusText)
                }
            }
        });
    }

    loadAllComments();





















});