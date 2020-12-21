$(document).ready(function () {
    if (localStorage.authUser == null) {
        window.location.href = "../User/Authenticate.html";
    }

    $("#divNewPost").attr("hidden", "hidden");


    var loadAllPosts = function () {
        $.ajax({
            url: "https://localhost:44345/api/posts/",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    var str = '';
                    //for (var i = 0; i < data.length; i++) {

                    //    str += "<tr><td>"
                    //        + data[i].title + "</td><td><p>"
                    //        + data[i].content + "</p></td><td>"
                    //        + data[i].postTime + "</td><td>"
                    //        + data[i].user.username
                    //        + "</td><td><a href=\"Details.html?pid=" + data[i].postId + "\"><button class=\"btn btn-primary\""
                    //        + "\">Details</button></a></td></tr>";
                    //}

                    //$("#allPosts tbody").html(str);



                    for (var i = 0; i < data.length; i++) {

                        //str += "<tr><td>"
                        //    + data[i].title + "</td><td><p>"
                        //    + data[i].content + "</p></td><td>"
                        //    + data[i].postTime + "</td><td>"
                        //    + data[i].user.username
                        //    + "</td><td><a href=\"Details.html?pid=" + data[i].postId + "\"><button class=\"btn btn-primary\""
                        //    + "\">Details</button></a></td></tr>";


                        str += "<div class=\"card \">"
                            + "<div class=\"card-header\">Posted By:<strong> @"
                            + data[i].user.username + "</strong>"
                            + "</div>"
                            + "<div class=\"card-body\">"
                            + "<h5 class=\"card-title\">" + data[i].title + "</h5>"
                            + "<p class=\"card-text\">" + data[i].content + "</p>"
                            + "<a href=\"Details.html?pid=" + data[i].postId + "\" class=\"btn btn-primary\">Details</a>"
                            + "</div>"
                            + "<div class=\"card-footer text-muted\">Posted On: <strong>"
                            + data[i].postTime + "</strong>"
                            + "</div >"
                            + " </div ><br><br>";


                    }

                    //$("#allPosts tbody").html(str);
                    $("#divAllPosts").html(str);


                }
                else {
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">" + xhr.status + ":" + xhr.statusText + "</div>");
                }
            }
        });
    }

    loadAllPosts();




    var createPost = function () {
        $.ajax({
            url: "https://localhost:44345/api/posts",
            method: "POST",
            data: {
                title: $("#inputTitle").val(),
                content: $("#inputContent").val(),
                userId: localStorage.userId,
            },
            headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    console.log("Status Update Success");
                    //$("#msg").html("Successfully Posted");
                    $("#msg").html("<div class=\"alert alert-primary\" role=\"alert\">Successfully Posted</div>");
                    $("#divNewPost").hide();
                    $("#btnNewPost").show();
                    loadAllPosts();
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




    $("#btnNewPost").click(function () {
        $("#divNewPost").removeAttr("hidden");
        $(this).hide();
    });


    $("#btnCancelPost").click(function () {
        $("#divNewPost").attr("hidden", "hidden");
        $("#btnNewPost").show();
    });


    $("#btnCreatePost").click(function () {
        createPost();

    });







});