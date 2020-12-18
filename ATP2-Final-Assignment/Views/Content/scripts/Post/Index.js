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

                        str += "<tr><td>"
                            + data[i].title + "</td><td><p>"
                            + data[i].content + "</p></td><td>"
                            + data[i].postTime + "</td><td>"
                            + data[i].user.username
                            + "</td><td><a href=\"Details.html?pid=" + data[i].postId + "\"><button style=\"color:green;\""
                            + "\">Details</button></a></td></tr>";
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