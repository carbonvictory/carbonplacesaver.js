/*
 *  Project: reader-placesaver.js
 *  Description: A jQuery plugin that saves a reader's place (scroll position) when reading online.
 *  Author: Scott A. Murray <design@carbonvictory.com>
 *  License: GNU General Public License (http://www.gnu.org/licenses/gpl-3.0.txt)
 */

;(function($, document, undefined)
{
	
	$.fn.carbonPlacesaver = function(options) 
	{
		var settings = $.extend({}, $.fn.carbonPlacesaver.defaultSettings, options || {});
		var placesaver = new Placesaver(settings);
		
		placesaver.resumeReading();
		
		return this.bind('scroll', function() {
				
			placesaver.savePlace();
			if (placesaver.isDoneReading()) {
				placesaver.endReading();
			}
				
		});
	};
	
	$.fn.carbonPlacesaver.defaultSettings = {
        'unique_page_key'	: window.location.pathname.replace(/[^\w]/g, ''),
		'sensitivity'		: 100,
		'duration'			: 2,
		'clear_onfinish' 	: true,
		'clear_element'		: 'footer'
    };
	
	function Placesaver(settings)
    {
        this.placesaver = null;
        this.settings = settings;
		this.current_scroll_position = null;
		
        return this;
    }
	
	Placesaver.prototype =
	{
	
		resumeReading: function()
		{
			var saved_scroll_position = $.cookie(this.settings.unique_page_key);
			if (saved_scroll_position != null) 
			{
				$('html, body').animate({scrollTop: saved_scroll_position}, 'slow');
				this.current_scroll_position = saved_scroll_position;
			}
			else
			{
				this.current_scroll_position = 0;
			}
		},
		
		savePlace: function()
		{
			var new_scroll_position = $(window).scrollTop();
			if (new_scroll_position - this.current_scroll_position >= this.settings.sensitivity) 
			{
				$.cookie(this.settings.unique_page_key, new_scroll_position, { expires: this.settings.duration });
			}
		},
		
		isDoneReading: function()
		{
			if (this.settings.clear_onfinish == true)
			{
				var cur_window_top 		= $(window).scrollTop();
				var cur_window_bottom 	= cur_window_top + $(window).height();

				var element_top		= $(this.settings.clear_element).offset().top;
				var element_bottom	= element_top + $(this.settings.clear_element).height();

				return ( (element_bottom >= cur_window_top) && 
						 (element_top <= cur_window_bottom) && 
						 (element_bottom <= cur_window_bottom) && 
						 (element_top >= cur_window_top) );
			}
			else
			{
				return false;
			}
		},
		
		endReading: function()
		{
			$.cookie(this.settings.unique_page_key, null);
		}
	
	}

})( jQuery );