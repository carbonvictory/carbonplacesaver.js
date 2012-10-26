carbonplacesaver.js
=================

**Carbon Placesaver** is a jQuery plugin that saves a visitor's place (scroll position) when reading content on your website.
Their place remains saved even if they navigate away from the page, close the tab, or exit the browser.
When the visitor finishes reading, the saved place for that page is cleared.

Built and tested with jQuery 1.8.2.

See a [live demo of this plugin](http://carbonvictory.com/dev/placesaver/demo.html).

Using the Plugin
----------------

To turn on place saving for a given page, drop the following code inside your .ready() block or equivalent anonymous function:

	$(window).carbonPlacesaver();
	
The plugin function call *must* be attached to the $(window) element. Note that this plugin requires the handy [jquery.cookie plugin by Klaus Hartl](https://github.com/carhartl/jquery-cookie); however, the plugin's functions can be easily adapted to use whatever cookie methods you prefer. The jquery.cookie plugin is included with this repository.

Plugin Options
--------------

**uniquePageKey**: An alphanumeric string identifier that is *unique to the page*. While the plugin will create one if none is supplied, it's strongly recommended that you pass one that you know is unique - an md5 hash of the page/article title plus id or a canonical URL works well.

**sensitivity**: The number of pixels the user must scroll before a new place is saved. Defaults to 100.

**scrollSpeed**: The animation speed when scrolling to a saved position ('slow', 'fast', or milliseconds). Defaults to 'slow'.

**duration**: The number of days the plugin should save a user's place on a given page. Defaults to 2.

**clearOnFinish**: If true, the saved place will be deleted when clearElement is scrolled into view. Defaults to _true_.

**clearElement**: The tag, #id, or .class of the element that triggers the end of the content and the clearing of the saved place if clearOnFinish is true. It's strongly recommended you pass a value to this option unless you have a <footer> element at the very end of your page's content. Defaults to 'footer'.

Options Example
---------------

If you wanted to have the Carbon Placesaver plugin scroll quickly, keep saved places for a week, and clear when the visitor reaches the element with the **.clearend** class, you'd call the plugin like so:

	$(window).carbonPlacesaver({
		'uniquePageKey': '84d52222483ccad763831a7d48bad983',	/* a key made from a hash of 'article title 242' */
		'scrollSpeed': 'fast',
		'duration': 7,
		'clearElement': '.clearend'
	});

### Carbon Victory

+ [http://carbonvictory.com](http://carbonvictory.com)
+ [design@carbonvictory.com](mailto:design@carbonvictory.com)