/* Author: Cheston Lee
 *
 */
$(document).ready(function() {
    //Make the jsonp request to twitter to get the latest tweets with the
    //tag hackfortress.
    var url = 'http://api.twitter.com/1/statuses/user_timeline.json?callback=?';
    $.getJSON(url, {
        screen_name : 'hackfortress',
        count : 5,
    }, function (resp) {
        if (resp.length > 0) {
            var tweetCont = $('#tweetCont');
            for (var i = 0; i < resp.length; i++) {
                var div = $('<div>');
                var text = $('<div>').html($.trim(resp[i].text)).addClass('tweetText');
                div.append(text);
                div.attr('class', 'tweet');
                tweetCont.append(div);
            }
            tweetCont.css('display', 'block');
        } 
    });

    var currPage = window.location.hash || '#what';

    if (currPage) {
        $('li > a[href="' + currPage + '"]').addClass('selectedLink');
        $(currPage).css('display', 'block').addClass('selected');
    }

    //Declare data relationships between nav links and content
    $('li > a').click(function() {
        $('.selectedLink').removeClass('selectedLink');
        $(this).addClass('selectedLink');
        var str = $($(this).attr('href'));

        if (!str.hasClass('selected')) {
            var selected = $('.selected');
            selected.slideUp('slow');
            $('#main').slideUp('slow', function() {
                    selected.removeClass('selected');
                    str.show();
                $('#main').slideDown('slow', function() {
                    str.addClass('selected');
                });
            });
        }

    });
});
