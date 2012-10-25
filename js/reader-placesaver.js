/* 
 * The reader remembers the user's place in each article they read
 * by saving their current scroll position to a cookie and jumping
 * to that position on page load. When the user is finished reading
 * (reaches the end of the article), the cookie is deleted.
*/
 
var position_cookie_name 	= 'readerposition_' + '1';
var current_scroll_position = $.cookie(position_cookie_name);

function isScrolledIntoView(elem)
{

	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();

	return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
	  && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );

}

function resume_reading(saved_scroll_position) {

	if (saved_scroll_position != null) {
		$('html, body').animate({scrollTop: saved_scroll_position}, 'slow');
	}

}

$(window).scroll(function () {

	/* save reader's position in the article */
	var new_scroll_position = $(window).scrollTop();
	if (new_scroll_position - current_scroll_position >= 100) {
		$.cookie(position_cookie_name, new_scroll_position, { expires: 2 });
		current_scroll_position = new_scroll_position;
	}

	/* have we reached the end of the article? */
	var elem = $("#footer");
	if (isScrolledIntoView(elem) == true)
	{
	
		$("#nav").addClass("done");
		$.cookie(position_cookie_name, null);
	
	} else {
	
		$("#nav").removeClass("done");
	
	}

});


/* jump scrolling */

$('#scrolltotopzone').dblclick(function() {
	$('html, body').animate({scrollTop: 0}, 'slow');
});

$('#scrolltobottomzone').dblclick(function() {
	$('html, body').animate({scrollTop: $(document).height()}, 'slow');
});


/* ready */

$(function() {
	resume_reading(current_scroll_position);
});