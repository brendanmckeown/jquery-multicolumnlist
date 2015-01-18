/*!
 * Multi-Column List Plugin
 *
 * @copyright 2015 Brendan McKeown (MIT License)
 */
(function($){

	var methods = {

		init: function(options) {

			// default settings
			var settings = $.extend({
				columnCount: 3,
				wrapperClass: 'multicolumnlist-wrapper'
			}, options);

			return this.each(function(){

				// find list items
				var $list = $(this),
					listClasses = $list.attr('class');

				// create array of list item html
				var itemsHtml = [];
				$list.find('li').each(function(){
					itemsHtml.push($(this).html());
				});

				// create wrapper div
				var $wrapper = $('<div />').addClass(settings.wrapperClass);

				// determine how many items to put in each column
				var itemsPerColumn = Math.ceil(itemsHtml.length / settings.columnCount);

				// split up the items into multiple lists
				var wrapperHtml = '';
				var itemCounter = 1;
				for (var i = 0; i < itemsHtml.length; i++) {

					if (itemCounter === 1 || itemCounter > itemsPerColumn) {
						// reset item counter
						itemCounter = 1;
						// create new list
						wrapperHtml += '<ul class="' + listClasses + '">';
					}

					// add list item html
					wrapperHtml += '<li>' + itemsHtml[i] + '</li>';

					if (itemCounter === itemsPerColumn || i === (itemsHtml.length - 1)) {
						// close current list
						wrapperHtml += '</ul>';
					}

					itemCounter++;
				}

				// replace original list with wrapper and new lists
				$wrapper.html(wrapperHtml);
				$list.replaceWith($wrapper);

				// save items html onto wrapper data
				$wrapper.data('multicolumnlist', {
					itemsHtml: itemsHtml
				});

			});
		}

	};

	$.fn.multicolumnlist = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error( 'Method ' +  method + ' does not exist.' );
		}
	};

})(jQuery);
