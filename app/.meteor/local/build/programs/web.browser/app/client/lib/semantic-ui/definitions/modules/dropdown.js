(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/dropdown.js              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Dropdown                                            //
 * http://github.com/semantic-org/semantic-ui/                         //
 *                                                                     //
 *                                                                     //
 * Copyright 2015 Contributors                                         //
 * Released under the MIT license                                      //
 * http://opensource.org/licenses/MIT                                  //
 *                                                                     //
 */                                                                    //
                                                                       //
;(function ($, window, document, undefined) {                          // 16
                                                                       //
  "use strict";                                                        // 18
                                                                       //
  $.fn.dropdown = function (parameters) {                              // 20
    var $allModules = $(this),                                         // 21
        $document = $(document),                                       //
        moduleSelector = $allModules.selector || '',                   //
        hasTouch = ('ontouchstart' in document.documentElement),       //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function (elementIndex) {                         // 37
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.dropdown.settings, parameters) : $.extend({}, $.fn.dropdown.settings),
          className = settings.className,                              //
          message = settings.message,                                  //
          fields = settings.fields,                                    //
          keys = settings.keys,                                        //
          metadata = settings.metadata,                                //
          namespace = settings.namespace,                              //
          regExp = settings.regExp,                                    //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          templates = settings.templates,                              //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          $module = $(this),                                           //
          $context = $(settings.context),                              //
          $text = $module.find(selector.text),                         //
          $search = $module.find(selector.search),                     //
          $input = $module.find(selector.input),                       //
          $icon = $module.find(selector.icon),                         //
          $combo = $module.prev().find(selector.text).length > 0 ? $module.prev().find(selector.text) : $module.prev(),
          $menu = $module.children(selector.menu),                     //
          $item = $menu.find(selector.item),                           //
          activated = false,                                           //
          itemActivated = false,                                       //
          internalChange = false,                                      //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          initialLoad,                                                 //
          pageLostFocus,                                               //
          elementNamespace,                                            //
          id,                                                          //
          selectObserver,                                              //
          menuObserver,                                                //
          module;                                                      //
                                                                       //
      module = {                                                       // 87
                                                                       //
        initialize: function () {                                      // 89
          module.debug('Initializing dropdown', settings);             // 90
                                                                       //
          if (module.is.alreadySetup()) {                              // 92
            module.setup.reference();                                  // 93
          } else {                                                     //
            module.setup.layout();                                     // 96
            module.refreshData();                                      // 97
                                                                       //
            module.save.defaults();                                    // 99
            module.restore.selected();                                 // 100
                                                                       //
            module.create.id();                                        // 102
            module.bind.events();                                      // 103
                                                                       //
            module.observeChanges();                                   // 105
            module.instantiate();                                      // 106
          }                                                            //
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 111
          module.verbose('Storing instance of dropdown', module);      // 112
          instance = module;                                           // 113
          $module.data(moduleNamespace, module);                       // 114
        },                                                             //
                                                                       //
        destroy: function () {                                         // 119
          module.verbose('Destroying previous dropdown', $module);     // 120
          module.remove.tabbable();                                    // 121
          $module.off(eventNamespace).removeData(moduleNamespace);     // 122
          $menu.off(eventNamespace);                                   // 126
          $document.off(elementNamespace);                             // 129
          if (selectObserver) {                                        // 132
            selectObserver.disconnect();                               // 133
          }                                                            //
          if (menuObserver) {                                          // 135
            menuObserver.disconnect();                                 // 136
          }                                                            //
        },                                                             //
                                                                       //
        observeChanges: function () {                                  // 140
          if ('MutationObserver' in window) {                          // 141
            selectObserver = new MutationObserver(function (mutations) {
              module.debug('<select> modified, recreating menu');      // 143
              module.setup.select();                                   // 144
            });                                                        //
            menuObserver = new MutationObserver(function (mutations) {
              module.debug('Menu modified, updating selector cache');  // 147
              module.refresh();                                        // 148
            });                                                        //
            if (module.has.input()) {                                  // 150
              selectObserver.observe($input[0], {                      // 151
                childList: true,                                       // 152
                subtree: true                                          // 153
              });                                                      //
            }                                                          //
            if (module.has.menu()) {                                   // 156
              menuObserver.observe($menu[0], {                         // 157
                childList: true,                                       // 158
                subtree: true                                          // 159
              });                                                      //
            }                                                          //
            module.debug('Setting up mutation observer', selectObserver, menuObserver);
          }                                                            //
        },                                                             //
                                                                       //
        create: {                                                      // 166
          id: function () {                                            // 167
            id = (Math.random().toString(16) + '000000000').substr(2, 8);
            elementNamespace = '.' + id;                               // 169
            module.verbose('Creating unique id for element', id);      // 170
          },                                                           //
          userChoice: function (values) {                              // 172
            var $userChoices, $userChoice, isUserValue, html;          // 173
            values = values || module.get.userValues();                // 179
            if (!values) {                                             // 180
              return false;                                            // 181
            }                                                          //
            values = $.isArray(values) ? values : [values];            // 183
            $.each(values, function (index, value) {                   // 187
              if (module.get.item(value) === false) {                  // 188
                html = settings.templates.addition(module.add.variables(message.addResult, value));
                $userChoice = $('<div />').html(html).attr('data-' + metadata.value, value).attr('data-' + metadata.text, value).addClass(className.addition).addClass(className.item);
                $userChoices = $userChoices === undefined ? $userChoice : $userChoices.add($userChoice);
                module.verbose('Creating user choices for value', value, $userChoice);
              }                                                        //
            });                                                        //
            return $userChoices;                                       // 204
          },                                                           //
          userLabels: function (value) {                               // 206
            var userValues = module.get.userValues();                  // 207
            if (userValues) {                                          // 210
              module.debug('Adding user labels', userValues);          // 211
              $.each(userValues, function (index, value) {             // 212
                module.verbose('Adding custom user value');            // 213
                module.add.label(value, value);                        // 214
              });                                                      //
            }                                                          //
          },                                                           //
          menu: function () {                                          // 218
            $menu = $('<div />').addClass(className.menu).appendTo($module);
          }                                                            //
        },                                                             //
                                                                       //
        search: function (query) {                                     // 226
          query = query !== undefined ? query : module.get.query();    // 227
          module.verbose('Searching for query', query);                // 231
          module.filter(query);                                        // 232
        },                                                             //
                                                                       //
        select: {                                                      // 235
          firstUnfiltered: function () {                               // 236
            module.verbose('Selecting first non-filtered element');    // 237
            module.remove.selectedItem();                              // 238
            $item.not(selector.unselectable).eq(0).addClass(className.selected);
          },                                                           //
          nextAvailable: function ($selected) {                        // 245
            $selected = $selected.eq(0);                               // 246
            var $nextAvailable = $selected.nextAll(selector.item).not(selector.unselectable).eq(0),
                $prevAvailable = $selected.prevAll(selector.item).not(selector.unselectable).eq(0),
                hasNext = $nextAvailable.length > 0;                   //
            if (hasNext) {                                             // 252
              module.verbose('Moving selection to', $nextAvailable);   // 253
              $nextAvailable.addClass(className.selected);             // 254
            } else {                                                   //
              module.verbose('Moving selection to', $prevAvailable);   // 257
              $prevAvailable.addClass(className.selected);             // 258
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        setup: {                                                       // 263
          api: function () {                                           // 264
            var apiSettings = {                                        // 265
              debug: settings.debug,                                   // 267
              on: false                                                // 268
            };                                                         //
            module.verbose('First request, initializing API');         // 271
            $module.api(apiSettings);                                  // 272
          },                                                           //
          layout: function () {                                        // 276
            if ($module.is('select')) {                                // 277
              module.setup.select();                                   // 278
              module.setup.returnedObject();                           // 279
            }                                                          //
            if (!module.has.menu()) {                                  // 281
              module.create.menu();                                    // 282
            }                                                          //
            if (module.is.search() && !module.has.search()) {          // 284
              module.verbose('Adding search input');                   // 285
              $search = $('<input />').addClass(className.search).prop('autocomplete', 'off').insertBefore($text);
            }                                                          //
            if (settings.allowTab) {                                   // 292
              module.set.tabbable();                                   // 293
            }                                                          //
          },                                                           //
          select: function () {                                        // 296
            var selectValues = module.get.selectValues();              // 297
            module.debug('Dropdown initialized on a select', selectValues);
            if ($module.is('select')) {                                // 301
              $input = $module;                                        // 302
            }                                                          //
            // see if select is placed correctly already               //
            if ($input.parent(selector.dropdown).length > 0) {         // 305
              module.debug('UI dropdown already exists. Creating dropdown menu only');
              $module = $input.closest(selector.dropdown);             // 307
              if (!module.has.menu()) {                                // 308
                module.create.menu();                                  // 309
              }                                                        //
              $menu = $module.children(selector.menu);                 // 311
              module.setup.menu(selectValues);                         // 312
            } else {                                                   //
              module.debug('Creating entire dropdown from select');    // 315
              $module = $('<div />').attr('class', $input.attr('class')).addClass(className.selection).addClass(className.dropdown).html(templates.dropdown(selectValues)).insertBefore($input);
              if ($input.hasClass(className.multiple) && $input.prop('multiple') === false) {
                module.error(error.missingMultiple);                   // 324
                $input.prop('multiple', true);                         // 325
              }                                                        //
              if ($input.is('[multiple]')) {                           // 327
                module.set.multiple();                                 // 328
              }                                                        //
              if ($input.prop('disabled')) {                           // 330
                module.debug('Disabling dropdown');                    // 331
                $module.addClass(className.disabled);                  // 332
              }                                                        //
              $input.removeAttr('class').detach().prependTo($module);  // 334
            }                                                          //
            module.refresh();                                          // 340
          },                                                           //
          menu: function (values) {                                    // 342
            $menu.html(templates.menu(values, fields));                // 343
            $item = $menu.find(selector.item);                         // 344
          },                                                           //
          reference: function () {                                     // 346
            module.debug('Dropdown behavior was called on select, replacing with closest dropdown');
            // replace module reference                                //
            $module = $module.parent(selector.dropdown);               // 349
            module.refresh();                                          // 350
            module.setup.returnedObject();                             // 351
            // invoke method in context of current instance            //
            if (methodInvoked) {                                       // 353
              instance = module;                                       // 354
              module.invoke(query);                                    // 355
            }                                                          //
          },                                                           //
          returnedObject: function () {                                // 358
            var $firstModules = $allModules.slice(0, elementIndex),    // 359
                $lastModules = $allModules.slice(elementIndex + 1);    //
            // adjust all modules to use correct reference             //
            $allModules = $firstModules.add($module).add($lastModules);
          }                                                            //
        },                                                             //
                                                                       //
        refresh: function () {                                         // 368
          module.refreshSelectors();                                   // 369
          module.refreshData();                                        // 370
        },                                                             //
                                                                       //
        refreshSelectors: function () {                                // 373
          module.verbose('Refreshing selector cache');                 // 374
          $text = $module.find(selector.text);                         // 375
          $search = $module.find(selector.search);                     // 376
          $input = $module.find(selector.input);                       // 377
          $icon = $module.find(selector.icon);                         // 378
          $combo = $module.prev().find(selector.text).length > 0 ? $module.prev().find(selector.text) : $module.prev();
          $menu = $module.children(selector.menu);                     // 383
          $item = $menu.find(selector.item);                           // 384
        },                                                             //
                                                                       //
        refreshData: function () {                                     // 387
          module.verbose('Refreshing cached metadata');                // 388
          $item.removeData(metadata.text).removeData(metadata.value);  // 389
          $module.removeData(metadata.defaultText).removeData(metadata.defaultValue).removeData(metadata.placeholderText);
        },                                                             //
                                                                       //
        toggle: function () {                                          // 400
          module.verbose('Toggling menu visibility');                  // 401
          if (!module.is.active()) {                                   // 402
            module.show();                                             // 403
          } else {                                                     //
            module.hide();                                             // 406
          }                                                            //
        },                                                             //
                                                                       //
        show: function (callback) {                                    // 410
          callback = $.isFunction(callback) ? callback : function () {};
          if (module.can.show() && !module.is.active()) {              // 415
            module.debug('Showing dropdown');                          // 416
            if (module.is.multiple() && !module.has.search() && module.is.allFiltered()) {
              return true;                                             // 418
            }                                                          //
            if (module.has.message() && !(module.has.maxSelections() || module.has.allResultsFiltered())) {
              module.remove.message();                                 // 421
            }                                                          //
            if (settings.onShow.call(element) !== false) {             // 423
              module.animate.show(function () {                        // 424
                if (module.can.click()) {                              // 425
                  module.bind.intent();                                // 426
                }                                                      //
                module.set.visible();                                  // 428
                callback.call(element);                                // 429
              });                                                      //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        hide: function (callback) {                                    // 435
          callback = $.isFunction(callback) ? callback : function () {};
          if (module.is.active()) {                                    // 440
            module.debug('Hiding dropdown');                           // 441
            if (settings.onHide.call(element) !== false) {             // 442
              module.animate.hide(function () {                        // 443
                module.remove.visible();                               // 444
                callback.call(element);                                // 445
              });                                                      //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        hideOthers: function () {                                      // 451
          module.verbose('Finding other dropdowns to hide');           // 452
          $allModules.not($module).has(selector.menu + '.' + className.visible).dropdown('hide');
        },                                                             //
                                                                       //
        hideMenu: function () {                                        // 460
          module.verbose('Hiding menu  instantaneously');              // 461
          module.remove.active();                                      // 462
          module.remove.visible();                                     // 463
          $menu.transition('hide');                                    // 464
        },                                                             //
                                                                       //
        hideSubMenus: function () {                                    // 467
          var $subMenus = $menu.children(selector.item).find(selector.menu);
          module.verbose('Hiding sub menus', $subMenus);               // 471
          $subMenus.transition('hide');                                // 472
        },                                                             //
                                                                       //
        bind: {                                                        // 475
          events: function () {                                        // 476
            if (hasTouch) {                                            // 477
              module.bind.touchEvents();                               // 478
            }                                                          //
            module.bind.keyboardEvents();                              // 480
            module.bind.inputEvents();                                 // 481
            module.bind.mouseEvents();                                 // 482
          },                                                           //
          touchEvents: function () {                                   // 484
            module.debug('Touch device detected binding additional touch events');
            if (module.is.searchSelection()) {                         // 486
              // do nothing special yet                                //
            } else if (module.is.single()) {                           //
                $module.on('touchstart' + eventNamespace, module.event.test.toggle);
              }                                                        //
            $menu.on('touchstart' + eventNamespace, selector.item, module.event.item.mouseenter);
          },                                                           //
          keyboardEvents: function () {                                // 498
            module.verbose('Binding keyboard events');                 // 499
            $module.on('keydown' + eventNamespace, module.event.keydown);
            if (module.has.search()) {                                 // 503
              $module.on(module.get.inputEvent() + eventNamespace, selector.search, module.event.input);
            }                                                          //
            if (module.is.multiple()) {                                // 508
              $document.on('keydown' + elementNamespace, module.event.document.keydown);
            }                                                          //
          },                                                           //
          inputEvents: function () {                                   // 514
            module.verbose('Binding input change events');             // 515
            $module.on('change' + eventNamespace, selector.input, module.event.change);
          },                                                           //
          mouseEvents: function () {                                   // 520
            module.verbose('Binding mouse events');                    // 521
            if (module.is.multiple()) {                                // 522
              $module.on('click' + eventNamespace, selector.label, module.event.label.click).on('click' + eventNamespace, selector.remove, module.event.remove.click);
            }                                                          //
            if (module.is.searchSelection()) {                         // 528
              $module.on('mousedown' + eventNamespace, selector.menu, module.event.menu.mousedown).on('mouseup' + eventNamespace, selector.menu, module.event.menu.mouseup).on('click' + eventNamespace, selector.icon, module.event.icon.click).on('click' + eventNamespace, selector.search, module.show).on('focus' + eventNamespace, selector.search, module.event.search.focus).on('blur' + eventNamespace, selector.search, module.event.search.blur).on('click' + eventNamespace, selector.text, module.event.text.focus);
              if (module.is.multiple()) {                              // 538
                $module.on('click' + eventNamespace, module.event.click);
              }                                                        //
            } else {                                                   //
              if (settings.on == 'click') {                            // 545
                $module.on('click' + eventNamespace, selector.icon, module.event.icon.click).on('click' + eventNamespace, module.event.test.toggle);
              } else if (settings.on == 'hover') {                     //
                $module.on('mouseenter' + eventNamespace, module.delay.show).on('mouseleave' + eventNamespace, module.delay.hide);
              } else {                                                 //
                $module.on(settings.on + eventNamespace, module.toggle);
              }                                                        //
              $module.on('mousedown' + eventNamespace, module.event.mousedown).on('mouseup' + eventNamespace, module.event.mouseup).on('focus' + eventNamespace, module.event.focus).on('blur' + eventNamespace, module.event.blur);
            }                                                          //
            $menu.on('mouseenter' + eventNamespace, selector.item, module.event.item.mouseenter).on('mouseleave' + eventNamespace, selector.item, module.event.item.mouseleave).on('click' + eventNamespace, selector.item, module.event.item.click);
          },                                                           //
          intent: function () {                                        // 575
            module.verbose('Binding hide intent event to document');   // 576
            if (hasTouch) {                                            // 577
              $document.on('touchstart' + elementNamespace, module.event.test.touch).on('touchmove' + elementNamespace, module.event.test.touch);
            }                                                          //
            $document.on('click' + elementNamespace, module.event.test.hide);
          }                                                            //
        },                                                             //
                                                                       //
        unbind: {                                                      // 589
          intent: function () {                                        // 590
            module.verbose('Removing hide intent event from document');
            if (hasTouch) {                                            // 592
              $document.off('touchstart' + elementNamespace).off('touchmove' + elementNamespace);
            }                                                          //
            $document.off('click' + elementNamespace);                 // 598
          }                                                            //
        },                                                             //
                                                                       //
        filter: function (query) {                                     // 604
          var searchTerm = query !== undefined ? query : module.get.query(),
              afterFiltered = function () {                            //
            if (module.is.multiple()) {                                // 610
              module.filterActive();                                   // 611
            }                                                          //
            module.select.firstUnfiltered();                           // 613
            if (module.has.allResultsFiltered()) {                     // 614
              if (settings.onNoResults.call(element, searchTerm)) {    // 615
                if (!settings.allowAdditions) {                        // 616
                  module.verbose('All items filtered, showing message', searchTerm);
                  module.add.message(message.noResults);               // 618
                }                                                      //
              } else {                                                 //
                module.verbose('All items filtered, hiding dropdown', searchTerm);
                module.hideMenu();                                     // 623
              }                                                        //
            } else {                                                   //
              module.remove.message();                                 // 627
            }                                                          //
            if (settings.allowAdditions) {                             // 629
              module.add.userSuggestion(query);                        // 630
            }                                                          //
            if (module.is.searchSelection() && module.can.show() && module.is.focusedOnSearch()) {
              module.show();                                           // 633
            }                                                          //
          };                                                           //
          if (settings.useLabels && module.has.maxSelections()) {      // 637
            return;                                                    // 638
          }                                                            //
          if (settings.apiSettings) {                                  // 640
            if (module.can.useAPI()) {                                 // 641
              module.queryRemote(searchTerm, function () {             // 642
                afterFiltered();                                       // 643
              });                                                      //
            } else {                                                   //
              module.error(error.noAPI);                               // 647
            }                                                          //
          } else {                                                     //
            module.filterItems(searchTerm);                            // 651
            afterFiltered();                                           // 652
          }                                                            //
        },                                                             //
                                                                       //
        queryRemote: function (query, callback) {                      // 656
          var apiSettings = {                                          // 657
            errorDuration: false,                                      // 659
            throttle: settings.throttle,                               // 660
            urlData: {                                                 // 661
              query: query                                             // 662
            },                                                         //
            onError: function () {                                     // 664
              module.add.message(message.serverError);                 // 665
              callback();                                              // 666
            },                                                         //
            onFailure: function () {                                   // 668
              module.add.message(message.serverError);                 // 669
              callback();                                              // 670
            },                                                         //
            onSuccess: function (response) {                           // 672
              module.remove.message();                                 // 673
              module.setup.menu({                                      // 674
                values: response[fields.remoteValues]                  // 675
              });                                                      //
              callback();                                              // 677
            }                                                          //
          };                                                           //
          if (!$module.api('get request')) {                           // 681
            module.setup.api();                                        // 682
          }                                                            //
          apiSettings = $.extend(true, {}, apiSettings, settings.apiSettings);
          $module.api('setting', apiSettings).api('query');            // 685
        },                                                             //
                                                                       //
        filterItems: function (query) {                                // 691
          var searchTerm = query !== undefined ? query : module.get.query(),
              results = null,                                          //
              escapedTerm = module.escape.regExp(searchTerm),          //
              beginsWithRegExp = new RegExp('^' + escapedTerm, 'igm');
          // avoid loop if we're matching nothing                      //
          if (module.has.query()) {                                    // 701
            results = [];                                              // 702
                                                                       //
            module.verbose('Searching for matching values', searchTerm);
            $item.each(function () {                                   // 705
              var $choice = $(this),                                   // 707
                  text,                                                //
                  value;                                               //
              if (settings.match == 'both' || settings.match == 'text') {
                text = String(module.get.choiceText($choice, false));  // 713
                if (text.search(beginsWithRegExp) !== -1) {            // 714
                  results.push(this);                                  // 715
                  return true;                                         // 716
                } else if (settings.fullTextSearch && module.fuzzySearch(searchTerm, text)) {
                  results.push(this);                                  // 719
                  return true;                                         // 720
                }                                                      //
              }                                                        //
              if (settings.match == 'both' || settings.match == 'value') {
                value = String(module.get.choiceValue($choice, text));
                                                                       //
                if (value.search(beginsWithRegExp) !== -1) {           // 726
                  results.push(this);                                  // 727
                  return true;                                         // 728
                } else if (settings.fullTextSearch && module.fuzzySearch(searchTerm, value)) {
                  results.push(this);                                  // 731
                  return true;                                         // 732
                }                                                      //
              }                                                        //
            });                                                        //
          }                                                            //
          module.debug('Showing only matched items', searchTerm);      // 738
          module.remove.filteredItem();                                // 739
          if (results) {                                               // 740
            $item.not(results).addClass(className.filtered);           // 741
          }                                                            //
        },                                                             //
                                                                       //
        fuzzySearch: function (query, term) {                          // 748
          var termLength = term.length,                                // 749
              queryLength = query.length;                              //
          query = query.toLowerCase();                                 // 753
          term = term.toLowerCase();                                   // 754
          if (queryLength > termLength) {                              // 755
            return false;                                              // 756
          }                                                            //
          if (queryLength === termLength) {                            // 758
            return query === term;                                     // 759
          }                                                            //
          search: for (var characterIndex = 0, nextCharacterIndex = 0; characterIndex < queryLength; characterIndex++) {
            var queryCharacter = query.charCodeAt(characterIndex);     // 762
            while (nextCharacterIndex < termLength) {                  // 765
              if (term.charCodeAt(nextCharacterIndex++) === queryCharacter) {
                continue search;                                       // 767
              }                                                        //
            }                                                          //
            return false;                                              // 770
          }                                                            //
          return true;                                                 // 772
        },                                                             //
                                                                       //
        filterActive: function () {                                    // 775
          if (settings.useLabels) {                                    // 776
            $item.filter('.' + className.active).addClass(className.filtered);
          }                                                            //
        },                                                             //
                                                                       //
        focusSearch: function () {                                     // 783
          if (module.is.search() && !module.is.focusedOnSearch()) {    // 784
            $search[0].focus();                                        // 785
          }                                                            //
        },                                                             //
                                                                       //
        forceSelection: function () {                                  // 789
          var $currentlySelected = $item.not(className.filtered).filter('.' + className.selected).eq(0),
              $activeItem = $item.not(className.filtered).filter('.' + className.active).eq(0),
              $selectedItem = $currentlySelected.length > 0 ? $currentlySelected : $activeItem,
              hasSelected = $selectedItem.size() > 0;                  //
          if (module.has.query()) {                                    // 798
            if (hasSelected) {                                         // 799
              module.debug('Forcing partial selection to selected item', $selectedItem);
              module.event.item.click.call($selectedItem);             // 801
              return;                                                  // 802
            } else {                                                   //
              module.remove.searchTerm();                              // 805
            }                                                          //
          }                                                            //
          module.hide();                                               // 808
        },                                                             //
                                                                       //
        event: {                                                       // 811
          change: function () {                                        // 812
            if (!internalChange) {                                     // 813
              module.debug('Input changed, updating selection');       // 814
              module.set.selected();                                   // 815
            }                                                          //
          },                                                           //
          focus: function () {                                         // 818
            if (settings.showOnFocus && !activated && module.is.hidden() && !pageLostFocus) {
              module.show();                                           // 820
            }                                                          //
          },                                                           //
          click: function (event) {                                    // 823
            var $target = $(event.target);                             // 824
            // focus search                                            //
            if ($target.is($module) && !module.is.focusedOnSearch()) {
              module.focusSearch();                                    // 829
            }                                                          //
          },                                                           //
          blur: function (event) {                                     // 832
            pageLostFocus = document.activeElement === this;           // 833
            if (!activated && !pageLostFocus) {                        // 834
              module.remove.activeLabel();                             // 835
              module.hide();                                           // 836
            }                                                          //
          },                                                           //
          // prevents focus callback from occurring on mousedown       //
          mousedown: function () {                                     // 840
            activated = true;                                          // 841
          },                                                           //
          mouseup: function () {                                       // 843
            activated = false;                                         // 844
          },                                                           //
          search: {                                                    // 846
            focus: function () {                                       // 847
              activated = true;                                        // 848
              if (module.is.multiple()) {                              // 849
                module.remove.activeLabel();                           // 850
              }                                                        //
              if (settings.showOnFocus) {                              // 852
                module.search();                                       // 853
                module.show();                                         // 854
              }                                                        //
            },                                                         //
            blur: function (event) {                                   // 857
              pageLostFocus = document.activeElement === this;         // 858
              if (!itemActivated && !pageLostFocus) {                  // 859
                if (module.is.multiple()) {                            // 860
                  module.remove.activeLabel();                         // 861
                  module.hide();                                       // 862
                } else if (settings.forceSelection) {                  //
                  module.forceSelection();                             // 865
                } else {                                               //
                  module.hide();                                       // 868
                }                                                      //
              } else if (pageLostFocus) {                              //
                if (settings.forceSelection) {                         // 872
                  module.forceSelection();                             // 873
                }                                                      //
              }                                                        //
            }                                                          //
          },                                                           //
          icon: {                                                      // 878
            click: function (event) {                                  // 879
              module.toggle();                                         // 880
              event.stopPropagation();                                 // 881
            }                                                          //
          },                                                           //
          text: {                                                      // 884
            focus: function (event) {                                  // 885
              activated = true;                                        // 886
              module.focusSearch();                                    // 887
            }                                                          //
          },                                                           //
          input: function (event) {                                    // 890
            if (module.is.multiple() || module.is.searchSelection()) {
              module.set.filtered();                                   // 892
            }                                                          //
            clearTimeout(module.timer);                                // 894
            module.timer = setTimeout(module.search, settings.delay.search);
          },                                                           //
          label: {                                                     // 897
            click: function (event) {                                  // 898
              var $label = $(this),                                    // 899
                  $labels = $module.find(selector.label),              //
                  $activeLabels = $labels.filter('.' + className.active),
                  $nextActive = $label.nextAll('.' + className.active),
                  $prevActive = $label.prevAll('.' + className.active),
                  $range = $nextActive.length > 0 ? $label.nextUntil($nextActive).add($activeLabels).add($label) : $label.prevUntil($prevActive).add($activeLabels).add($label);
              if (event.shiftKey) {                                    // 909
                $activeLabels.removeClass(className.active);           // 910
                $range.addClass(className.active);                     // 911
              } else if (event.ctrlKey) {                              //
                $label.toggleClass(className.active);                  // 914
              } else {                                                 //
                $activeLabels.removeClass(className.active);           // 917
                $label.addClass(className.active);                     // 918
              }                                                        //
              settings.onLabelSelect.apply(this, $labels.filter('.' + className.active));
            }                                                          //
          },                                                           //
          remove: {                                                    // 923
            click: function () {                                       // 924
              var $label = $(this).parent();                           // 925
              if ($label.hasClass(className.active)) {                 // 928
                // remove all selected labels                          //
                module.remove.activeLabels();                          // 930
              } else {                                                 //
                // remove this label only                              //
                module.remove.activeLabels($label);                    // 934
              }                                                        //
            }                                                          //
          },                                                           //
          test: {                                                      // 938
            toggle: function (event) {                                 // 939
              var toggleBehavior = module.is.multiple() ? module.show : module.toggle;
              if (module.determine.eventOnElement(event, toggleBehavior)) {
                event.preventDefault();                                // 946
              }                                                        //
            },                                                         //
            touch: function (event) {                                  // 949
              module.determine.eventOnElement(event, function () {     // 950
                if (event.type == 'touchstart') {                      // 951
                  module.timer = setTimeout(function () {              // 952
                    module.hide();                                     // 953
                  }, settings.delay.touch);                            //
                } else if (event.type == 'touchmove') {                //
                  clearTimeout(module.timer);                          // 957
                }                                                      //
              });                                                      //
              event.stopPropagation();                                 // 960
            },                                                         //
            hide: function (event) {                                   // 962
              module.determine.eventInModule(event, module.hide);      // 963
            }                                                          //
          },                                                           //
          menu: {                                                      // 966
            mousedown: function () {                                   // 967
              itemActivated = true;                                    // 968
            },                                                         //
            mouseup: function () {                                     // 970
              itemActivated = false;                                   // 971
            }                                                          //
          },                                                           //
          item: {                                                      // 974
            mouseenter: function (event) {                             // 975
              var $subMenu = $(this).children(selector.menu),          // 976
                  $otherMenus = $(this).siblings(selector.item).children(selector.menu);
              if ($subMenu.length > 0) {                               // 980
                clearTimeout(module.itemTimer);                        // 981
                module.itemTimer = setTimeout(function () {            // 982
                  module.verbose('Showing sub-menu', $subMenu);        // 983
                  $.each($otherMenus, function () {                    // 984
                    module.animate.hide(false, $(this));               // 985
                  });                                                  //
                  module.animate.show(false, $subMenu);                // 987
                }, settings.delay.show);                               //
                event.preventDefault();                                // 989
              }                                                        //
            },                                                         //
            mouseleave: function (event) {                             // 992
              var $subMenu = $(this).children(selector.menu);          // 993
              if ($subMenu.length > 0) {                               // 996
                clearTimeout(module.itemTimer);                        // 997
                module.itemTimer = setTimeout(function () {            // 998
                  module.verbose('Hiding sub-menu', $subMenu);         // 999
                  module.animate.hide(false, $subMenu);                // 1000
                }, settings.delay.hide);                               //
              }                                                        //
            },                                                         //
            touchend: function () {},                                  // 1004
            click: function (event) {                                  // 1006
              var $choice = $(this),                                   // 1007
                  $target = event ? $(event.target) : $(''),           //
                  $subMenu = $choice.find(selector.menu),              //
                  text = module.get.choiceText($choice),               //
                  value = module.get.choiceValue($choice, text),       //
                  hasSubMenu = $subMenu.length > 0,                    //
                  isBubbledEvent = $subMenu.find($target).length > 0;  //
              if (!isBubbledEvent && (!hasSubMenu || settings.allowCategorySelection)) {
                if (!settings.useLabels) {                             // 1019
                  module.remove.filteredItem();                        // 1020
                  module.remove.searchTerm();                          // 1021
                  module.set.scrollPosition($choice);                  // 1022
                }                                                      //
                module.determine.selectAction.call(this, text, value);
              }                                                        //
            }                                                          //
          },                                                           //
                                                                       //
          document: {                                                  // 1029
            // label selection should occur even when element has no focus
            keydown: function (event) {                                // 1031
              var pressedKey = event.which,                            // 1032
                  isShortcutKey = module.is.inObject(pressedKey, keys);
              if (isShortcutKey) {                                     // 1036
                var $label = $module.find(selector.label),             // 1037
                    $activeLabel = $label.filter('.' + className.active),
                    activeValue = $activeLabel.data(metadata.value),   //
                    labelIndex = $label.index($activeLabel),           //
                    labelCount = $label.length,                        //
                    hasActiveLabel = $activeLabel.length > 0,          //
                    hasMultipleActive = $activeLabel.length > 1,       //
                    isFirstLabel = labelIndex === 0,                   //
                    isLastLabel = labelIndex + 1 == labelCount,        //
                    isSearch = module.is.searchSelection(),            //
                    isFocusedOnSearch = module.is.focusedOnSearch(),   //
                    isFocused = module.is.focused(),                   //
                    caretAtStart = isFocusedOnSearch && module.get.caretPosition() === 0,
                    $nextLabel;                                        //
                if (isSearch && !hasActiveLabel && !isFocusedOnSearch) {
                  return;                                              // 1054
                }                                                      //
                                                                       //
                if (pressedKey == keys.leftArrow) {                    // 1057
                  // activate previous label                           //
                  if ((isFocused || caretAtStart) && !hasActiveLabel) {
                    module.verbose('Selecting previous label');        // 1060
                    $label.last().addClass(className.active);          // 1061
                  } else if (hasActiveLabel) {                         //
                    if (!event.shiftKey) {                             // 1064
                      module.verbose('Selecting previous label');      // 1065
                      $label.removeClass(className.active);            // 1066
                    } else {                                           //
                      module.verbose('Adding previous label to selection');
                    }                                                  //
                    if (isFirstLabel && !hasMultipleActive) {          // 1071
                      $activeLabel.addClass(className.active);         // 1072
                    } else {                                           //
                      $activeLabel.prev(selector.siblingLabel).addClass(className.active).end();
                    }                                                  //
                    event.preventDefault();                            // 1080
                  }                                                    //
                } else if (pressedKey == keys.rightArrow) {            //
                  // activate first label                              //
                  if (isFocused && !hasActiveLabel) {                  // 1085
                    $label.first().addClass(className.active);         // 1086
                  }                                                    //
                  // activate next label                               //
                  if (hasActiveLabel) {                                // 1089
                    if (!event.shiftKey) {                             // 1090
                      module.verbose('Selecting next label');          // 1091
                      $label.removeClass(className.active);            // 1092
                    } else {                                           //
                      module.verbose('Adding next label to selection');
                    }                                                  //
                    if (isLastLabel) {                                 // 1097
                      if (isSearch) {                                  // 1098
                        if (!isFocusedOnSearch) {                      // 1099
                          module.focusSearch();                        // 1100
                        } else {                                       //
                          $label.removeClass(className.active);        // 1103
                        }                                              //
                      } else if (hasMultipleActive) {                  //
                        $activeLabel.next(selector.siblingLabel).addClass(className.active);
                      } else {                                         //
                        $activeLabel.addClass(className.active);       // 1110
                      }                                                //
                    } else {                                           //
                      $activeLabel.next(selector.siblingLabel).addClass(className.active);
                    }                                                  //
                    event.preventDefault();                            // 1116
                  }                                                    //
                } else if (pressedKey == keys.deleteKey || pressedKey == keys.backspace) {
                  if (hasActiveLabel) {                                // 1120
                    module.verbose('Removing active labels');          // 1121
                    if (isLastLabel) {                                 // 1122
                      if (isSearch && !isFocusedOnSearch) {            // 1123
                        module.focusSearch();                          // 1124
                      }                                                //
                    }                                                  //
                    $activeLabel.last().next(selector.siblingLabel).addClass(className.active);
                    module.remove.activeLabels($activeLabel);          // 1128
                    event.preventDefault();                            // 1129
                  } else if (caretAtStart && !hasActiveLabel && pressedKey == keys.backspace) {
                    module.verbose('Removing last label on input backspace');
                    $activeLabel = $label.last().addClass(className.active);
                    module.remove.activeLabels($activeLabel);          // 1134
                  }                                                    //
                } else {                                               //
                  $activeLabel.removeClass(className.active);          // 1138
                }                                                      //
              }                                                        //
            }                                                          //
          },                                                           //
                                                                       //
          keydown: function (event) {                                  // 1144
            var pressedKey = event.which,                              // 1145
                isShortcutKey = module.is.inObject(pressedKey, keys);  //
            if (isShortcutKey) {                                       // 1149
              var $currentlySelected = $item.not(selector.unselectable).filter('.' + className.selected).eq(0),
                  $activeItem = $menu.children('.' + className.active).eq(0),
                  $selectedItem = $currentlySelected.length > 0 ? $currentlySelected : $activeItem,
                  $visibleItems = $selectedItem.length > 0 ? $selectedItem.siblings(':not(.' + className.filtered + ')').andSelf() : $menu.children(':not(.' + className.filtered + ')'),
                  $subMenu = $selectedItem.children(selector.menu),    //
                  $parentMenu = $selectedItem.closest(selector.menu),  //
                  inVisibleMenu = $parentMenu.hasClass(className.visible) || $parentMenu.hasClass(className.animating) || $parentMenu.parent(selector.menu).length > 0,
                  hasSubMenu = $subMenu.length > 0,                    //
                  hasSelectedItem = $selectedItem.length > 0,          //
                  selectedIsSelectable = $selectedItem.not(selector.unselectable).length > 0,
                  delimiterPressed = pressedKey == keys.delimiter && settings.allowAdditions && module.is.multiple(),
                  $nextItem,                                           //
                  isSubMenuItem,                                       //
                  newIndex;                                            //
              // visible menu keyboard shortcuts                       //
              if (module.is.visible()) {                               // 1171
                                                                       //
                // enter (select or open sub-menu)                     //
                if (pressedKey == keys.enter || delimiterPressed) {    // 1174
                  if (pressedKey == keys.enter && hasSelectedItem && hasSubMenu && !settings.allowCategorySelection) {
                    module.verbose('Pressed enter on unselectable category, opening sub menu');
                    pressedKey = keys.rightArrow;                      // 1177
                  } else if (selectedIsSelectable) {                   //
                    module.verbose('Selecting item from keyboard shortcut', $selectedItem);
                    module.event.item.click.call($selectedItem, event);
                    if (module.is.searchSelection()) {                 // 1182
                      module.remove.searchTerm();                      // 1183
                    }                                                  //
                  }                                                    //
                  event.preventDefault();                              // 1186
                }                                                      //
                                                                       //
                // left arrow (hide sub-menu)                          //
                if (pressedKey == keys.leftArrow) {                    // 1190
                                                                       //
                  isSubMenuItem = $parentMenu[0] !== $menu[0];         // 1192
                                                                       //
                  if (isSubMenuItem) {                                 // 1194
                    module.verbose('Left key pressed, closing sub-menu');
                    module.animate.hide(false, $parentMenu);           // 1196
                    $selectedItem.removeClass(className.selected);     // 1197
                    $parentMenu.closest(selector.item).addClass(className.selected);
                    event.preventDefault();                            // 1204
                  }                                                    //
                }                                                      //
                                                                       //
                // right arrow (show sub-menu)                         //
                if (pressedKey == keys.rightArrow) {                   // 1209
                  if (hasSubMenu) {                                    // 1210
                    module.verbose('Right key pressed, opening sub-menu');
                    module.animate.show(false, $subMenu);              // 1212
                    $selectedItem.removeClass(className.selected);     // 1213
                    $subMenu.find(selector.item).eq(0).addClass(className.selected);
                    event.preventDefault();                            // 1220
                  }                                                    //
                }                                                      //
                                                                       //
                // up arrow (traverse menu up)                         //
                if (pressedKey == keys.upArrow) {                      // 1225
                  $nextItem = hasSelectedItem && inVisibleMenu ? $selectedItem.prevAll(selector.item + ':not(' + selector.unselectable + ')').eq(0) : $item.eq(0);
                  if ($visibleItems.index($nextItem) < 0) {            // 1230
                    module.verbose('Up key pressed but reached top of current menu');
                    event.preventDefault();                            // 1232
                    return;                                            // 1233
                  } else {                                             //
                    module.verbose('Up key pressed, changing active item');
                    $selectedItem.removeClass(className.selected);     // 1237
                    $nextItem.addClass(className.selected);            // 1240
                    module.set.scrollPosition($nextItem);              // 1243
                  }                                                    //
                  event.preventDefault();                              // 1245
                }                                                      //
                                                                       //
                // down arrow (traverse menu down)                     //
                if (pressedKey == keys.downArrow) {                    // 1249
                  $nextItem = hasSelectedItem && inVisibleMenu ? $nextItem = $selectedItem.nextAll(selector.item + ':not(' + selector.unselectable + ')').eq(0) : $item.eq(0);
                  if ($nextItem.length === 0) {                        // 1254
                    module.verbose('Down key pressed but reached bottom of current menu');
                    event.preventDefault();                            // 1256
                    return;                                            // 1257
                  } else {                                             //
                    module.verbose('Down key pressed, changing active item');
                    $item.removeClass(className.selected);             // 1261
                    $nextItem.addClass(className.selected);            // 1264
                    module.set.scrollPosition($nextItem);              // 1267
                  }                                                    //
                  event.preventDefault();                              // 1269
                }                                                      //
                                                                       //
                // page down (show next page)                          //
                if (pressedKey == keys.pageUp) {                       // 1273
                  module.scrollPage('up');                             // 1274
                  event.preventDefault();                              // 1275
                }                                                      //
                if (pressedKey == keys.pageDown) {                     // 1277
                  module.scrollPage('down');                           // 1278
                  event.preventDefault();                              // 1279
                }                                                      //
                                                                       //
                // escape (close menu)                                 //
                if (pressedKey == keys.escape) {                       // 1283
                  module.verbose('Escape key pressed, closing dropdown');
                  module.hide();                                       // 1285
                }                                                      //
              } else {                                                 //
                // delimiter key                                       //
                if (delimiterPressed) {                                // 1291
                  event.preventDefault();                              // 1292
                }                                                      //
                // down arrow (open menu)                              //
                if (pressedKey == keys.downArrow) {                    // 1295
                  module.verbose('Down key pressed, showing dropdown');
                  module.show();                                       // 1297
                  event.preventDefault();                              // 1298
                }                                                      //
              }                                                        //
            } else {                                                   //
              if (module.is.selection() && !module.is.search()) {      // 1303
                module.set.selectedLetter(String.fromCharCode(pressedKey));
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        trigger: {                                                     // 1310
          change: function () {                                        // 1311
            var events = document.createEvent('HTMLEvents'),           // 1312
                inputElement = $input[0];                              //
            if (inputElement) {                                        // 1316
              module.verbose('Triggering native change event');        // 1317
              events.initEvent('change', true, false);                 // 1318
              inputElement.dispatchEvent(events);                      // 1319
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        determine: {                                                   // 1324
          selectAction: function (text, value) {                       // 1325
            module.verbose('Determining action', settings.action);     // 1326
            if ($.isFunction(module.action[settings.action])) {        // 1327
              module.verbose('Triggering preset action', settings.action, text, value);
              module.action[settings.action].call(this, text, value);  // 1329
            } else if ($.isFunction(settings.action)) {                //
              module.verbose('Triggering user action', settings.action, text, value);
              settings.action.call(this, text, value);                 // 1333
            } else {                                                   //
              module.error(error.action, settings.action);             // 1336
            }                                                          //
          },                                                           //
          eventInModule: function (event, callback) {                  // 1339
            var $target = $(event.target),                             // 1340
                inDocument = $target.closest(document.documentElement).length > 0,
                inModule = $target.closest($module).length > 0;        //
            callback = $.isFunction(callback) ? callback : function () {};
            if (inDocument && !inModule) {                             // 1349
              module.verbose('Triggering event', callback);            // 1350
              callback();                                              // 1351
              return true;                                             // 1352
            } else {                                                   //
              module.verbose('Event occurred in dropdown, canceling callback');
              return false;                                            // 1356
            }                                                          //
          },                                                           //
          eventOnElement: function (event, callback) {                 // 1359
            var $target = $(event.target),                             // 1360
                $label = $target.closest(selector.siblingLabel),       //
                notOnLabel = $module.find($label).length === 0,        //
                notInMenu = $target.closest($menu).length === 0;       //
            callback = $.isFunction(callback) ? callback : function () {};
            if (notOnLabel && notInMenu) {                             // 1370
              module.verbose('Triggering event', callback);            // 1371
              callback();                                              // 1372
              return true;                                             // 1373
            } else {                                                   //
              module.verbose('Event occurred in dropdown menu, canceling callback');
              return false;                                            // 1377
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        action: {                                                      // 1382
                                                                       //
          nothing: function () {},                                     // 1384
                                                                       //
          activate: function (text, value) {                           // 1386
            value = value !== undefined ? value : text;                // 1387
            if (module.can.activate($(this))) {                        // 1391
              module.set.selected(value, $(this));                     // 1392
              if (module.is.multiple() && !module.is.allFiltered()) {  // 1393
                return;                                                // 1394
              } else {                                                 //
                module.hideAndClear();                                 // 1397
              }                                                        //
            }                                                          //
          },                                                           //
                                                                       //
          select: function (text, value) {                             // 1402
            // mimics action.activate but does not select text         //
            module.action.activate.call(this);                         // 1404
          },                                                           //
                                                                       //
          combo: function (text, value) {                              // 1407
            value = value !== undefined ? value : text;                // 1408
            module.set.selected(value, $(this));                       // 1412
            module.hideAndClear();                                     // 1413
          },                                                           //
                                                                       //
          hide: function (text, value) {                               // 1416
            module.set.value(value);                                   // 1417
            module.hideAndClear();                                     // 1418
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        get: {                                                         // 1423
          id: function () {                                            // 1424
            return id;                                                 // 1425
          },                                                           //
          defaultText: function () {                                   // 1427
            return $module.data(metadata.defaultText);                 // 1428
          },                                                           //
          defaultValue: function () {                                  // 1430
            return $module.data(metadata.defaultValue);                // 1431
          },                                                           //
          placeholderText: function () {                               // 1433
            return $module.data(metadata.placeholderText) || '';       // 1434
          },                                                           //
          text: function () {                                          // 1436
            return $text.text();                                       // 1437
          },                                                           //
          query: function () {                                         // 1439
            return $.trim($search.val());                              // 1440
          },                                                           //
          searchWidth: function (characterCount) {                     // 1442
            return characterCount * settings.glyphWidth + 'em';        // 1443
          },                                                           //
          selectionCount: function () {                                // 1445
            var values = module.get.values(),                          // 1446
                count;                                                 //
            count = module.is.multiple() ? $.isArray(values) ? values.length : 0 : module.get.value() !== '' ? 1 : 0;
            return count;                                              // 1458
          },                                                           //
          transition: function ($subMenu) {                            // 1460
            return settings.transition == 'auto' ? module.is.upward($subMenu) ? 'slide up' : 'slide down' : settings.transition;
          },                                                           //
          userValues: function () {                                    // 1468
            var values = module.get.values();                          // 1469
            if (!values) {                                             // 1472
              return false;                                            // 1473
            }                                                          //
            values = $.isArray(values) ? values : [values];            // 1475
            return $.grep(values, function (value) {                   // 1479
              return module.get.item(value) === false;                 // 1480
            });                                                        //
          },                                                           //
          uniqueArray: function (array) {                              // 1483
            return $.grep(array, function (value, index) {             // 1484
              return $.inArray(value, array) === index;                // 1485
            });                                                        //
          },                                                           //
          caretPosition: function () {                                 // 1488
            var input = $search.get(0),                                // 1489
                range,                                                 //
                rangeLength;                                           //
            if ('selectionStart' in input) {                           // 1494
              return input.selectionStart;                             // 1495
            } else if (document.selection) {                           //
              input.focus();                                           // 1498
              range = document.selection.createRange();                // 1499
              rangeLength = range.text.length;                         // 1500
              range.moveStart('character', -input.value.length);       // 1501
              return range.text.length - rangeLength;                  // 1502
            }                                                          //
          },                                                           //
          value: function () {                                         // 1505
            var value = $input.length > 0 ? $input.val() : $module.data(metadata.value);
            // prevents placeholder element from being selected when multiple
            if ($.isArray(value) && value.length === 1 && value[0] === '') {
              return '';                                               // 1513
            }                                                          //
            return value;                                              // 1515
          },                                                           //
          values: function () {                                        // 1517
            var value = module.get.value();                            // 1518
            if (value === '') {                                        // 1521
              return '';                                               // 1522
            }                                                          //
            return !module.has.selectInput() && module.is.multiple() ? typeof value == 'string' ? // delimited string
            value.split(settings.delimiter) : '' : value;              // 1526
          },                                                           //
          remoteValues: function () {                                  // 1531
            var values = module.get.values(),                          // 1532
                remoteValues = false;                                  //
            if (values) {                                              // 1536
              if (typeof values == 'string') {                         // 1537
                values = [values];                                     // 1538
              }                                                        //
              remoteValues = {};                                       // 1540
              $.each(values, function (index, value) {                 // 1541
                var name = module.read.remoteData(value);              // 1542
                module.verbose('Restoring value from session data', name, value);
                remoteValues[value] = name ? name : value;             // 1546
              });                                                      //
            }                                                          //
            return remoteValues;                                       // 1552
          },                                                           //
          choiceText: function ($choice, preserveHTML) {               // 1554
            preserveHTML = preserveHTML !== undefined ? preserveHTML : settings.preserveHTML;
            if ($choice) {                                             // 1559
              if ($choice.find(selector.menu).length > 0) {            // 1560
                module.verbose('Retreiving text of element with sub-menu');
                $choice = $choice.clone();                             // 1562
                $choice.find(selector.menu).remove();                  // 1563
                $choice.find(selector.menuIcon).remove();              // 1564
              }                                                        //
              return $choice.data(metadata.text) !== undefined ? $choice.data(metadata.text) : preserveHTML ? $.trim($choice.html()) : $.trim($choice.text());
            }                                                          //
          },                                                           //
          choiceValue: function ($choice, choiceText) {                // 1574
            choiceText = choiceText || module.get.choiceText($choice);
            if (!$choice) {                                            // 1576
              return false;                                            // 1577
            }                                                          //
            return $choice.data(metadata.value) !== undefined ? String($choice.data(metadata.value)) : typeof choiceText === 'string' ? $.trim(choiceText.toLowerCase()) : String(choiceText);
          },                                                           //
          inputEvent: function () {                                    // 1586
            var input = $search[0];                                    // 1587
            if (input) {                                               // 1590
              return input.oninput !== undefined ? 'input' : input.onpropertychange !== undefined ? 'propertychange' : 'keyup';
            }                                                          //
            return false;                                              // 1598
          },                                                           //
          selectValues: function () {                                  // 1600
            var select = {};                                           // 1601
            select.values = [];                                        // 1604
            $module.find('option').each(function () {                  // 1605
              var $option = $(this),                                   // 1608
                  name = $option.html(),                               //
                  disabled = $option.attr('disabled'),                 //
                  value = $option.attr('value') !== undefined ? $option.attr('value') : name;
              if (settings.placeholder === 'auto' && value === '') {   // 1616
                select.placeholder = name;                             // 1617
              } else {                                                 //
                select.values.push({                                   // 1620
                  name: name,                                          // 1621
                  value: value,                                        // 1622
                  disabled: disabled                                   // 1623
                });                                                    //
              }                                                        //
            });                                                        //
            if (settings.placeholder && settings.placeholder !== 'auto') {
              module.debug('Setting placeholder value to', settings.placeholder);
              select.placeholder = settings.placeholder;               // 1630
            }                                                          //
            if (settings.sortSelect) {                                 // 1632
              select.values.sort(function (a, b) {                     // 1633
                return a.name > b.name ? 1 : -1;                       // 1634
              });                                                      //
              module.debug('Retrieved and sorted values from select', select);
            } else {                                                   //
              module.debug('Retreived values from select', select);    // 1642
            }                                                          //
            return select;                                             // 1644
          },                                                           //
          activeItem: function () {                                    // 1646
            return $item.filter('.' + className.active);               // 1647
          },                                                           //
          selectedItem: function () {                                  // 1649
            var $selectedItem = $item.not(selector.unselectable).filter('.' + className.selected);
            return $selectedItem.length > 0 ? $selectedItem : $item.eq(0);
          },                                                           //
          itemWithAdditions: function (value) {                        // 1658
            var $items = module.get.item(value),                       // 1659
                $userItems = module.create.userChoice(value),          //
                hasUserItems = $userItems && $userItems.length > 0;    //
            if (hasUserItems) {                                        // 1664
              $items = $items.length > 0 ? $items.add($userItems) : $userItems;
            }                                                          //
            return $items;                                             // 1670
          },                                                           //
          item: function (value, strict) {                             // 1672
            var $selectedItem = false,                                 // 1673
                shouldSearch,                                          //
                isMultiple;                                            //
            value = value !== undefined ? value : module.get.values() !== undefined ? module.get.values() : module.get.text();
            shouldSearch = isMultiple ? value.length > 0 : value !== undefined && value !== null;
            isMultiple = module.is.multiple() && $.isArray(value);     // 1688
            strict = value === '' || value === 0 ? true : strict || false;
            if (shouldSearch) {                                        // 1693
              $item.each(function () {                                 // 1694
                var $choice = $(this),                                 // 1696
                    optionText = module.get.choiceText($choice),       //
                    optionValue = module.get.choiceValue($choice, optionText);
                // safe early exit                                     //
                if (optionValue === null || optionValue === undefined) {
                  return;                                              // 1703
                }                                                      //
                if (isMultiple) {                                      // 1705
                  if ($.inArray(String(optionValue), value) !== -1 || $.inArray(optionText, value) !== -1) {
                    $selectedItem = $selectedItem ? $selectedItem.add($choice) : $choice;
                  }                                                    //
                } else if (strict) {                                   //
                  module.verbose('Ambiguous dropdown value using strict type check', $choice, value);
                  if (optionValue === value || optionText === value) {
                    $selectedItem = $choice;                           // 1716
                    return true;                                       // 1717
                  }                                                    //
                } else {                                               //
                  if (String(optionValue) == String(value) || optionText == value) {
                    module.verbose('Found select item by value', optionValue, value);
                    $selectedItem = $choice;                           // 1723
                    return true;                                       // 1724
                  }                                                    //
                }                                                      //
              });                                                      //
            }                                                          //
            return $selectedItem;                                      // 1730
          }                                                            //
        },                                                             //
                                                                       //
        check: {                                                       // 1734
          maxSelections: function (selectionCount) {                   // 1735
            if (settings.maxSelections) {                              // 1736
              selectionCount = selectionCount !== undefined ? selectionCount : module.get.selectionCount();
              if (selectionCount >= settings.maxSelections) {          // 1741
                module.debug('Maximum selection count reached');       // 1742
                if (settings.useLabels) {                              // 1743
                  $item.addClass(className.filtered);                  // 1744
                  module.add.message(message.maxSelections);           // 1745
                }                                                      //
                return true;                                           // 1747
              } else {                                                 //
                module.verbose('No longer at maximum selection count');
                module.remove.message();                               // 1751
                module.remove.filteredItem();                          // 1752
                if (module.is.searchSelection()) {                     // 1753
                  module.filterItems();                                // 1754
                }                                                      //
                return false;                                          // 1756
              }                                                        //
            }                                                          //
            return true;                                               // 1759
          }                                                            //
        },                                                             //
                                                                       //
        restore: {                                                     // 1763
          defaults: function () {                                      // 1764
            module.clear();                                            // 1765
            module.restore.defaultText();                              // 1766
            module.restore.defaultValue();                             // 1767
          },                                                           //
          defaultText: function () {                                   // 1769
            var defaultText = module.get.defaultText(),                // 1770
                placeholderText = module.get.placeholderText;          //
            if (defaultText === placeholderText) {                     // 1774
              module.debug('Restoring default placeholder text', defaultText);
              module.set.placeholderText(defaultText);                 // 1776
            } else {                                                   //
              module.debug('Restoring default text', defaultText);     // 1779
              module.set.text(defaultText);                            // 1780
            }                                                          //
          },                                                           //
          defaultValue: function () {                                  // 1783
            var defaultValue = module.get.defaultValue();              // 1784
            if (defaultValue !== undefined) {                          // 1787
              module.debug('Restoring default value', defaultValue);   // 1788
              if (defaultValue !== '') {                               // 1789
                module.set.value(defaultValue);                        // 1790
                module.set.selected();                                 // 1791
              } else {                                                 //
                module.remove.activeItem();                            // 1794
                module.remove.selectedItem();                          // 1795
              }                                                        //
            }                                                          //
          },                                                           //
          labels: function () {                                        // 1799
            if (settings.allowAdditions) {                             // 1800
              if (!settings.useLabels) {                               // 1801
                module.error(error.labels);                            // 1802
                settings.useLabels = true;                             // 1803
              }                                                        //
              module.debug('Restoring selected values');               // 1805
              module.create.userLabels();                              // 1806
            }                                                          //
            module.check.maxSelections();                              // 1808
          },                                                           //
          selected: function () {                                      // 1810
            module.restore.values();                                   // 1811
            if (module.is.multiple()) {                                // 1812
              module.debug('Restoring previously selected values and labels');
              module.restore.labels();                                 // 1814
            } else {                                                   //
              module.debug('Restoring previously selected values');    // 1817
            }                                                          //
          },                                                           //
          values: function () {                                        // 1820
            // prevents callbacks from occuring on initial load        //
            module.set.initialLoad();                                  // 1822
            if (settings.apiSettings) {                                // 1823
              if (settings.saveRemoteData) {                           // 1824
                module.restore.remoteValues();                         // 1825
              } else {                                                 //
                module.clearValue();                                   // 1828
              }                                                        //
            } else {                                                   //
              module.set.selected();                                   // 1832
            }                                                          //
            module.remove.initialLoad();                               // 1834
          },                                                           //
          remoteValues: function () {                                  // 1836
            var values = module.get.remoteValues();                    // 1837
            module.debug('Recreating selected from session data', values);
            if (values) {                                              // 1841
              if (module.is.single()) {                                // 1842
                $.each(values, function (value, name) {                // 1843
                  module.set.text(name);                               // 1844
                });                                                    //
              } else {                                                 //
                $.each(values, function (value, name) {                // 1848
                  module.add.label(value, name);                       // 1849
                });                                                    //
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        read: {                                                        // 1856
          remoteData: function (value) {                               // 1857
            var name;                                                  // 1858
            if (window.Storage === undefined) {                        // 1861
              module.error(error.noStorage);                           // 1862
              return;                                                  // 1863
            }                                                          //
            name = sessionStorage.getItem(value);                      // 1865
            return name !== undefined ? name : false;                  // 1866
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 1873
          defaults: function () {                                      // 1874
            module.save.defaultText();                                 // 1875
            module.save.placeholderText();                             // 1876
            module.save.defaultValue();                                // 1877
          },                                                           //
          defaultValue: function () {                                  // 1879
            var value = module.get.value();                            // 1880
            module.verbose('Saving default value as', value);          // 1883
            $module.data(metadata.defaultValue, value);                // 1884
          },                                                           //
          defaultText: function () {                                   // 1886
            var text = module.get.text();                              // 1887
            module.verbose('Saving default text as', text);            // 1890
            $module.data(metadata.defaultText, text);                  // 1891
          },                                                           //
          placeholderText: function () {                               // 1893
            var text;                                                  // 1894
            if (settings.placeholder !== false && $text.hasClass(className.placeholder)) {
              text = module.get.text();                                // 1898
              module.verbose('Saving placeholder text as', text);      // 1899
              $module.data(metadata.placeholderText, text);            // 1900
            }                                                          //
          },                                                           //
          remoteData: function (name, value) {                         // 1903
            if (window.Storage === undefined) {                        // 1904
              module.error(error.noStorage);                           // 1905
              return;                                                  // 1906
            }                                                          //
            module.verbose('Saving remote data to session storage', value, name);
            sessionStorage.setItem(value, name);                       // 1909
          }                                                            //
        },                                                             //
                                                                       //
        clear: function () {                                           // 1913
          if (module.is.multiple()) {                                  // 1914
            module.remove.labels();                                    // 1915
          } else {                                                     //
            module.remove.activeItem();                                // 1918
            module.remove.selectedItem();                              // 1919
          }                                                            //
          module.set.placeholderText();                                // 1921
          module.clearValue();                                         // 1922
        },                                                             //
                                                                       //
        clearValue: function () {                                      // 1925
          module.set.value('');                                        // 1926
        },                                                             //
                                                                       //
        scrollPage: function (direction, $selectedItem) {              // 1929
          var $currentItem = $selectedItem || module.get.selectedItem(),
              $menu = $currentItem.closest(selector.menu),             //
              menuHeight = $menu.outerHeight(),                        //
              currentScroll = $menu.scrollTop(),                       //
              itemHeight = $item.eq(0).outerHeight(),                  //
              itemsPerPage = Math.floor(menuHeight / itemHeight),      //
              maxScroll = $menu.prop('scrollHeight'),                  //
              newScroll = direction == 'up' ? currentScroll - itemHeight * itemsPerPage : currentScroll + itemHeight * itemsPerPage,
              $selectableItem = $item.not(selector.unselectable),      //
              isWithinRange,                                           //
              $nextSelectedItem,                                       //
              elementIndex;                                            //
          elementIndex = direction == 'up' ? $selectableItem.index($currentItem) - itemsPerPage : $selectableItem.index($currentItem) + itemsPerPage;
          isWithinRange = direction == 'up' ? elementIndex >= 0 : elementIndex < $selectableItem.length;
          $nextSelectedItem = isWithinRange ? $selectableItem.eq(elementIndex) : direction == 'up' ? $selectableItem.first() : $selectableItem.last();
          if ($nextSelectedItem.length > 0) {                          // 1960
            module.debug('Scrolling page', direction, $nextSelectedItem);
            $currentItem.removeClass(className.selected);              // 1962
            $nextSelectedItem.addClass(className.selected);            // 1965
            $menu.scrollTop(newScroll);                                // 1968
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 1974
          filtered: function () {                                      // 1975
            var isMultiple = module.is.multiple(),                     // 1976
                isSearch = module.is.searchSelection(),                //
                isSearchMultiple = isMultiple && isSearch,             //
                searchValue = isSearch ? module.get.query() : '',      //
                hasSearchValue = typeof searchValue === 'string' && searchValue.length > 0,
                searchWidth = module.get.searchWidth(searchValue.length),
                valueIsSet = searchValue !== '';                       //
            if (isMultiple && hasSearchValue) {                        // 1987
              module.verbose('Adjusting input width', searchWidth, settings.glyphWidth);
              $search.css('width', searchWidth);                       // 1989
            }                                                          //
            if (hasSearchValue || isSearchMultiple && valueIsSet) {    // 1991
              module.verbose('Hiding placeholder text');               // 1992
              $text.addClass(className.filtered);                      // 1993
            } else if (!isMultiple || isSearchMultiple && !valueIsSet) {
              module.verbose('Showing placeholder text');              // 1996
              $text.removeClass(className.filtered);                   // 1997
            }                                                          //
          },                                                           //
          loading: function () {                                       // 2000
            $module.addClass(className.loading);                       // 2001
          },                                                           //
          placeholderText: function (text) {                           // 2003
            text = text || module.get.placeholderText();               // 2004
            module.debug('Setting placeholder text', text);            // 2005
            module.set.text(text);                                     // 2006
            $text.addClass(className.placeholder);                     // 2007
          },                                                           //
          tabbable: function () {                                      // 2009
            if (module.has.search()) {                                 // 2010
              module.debug('Added tabindex to searchable dropdown');   // 2011
              $search.val('').attr('tabindex', 0);                     // 2012
              $menu.attr('tabindex', -1);                              // 2016
            } else {                                                   //
              module.debug('Added tabindex to dropdown');              // 2021
              if ($module.attr('tabindex') === undefined) {            // 2022
                $module.attr('tabindex', 0);                           // 2023
                $menu.attr('tabindex', -1);                            // 2026
              }                                                        //
            }                                                          //
          },                                                           //
          initialLoad: function () {                                   // 2032
            module.verbose('Setting initial load');                    // 2033
            initialLoad = true;                                        // 2034
          },                                                           //
          activeItem: function ($item) {                               // 2036
            if (settings.allowAdditions && $item.filter(selector.addition).length > 0) {
              $item.addClass(className.filtered);                      // 2038
            } else {                                                   //
              $item.addClass(className.active);                        // 2041
            }                                                          //
          },                                                           //
          scrollPosition: function ($item, forceScroll) {              // 2044
            var edgeTolerance = 5,                                     // 2045
                $menu,                                                 //
                hasActive,                                             //
                offset,                                                //
                itemHeight,                                            //
                itemOffset,                                            //
                menuOffset,                                            //
                menuScroll,                                            //
                menuHeight,                                            //
                abovePage,                                             //
                belowPage;                                             //
                                                                       //
            $item = $item || module.get.selectedItem();                // 2059
            $menu = $item.closest(selector.menu);                      // 2060
            hasActive = $item && $item.length > 0;                     // 2061
            forceScroll = forceScroll !== undefined ? forceScroll : false;
            if ($item && $menu.length > 0 && hasActive) {              // 2066
              itemOffset = $item.position().top;                       // 2067
                                                                       //
              $menu.addClass(className.loading);                       // 2069
              menuScroll = $menu.scrollTop();                          // 2070
              menuOffset = $menu.offset().top;                         // 2071
              itemOffset = $item.offset().top;                         // 2072
              offset = menuScroll - menuOffset + itemOffset;           // 2073
              if (!forceScroll) {                                      // 2074
                menuHeight = $menu.height();                           // 2075
                belowPage = menuScroll + menuHeight < offset + edgeTolerance;
                abovePage = offset - edgeTolerance < menuScroll;       // 2077
              }                                                        //
              module.debug('Scrolling to active item', offset);        // 2079
              if (forceScroll || abovePage || belowPage) {             // 2080
                $menu.scrollTop(offset);                               // 2081
              }                                                        //
              $menu.removeClass(className.loading);                    // 2083
            }                                                          //
          },                                                           //
          text: function (text) {                                      // 2086
            if (settings.action !== 'select') {                        // 2087
              if (settings.action == 'combo') {                        // 2088
                module.debug('Changing combo button text', text, $combo);
                if (settings.preserveHTML) {                           // 2090
                  $combo.html(text);                                   // 2091
                } else {                                               //
                  $combo.text(text);                                   // 2094
                }                                                      //
              } else {                                                 //
                if (text !== module.get.placeholderText()) {           // 2098
                  $text.removeClass(className.placeholder);            // 2099
                }                                                      //
                module.debug('Changing text', text, $text);            // 2101
                $text.removeClass(className.filtered);                 // 2102
                if (settings.preserveHTML) {                           // 2105
                  $text.html(text);                                    // 2106
                } else {                                               //
                  $text.text(text);                                    // 2109
                }                                                      //
              }                                                        //
            }                                                          //
          },                                                           //
          selectedLetter: function (letter) {                          // 2114
            var $selectedItem = $item.filter('.' + className.selected),
                alreadySelectedLetter = $selectedItem.length > 0 && module.has.firstLetter($selectedItem, letter),
                $nextValue = false,                                    //
                $nextItem;                                             //
            // check next of same letter                               //
            if (alreadySelectedLetter) {                               // 2122
              $nextItem = $selectedItem.nextAll($item).eq(0);          // 2123
              if (module.has.firstLetter($nextItem, letter)) {         // 2124
                $nextValue = $nextItem;                                // 2125
              }                                                        //
            }                                                          //
            // check all values                                        //
            if (!$nextValue) {                                         // 2129
              $item.each(function () {                                 // 2130
                if (module.has.firstLetter($(this), letter)) {         // 2132
                  $nextValue = $(this);                                // 2133
                  return false;                                        // 2134
                }                                                      //
              });                                                      //
            }                                                          //
            // set next value                                          //
            if ($nextValue) {                                          // 2140
              module.verbose('Scrolling to next value with letter', letter);
              module.set.scrollPosition($nextValue);                   // 2142
              $selectedItem.removeClass(className.selected);           // 2143
              $nextValue.addClass(className.selected);                 // 2144
            }                                                          //
          },                                                           //
          direction: function ($menu) {                                // 2147
            if (settings.direction == 'auto') {                        // 2148
              if (module.is.onScreen($menu)) {                         // 2149
                module.remove.upward($menu);                           // 2150
              } else {                                                 //
                module.set.upward($menu);                              // 2153
              }                                                        //
            } else if (settings.direction == 'upward') {               //
              module.set.upward($menu);                                // 2157
            }                                                          //
          },                                                           //
          upward: function ($menu) {                                   // 2160
            var $element = $menu || $module;                           // 2161
            $element.addClass(className.upward);                       // 2162
          },                                                           //
          value: function (value, text, $selected) {                   // 2164
            var hasInput = $input.length > 0,                          // 2165
                isAddition = !module.has.value(value),                 //
                currentValue = module.get.values(),                    //
                stringValue = value !== undefined ? String(value) : value,
                newValue;                                              //
            if (hasInput) {                                            // 2174
              if (stringValue == currentValue) {                       // 2175
                module.verbose('Skipping value update already same value', value, currentValue);
                if (!module.is.initialLoad()) {                        // 2177
                  return;                                              // 2178
                }                                                      //
              }                                                        //
                                                                       //
              if (module.is.single() && module.has.selectInput() && module.can.extendSelect()) {
                module.debug('Adding user option', value);             // 2183
                module.add.optionValue(value);                         // 2184
              }                                                        //
              module.debug('Updating input value', value, currentValue);
              internalChange = true;                                   // 2187
              $input.val(value);                                       // 2188
              if (settings.fireOnInit === false && module.is.initialLoad()) {
                module.debug('Input native change event ignored on initial load');
              } else {                                                 //
                module.trigger.change();                               // 2195
              }                                                        //
              internalChange = false;                                  // 2197
            } else {                                                   //
              module.verbose('Storing value in metadata', value, $input);
              if (value !== currentValue) {                            // 2201
                $module.data(metadata.value, stringValue);             // 2202
              }                                                        //
            }                                                          //
            if (settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('No callback on initial load', settings.onChange);
            } else {                                                   //
              settings.onChange.call(element, value, text, $selected);
            }                                                          //
          },                                                           //
          active: function () {                                        // 2212
            $module.addClass(className.active);                        // 2213
          },                                                           //
          multiple: function () {                                      // 2217
            $module.addClass(className.multiple);                      // 2218
          },                                                           //
          visible: function () {                                       // 2220
            $module.addClass(className.visible);                       // 2221
          },                                                           //
          exactly: function (value, $selectedItem) {                   // 2223
            module.debug('Setting selected to exact values');          // 2224
            module.clear();                                            // 2225
            module.set.selected(value, $selectedItem);                 // 2226
          },                                                           //
          selected: function (value, $selectedItem) {                  // 2228
            var isMultiple = module.is.multiple(),                     // 2229
                $userSelectedItem;                                     //
            $selectedItem = settings.allowAdditions ? $selectedItem || module.get.itemWithAdditions(value) : $selectedItem || module.get.item(value);
            if (!$selectedItem) {                                      // 2237
              return;                                                  // 2238
            }                                                          //
            module.debug('Setting selected menu item to', $selectedItem);
            if (module.is.single()) {                                  // 2241
              module.remove.activeItem();                              // 2242
              module.remove.selectedItem();                            // 2243
            } else if (settings.useLabels) {                           //
              module.remove.selectedItem();                            // 2246
            }                                                          //
            // select each item                                        //
            $selectedItem.each(function () {                           // 2249
              var $selected = $(this),                                 // 2251
                  selectedText = module.get.choiceText($selected),     //
                  selectedValue = module.get.choiceValue($selected, selectedText),
                  isFiltered = $selected.hasClass(className.filtered),
                  isActive = $selected.hasClass(className.active),     //
                  isUserValue = $selected.hasClass(className.addition),
                  shouldAnimate = isMultiple && $selectedItem.length == 1;
              if (isMultiple) {                                        // 2261
                if (!isActive || isUserValue) {                        // 2262
                  if (settings.apiSettings && settings.saveRemoteData) {
                    module.save.remoteData(selectedText, selectedValue);
                  }                                                    //
                  if (settings.useLabels) {                            // 2266
                    module.add.value(selectedValue, selectedText, $selected);
                    module.add.label(selectedValue, selectedText, shouldAnimate);
                    module.set.activeItem($selected);                  // 2269
                    module.filterActive();                             // 2270
                    module.select.nextAvailable($selectedItem);        // 2271
                  } else {                                             //
                    module.add.value(selectedValue, selectedText, $selected);
                    module.set.text(module.add.variables(message.count));
                    module.set.activeItem($selected);                  // 2276
                  }                                                    //
                } else if (!isFiltered) {                              //
                  module.debug('Selected active value, removing label');
                  module.remove.selected(selectedValue);               // 2281
                }                                                      //
              } else {                                                 //
                if (settings.apiSettings && settings.saveRemoteData) {
                  module.save.remoteData(selectedText, selectedValue);
                }                                                      //
                module.set.text(selectedText);                         // 2288
                module.set.value(selectedValue, selectedText, $selected);
                $selected.addClass(className.active).addClass(className.selected);
              }                                                        //
            });                                                        //
          }                                                            //
        },                                                             //
                                                                       //
        add: {                                                         // 2300
          label: function (value, text, shouldAnimate) {               // 2301
            var $next = module.is.searchSelection() ? $search : $text,
                $label;                                                //
            $label = $('<a />').addClass(className.label).attr('data-value', value).html(templates.label(value, text));
            $label = settings.onLabelCreate.call($label, value, text);
                                                                       //
            if (module.has.label(value)) {                             // 2315
              module.debug('Label already exists, skipping', value);   // 2316
              return;                                                  // 2317
            }                                                          //
            if (settings.label.variation) {                            // 2319
              $label.addClass(settings.label.variation);               // 2320
            }                                                          //
            if (shouldAnimate === true) {                              // 2322
              module.debug('Animating in label', $label);              // 2323
              $label.addClass(className.hidden).insertBefore($next).transition(settings.label.transition, settings.label.duration);
            } else {                                                   //
              module.debug('Adding selection label', $label);          // 2331
              $label.insertBefore($next);                              // 2332
            }                                                          //
          },                                                           //
          message: function (message) {                                // 2337
            var $message = $menu.children(selector.message),           // 2338
                html = settings.templates.message(module.add.variables(message));
            if ($message.length > 0) {                                 // 2342
              $message.html(html);                                     // 2343
            } else {                                                   //
              $message = $('<div/>').html(html).addClass(className.message).appendTo($menu);
            }                                                          //
          },                                                           //
          optionValue: function (value) {                              // 2355
            var $option = $input.find('option[value="' + value + '"]'),
                hasOption = $option.length > 0;                        //
            if (hasOption) {                                           // 2360
              return;                                                  // 2361
            }                                                          //
            // temporarily disconnect observer                         //
            if (selectObserver) {                                      // 2364
              selectObserver.disconnect();                             // 2365
              module.verbose('Temporarily disconnecting mutation observer', value);
            }                                                          //
            if (module.is.single()) {                                  // 2368
              module.verbose('Removing previous user addition');       // 2369
              $input.find('option.' + className.addition).remove();    // 2370
            }                                                          //
            $('<option/>').prop('value', value).addClass(className.addition).html(value).appendTo($input);
            module.verbose('Adding user addition as an <option>', value);
            if (selectObserver) {                                      // 2379
              selectObserver.observe($input[0], {                      // 2380
                childList: true,                                       // 2381
                subtree: true                                          // 2382
              });                                                      //
            }                                                          //
          },                                                           //
          userSuggestion: function (value) {                           // 2386
            var $addition = $menu.children(selector.addition),         // 2387
                $existingItem = module.get.item(value),                //
                alreadyHasValue = $existingItem && $existingItem.not(selector.addition).length,
                hasUserSuggestion = $addition.length > 0,              //
                html;                                                  //
            if (settings.useLabels && module.has.maxSelections()) {    // 2394
              return;                                                  // 2395
            }                                                          //
            if (value === '' || alreadyHasValue) {                     // 2397
              $addition.remove();                                      // 2398
              return;                                                  // 2399
            }                                                          //
            $item.removeClass(className.selected);                     // 2401
            if (hasUserSuggestion) {                                   // 2404
              html = settings.templates.addition(module.add.variables(message.addResult, value));
              $addition.html(html).attr('data-' + metadata.value, value).attr('data-' + metadata.text, value).removeClass(className.filtered).addClass(className.selected);
              module.verbose('Replacing user suggestion with new value', $addition);
            } else {                                                   //
              $addition = module.create.userChoice(value);             // 2416
              $addition.prependTo($menu).addClass(className.selected);
              module.verbose('Adding item choice to menu corresponding with user choice addition', $addition);
            }                                                          //
          },                                                           //
          variables: function (message, term) {                        // 2424
            var hasCount = message.search('{count}') !== -1,           // 2425
                hasMaxCount = message.search('{maxCount}') !== -1,     //
                hasTerm = message.search('{term}') !== -1,             //
                values,                                                //
                count,                                                 //
                query;                                                 //
            module.verbose('Adding templated variables to message', message);
            if (hasCount) {                                            // 2434
              count = module.get.selectionCount();                     // 2435
              message = message.replace('{count}', count);             // 2436
            }                                                          //
            if (hasMaxCount) {                                         // 2438
              count = module.get.selectionCount();                     // 2439
              message = message.replace('{maxCount}', settings.maxSelections);
            }                                                          //
            if (hasTerm) {                                             // 2442
              query = term || module.get.query();                      // 2443
              message = message.replace('{term}', query);              // 2444
            }                                                          //
            return message;                                            // 2446
          },                                                           //
          value: function (addedValue, addedText, $selectedItem) {     // 2448
            var currentValue = module.get.values(),                    // 2449
                newValue;                                              //
            if (addedValue === '') {                                   // 2453
              module.debug('Cannot select blank values from multiselect');
              return;                                                  // 2455
            }                                                          //
            // extend current array                                    //
            if ($.isArray(currentValue)) {                             // 2458
              newValue = currentValue.concat([addedValue]);            // 2459
              newValue = module.get.uniqueArray(newValue);             // 2460
            } else {                                                   //
              newValue = [addedValue];                                 // 2463
            }                                                          //
            // add values                                              //
            if (module.has.selectInput()) {                            // 2466
              if (module.can.extendSelect()) {                         // 2467
                module.debug('Adding value to select', addedValue, newValue, $input);
                module.add.optionValue(addedValue);                    // 2469
              }                                                        //
            } else {                                                   //
              newValue = newValue.join(settings.delimiter);            // 2473
              module.debug('Setting hidden input to delimited value', newValue, $input);
            }                                                          //
                                                                       //
            if (settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('Skipping onadd callback on initial load', settings.onAdd);
            } else {                                                   //
              settings.onAdd.call(element, addedValue, addedText, $selectedItem);
            }                                                          //
            module.set.value(newValue, addedValue, addedText, $selectedItem);
            module.check.maxSelections();                              // 2484
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 2488
          active: function () {                                        // 2489
            $module.removeClass(className.active);                     // 2490
          },                                                           //
          activeLabel: function () {                                   // 2492
            $module.find(selector.label).removeClass(className.active);
          },                                                           //
          loading: function () {                                       // 2495
            $module.removeClass(className.loading);                    // 2496
          },                                                           //
          initialLoad: function () {                                   // 2498
            initialLoad = false;                                       // 2499
          },                                                           //
          upward: function ($menu) {                                   // 2501
            var $element = $menu || $module;                           // 2502
            $element.removeClass(className.upward);                    // 2503
          },                                                           //
          visible: function () {                                       // 2505
            $module.removeClass(className.visible);                    // 2506
          },                                                           //
          activeItem: function () {                                    // 2508
            $item.removeClass(className.active);                       // 2509
          },                                                           //
          filteredItem: function () {                                  // 2511
            if (settings.useLabels && module.has.maxSelections()) {    // 2512
              return;                                                  // 2513
            }                                                          //
            if (settings.useLabels && module.is.multiple()) {          // 2515
              $item.not('.' + className.active).removeClass(className.filtered);
            } else {                                                   //
              $item.removeClass(className.filtered);                   // 2519
            }                                                          //
          },                                                           //
          optionValue: function (value) {                              // 2522
            var $option = $input.find('option[value="' + value + '"]'),
                hasOption = $option.length > 0;                        //
            if (!hasOption || !$option.hasClass(className.addition)) {
              return;                                                  // 2528
            }                                                          //
            // temporarily disconnect observer                         //
            if (selectObserver) {                                      // 2531
              selectObserver.disconnect();                             // 2532
              module.verbose('Temporarily disconnecting mutation observer', value);
            }                                                          //
            $option.remove();                                          // 2535
            module.verbose('Removing user addition as an <option>', value);
            if (selectObserver) {                                      // 2537
              selectObserver.observe($input[0], {                      // 2538
                childList: true,                                       // 2539
                subtree: true                                          // 2540
              });                                                      //
            }                                                          //
          },                                                           //
          message: function () {                                       // 2544
            $menu.children(selector.message).remove();                 // 2545
          },                                                           //
          searchTerm: function () {                                    // 2547
            module.verbose('Cleared search term');                     // 2548
            $search.val('');                                           // 2549
            module.set.filtered();                                     // 2550
          },                                                           //
          selected: function (value, $selectedItem) {                  // 2552
            $selectedItem = settings.allowAdditions ? $selectedItem || module.get.itemWithAdditions(value) : $selectedItem || module.get.item(value);
                                                                       //
            if (!$selectedItem) {                                      // 2558
              return false;                                            // 2559
            }                                                          //
                                                                       //
            $selectedItem.each(function () {                           // 2562
              var $selected = $(this),                                 // 2564
                  selectedText = module.get.choiceText($selected),     //
                  selectedValue = module.get.choiceValue($selected, selectedText);
              if (module.is.multiple()) {                              // 2569
                if (settings.useLabels) {                              // 2570
                  module.remove.value(selectedValue, selectedText, $selected);
                  module.remove.label(selectedValue);                  // 2572
                } else {                                               //
                  module.remove.value(selectedValue, selectedText, $selected);
                  if (module.get.selectionCount() === 0) {             // 2576
                    module.set.placeholderText();                      // 2577
                  } else {                                             //
                    module.set.text(module.add.variables(message.count));
                  }                                                    //
                }                                                      //
              } else {                                                 //
                module.remove.value(selectedValue, selectedText, $selected);
              }                                                        //
              $selected.removeClass(className.filtered).removeClass(className.active);
              if (settings.useLabels) {                                // 2591
                $selected.removeClass(className.selected);             // 2592
              }                                                        //
            });                                                        //
          },                                                           //
          selectedItem: function () {                                  // 2597
            $item.removeClass(className.selected);                     // 2598
          },                                                           //
          value: function (removedValue, removedText, $removedItem) {  // 2600
            var values = module.get.values(),                          // 2601
                newValue;                                              //
            if (module.has.selectInput()) {                            // 2605
              module.verbose('Input is <select> removing selected option', removedValue);
              newValue = module.remove.arrayValue(removedValue, values);
              module.remove.optionValue(removedValue);                 // 2608
            } else {                                                   //
              module.verbose('Removing from delimited values', removedValue);
              newValue = module.remove.arrayValue(removedValue, values);
              newValue = newValue.join(settings.delimiter);            // 2613
            }                                                          //
            if (settings.fireOnInit === false && module.is.initialLoad()) {
              module.verbose('No callback on initial load', settings.onRemove);
            } else {                                                   //
              settings.onRemove.call(element, removedValue, removedText, $removedItem);
            }                                                          //
            module.set.value(newValue, removedText, $removedItem);     // 2621
            module.check.maxSelections();                              // 2622
          },                                                           //
          arrayValue: function (removedValue, values) {                // 2624
            if (!$.isArray(values)) {                                  // 2625
              values = [values];                                       // 2626
            }                                                          //
            values = $.grep(values, function (value) {                 // 2628
              return removedValue != value;                            // 2629
            });                                                        //
            module.verbose('Removed value from delimited string', removedValue, values);
            return values;                                             // 2632
          },                                                           //
          label: function (value, shouldAnimate) {                     // 2634
            var $labels = $module.find(selector.label),                // 2635
                $removedLabel = $labels.filter('[data-value="' + value + '"]');
            module.verbose('Removing label', $removedLabel);           // 2639
            $removedLabel.remove();                                    // 2640
          },                                                           //
          activeLabels: function ($activeLabels) {                     // 2642
            $activeLabels = $activeLabels || $module.find(selector.label).filter('.' + className.active);
            module.verbose('Removing active label selections', $activeLabels);
            module.remove.labels($activeLabels);                       // 2645
          },                                                           //
          labels: function ($labels) {                                 // 2647
            $labels = $labels || $module.find(selector.label);         // 2648
            module.verbose('Removing labels', $labels);                // 2649
            $labels.each(function () {                                 // 2650
              var $label = $(this),                                    // 2652
                  value = $label.data(metadata.value),                 //
                  stringValue = value !== undefined ? String(value) : value,
                  isUserValue = module.is.userValue(stringValue);      //
              if (settings.onLabelRemove.call($label, value) === false) {
                module.debug('Label remove callback cancelled removal');
                return;                                                // 2662
              }                                                        //
              if (isUserValue) {                                       // 2664
                module.remove.value(stringValue);                      // 2665
                module.remove.label(stringValue);                      // 2666
              } else {                                                 //
                // selected will also remove label                     //
                module.remove.selected(stringValue);                   // 2670
              }                                                        //
            });                                                        //
          },                                                           //
          tabbable: function () {                                      // 2675
            if (module.has.search()) {                                 // 2676
              module.debug('Searchable dropdown initialized');         // 2677
              $search.removeAttr('tabindex');                          // 2678
              $menu.removeAttr('tabindex');                            // 2681
            } else {                                                   //
              module.debug('Simple selection dropdown initialized');   // 2686
              $module.removeAttr('tabindex');                          // 2687
              $menu.removeAttr('tabindex');                            // 2690
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 2697
          search: function () {                                        // 2698
            return $search.length > 0;                                 // 2699
          },                                                           //
          selectInput: function () {                                   // 2701
            return $input.is('select');                                // 2702
          },                                                           //
          firstLetter: function ($item, letter) {                      // 2704
            var text, firstLetter;                                     // 2705
            if (!$item || $item.length === 0 || typeof letter !== 'string') {
              return false;                                            // 2710
            }                                                          //
            text = module.get.choiceText($item, false);                // 2712
            letter = letter.toLowerCase();                             // 2713
            firstLetter = String(text).charAt(0).toLowerCase();        // 2714
            return letter == firstLetter;                              // 2715
          },                                                           //
          input: function () {                                         // 2717
            return $input.length > 0;                                  // 2718
          },                                                           //
          items: function () {                                         // 2720
            return $item.length > 0;                                   // 2721
          },                                                           //
          menu: function () {                                          // 2723
            return $menu.length > 0;                                   // 2724
          },                                                           //
          message: function () {                                       // 2726
            return $menu.children(selector.message).length !== 0;      // 2727
          },                                                           //
          label: function (value) {                                    // 2729
            var $labels = $module.find(selector.label);                // 2730
            return $labels.filter('[data-value="' + value + '"]').length > 0;
          },                                                           //
          maxSelections: function () {                                 // 2735
            return settings.maxSelections && module.get.selectionCount() >= settings.maxSelections;
          },                                                           //
          allResultsFiltered: function () {                            // 2738
            return $item.filter(selector.unselectable).length === $item.length;
          },                                                           //
          query: function () {                                         // 2741
            return module.get.query() !== '';                          // 2742
          },                                                           //
          value: function (value) {                                    // 2744
            var values = module.get.values(),                          // 2745
                hasValue = $.isArray(values) ? values && $.inArray(value, values) !== -1 : values == value;
            return hasValue ? true : false;                            // 2751
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 2758
          active: function () {                                        // 2759
            return $module.hasClass(className.active);                 // 2760
          },                                                           //
          alreadySetup: function () {                                  // 2762
            return $module.is('select') && $module.parent(selector.dropdown).length > 0 && $module.prev().length === 0;
          },                                                           //
          animating: function ($subMenu) {                             // 2765
            return $subMenu ? $subMenu.transition && $subMenu.transition('is animating') : $menu.transition && $menu.transition('is animating');
          },                                                           //
          disabled: function () {                                      // 2771
            return $module.hasClass(className.disabled);               // 2772
          },                                                           //
          focused: function () {                                       // 2774
            return document.activeElement === $module[0];              // 2775
          },                                                           //
          focusedOnSearch: function () {                               // 2777
            return document.activeElement === $search[0];              // 2778
          },                                                           //
          allFiltered: function () {                                   // 2780
            return (module.is.multiple() || module.has.search()) && !module.has.message() && module.has.allResultsFiltered();
          },                                                           //
          hidden: function ($subMenu) {                                // 2783
            return !module.is.visible($subMenu);                       // 2784
          },                                                           //
          initialLoad: function () {                                   // 2786
            return initialLoad;                                        // 2787
          },                                                           //
          onScreen: function ($subMenu) {                              // 2789
            var $currentMenu = $subMenu || $menu,                      // 2790
                canOpenDownward = true,                                //
                onScreen = {},                                         //
                calculations;                                          //
            $currentMenu.addClass(className.loading);                  // 2796
            calculations = {                                           // 2797
              context: {                                               // 2798
                scrollTop: $context.scrollTop(),                       // 2799
                height: $context.outerHeight()                         // 2800
              },                                                       //
              menu: {                                                  // 2802
                offset: $currentMenu.offset(),                         // 2803
                height: $currentMenu.outerHeight()                     // 2804
              }                                                        //
            };                                                         //
            onScreen = {                                               // 2807
              above: calculations.context.scrollTop <= calculations.menu.offset.top - calculations.menu.height,
              below: calculations.context.scrollTop + calculations.context.height >= calculations.menu.offset.top + calculations.menu.height
            };                                                         //
            if (onScreen.below) {                                      // 2811
              module.verbose('Dropdown can fit in context downward', onScreen);
              canOpenDownward = true;                                  // 2813
            } else if (!onScreen.below && !onScreen.above) {           //
              module.verbose('Dropdown cannot fit in either direction, favoring downward', onScreen);
              canOpenDownward = true;                                  // 2817
            } else {                                                   //
              module.verbose('Dropdown cannot fit below, opening upward', onScreen);
              canOpenDownward = false;                                 // 2821
            }                                                          //
            $currentMenu.removeClass(className.loading);               // 2823
            return canOpenDownward;                                    // 2824
          },                                                           //
          inObject: function (needle, object) {                        // 2826
            var found = false;                                         // 2827
            $.each(object, function (index, property) {                // 2830
              if (property == needle) {                                // 2831
                found = true;                                          // 2832
                return true;                                           // 2833
              }                                                        //
            });                                                        //
            return found;                                              // 2836
          },                                                           //
          multiple: function () {                                      // 2838
            return $module.hasClass(className.multiple);               // 2839
          },                                                           //
          single: function () {                                        // 2841
            return !module.is.multiple();                              // 2842
          },                                                           //
          selectMutation: function (mutations) {                       // 2844
            var selectChanged = false;                                 // 2845
            $.each(mutations, function (index, mutation) {             // 2848
              if (mutation.target && $(mutation.target).is('select')) {
                selectChanged = true;                                  // 2850
                return true;                                           // 2851
              }                                                        //
            });                                                        //
            return selectChanged;                                      // 2854
          },                                                           //
          search: function () {                                        // 2856
            return $module.hasClass(className.search);                 // 2857
          },                                                           //
          searchSelection: function () {                               // 2859
            return module.has.search() && $search.parent(selector.dropdown).length === 1;
          },                                                           //
          selection: function () {                                     // 2862
            return $module.hasClass(className.selection);              // 2863
          },                                                           //
          userValue: function (value) {                                // 2865
            return $.inArray(value, module.get.userValues()) !== -1;   // 2866
          },                                                           //
          upward: function ($menu) {                                   // 2868
            var $element = $menu || $module;                           // 2869
            return $element.hasClass(className.upward);                // 2870
          },                                                           //
          visible: function ($subMenu) {                               // 2872
            return $subMenu ? $subMenu.hasClass(className.visible) : $menu.hasClass(className.visible);
          }                                                            //
        },                                                             //
                                                                       //
        can: {                                                         // 2880
          activate: function ($item) {                                 // 2881
            if (settings.useLabels) {                                  // 2882
              return true;                                             // 2883
            }                                                          //
            if (!module.has.maxSelections()) {                         // 2885
              return true;                                             // 2886
            }                                                          //
            if (module.has.maxSelections() && $item.hasClass(className.active)) {
              return true;                                             // 2889
            }                                                          //
            return false;                                              // 2891
          },                                                           //
          click: function () {                                         // 2893
            return hasTouch || settings.on == 'click';                 // 2894
          },                                                           //
          extendSelect: function () {                                  // 2896
            return settings.allowAdditions || settings.apiSettings;    // 2897
          },                                                           //
          show: function () {                                          // 2899
            return !module.is.disabled() && (module.has.items() || module.has.message());
          },                                                           //
          useAPI: function () {                                        // 2902
            return $.fn.api !== undefined;                             // 2903
          }                                                            //
        },                                                             //
                                                                       //
        animate: {                                                     // 2907
          show: function (callback, $subMenu) {                        // 2908
            var $currentMenu = $subMenu || $menu,                      // 2909
                start = $subMenu ? function () {} : function () {      //
              module.hideSubMenus();                                   // 2914
              module.hideOthers();                                     // 2915
              module.set.active();                                     // 2916
            },                                                         //
                transition;                                            //
            callback = $.isFunction(callback) ? callback : function () {};
            module.verbose('Doing menu show animation', $currentMenu);
            module.set.direction($subMenu);                            // 2925
            transition = module.get.transition($subMenu);              // 2926
            if (module.is.selection()) {                               // 2927
              module.set.scrollPosition(module.get.selectedItem(), true);
            }                                                          //
            if (module.is.hidden($currentMenu) || module.is.animating($currentMenu)) {
              if (transition == 'none') {                              // 2931
                start();                                               // 2932
                $currentMenu.transition('show');                       // 2933
                callback.call(element);                                // 2934
              } else if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $currentMenu.transition({                              // 2937
                  animation: transition + ' in',                       // 2939
                  debug: settings.debug,                               // 2940
                  verbose: settings.verbose,                           // 2941
                  duration: settings.duration,                         // 2942
                  queue: true,                                         // 2943
                  onStart: start,                                      // 2944
                  onComplete: function () {                            // 2945
                    callback.call(element);                            // 2946
                  }                                                    //
                });                                                    //
              } else {                                                 //
                module.error(error.noTransition, transition);          // 2952
              }                                                        //
            }                                                          //
          },                                                           //
          hide: function (callback, $subMenu) {                        // 2956
            var $currentMenu = $subMenu || $menu,                      // 2957
                duration = $subMenu ? settings.duration * 0.9 : settings.duration,
                start = $subMenu ? function () {} : function () {      //
              if (module.can.click()) {                                // 2965
                module.unbind.intent();                                // 2966
              }                                                        //
              module.remove.active();                                  // 2968
            },                                                         //
                transition = module.get.transition($subMenu);          //
            callback = $.isFunction(callback) ? callback : function () {};
            if (module.is.visible($currentMenu) || module.is.animating($currentMenu)) {
              module.verbose('Doing menu hide animation', $currentMenu);
                                                                       //
              if (transition == 'none') {                              // 2979
                start();                                               // 2980
                $currentMenu.transition('hide');                       // 2981
                callback.call(element);                                // 2982
              } else if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $currentMenu.transition({                              // 2985
                  animation: transition + ' out',                      // 2987
                  duration: settings.duration,                         // 2988
                  debug: settings.debug,                               // 2989
                  verbose: settings.verbose,                           // 2990
                  queue: true,                                         // 2991
                  onStart: start,                                      // 2992
                  onComplete: function () {                            // 2993
                    if (settings.direction == 'auto') {                // 2994
                      module.remove.upward($subMenu);                  // 2995
                    }                                                  //
                    callback.call(element);                            // 2997
                  }                                                    //
                });                                                    //
              } else {                                                 //
                module.error(error.transition);                        // 3003
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        hideAndClear: function () {                                    // 3009
          module.remove.searchTerm();                                  // 3010
          if (module.has.maxSelections()) {                            // 3011
            return;                                                    // 3012
          }                                                            //
          if (module.has.search()) {                                   // 3014
            module.hide(function () {                                  // 3015
              module.remove.filteredItem();                            // 3016
            });                                                        //
          } else {                                                     //
            module.hide();                                             // 3020
          }                                                            //
        },                                                             //
                                                                       //
        delay: {                                                       // 3024
          show: function () {                                          // 3025
            module.verbose('Delaying show event to ensure user intent');
            clearTimeout(module.timer);                                // 3027
            module.timer = setTimeout(module.show, settings.delay.show);
          },                                                           //
          hide: function () {                                          // 3030
            module.verbose('Delaying hide event to ensure user intent');
            clearTimeout(module.timer);                                // 3032
            module.timer = setTimeout(module.hide, settings.delay.hide);
          }                                                            //
        },                                                             //
                                                                       //
        escape: {                                                      // 3037
          regExp: function (text) {                                    // 3038
            text = String(text);                                       // 3039
            return text.replace(regExp.escape, '\\$&');                // 3040
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 3044
          module.debug('Changing setting', name, value);               // 3045
          if ($.isPlainObject(name)) {                                 // 3046
            $.extend(true, settings, name);                            // 3047
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 3050
          } else {                                                     //
            return settings[name];                                     // 3053
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 3056
          if ($.isPlainObject(name)) {                                 // 3057
            $.extend(true, module, name);                              // 3058
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 3061
          } else {                                                     //
            return module[name];                                       // 3064
          }                                                            //
        },                                                             //
        debug: function () {                                           // 3067
          if (settings.debug) {                                        // 3068
            if (settings.performance) {                                // 3069
              module.performance.log(arguments);                       // 3070
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 3074
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 3078
          if (settings.verbose && settings.debug) {                    // 3079
            if (settings.performance) {                                // 3080
              module.performance.log(arguments);                       // 3081
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 3085
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 3089
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 3091
        },                                                             //
        performance: {                                                 // 3093
          log: function (message) {                                    // 3094
            var currentTime, executionTime, previousTime;              // 3095
            if (settings.performance) {                                // 3100
              currentTime = new Date().getTime();                      // 3101
              previousTime = time || currentTime;                      // 3102
              executionTime = currentTime - previousTime;              // 3103
              time = currentTime;                                      // 3104
              performance.push({                                       // 3105
                'Name': message[0],                                    // 3106
                'Arguments': [].slice.call(message, 1) || '',          // 3107
                'Element': element,                                    // 3108
                'Execution Time': executionTime                        // 3109
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 3112
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 3115
            var title = settings.name + ':',                           // 3116
                totalTime = 0;                                         //
            time = false;                                              // 3120
            clearTimeout(module.performance.timer);                    // 3121
            $.each(performance, function (index, data) {               // 3122
              totalTime += data['Execution Time'];                     // 3123
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 3125
            if (moduleSelector) {                                      // 3126
              title += ' \'' + moduleSelector + '\'';                  // 3127
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 3130
              if (console.table) {                                     // 3131
                console.table(performance);                            // 3132
              } else {                                                 //
                $.each(performance, function (index, data) {           // 3135
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 3139
            }                                                          //
            performance = [];                                          // 3141
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 3144
          var object = instance,                                       // 3145
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 3151
          context = element || context;                                // 3152
          if (typeof query == 'string' && object !== undefined) {      // 3153
            query = query.split(/[\. ]/);                              // 3154
            maxDepth = query.length - 1;                               // 3155
            $.each(query, function (depth, value) {                    // 3156
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 3162
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 3165
                return false;                                          // 3166
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 3169
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 3172
                return false;                                          // 3173
              } else {                                                 //
                module.error(error.method, query);                     // 3176
                return false;                                          // 3177
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 3181
            response = found.apply(context, passedArguments);          // 3182
          } else if (found !== undefined) {                            //
            response = found;                                          // 3185
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 3187
            returnedValue.push(response);                              // 3188
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 3191
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 3194
          }                                                            //
          return found;                                                // 3196
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 3200
        if (instance === undefined) {                                  // 3201
          module.initialize();                                         // 3202
        }                                                              //
        module.invoke(query);                                          // 3204
      } else {                                                         //
        if (instance !== undefined) {                                  // 3207
          instance.invoke('destroy');                                  // 3208
        }                                                              //
        module.initialize();                                           // 3210
      }                                                                //
    });                                                                //
    return returnedValue !== undefined ? returnedValue : $allModules;  // 3214
  };                                                                   //
                                                                       //
  $.fn.dropdown.settings = {                                           // 3220
                                                                       //
    debug: false,                                                      // 3222
    verbose: false,                                                    // 3223
    performance: true,                                                 // 3224
                                                                       //
    on: 'click', // what event should show menu action on item selection
    action: 'activate', // action on item selection (nothing, activate, select, combo, hide, function(){})
                                                                       //
    apiSettings: false,                                                // 3230
    saveRemoteData: true, // Whether remote name/value pairs should be stored in sessionStorage to allow remote data to be restored on page refresh
    throttle: 200, // How long to wait after last user input to search remotely
                                                                       //
    context: window, // Context to use when determining if on screen   // 3234
    direction: 'auto', // Whether dropdown should always open in one direction
    keepOnScreen: true, // Whether dropdown should check whether it is on screen before showing
                                                                       //
    match: 'both', // what to match against with search selection (both, text, or label)
    fullTextSearch: false, // search anywhere in value                 // 3239
                                                                       //
    placeholder: 'auto', // whether to convert blank <select> values to placeholder text
    preserveHTML: true, // preserve html when selecting value          // 3242
    sortSelect: false, // sort selection on init                       // 3243
                                                                       //
    forceSelection: true, // force a choice on blur with search selection
    allowAdditions: false, // whether multiple select should allow user added values
                                                                       //
    maxSelections: false, // When set to a number limits the number of selections to this count
    useLabels: true, // whether multiple select should filter currently active selections from choices
    delimiter: ',', // when multiselect uses normal <input> the values will be delimited with this character
                                                                       //
    showOnFocus: true, // show menu on focus                           // 3252
    allowTab: true, // add tabindex to element                         // 3253
    allowCategorySelection: false, // allow elements with sub-menus to be selected
                                                                       //
    fireOnInit: false, // Whether callbacks should fire when initializing dropdown values
                                                                       //
    transition: 'auto', // auto transition will slide down or up based on direction
    duration: 200, // duration of transition                           // 3259
                                                                       //
    glyphWidth: 1.0714, // widest glyph width in em (W is 1.0714 em) used to calculate multiselect input width
                                                                       //
    // label settings on multi-select                                  //
    label: {                                                           // 3264
      transition: 'scale',                                             // 3265
      duration: 200,                                                   // 3266
      variation: false                                                 // 3267
    },                                                                 //
                                                                       //
    // delay before event                                              //
    delay: {                                                           // 3271
      hide: 300,                                                       // 3272
      show: 200,                                                       // 3273
      search: 20,                                                      // 3274
      touch: 50                                                        // 3275
    },                                                                 //
                                                                       //
    /* Callbacks */                                                    //
    onChange: function (value, text, $selected) {},                    // 3279
    onAdd: function (value, text, $selected) {},                       // 3280
    onRemove: function (value, text, $selected) {},                    // 3281
                                                                       //
    onLabelSelect: function ($selectedLabels) {},                      // 3283
    onLabelCreate: function (value, text) {                            // 3284
      return $(this);                                                  // 3284
    },                                                                 //
    onLabelRemove: function (value) {                                  // 3285
      return true;                                                     // 3285
    },                                                                 //
    onNoResults: function (searchTerm) {                               // 3286
      return true;                                                     // 3286
    },                                                                 //
    onShow: function () {},                                            // 3287
    onHide: function () {},                                            // 3288
                                                                       //
    /* Component */                                                    //
    name: 'Dropdown',                                                  // 3291
    namespace: 'dropdown',                                             // 3292
                                                                       //
    message: {                                                         // 3294
      addResult: 'Add <b>{term}</b>',                                  // 3295
      count: '{count} selected',                                       // 3296
      maxSelections: 'Max {maxCount} selections',                      // 3297
      noResults: 'No results found.',                                  // 3298
      serverError: 'There was an error contacting the server'          // 3299
    },                                                                 //
                                                                       //
    error: {                                                           // 3302
      action: 'You called a dropdown action that was not defined',     // 3303
      alreadySetup: 'Once a select has been initialized behaviors must be called on the created ui dropdown',
      labels: 'Allowing user additions currently requires the use of labels.',
      missingMultiple: '<select> requires multiple property to be set to correctly preserve multiple values',
      method: 'The method you called is not defined.',                 // 3307
      noAPI: 'The API module is required to load resources remotely',  // 3308
      noStorage: 'Saving remote data requires session storage',        // 3309
      noTransition: 'This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>'
    },                                                                 //
                                                                       //
    regExp: {                                                          // 3313
      escape: /[-[\]{}()*+?.,\\^$|#\s]/g                               // 3314
    },                                                                 //
                                                                       //
    metadata: {                                                        // 3317
      defaultText: 'defaultText',                                      // 3318
      defaultValue: 'defaultValue',                                    // 3319
      placeholderText: 'placeholder',                                  // 3320
      text: 'text',                                                    // 3321
      value: 'value'                                                   // 3322
    },                                                                 //
                                                                       //
    // property names for remote query                                 //
    fields: {                                                          // 3326
      remoteValues: 'results', // grouping for api results             // 3327
      values: 'values', // grouping for all dropdown values            // 3328
      name: 'name', // displayed dropdown text                         // 3329
      value: 'value' // actual dropdown value                          // 3330
    },                                                                 //
                                                                       //
    keys: {                                                            // 3333
      backspace: 8,                                                    // 3334
      delimiter: 188, // comma                                         // 3335
      deleteKey: 46,                                                   // 3336
      enter: 13,                                                       // 3337
      escape: 27,                                                      // 3338
      pageUp: 33,                                                      // 3339
      pageDown: 34,                                                    // 3340
      leftArrow: 37,                                                   // 3341
      upArrow: 38,                                                     // 3342
      rightArrow: 39,                                                  // 3343
      downArrow: 40                                                    // 3344
    },                                                                 //
                                                                       //
    selector: {                                                        // 3347
      addition: '.addition',                                           // 3348
      dropdown: '.ui.dropdown',                                        // 3349
      icon: '> .dropdown.icon',                                        // 3350
      input: '> input[type="hidden"], > select',                       // 3351
      item: '.item',                                                   // 3352
      label: '> .label',                                               // 3353
      remove: '> .label > .delete.icon',                               // 3354
      siblingLabel: '.label',                                          // 3355
      menu: '.menu',                                                   // 3356
      message: '.message',                                             // 3357
      menuIcon: '.dropdown.icon',                                      // 3358
      search: 'input.search, .menu > .search > input',                 // 3359
      text: '> .text:not(.icon)',                                      // 3360
      unselectable: '.disabled, .filtered'                             // 3361
    },                                                                 //
                                                                       //
    className: {                                                       // 3364
      active: 'active',                                                // 3365
      addition: 'addition',                                            // 3366
      animating: 'animating',                                          // 3367
      disabled: 'disabled',                                            // 3368
      dropdown: 'ui dropdown',                                         // 3369
      filtered: 'filtered',                                            // 3370
      hidden: 'hidden transition',                                     // 3371
      item: 'item',                                                    // 3372
      label: 'ui label',                                               // 3373
      loading: 'loading',                                              // 3374
      menu: 'menu',                                                    // 3375
      message: 'message',                                              // 3376
      multiple: 'multiple',                                            // 3377
      placeholder: 'default',                                          // 3378
      search: 'search',                                                // 3379
      selected: 'selected',                                            // 3380
      selection: 'selection',                                          // 3381
      upward: 'upward',                                                // 3382
      visible: 'visible'                                               // 3383
    }                                                                  //
                                                                       //
  };                                                                   //
                                                                       //
  /* Templates */                                                      //
  $.fn.dropdown.settings.templates = {                                 // 3389
                                                                       //
    // generates dropdown from select values                           //
    dropdown: function (select) {                                      // 3392
      var placeholder = select.placeholder || false,                   // 3393
          values = select.values || {},                                //
          html = '';                                                   //
      html += '<i class="dropdown icon"></i>';                         // 3398
      if (select.placeholder) {                                        // 3399
        html += '<div class="default text">' + placeholder + '</div>';
      } else {                                                         //
        html += '<div class="text"></div>';                            // 3403
      }                                                                //
      html += '<div class="menu">';                                    // 3405
      $.each(select.values, function (index, option) {                 // 3406
        html += option.disabled ? '<div class="disabled item" data-value="' + option.value + '">' + option.name + '</div>' : '<div class="item" data-value="' + option.value + '">' + option.name + '</div>';
      });                                                              //
      html += '</div>';                                                // 3412
      return html;                                                     // 3413
    },                                                                 //
                                                                       //
    // generates just menu from select                                 //
    menu: function (response, fields) {                                // 3417
      var values = response[fields.values] || {},                      // 3418
          html = '';                                                   //
      $.each(values, function (index, option) {                        // 3422
        html += '<div class="item" data-value="' + option[fields.value] + '">' + option[fields.name] + '</div>';
      });                                                              //
      return html;                                                     // 3425
    },                                                                 //
                                                                       //
    // generates label for multiselect                                 //
    label: function (value, text) {                                    // 3429
      return text + '<i class="delete icon"></i>';                     // 3430
    },                                                                 //
                                                                       //
    // generates messages like "No results"                            //
    message: function (message) {                                      // 3435
      return message;                                                  // 3436
    },                                                                 //
                                                                       //
    // generates user addition to selection menu                       //
    addition: function (choice) {                                      // 3440
      return choice;                                                   // 3441
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
