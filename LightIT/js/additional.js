$(document).ready(function() {
    // Year that is displayed in the footer

    var year = document.getElementById('year');
    var date = new Date;
    var currentYear = date.getFullYear();
    year.innerHTML += currentYear;

    // Star rating

    $(".my-rating-9").starRating({
        starSize: 22,
        strokeWidth: 5,
        hoverColor: '#ffff99',
        activeColor: '#ffff00',
        useGradient: false,
        initialRating: 0,
        disableAfterRate: false,
        onHover: function(currentIndex, currentRating, $el) {
            $('.live-rating').text(currentIndex);
        },
        onLeave: function(currentIndex, currentRating, $el) {
            $('.live-rating').text(currentRating);
            reviewMessage.rate = currentRating;
        }
    });
});
