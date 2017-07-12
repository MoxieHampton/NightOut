$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('.carousel').carousel({
        padding: 200
    });
    autoplay()

    function autoplay() {
        $('.carousel').carousel('next');
        setTimeout(autoplay, 3500);
    }
    $('.parallax').parallax();


});
