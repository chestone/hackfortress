/* Author: Cheston Lee
 *
 */
$(document).ready(function() {
    $('#signup').css('display', 'none');
    $('#where').css('display', 'none');
    //Declare data relationships between nav links and content
    $('li > a').click(function() {
        $('.selectedLink').removeClass('selectedLink');
        $(this).addClass('selectedLink');
        var str = $($(this).attr('rel'));

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
    //Make the jsonp request to twitter to get the latest tweets with the
    //tag hackfortress.
    var url = 'http://search.twitter.com/search.json?callback=?';
    $.getJSON(url, {
        q : '#hackfortress',
        rpp : 5,
        page : 1,
    }, function (resp) {
        console.log(resp);
            for (item in resp.results) {
                var tweet = resp.results[item];
                var div = $('<div>');
                var text = $('<div>').html($.trim(tweet.text)).addClass('tweetText');
                var user = $('<div>').html($.trim(tweet.from_user)).addClass('tweetUser');
                div.append(text);
                div.append(user);
                div.attr('class', 'tweet');
                $('#tweetCont').append(div);
            }
    });
});
