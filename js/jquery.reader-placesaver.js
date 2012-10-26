/*
 *  Project: reader-placesaver.js
 *  Description: A jQuery plugin that saves a reader's place (scroll position) when reading online.
 *  Author: Scott A. Murray <design@carbonvictory.com>
 *  License: GNU General Public License (http://www.gnu.org/licenses/gpl-3.0.txt)
 */

;(function($, document, undefined)
{
	
	$.fn.carbonPlacesaver = function(options) {
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
        'uniquePageKey': window.location.pathname.replace(/[^\w]/g, ''),
		'sensitivity': 100,
		'duration': 2,
		'clearOnFinish': true,
		'clearElement': 'footer'
    };
	
	function Placesaver(settings) {
        this.placesaver = null;
        this.settings = settings;
		this.currentScrollPosition = null;
		
        return this;
    }
	
	Placesaver.prototype = {
	
		resumeReading: function() {
			var savedScrollPosition = $.cookie(this.settings.uniquePageKey);
			
			if (savedScrollPosition != null) {
				$('html, body').animate({scrollTop: savedScrollPosition}, 'slow');
				this.currentScrollPosition = savedScrollPosition;
			} else {
				this.currentScrollPosition = 0;
			}
		},
		
		savePlace: function() {
			var new_scroll_position = $(window).scrollTop();
			
			if (new_scroll_position - this.currentScrollPosition >= this.settings.sensitivity) {
				$.cookie(this.settings.uniquePageKey, new_scroll_position, { expires: this.settings.duration });
			}
		},
		
		isDoneReading: function() {
			if (this.settings.clearOnFinish == true) {
				var windowTop = $(window).scrollTop();
				var windowBottom = windowTop + $(window).height();

				var clearElementTop	= $(this.settings.clearElement).offset().top;
				var clearElementBottom	= clearElementTop + $(this.settings.clearElement).height();

				return ( (clearElementBottom >= windowTop) && 
						 (clearElementTop <= windowBottom) && 
						 (clearElementBottom <= windowBottom) && 
						 (clearElementTop >= windowTop) );
			} else {
				return false;
			}
		},
		
		endReading: function() {
			$.cookie(this.settings.uniquePageKey, null);
		}
	
	}

})( jQuery );