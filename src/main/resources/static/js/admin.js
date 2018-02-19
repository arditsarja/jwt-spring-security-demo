$(document).ready(function () {

    attachListeners();

});


function registerUser(input) {
    console.log("do therritet pa merak");
    console.log(JSON.stringify(input));
}

function registerUser() {

    $.ajax({
        url: "/user",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: createAuthorizationTokenHeader(),
        success: function (data, textStatus, jqXHR) {
            var $userInfoBody = $userInfo.find("#userInfoBody");
            isAdmin = false;
            $userInfoBody.append($("<div>").text("Username: " + data.username));
            $userInfoBody.append($("<div>").text("Email: " + data.email));

            var $authorityList = $("<ul>");
            data.authorities.forEach(function (authorityItem) {
                $authorityList.append($("<li>").text(authorityItem.authority));
                if (authorityItem.authority === "ROLE_ADMIN") {
                    console.log("is admin");
                    isAdmin = true;
                }
            });
            var $authorities = $("<div>").text("Authorities:");
            $authorities.append($authorityList);
            $userInfoBody.append($authorities);
            $userInfo.show();
            if (isAdmin) {
                adminRegisterUser.show();
            } else {
                adminRegisterUser.hide();
            }
        }
    });


}


function attachListeners() {
    $('#errorPassword').hide();
    $('#usernameForce').hide();
    $('#passwordForce').hide();


    $('#registerUser').click(function () {
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var passwordConfirm = $('#passwordConfirm').val();
        var role = $("input[name='role']:checked").val();
        var activity = $("input[name='activity']:checked").val();
        var authorities = ["ROLE_USER"];
        var acces = true
        if (password != passwordConfirm) {
            $('#errorPassword').show();
            acces = false;
        }
        else {
            $('#errorPassword').hide();
        }
        if (username === "") {
            $('#usernameForce').show();
            acces = false;
        }else{
            $('#usernameForce').hide();
        }
        if (password === "") {
            $('#passwordForce').show();
            acces = false;
        }else{
            $('#passwordForce').hide();
        }

        if (role === "ROLE_ADMIN") {
            authorities.push("ROLE_ADMIN");
        }


        if (acces) {
            var input = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password,
                activity: activity,
                authorities: authorities
            };
            registerUser(input);
        }
    })

};

