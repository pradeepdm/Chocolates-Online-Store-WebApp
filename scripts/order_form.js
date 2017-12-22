/*
     Mallikarjun, Pradeep
     Jadran Id: Jadrn033
     Project #4
     Fall 2017
     Reference: Alan Riggins
*/

$(document).ready(function () {

    $('#form1')[0].reset();
    $('#orderform').hide();
    var errorStatus = $('#display-errormessage');

    var element = new Array();
    element[0] = $('[name="fname"]');
    element[1] = $('[name="lname"]');
    element[2] = $('[name="email"]');
    element[3] = $('[name="s_address1"]');
    element[4] = $('[name="s_city"]');
    element[5] = $('[name="s_state"]');
    element[6] = $('[name="s_zip"]');
    element[7] = $('[name="nameonc"]');
    element[8] = $('[name="cardno"]');
    element[9] = $('[name="cvv"]');

    element[10] = $('[name="b_address1"]');
    element[11] = $('[name="b_city"]');
    element[12] = $('[name="b_state"]');
    element[13] = $('[name="b_zip"]');


    var hac = $('[name="areacode"]');
    var hpr = $('[name="prefix"]');
    var hph = $('[name="phone"]');

    $('[name="month"]').on('keyup', function () {
        if ($('[name="month"]').val().length == 2)
            $('[name="year"]').focus();
    });


    hac.on('keyup', function () {
        if (hac.val().length == 3)
            hpr.focus();
    });

    hpr.on('keyup', function () {
        if (hpr.val().length == 3)
            hph.focus();
    });


    $('[name="sameaddr"]').click(function () {
        if ($('[name="sameaddr"]').is(":checked")) {
            var value = element[3].val();
            element[10].val(value);
            value = $('[name="s_address2"]').val();
            $('[name="b_address2"]').val(value);
            value = element[4].val();
            element[11].val(value);
            value = element[5].val();
            element[12].val(value);
            value = element[6].val();
            element[13].val(value);
        }
        else {
            element[10].val("");
            element[11].val("");
            element[12].val("");
            element[13].val("");
        }
    });

    $(':reset').on('click', function () {
        updateErrorStatus("", false);
        $('*').removeClass("error");
    });

    $(':submit').on('click', function (e) {
        $('*').removeClass("error");
        updateErrorStatus("", false);
        if (!validate_Data()) {
            e.preventDefault();
            return;
        }
        else {
            $('#form2').submit();
        }
    });

    function validate_Data() {

        var htel = $.trim($('[name="areacode"]').val()) +
            $.trim($('[name="prefix"]').val()) +
            $.trim($('[name="phone"]').val());

        if (isEmpty(element[0].val())) {
            element[0].addClass("has-error");
            updateErrorStatus("Please enter your First name", true);
            element[0].focus();
            return false;
        }

        if (isEmpty(element[1].val())) {
            element[1].addClass("has-error");
            updateErrorStatus("Please enter your Last name", true);
            element[1].focus();
            return false;
        }
        if (isEmpty(htel)) {
            hac.addClass("has-error");
            hpr.addClass("has-error");
            hph.addClass("has-error");
            updateErrorStatus("Please enter Phone Number", true);
            hac.focus();
            return false;
        }

        if (!isEmpty(htel)) {
            if (isEmpty(hac.val())) {
                hac.focus();
                updateErrorStatus("Please enter areacode of phone number", true);
                return false;
            }
            if (isEmpty(hpr.val())) {
                hpr.focus();
                updateErrorStatus("Please enter prefix of phone number", true);
                return false;
            }
            if (isEmpty(hph.val())) {
                hph.focus();
                updateErrorStatus("Please enter Phone extension", true);
                return false;
            }
        }
        if (!$.isNumeric(htel)) {
            if (!$.isNumeric(hac.val())) {
                updateErrorStatus("Areacode has to be number", true);
                hac.addClass("has-error");
                hac.focus();
                return false;
            }
            if (!$.isNumeric(hpr.val())) {
                updateErrorStatus("Prefix has to be number", true);
                hpr.addClass("has-error");
                hpr.focus();
                return false;
            }
            if (!$.isNumeric(hph.val())) {
                updateErrorStatus("Extension has to be number", true);
                hph.addClass("has-error");
                hph.focus();
                return false;
            }
        }
        else if (validate_Tel(htel)) {
            if (hac.val().length != 3) {
                updateErrorStatus("Areacode must have 3 digits", true);
                hac.addClass("has-error");
                hac.focus();
                return false;
            }
            if (hpr.val().length != 3) {
                updateErrorStatus("Prefix must have 3 digits", true);
                hpr.addClass("has-error");
                hpr.focus();
                return false;
            }
            if (hph.val().length != 4) {
                updateErrorStatus("The Phone number's, Phone field must have 4 digits", true);
                hph.addClass("has-error");
                hph.focus();
                return false;
            }
        }
        if (isEmpty(element[2].val())) {
            element[2].addClass("has-error");
            updateErrorStatus("Please enter your Email Id", true);
            element[2].focus();
            return false;
        }

        if (!validate_Email()) {
            element[2].addClass("has-error");
            updateErrorStatus("Please enter a valid Email Id", true);
            element[2].focus();
            return false;
        }

        if (isEmpty(element[3].val())) {
            element[3].addClass("has-error");
            updateErrorStatus("Please enter your Address", true);
            element[3].focus();
            return false;
        }

        if (isEmpty(element[4].val())) {
            element[4].addClass("has-error");
            updateErrorStatus("Please enter your City", true);
            element[4].focus();
            return false;
        }

        if (!validate_City(element[4].val())) {
            element[4].addClass("has-error");
            updateErrorStatus("Please enter a valid City name", true);
            element[4].focus();
            return false;
        }

        if (isEmpty(element[5].val())) {
            element[5].addClass("has-error");
            updateErrorStatus("Please enter your State", true);
            element[5].focus();
            return false;
        }

        if (!validate_State(element[5].val())) {
            element[5].addClass("has-error");
            updateErrorStatus("Please enter a valid 2 letter State Abbreviation", true);
            element[5].focus();
            return false;

        }

        if (isEmpty(element[6].val())) {
            element[6].addClass("has-error");
            updateErrorStatus("Please enter your Zip code", true);
            element[6].focus();
            return false;
        }

        if (!validate_Zip(element[6].val())) {
            element[6].addClass("has-error");
            updateErrorStatus("Please enter a valid 5 digit Zip code", true);
            element[6].focus();
            return false;
        }

        if (!validate_Ptype()) {
            updateErrorStatus("Please choose Payment type", true);
            $('[name="cardpayment"]').focus();
            return false;
        }

        if (isEmpty(element[7].val())) {
            element[7].addClass("has-error");
            updateErrorStatus("Please enter Name on Card", true);
            element[7].focus();
            return false;
        }

        if (isEmpty(element[8].val())) {
            element[8].addClass("has-error");
            updateErrorStatus("Please enter Card Number", true);
            element[8].focus();
            return false;
        }
        if (!$.isNumeric(element[8].val())) {
            element[8].addClass("has-error");
            updateErrorStatus("Invalid, digits only", true);
            element[8].focus();
            return false;
        }

        if (isEmpty($('[name="month"]').val())) {
            $('[name="month"]').addClass("has-error");
            updateErrorStatus("Please enter Month field in Expiration Date", true);
            $('[name="month"]').focus();
            return false;
        }
        else if (!$.isNumeric($('[name="month"]').val())) {
            $('[name="month"]').addClass("has-error");
            updateErrorStatus("Please enter digits only", true);
            $('[name="month"]').focus();
            return false;
        }

        if (isEmpty($('[name="year"]').val())) {
            $('[name="year"]').addClass("has-error");
            updateErrorStatus("Please enter year field in Expiration Date", true);
            $('[name="year"]').focus();
            return false;
        }
        else if (!$.isNumeric($('[name="year"]').val())) {
            $('[name="year"]').addClass("has-error");
            updateErrorStatus("Please enter numbers only", true);
            $('[name="year"]').focus();
            return false;
        }

        if (!validate_Date()) {
            return false;
        }

        if (isEmpty(element[9].val())) {
            element[9].addClass("has-error");
            updateErrorStatus("Please enter CVV Security code", true);
            element[9].focus();
            return false;
        }

        if ((!$.isNumeric(element[9].val())) || ((element[9].val()).length < 3)) {
            element[9].addClass("has-error");
            updateErrorStatus("Invalid CVV, Enter a valid 3 digit CVV", true);
            element[9].focus();
            return false;
        }
        if (isEmpty(element[10].val())) {
            element[10].addClass("has-error");
            updateErrorStatus("Please enter Address, in Billing Address Section", true);
            element[10].focus();
            return false;
        }

        if (isEmpty(element[11].val())) {
            element[11].addClass("has-error");
            updateErrorStatus("Please enter City, in Billing Address Section", true);
            element[11].focus();
            return false;
        }

        if (!validate_City(element[11].val())) {
            element[11].addClass("has-error");
            updateErrorStatus("Please enter a valid City name, in Billing Address Section", true);
            element[11].focus();
            return false;
        }

        if (isEmpty(element[12].val())) {
            element[12].addClass("has-error");
            updateErrorStatus("Please enter State, in Billing Address Section", true);
            element[12].focus();
            return false;
        }

        if (!validate_State(element[12].val())) {
            element[12].addClass("has-error");
            updateErrorStatus("Please enter a valid 2 letter State Abbreviation", true);
            element[12].focus();
            return false;
        }

        if (isEmpty(element[13].val())) {
            element[13].addClass("has-error");
            updateErrorStatus("Please enter Zip code in Billing Address Section", true);
            element[13].focus();
            return false;
        }

        if (!validate_Zip(element[13].val())) {
            element[13].addClass("has-error");
            updateErrorStatus("Please enter a valid 5 digit Zip code in Billing Address Section", true);
            element[13].focus();
            return false;
        }

        return true;
    }

});

function updateErrorStatus(s, show) {

    $('#display-errormessage').html(s);
    if (show) {
        $('#display-errormessage').show();
    }
    else {
        $('#display-errormessage').hide();
    }
};


function isEmpty(fieldValue) {
    if ($.trim(fieldValue).length == 0)
        return true;
    return false;
}

function validate_Tel(t) {
    var value = t.length;
    if (value == 10) {
        return false;
    }
    updateErrorStatus("", false);
    return true;
}

function validate_Ptype() {
    var radio = document.getElementsByName("cardpayment")
    var check = -1
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            check = i;
        }
    }
    if (check == -1) {
        return false;
    }
    updateErrorStatus("", false);
    return true;
}

function validate_Email() {
    var value = $.trim($('[name="email"]').val());
    var pattern = /\S+@\S+\.[a-zA-Z]{2,6}/;
    if (pattern.test(value)) {
        return true;
        updateErrorStatus("", false);
    }

    return false;
}

function validate_City(val) {
    var value = $.trim(val);
    var pattern = /^[a-zA-Z\- \.]+$/;
    if (pattern.test(value)) {
        updateErrorStatus("", false);
        return true;
    }
    return false;
}

function validate_State(state) {
    var value = $.trim(state).toUpperCase();
    var stateList = new Array("AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",
        "DC2", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",
        "MA", "MD", "ME", "MH", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH",
        "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN",
        "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY");
    for (var i = 0; i < stateList.length; i++)
        if (stateList[i] == value) {
            updateErrorStatus("", false);
            return true;
        }

    return false;
}

function validate_Zip(zip) {
    var value = $.trim(zip);
    var pattern = /^[0-9]{5}$/;
    if (pattern.test(value)) {
        updateErrorStatus("", false);
        return true;
    }
    return false;
}

function validate_Date() {
    var Month = $.trim($('[name="month"]').val());
    var Year = $.trim($('[name="year"]').val());
    if (Month < 1 || Month > 12) {
        $('[name="month"]').addClass("has-error");
        updateErrorStatus("Invalid month, Enter between 1 and 12", true);
        $('[name="month"]').focus();
        return false;
    }
    if (Year < 2014) {
        $('[name="year"]').addClass("has-error");
        updateErrorStatus("Please Check the Year field of Valid through Period of Card", true);
        $('[name="month"]').focus();
        return false;
    }
    if (Year == 2014) {
        if (Month != 12) {
            $('[name="year"]').addClass("has-error");
            updateErrorStatus("Please Check Card Validity Period Field", true);
            $('[name="month"]').focus();
            return false;
        }
    }
    updateErrorStatus("", false);
    return true;
}

