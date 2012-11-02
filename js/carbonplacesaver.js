/******************************************
 * Carbon Placesaver
 *
 * A jQuery plugin that saves a visitor's place (scroll position) when reading content on your website.
 * Their place remains saved even if they navigate away from the page, close the tab, or exit the browser.
 * When the visitor finishes reading, the saved place for that page is cleared.
 *
 * Built and tested with jQuery 1.8.2.
 *
 * @author          Scott A. Murray <design@carbonvictory.com>
 * @copyright       Copyright (c) 2012 Carbon Victory
 * @license         http://creativecommons.org/licenses/by-sa/3.0/deed.en_US
 * @link            https://github.com/carbonvictory/carbonplacesaver.js
 * @docs            https://github.com/carbonvictory/carbonplacesaver.js/blob/master/README.md
 * @version         Version 1.0
 *
 ******************************************/

;(function($, document, undefined)
{
	
	$.fn.carbonPlacesaver = function(options) {
		var settings = $.extend({}, $.fn.carbonPlacesaver.defaultSettings, options || {});
		
		// create and initialize the placesaver object and scroll to saved position if needed
		var placesaver = new Placesaver(settings, this);
		placesaver.resumeReading();
		
		/** 
		 * Whenever the user scrolls, save their new place if the difference between their
		 * new position and the last saved position is equal to or greater than the sensitivity
		 * setting. If they've reached the end of the content and clearOnFinish is set to TRUE,
		 * clear the saved position.
		 */
		return this.bind('scroll', function() {	
			placesaver.savePlace();
			
			if (placesaver.isDoneReading()) {
				placesaver.endReading();
			}
		});
	};
	
	/**
	 * Stores the default parameters for the Placesaver plugin.
	 * While all are optional, it's recommended you always supply a uniquePageKey and clearElement.
	 *
	 * {string}		uniquePageKey	An alphanumeric string identifier <strong>unique to the page</strong>.
	 * {number}		sensitivity		The number of pixels the user must scroll before a new place is saved.
	 * {mixed}		scrollSpeed		The animation speed when scrolling to a saved position ('slow', 'fast', or milliseconds).
	 * {number}		duration		The number of days the plugin should save a user's place on a given page if cookies are used.
	 * {boolean}	clearOnFinish	If true, the saved place will be deleted when clearElement is scrolled into view.
	 * {string}		clearElement	The tag, #id, or .class of the element that triggers the end of the content.
	 */
	$.fn.carbonPlacesaver.defaultSettings = {
        'uniquePageKey': window.location.pathname.replace(/[^\w]/g, ''),
		'sensitivity': 100,
		'scrollSpeed': 'slow',
		'duration': 2,
		'clearOnFinish': true,
		'clearElement': 'footer'
    };
	
	/**
	 * Initializes the Placesaver object.
	 */
	function Placesaver(settings, context) {
        this.settings = settings;
		this.context = context;
		this.useLocalStorage = (typeof(localStorage) !== 'undefined') ? true : false;
		this.currentScrollPosition = null;
		
        return this;
    }
	
	/**
	 * The Placesaver plugin prototype defines 4 private helper methods:
	 *
	 * resumeReading(): Checks if there's a saved position for this page and, if so, scroll to it;
	 *     otherwise, set the current scroll position to 0.
	 *
	 * savePlace():	Saves the reader's current scroll position as they read.
	 *
	 * isDoneReading(): Checks to see if the reader is finished by 1) checking if clearOnFinish is
	 *     set to TRUE, and if the clearElement (such as page footer) is visible.
	 *
	 * endReading(): Clears the saved reader position and unbinds the scroll() action from the window.
	 *
	 */
	Placesaver.prototype = {
	
		resumeReading: function() {
			if (this.useLocalStorage) {
				var savedScrollPosition = localStorage.getItem(this.settings.uniquePageKey);
			} else {
				var savedScrollPosition = $.cookie(this.settings.uniquePageKey);
			}
			
			if (savedScrollPosition != null) {
				$('html, body').animate({scrollTop: savedScrollPosition}, this.settings.scrollSpeed);
				this.currentScrollPosition = savedScrollPosition;
			} else {
				this.currentScrollPosition = 0;
			}
		},
		
		savePlace: function() {
			var newScrollPosition = $(this.context).scrollTop();
			
			if (newScrollPosition - this.currentScrollPosition >= this.settings.sensitivity) {
				if (this.useLocalStorage) {
					localStorage.setItem(this.settings.uniquePageKey, newScrollPosition);
				} else {
					$.cookie(this.settings.uniquePageKey, newScrollPosition, { expires: this.settings.duration });
				}
			}
		},
		
		isDoneReading: function() {
			if (this.settings.clearOnFinish == true) {
				var windowTop = $(this.context).scrollTop();
				var windowBottom = windowTop + $(this.context).height();

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
			this.currentScrollPosition = null;
			$(this.context).unbind('scroll');
			
			if (this.useLocalStorage) {
				localStorage.removeItem(this.settings.uniquePageKey);
			} else {
				$.cookie(this.settings.uniquePageKey, null);
			}
		}
	
	}

})( jQuery );