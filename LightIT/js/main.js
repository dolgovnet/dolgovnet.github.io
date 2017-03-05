/* This variable is declared in order to
 control what particular product is seen right now.
 Later it will be used to determine the ID of
 product while sending review about it. */
var productID;

/* This variable contains data about products
that we received from the server. */
var productData;

/*This variable collect all necessary data
about the user when he is signing up and is sent to the server */
var userDataReg = {};

/*This variable collect all necessary data
 about the user when he is loging up and is sent to the server */
var userDataLog = {};

/* This variable contains reviews about first product
 that we received from the server. */
var firstProductReviews;

/* This variable contains reviews about second product
 that we received from the server. */
var secondProductReviews;

/*This variable collect all necessary data
 the review should contain and then it is sent to the server */
var reviewMessage = {};

var url;



$(document).ready(function() {

    /*INDEX PAGE */

    // Request to get data about products from server

    $.ajax({
        url: 'https://smktesting.herokuapp.com/api/products/',
        dataType: 'json',
        error: function(xhr, statusText, err) {
            alert("Error: " + xhr.statusText);
        },
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            productData = data;
        }
    });

    // Requests to get reviews about products from server

    $.ajax({
        url: 'https://smktesting.herokuapp.com/api/reviews/1',
        dataType: 'json',
        error: function() {
            alert('An error occurred');
        },
        success: function(data, textStatus, jqXHR) {
            firstProductReviews = data;
        }
    });

    $.ajax({
        url: 'https://smktesting.herokuapp.com/api/reviews/2',
        dataType: 'json',
        error: function() {
            alert('An error occurred');
        },
        success: function(data, textStatus, jqXHR) {
            secondProductReviews = data;
        }
    });


    // Product data-output

    $('#product1').click(function() {

        productID = 1;
        url = 'https://smktesting.herokuapp.com/api/reviews/' + productID;

        $('#product-section').removeClass('invisible');
        $('#review-section').removeClass('invisible');
        $('.product-title h1').text(productData[0].title);
        $('.product-descript').text(productData[0].text);
        $('.product-photo img').attr('src', 'http://smktesting.herokuapp.com/static/' + productData[0].img);

        for (var i = 0; i < firstProductReviews.length; i++) {
            $('.review-list').append('<div class="review-item"><p id="comment-user"><span class="glyphicon glyphicon-user"></span>' + firstProductReviews[i].created_by.username + '</p><p id="comment-date"><span class="glyphicon glyphicon-calendar"></span>' + firstProductReviews[i].created_at + '</p><p id="comment-rate">Rate: ' + firstProductReviews[i].rate + '</p><p id="comment-text">' + firstProductReviews[i].text + '</p></div>');
        }

    });

    $('#product2').click(function() {

        productID = 2;
        url = 'https://smktesting.herokuapp.com/api/reviews/' + productID;

        $('#product-section').removeClass('invisible');
        $('#review-section').removeClass('invisible');
        $('.product-title h1').text(productData[1].title);
        $('.product-descript').text(productData[1].text);
        $('.product-photo img').attr('src', 'http://smktesting.herokuapp.com/static/' + productData[1].img);

        for (var i = 0; i < secondProductReviews.length; i++) {
            $('.review-list').append('<div class="review-item"><p id="comment-user"><span class="glyphicon glyphicon-user"></span>' + secondProductReviews[i].created_by.username + '</p><p id="comment-date"><span class="glyphicon glyphicon-calendar"></span>' + secondProductReviews[i].created_at + '</p><p id="comment-rate">Rate: ' + secondProductReviews[i].rate + '</p><p id="comment-text">' + secondProductReviews[i].text + '</p></div>');
        }
    });

    //Log out

    $('#logOut').click(function() {
        localStorage.removeItem('token');
    });

    //Send new review

    $('#review-content').keyup(function() {
        var text = $(this).val();
        reviewMessage.text = text;
    });

    $("#submit-review").click(function() {

        $.post({
            url: url,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(reviewMessage),
            headers: {
                'Authorization': 'Token ' + localStorage.getItem("token")
            },
            error: function(xhr) {
                console.log("Error: " + xhr.statusText);
                if (xhr.statusText === 'UNAUTHORIZED') {
                    // alert ('Please, log in!');
                    swal({
                        title: 'Ooops...',
                        text: 'If you want to submit your review, please Log in!',
                        type: 'error'
                    });
                } else {
                    //alert ('Some error occur!');
                    swal({
                        title: 'Ooops...Some error occur!',
                        type: 'error'
                    });
                }

            },
            success: function(data) {
                console.log(data);
                //alert('Your review was sent!');
                swal({
                    title: 'Your review was sent!',
                    type: 'success'
                });
                $('#review-content').val('');
                $('.live-rating').text('');
                $(".my-rating-9").starRating({
                    activeColor: 'lightgray'
                });

            }
        });
        event.preventDefault();
    });


    /* SIGN UP PAGE */

    function validateEmail(email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
        return emailReg.test(email);
    }

    function validatePassword1(password) {
        var passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return passwordReg.test(password);
    }

    function saveToken(val) {
        localStorage.setItem('token', val);

        return true;
    }


    // Email validation

    $('#emailReg').blur(function() {

        var email = $(this).val();

        if (email != 0) {
            if (validateEmail(email)) {
                $(this).css('border-color', ' #00FA9A');
                $('.email-error-text-message').css('display', 'none');

            } else {
                $(this).css('border-color', '#f98379');
                $('.email-error-text-message').css('display', 'block');
            }
        } else {
            $(this).css('border-color', '#f98379');
        }

        userDataReg.username = email;
        //console.log(userDataReg.username);
    });

    // Password validation

    $('#password1Reg').blur(function() {

        var password1 = $(this).val();

        if (password1 != 0) {
            if (validatePassword1(password1)) {
                $(this).css('border-color', ' #00FA9A');
                $('.password1-error-text-message').css('display', 'none');

            } else {
                $(this).css('border-color', '#f98379');
                $('.password1-error-text-message').css('display', 'block');
            }
        } else {
            $(this).css('border-color', '#f98379');

        }

        userDataReg.password = password1;
        //console.log(userDataReg.password);
    });

    // Password confirmation

    $('#password2Reg').blur(function() {

        var password2 = $(this).val();

        if (userDataReg.password === password2) {
            $(this).css('border-color', ' #00FA9A');
            $('.password2-error-text-message').css('display', 'none');

        } else {
            $(this).css('border-color', '#f98379');
            $('.password2-error-text-message').css('display', 'block');
        }
    });

    console.log(userDataReg);

    // Sign up request

    $("#createAccount").click(function() {
        $.post({
            url: 'https://smktesting.herokuapp.com/api/register/',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(userDataReg),
            error: function(xhr) {
                console.log("Error: " + xhr.statusText);
            },
            success: function(data) {
                if (data.success == true) {
                    console.log(data);
                    saveToken(data.token);
                    console.log(localStorage.getItem('token'));

                    //alert ('Congratulations!');
                    swal({
                        title: 'Congratulations! Now you have your own account!',
                        type: 'success'
                    });

                    //window.location.replace('index.html');
                } else {
                    //alert(data.message);
                    swal({
                        title: data.message + ' !',
                        type: 'error'
                    });
                }
            }
        });
        event.preventDefault();
    });



    /*LOG IN PAGE */

    // LOG IN

    $('#emailLog').blur(function() {

        var email = $(this).val();

        if (email != 0) {
            if (validateEmail(email)) {
                $(this).css('border-color', '#00FA9A');
            } else {
                $(this).css('border-color', '#f98379');
            }
        } else {
            $(this).css('border-color', '#f98379');
        }
        userDataLog.username = email;

    });

    $('#passwordLog').blur(function() {

        var password = $(this).val();

        if (password != 0) {
            $(this).css('border-color', ' #00FA9A');
        } else {
            $(this).css('border-color', '#f98379');
        }

        userDataLog.password = password;

        //console.log(userDataLog.password );
    });

    //Log in REQUEST

    $("#logIn").click(function() {

        $.post({
            url: 'https://smktesting.herokuapp.com/api/login/',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(userDataLog),
            error: function(xhr, statusText, err) {
                console.log("Error: " + xhr.statusText);
            },
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                saveToken(data.token);
                //alert ('Welcome in your account!');
                swal({
                    title: 'Welcome in your account!',
                    type: 'success'
                });
                //setTimeout(window.location.replace('index.html'), 10000);

            }
        });
        event.preventDefault();
    });

});
