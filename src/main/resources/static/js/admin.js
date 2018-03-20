$(document).ready(function () {

    attachListeners();

});


function registerUser(input,role) {
    console.log("do therritet pa merak");
    console.log(JSON.stringify(input));
    var plaintext = JSON.stringify(input);
    var ciphertext = aesUtil.encrypt(salt, iv, passphrase, plaintext);
    var messsage = {message:ciphertext};

    $.ajax({
        url: "/create_user/"+role,
        method: "PUT",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
        },
        data: JSON.stringify(messsage),
        success: function (data, textStatus, jqXHR) {
            console.log("YESSSSSSSSSSSSSSSSSS");
            console.log("YESSSSSSSSSSSSSSSSSS");
            console.log("YESSSSSSSSSSSSSSSSSS");
            console.log("YESSSSSSSSSSSSSSSSSS");
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
        } else {
            $('#usernameForce').hide();
        }
        if (password === "") {
            $('#passwordForce').show();
            acces = false;
        } else {
            $('#passwordForce').hide();
        }
        if(role==="ROLE_ADMIN")
            authorities.push("ROLE_ADMIN");



        if (acces) {
            var input = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password,
                enabled: activity
            };
            registerUser(input,role);
        }
    })

};

