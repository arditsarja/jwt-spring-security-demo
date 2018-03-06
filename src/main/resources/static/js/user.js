$(document).ready(function () {

    attachListeners();

});
function deleteStudentById(id) {
    console.log("idijaaaaaa" + id);

    $.ajax({


        url: "/api/student/"+id,
        method: "DELETE",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
        },

        success: function (data, textStatus, jqXHR) {
            $('#status').text("U krijua me sukses");
            console.log("U u perditesua me suksess me sukses");

            console.log("#row"+id);
            console.log("#row"+id);
            console.log("#row"+id);
            console.log("#row"+id);
            console.log("#row"+id);
            $("#row"+id).hide() ;
        },
        error: function (xhr, textStatus, errorThrown) {

            $('#status').text("Ka probleme ne sistem provoni me vone");
        }
    });
}

function updateStudentById(id) {
    var firstName = $("#firstName"+id).val();
    var lastName = $("#lastName"+id).val();
    var adress = $("#adress"+id).val();



    console.log("idijaaaaaa" + id);
    console.log("idijaaaaaa" + firstName);
    console.log("idijaaaaaa" + lastName);
    console.log("idijaaaaaa" + adress);

    var input = {
        id:id,
        firstName: firstName,
        lastName:lastName,
        adress: adress
    };
    $.ajax({


        url: "/api/student",
        method: "POST",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
        },
        data: JSON.stringify(input),
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
    });$("#homepage").click(function () {
        window.location="index.html"
    });
    $("#updateStudent").click(function () {
        updateStudent();
    });
    $("#getAllStudents").click(function () {
        getAllStudent();
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

function createStudent() {

    var input = {
        firstName: $('#firstNameStudent').val(),
        lastName: $('#lastNameStudent').val(),
        adress: $('#adress').val()
    };
    $.ajax({


        url: "/api/student",
        method: "POST",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
        },
        data: JSON.stringify(input),
        success: function (data, textStatus, jqXHR) {
            $('#status').text("U krijua me sukses");
            console.log("U krijua me sukses");
        },
        error: function (xhr, textStatus, errorThrown) {

            $('#status').text("Ka probleme ne sistem provoni me vone");
        }
    });
}

function getAllStudent() {
    $.ajax({


        url: "/api/student",
        method: "GET",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
        },

        success: function (data, textStatus, jqXHR) {
            console.log(data)

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
                var rowClass="warning";
                if (data[i]%2==0){
                    rowClass="active";
                }


                html += '<tr class="'+rowClass+'" id="row'+data[i].id+'">';
                for (var key in obj) {
                    index++;
                    if (key != "id") {
                        var value = obj[key];
                        html += "<td><input type='text' class='form-control' id='" + key + data[i].id + "' value='" + value + "'/></td>";
                    }
                    if (index === count) {
                        html += '<td><button class="btn btn-success" type="button" onclick="updateStudentById('+obj.id+')">Perditso</button></td>';
                        html += '<td><button class="btn btn-danger" type="button" onclick="deleteStudentById('+obj.id+')">Fshi</button></td>';
                        index = 0;
                    }
                }
                html += '</tr>';
            }
            // per ta kuptuar si lloghike
            // for (var i = 0 ;i<data.length;i++)
            // {
            //     html += '<tr>';
            //     html += '<td>';
            //     html+=data[i].firstName;
            //     html += '</td>';
            //     html += '<td>';
            //     html+=data[i].lastName;
            //     html += '</td>';
            //     html += '<td>';
            //     html+=data[i].adress;
            //     html += '</td>';
            //     html += '</tr>';
            // }
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
    $.ajax({


        url: "/api/student",
        method: "POST",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem("jwtToken"),
        },
        data: JSON.stringify(input),
        success: function (data, textStatus, jqXHR) {
            $('#status').text("U perditsua me sukses");
        },
        error: function (xhr, textStatus, errorThrown) {

            $('#status').text("Ka probleme ne sistem provoni me vone");
        }
    });
}