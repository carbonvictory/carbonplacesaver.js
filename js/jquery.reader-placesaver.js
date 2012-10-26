/*
 *  Project: reader-placesaver.js
 *  Description: A jQuery plugin that saves a reader's place (scroll position) when reading online.
 *  Author: Scott A. Murray <design@carbonvictory.com>
 *  License: GNU General Public License (http://www.gnu.org/licenses/gpl-3.0.txt)
 */

;(function($, document, undefined)
{
	
	function resume_reading(settings) 
	{
	
		var saved_scroll_position = $.cookie(settings.unique_page_key);
		
		if (saved_scroll_position != null) 
		{
		
			$('html, body').animate({scrollTop: saved_scroll_position}, 'slow');
			return saved_scroll_position;
		
		}
		else
		{
			return 0;
		}
	
	}
	
	function is_visible(element, window) 
	{
	
		var cur_window_top 		= window.scrollTop();
		var cur_window_bottom 	= cur_window_top + window.height();

		var element_top		= $(element).offset().top;
		var element_bottom	= element_top + $(element).height();

		return ( (element_bottom >= cur_window_top) && 
				 (element_top <= cur_window_bottom) && 
				 (element_bottom <= cur_window_bottom) && 
				 (element_top >= cur_window_top) );
	
	}
	
	function save_place(current_scroll_position, settings, window) 
	{
	
		var new_scroll_position = window.scrollTop();
		
		if (new_scroll_position - current_scroll_position >= settings.sensitivity) 
		{
			$.cookie(settings.unique_page_key, new_scroll_position, { expires: settings.duration });
		}
		
		return new_scroll_position;
	
	}
	
	function end_reading(unique_page_key)
	{
		$.cookie(unique_page_key, null);
	}

	var default_settings = {
		'unique_page_key'	: window.location.pathname.replace(/[^\w]/g, ''),
		'sensitivity'		: 100,
		'duration'			: 2,
		'clear_onfinish' 	: true,
		'clear_element'		: 'footer'
	};
	
	$.fn.carbonPlacesaver = function(options) 
	{

		/*
		 *	$(window).placesaver();	
		 *
		 *	unique_page_key: a string identifier ___unique to the page___ (a page id or hash of the canonical url works well)
		 *	sensitivity: how many pixels the user must scroll before a new position is saved
		 *	clear_onfinish: if true, the saved reading position will be cleared when the clear_element is wholly visible
		 *	clear_element: the name, #id, or .class of the element that triggers clear_onfinish, usually a footer element after the page's content
		 *
		 *	It's recommended that you always pass a unique_page_key and clear_element (if clear_onfinish is set to true)
		 */
		var settings = $.extend({}, default_settings, options || {});
		
		// set up a variable to store the current scroll position
		var current_scroll_position = resume_reading(settings);
		
		// each time the user scrolls, advance the saved scroll position and save it, and end
		// the reading session/deleted saved position when we reach the end if clear_onfinish == true
		return this.bind('scroll', function() {
				
			current_scroll_position = save_place(current_scroll_position, settings, $(this));
			if (settings.clear_onfinish == true && is_visible(settings.clear_element, $(this)))
			{
				end_reading(settings.unique_page_key);
			}
				
		});

	};

})( jQuery );