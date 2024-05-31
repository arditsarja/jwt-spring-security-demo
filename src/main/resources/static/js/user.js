$(document).ready(function () {
    attachListeners();
    // postEncrypt();
    // getAllStudents();

});

function deleteStudentById(id) {
    console.log("idijaaaaaa" + id);

    $.ajax({


        url: "/api/student/" + id,
        method: "DELETE",
        dataType: "json",
        headers: {

            Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
        },

        success: function (data, textStatus, jqXHR) {
            $('#status').text("U krijua me sukses");
            console.log("U u perditesua me suksess me sukses");

            console.log("#row" + id);
            console.log("#row" + id);
            console.log("#row" + id);
            console.log("#row" + id);
            console.log("#row" + id);
            $("#row" + id).hide();
        },
        error: function (xhr, textStatus, errorThrown) {

            $('#status').text("Ka probleme ne sistem provoni me vone");
        }
    });
}

function updateStudentById(id) {
    var firstName = $("#firstName" + id).val();
    var lastName = $("#lastName" + id).val();
    var adress = $("#adress" + id).val();


    console.log("idijaaaaaa" + id);
    console.log("idijaaaaaa" + firstName);
    console.log("idijaaaaaa" + lastName);
    console.log("idijaaaaaa" + adress);

    var input = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        adress: adress
    };
    var plaintext = JSON.stringify(input);
    var ciphertext = aesUtil.encrypt(salt, iv, passphrase, plaintext);
    var messsage = {message:ciphertext};
    $.ajax({


        url: "/api/student",
        method: "POST",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
        },
        data: JSON.stringify(messsage),
        success: function (data, textStatus, jqXHR) {
            $('#status').text("U krijua me sukses");
            console.log("U u perditesua me suksess me sukses");
        },
        error: function (xhr, textStatus, errorThrown) {

            $('#status').text("Ka probleme ne sistem provoni me vone");
        }
    });

}

function attachListeners() {

    $("#idStudentShow").hide();
    $("#createStudent").show();
    $("#updateStudent").hide();

    $("#create").change(function () {
        seeFields();
    });
    $("#createStudent").click(function () {
        createStudent();
    });
    $("#homepage").click(function () {
        window.location = "index.html"
    });
    $("#updateStudent").click(function () {
        updateStudent();
    });
    $("#getAllStudents").click(function () {
        getAllStudents();
    });


    // If the checkbox is checked, display the output text


}

function seeFields() {
    if ($("#create").is(':checked')) {
        $("#idStudentShow").show();
        $("#createStudent").hide();
        $("#updateStudent").show();
    } else {
        $("#idStudentShow").hide();
        $("#createStudent").show();
        $("#updateStudent").hide();
    }
}


function postEncrypt() {
    var input = {
        firstName: "Ardit",
        lastName: "Sarja",
        adress: "Bldskflasdlfjahdsfjksdhfudi"
    };
    var plaintext = JSON.stringify(input);
    var ciphertext = aesUtil.encrypt(salt, iv, passphrase, plaintext);
    console.log(plaintext);
    console.log(passphrase);
    console.log(iv);
    console.log(salt);
    console.log(aesUtil);
    console.log(ciphertext);

    var messsage = {message:ciphertext};

    $.ajax({

        url: "/api/student",
        method: "POST",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
        },
        data:  JSON.stringify(messsage),
        success: function (data, textStatus, jqXHR) {
            $('#status').text(data);
            console.log(data);
        },
        error: function (xhr, textStatus, errorThrown) {

            $('#status').text("Ka probleme ne sistem provoni me vone");
        }
    });
}


function createStudent() {

    var input = {
        firstName: $('#firstNameStudent').val(),
        lastName: $('#lastNameStudent').val(),
        adress: $('#adress').val()
    };
    var plaintext = JSON.stringify(input);
    var ciphertext = aesUtil.encrypt(salt, iv, passphrase, plaintext);
    var messsage = {message:ciphertext};
    $.ajax({


        url: "/api/student",
        method: "POST",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
        },
        data: JSON.stringify(messsage),
        success: function (data, textStatus, jqXHR) {
            $('#status').text("U krijua me sukses");
            console.log("U krijua me sukses");
        },
        error: function (xhr, textStatus, errorThrown) {

            $('#status').text("Ka probleme ne sistem provoni me vone");
        }
    });
}


function getAllStudents() {

    $.ajax({


        url: "/api/student",
        method: "GET",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
        },

        success: function (response, textStatus, jqXHR) {
            console.log(response)
            console.log(response.message)
            var data = aesUtil.decrypt(salt, iv, passphrase, response.message);
            console.log(data);
            data = JSON.parse(data);
            console.log(data);


            var html = "";
            if (data.length > 0) {
                html += '<table class="table">';
                html += '<tr>';
                for (var key in data[0]) {
                    if (key != "id") {
                        html += "<td>" + key + "</td>";
                    }
                }
                html += '</tr>';
            }
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var count = Object.keys(obj).length;
                console.log(count);
                var index = 0;
                var rowClass = "warning";
                if (data[i] % 2 == 0) {
                    rowClass = "active";
                }


                html += '<tr class="' + rowClass + '" id="row' + data[i].id + '">';
                for (var key in obj) {
                    index++;
                    if (key != "id") {
                        var value = obj[key];
                        html += "<td><input type='text' class='form-control' id='" + key + data[i].id + "' value='" + value + "'/></td>";
                    }
                    if (index === count) {
                        html += '<td><button class="btn btn-success" type="button" onclick="updateStudentById(' + obj.id + ')">Perditso</button></td>';
                        html += '<td><button class="btn btn-danger" type="button" onclick="deleteStudentById(' + obj.id + ')">Fshi</button></td>';
                        index = 0;
                    }
                }
                html += '</tr>';
            }
            if (data.length > 0) {
                html += '</table>';
                document.getElementById("tabela").innerHTML = html;
            }

        },
        error: function (xhr, textStatus, errorThrown) {


        }
    });
}

function updateStudent() {
    var input = {
        id: $('#idStudent').val(),
        firstName: $('#firstNameStudent').val(),
        lastName: $('#lastNameStudent').val(),
        adress: $('#adress').val()
    };
    var plaintext = JSON.stringify(input);
    var ciphertext = aesUtil.encrypt(salt, iv, passphrase, plaintext);
    var messsage = {message:ciphertext};
    $.ajax({


        url: "/api/student",
        method: "POST",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
        },
        data: JSON.stringify(messsage),
        success: function (data, textStatus, jqXHR) {
            $('#status').text("U perditsua me sukses");
        },
        error: function (xhr, textStatus, errorThrown) {

            $('#status').text("Ka probleme ne sistem provoni me vone");
        }
    });
}