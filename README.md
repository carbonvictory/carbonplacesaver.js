carbonplacesaver.js
===================

**Carbon Placesaver** is a jQuery plugin that saves a visitor's place (scroll position) when reading content on your website.
Their place remains saved even if they navigate away from the page, close the tab, or exit the browser.
When the visitor finishes reading, the saved place for that page is cleared.

Built and tested with jQuery 1.8.2.

See a [live demo of this plugin](http://carbonvictory.com/dev/placesaver/demo.html).

Usage
-----

To turn on place saving for a given page, drop the following code inside your .ready() block or equivalent anonymous function:

	$(window).carbonPlacesaver();
	
The plugin function call must be attached to $(window).

Carbon Placesaver uses localStorage to save a visitor's scroll position. If localStorage isn't available, it falls back to using cookies instead. Note that this plugin requires the handy [jquery.cookie plugin by Klaus Hartl](https://github.com/carhartl/jquery-cookie); however, Carbon Placesaver's functions can be easily adapted to use whatever cookie methods you prefer. The jquery.cookie plugin is included with this repository.

Options
-------

+ **uniquePageKey**: An alphanumeric string identifier that is *unique to the page*. While the plugin will create one if none is supplied, it's strongly recommended that you pass one that you know is unique - an md5 hash of the page/article title plus id or a canonical URL works well.

+ **sensitivity**: The number of pixels the user must scroll before a new place is saved. Defaults to 100.

+ **scrollSpeed**: The animation speed when scrolling to a saved position ('slow', 'fast', or milliseconds). Defaults to 'slow'.

+ **duration**: The number of days the plugin should save a user's place on a given page if cookies are used. Defaults to 2.

+ **clearOnFinish**: If _true_, the saved place will be deleted when clearElement is scrolled into view, or when the reader reaches the bottom of the page if no clearElement is supplied. Defaults to _true_.

+ **clearElement**: The tag, #id, or .class of the element that triggers the end of the content and the clearing of the saved place if clearOnFinish is true. If none is specified, the saved place will be cleared when the reader reaches the bottom of the page. Defaults to _null_.

Options Example
---------------

If you wanted to have the Carbon Placesaver plugin scroll quickly and clear when the visitor reaches the element with the **.clearend** class, you'd call the plugin like so:

	$(window).carbonPlacesaver({
		'uniquePageKey': '84d52222483ccad763831a7d48bad983',	/* a key made from a hash of 'article title 242' */
		'scrollSpeed': 'fast',
		'clearElement': '.clearend'
	});

### Carbon Victory

+ [http://carbonvictory.com](http://carbonvictory.com)
+ [design@carbonvictory.com](mailto:design@carbonvictory.com)