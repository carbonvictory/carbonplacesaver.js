/*
 *  Project: reader-placesaver.js
 *  Description: A jQuery plugin that saves a reader's place (scroll position) when reading online.
 *  Author: Scott A. Murray <design@carbonvictory.com>
 *  License: GNU General Public License (http://www.gnu.org/licenses/gpl-3.0.txt)
 */

;(function( $, document, undefined ){

	function resumeReading( unique_page_key ) {}
	
	function isVisible( element_id ) {
	
		var cur_window_top 		= $(window).scrollTop();
		var cur_window_bottom 	= cur_window_top + $(window).height();

		var element_top		= $(element_id).offset().top;
		var element_bottom	= element_top + $(element_id).height();

		return ( (element_bottom >= cur_window_top) && 
				 (element_top <= cur_window_bottom) && 
				 (element_bottom <= cur_window_bottom) && 
				 (element_top >= cur_window_top) );
	
	}
	
	function savePlace() {}

	$.fn.readerPlacesaver = function( options ) {

		/*
		 *	unique_page_key: a string identifier ___unique to the page___ (a page id or hash of the canonical url works well)
		 *	clear_onfinish: if true, the saved reading position will be cleared when the clear_element is wholly visible
		 *	clear_element: the id of the element that triggers clear_onfinish, usually a footer element after the page's content
		 *
		 *	It's recommended that you always pass a unique_page_key and clear_element (if clear_onfinish is set to true)
		 */
		var settings = $.extend( {
			'unique_page_key'	: preg_replace('/[^[:alnum:]]/', '', window.location.pathname),
			'clear_onfinish' 	: true,
			'clear_element'		: 'footer'
		}, options);
		
		return this.each(function( settings ) {       
			
			
			
		});

	};

})( jQuery );