$(document).ready(function () {
    if (localStorage.authUser == null) {
        window.location.href = "../User/Authenticate.html";
    }




    var loadAllPosts = function () {
        $.ajax({
            url: "https://localhost:44345/api/posts/",
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + btoa(localStorage.authUser),
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    var str = '';
                    for (var i = 0; i < data.length; i++) {

                        if (localStorage.userId == data[i].userId) {
                            str += "<tr><td>"
                                + data[i].title + "</td><td><p>"
                                + data[i].content + "</p></td><td>"
                                + data[i].postTime + "</td><td>"
                                + data[i].user.username
                                + "</td><td><br>"
                                + "<button style=\"color:red;\" id=\"btnModifyPost" + data[i].postId
                                + "\">Modify</button><br><br><button style=\"color:green;\" id=\"" + data[i].postId
                                + "\">Details</button><br>"
                                + "<br></td></tr>";

                        } else {
                            str += "<tr><td>"
                                + data[i].title + "</td><td><p>"
                                + data[i].content + "</p></td><td>"
                                + data[i].postTime + "</td><td>"
                                + data[i].user.username
                                + "</td><td><button style=\"color:green;\" id=\"" + data[i].postId
                                + "\">Details</button></td></tr>";
                        }
                    }

                    $("#allPosts tbody").html(str);


                }
                else {
                    $("#msg").html(xhr.status + ":" + xhr.statusText)
                }
            }
        });
    }

    loadAllPosts();







});