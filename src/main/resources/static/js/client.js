$(function () {
    // VARIABLES =============================================================
    var TOKEN_KEY = "jwtToken";
    var $notLoggedIn = $("#notLoggedIn");
    var $loggedIn = $("#loggedIn").hide();
    var $loggedInBody = $("#loggedInBody");
    var $response = $("#response");
    var $login = $("#login");
    var $userInfo = $("#userInfo").hide();
    var isAdmin = false;

    // FUNCTIONS =============================================================
    function getJwtToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    function setJwtToken(token) {
        console.log("token");
        console.log(token);

        localStorage.setItem(TOKEN_KEY, token);
    }

    function removeJwtToken() {
        localStorage.removeItem(TOKEN_KEY);
    }

    function doLogin(loginData) {

        console.log("login parameter" + loginData);
        console.log("login parameter" + loginData);
        var plaintext = JSON.stringify(loginData);
        var ciphertext = aesUtil.encrypt(salt, iv, passphrase, plaintext);
        var messsage = {message: ciphertext};
        $.ajax({
            url: "/auth",
            type: "POST",
            data: JSON.stringify(messsage),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, textStatus, jqXHR) {
                var data = aesUtil.decrypt(salt, iv, passphrase, response.message);
                console.log(data);
                data = JSON.parse(data);
                console.log(data);
                setJwtToken(data.token);
                $login.hide();
                $notLoggedIn.hide();
                showTokenInformation();
                showUserInformation();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 401) {
                    $('#loginErrorModal')
                        .modal("show")
                        .find(".modal-body")
                        .empty()
                        .html("<p>Spring exception:<br>" + jqXHR.responseJSON.exception + "</p>");
                } else {
                    throw new Error("an unexpected error occured: " + errorThrown);
                }
            }
        });
    }

    function doLogout() {
        removeJwtToken();
        $('#adminRegisterUser').addClass("hidden");
        $login.show();
        $userInfo
            .hide()
            .find("#userInfoBody").empty();
        $loggedIn.hide();
        $loggedInBody.empty();
        $notLoggedIn.show();
    }

    function createAuthorizationTokenHeader() {
        var token = getJwtToken();
        if (token) {
            return {"Authorization": "Bearer " + token};
        } else {
            return {};
        }
    }


    function showUserInformation() {
        $.ajax({
            url: "/user",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: createAuthorizationTokenHeader(),
            success: function (response, textStatus, jqXHR) {
                var data = aesUtil.decrypt(salt, iv, passphrase, response.message);
                console.log(data);
                data = JSON.parse(data);
                console.log(data);
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
                        $('#adminRegisterUser').removeClass("hidden");
                    }
                });
                var $authorities = $("<div>").text("Authorities:");
                $authorities.append($authorityList);
                $userInfoBody.append($authorities);
                $userInfo.show();
            }
        });
    }

    function showTokenInformation() {
        var jwtToken = getJwtToken();
        var decodedToken = jwt_decode(jwtToken);

        $loggedInBody.append($("<h4>").text("Token"));
        $loggedInBody.append($("<div>").text(jwtToken).css("word-break", "break-all"));
        $loggedInBody.append($("<h4>").text("Token claims"));

        var $table = $("<table>")
            .addClass("table table-striped");
        appendKeyValue($table, "sub", decodedToken.sub);
        appendKeyValue($table, "aud", decodedToken.aud);
        appendKeyValue($table, "iat", decodedToken.iat);
        appendKeyValue($table, "exp", decodedToken.exp);

        $loggedInBody.append($table);

        $loggedIn.show();
    }

    function appendKeyValue($table, key, value) {
        var $row = $("<tr>")
            .append($("<td>").text(key))
            .append($("<td>").text(value));
        $table.append($row);
    }

    function showResponse(statusCode, message) {
        $response
            .empty()
            .text("status code: " + statusCode + "\n-------------------------\n" + message);
    }

    // REGISTER EVENT LISTENERS =============================================================
    $("#loginForm").submit(function (event) {
        event.preventDefault();

        var $form = $(this);
        var formData = {
            username: $form.find('input[name="username"]').val(),
            password: $form.find('input[name="password"]').val()
        };

        doLogin(formData);
    });

    $("#logoutButton").click(doLogout);

    $("#exampleServiceBtn").click(function () {
        $.ajax({
            url: "/persons",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: createAuthorizationTokenHeader(),
            success: function (data, textStatus, jqXHR) {

                console.log("hiiii " + JSON.stringify(data));
                showResponse(jqXHR.status, JSON.stringify(data));
            },
            error: function (jqXHR, textStatus, errorThrown) {
                showResponse(jqXHR.status, errorThrown);
            }
        });
    });

    $("#adminServiceBtn").click(function () {
        $.ajax({
            url: "/protected",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            headers: createAuthorizationTokenHeader(),
            success: function (response, textStatus, jqXHR) {
                var data = aesUtil.decrypt(salt, iv, passphrase, response.message);
                console.log(data);
                data = JSON.parse(data);
                console.log(data);
                console.log("hiiii " + JSON.stringify(data));
                showResponse(jqXHR.status, data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                showResponse(jqXHR.status, errorThrown);
            }
        });
    });

    $loggedIn.click(function () {
        $loggedIn
            .toggleClass("text-hidden")
            .toggleClass("text-shown");
    });

    // INITIAL CALLS =============================================================
    if (getJwtToken()) {
        $login.hide();
        $notLoggedIn.hide();
        showTokenInformation();
        showUserInformation();
    }
});