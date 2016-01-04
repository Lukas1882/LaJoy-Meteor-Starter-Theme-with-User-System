(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/search.js                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Search                                              //
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
  $.fn.search = function (parameters) {                                // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
    $(this).each(function () {                                         // 33
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.search.settings, parameters) : $.extend({}, $.fn.search.settings),
          className = settings.className,                              //
          metadata = settings.metadata,                                //
          regExp = settings.regExp,                                    //
          fields = settings.fields,                                    //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          namespace = settings.namespace,                              //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = namespace + '-module',                     //
          $module = $(this),                                           //
          $prompt = $module.find(selector.prompt),                     //
          $searchButton = $module.find(selector.searchButton),         //
          $results = $module.find(selector.results),                   //
          $result = $module.find(selector.result),                     //
          $category = $module.find(selector.category),                 //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 64
                                                                       //
        initialize: function () {                                      // 66
          module.verbose('Initializing module');                       // 67
          module.determine.searchFields();                             // 68
          module.bind.events();                                        // 69
          module.set.type();                                           // 70
          module.create.results();                                     // 71
          module.instantiate();                                        // 72
        },                                                             //
        instantiate: function () {                                     // 74
          module.verbose('Storing instance of module', module);        // 75
          instance = module;                                           // 76
          $module.data(moduleNamespace, module);                       // 77
        },                                                             //
        destroy: function () {                                         // 81
          module.verbose('Destroying instance');                       // 82
          $module.off(eventNamespace).removeData(moduleNamespace);     // 83
        },                                                             //
                                                                       //
        bind: {                                                        // 89
          events: function () {                                        // 90
            module.verbose('Binding events to search');                // 91
            if (settings.automatic) {                                  // 92
              $module.on(module.get.inputEvent() + eventNamespace, selector.prompt, module.event.input);
              $prompt.attr('autocomplete', 'off');                     // 96
            }                                                          //
            $module                                                    // 100
            // prompt                                                  //
            .on('focus' + eventNamespace, selector.prompt, module.event.focus).on('blur' + eventNamespace, selector.prompt, module.event.blur).on('keydown' + eventNamespace, selector.prompt, module.handleKeyboard)
            // search button                                           //
            .on('click' + eventNamespace, selector.searchButton, module.query)
            // results                                                 //
            .on('mousedown' + eventNamespace, selector.results, module.event.result.mousedown).on('mouseup' + eventNamespace, selector.results, module.event.result.mouseup).on('click' + eventNamespace, selector.result, module.event.result.click);
          }                                                            //
        },                                                             //
                                                                       //
        determine: {                                                   // 115
          searchFields: function () {                                  // 116
            // this makes sure $.extend does not add specified search fields to default fields
            // this is the only setting which should not extend defaults
            if (parameters && parameters.searchFields !== undefined) {
              settings.searchFields = parameters.searchFields;         // 120
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 125
          input: function () {                                         // 126
            clearTimeout(module.timer);                                // 127
            module.timer = setTimeout(module.query, settings.searchDelay);
          },                                                           //
          focus: function () {                                         // 130
            module.set.focus();                                        // 131
            if (module.has.minimumCharacters()) {                      // 132
              module.query();                                          // 133
              if (module.can.show()) {                                 // 134
                module.showResults();                                  // 135
              }                                                        //
            }                                                          //
          },                                                           //
          blur: function (event) {                                     // 139
            var pageLostFocus = document.activeElement === this,       // 140
                callback = function () {                               //
              module.cancel.query();                                   // 143
              module.remove.focus();                                   // 144
              module.timer = setTimeout(module.hideResults, settings.hideDelay);
            };                                                         //
            if (pageLostFocus) {                                       // 148
              return;                                                  // 149
            }                                                          //
            if (module.resultsClicked) {                               // 151
              module.debug('Determining if user action caused search to close');
              $module.one('click', selector.results, function (event) {
                if (!module.is.animating() && !module.is.hidden()) {   // 155
                  callback();                                          // 156
                }                                                      //
              });                                                      //
            } else {                                                   //
              module.debug('Input blurred without user action, closing results');
              callback();                                              // 163
            }                                                          //
          },                                                           //
          result: {                                                    // 166
            mousedown: function () {                                   // 167
              module.resultsClicked = true;                            // 168
            },                                                         //
            mouseup: function () {                                     // 170
              module.resultsClicked = false;                           // 171
            },                                                         //
            click: function (event) {                                  // 173
              module.debug('Search result selected');                  // 174
              var $result = $(this),                                   // 175
                  $title = $result.find(selector.title).eq(0),         //
                  $link = $result.find('a[href]').eq(0),               //
                  href = $link.attr('href') || false,                  //
                  target = $link.attr('target') || false,              //
                  title = $title.html(),                               //
                                                                       //
              // title is used for result lookup                       //
              value = $title.length > 0 ? $title.text() : false,       // 183
                  results = module.get.results(),                      //
                  result = $result.data(metadata.result) || module.get.result(value, results),
                  returnedValue;                                       //
              if ($.isFunction(settings.onSelect)) {                   // 190
                if (settings.onSelect.call(element, result, results) === false) {
                  module.debug('Custom onSelect callback cancelled default select action');
                  return;                                              // 193
                }                                                      //
              }                                                        //
              module.hideResults();                                    // 196
              if (value) {                                             // 197
                module.set.value(value);                               // 198
              }                                                        //
              if (href) {                                              // 200
                module.verbose('Opening search link found in result', $link);
                if (target == '_blank' || event.ctrlKey) {             // 202
                  window.open(href);                                   // 203
                } else {                                               //
                  window.location.href = href;                         // 206
                }                                                      //
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
        handleKeyboard: function (event) {                             // 212
          var                                                          // 213
          // force selector refresh                                    //
          $result = $module.find(selector.result),                     // 215
              $category = $module.find(selector.category),             //
              currentIndex = $result.index($result.filter('.' + className.active)),
              resultSize = $result.length,                             //
              keyCode = event.which,                                   //
              keys = {                                                 //
            backspace: 8,                                              // 222
            enter: 13,                                                 // 223
            escape: 27,                                                // 224
            upArrow: 38,                                               // 225
            downArrow: 40                                              // 226
          },                                                           //
              newIndex;                                                //
          // search shortcuts                                          //
          if (keyCode == keys.escape) {                                // 231
            module.verbose('Escape key pressed, blurring search field');
            module.trigger.blur();                                     // 233
          }                                                            //
          if (module.is.visible()) {                                   // 235
            if (keyCode == keys.enter) {                               // 236
              module.verbose('Enter key pressed, selecting active result');
              if ($result.filter('.' + className.active).length > 0) {
                module.event.result.click.call($result.filter('.' + className.active), event);
                event.preventDefault();                                // 240
                return false;                                          // 241
              }                                                        //
            } else if (keyCode == keys.upArrow) {                      //
              module.verbose('Up key pressed, changing active result');
              newIndex = currentIndex - 1 < 0 ? currentIndex : currentIndex - 1;
              $category.removeClass(className.active);                 // 250
              $result.removeClass(className.active).eq(newIndex).addClass(className.active).closest($category).addClass(className.active);
              event.preventDefault();                                  // 260
            } else if (keyCode == keys.downArrow) {                    //
              module.verbose('Down key pressed, changing active result');
              newIndex = currentIndex + 1 >= resultSize ? currentIndex : currentIndex + 1;
              $category.removeClass(className.active);                 // 268
              $result.removeClass(className.active).eq(newIndex).addClass(className.active).closest($category).addClass(className.active);
              event.preventDefault();                                  // 278
            }                                                          //
          } else {                                                     //
            // query shortcuts                                         //
            if (keyCode == keys.enter) {                               // 283
              module.verbose('Enter key pressed, executing query');    // 284
              module.query();                                          // 285
              module.set.buttonPressed();                              // 286
              $prompt.one('keyup', module.remove.buttonFocus);         // 287
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        setup: {                                                       // 292
          api: function () {                                           // 293
            var apiSettings = {                                        // 294
              debug: settings.debug,                                   // 296
              on: false,                                               // 297
              cache: 'local',                                          // 298
              action: 'search',                                        // 299
              onError: module.error                                    // 300
            },                                                         //
                searchHTML;                                            //
            module.verbose('First request, initializing API');         // 304
            $module.api(apiSettings);                                  // 305
          }                                                            //
        },                                                             //
                                                                       //
        can: {                                                         // 309
          useAPI: function () {                                        // 310
            return $.fn.api !== undefined;                             // 311
          },                                                           //
          show: function () {                                          // 313
            return module.is.focused() && !module.is.visible() && !module.is.empty();
          },                                                           //
          transition: function () {                                    // 316
            return settings.transition && $.fn.transition !== undefined && $module.transition('is supported');
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 321
          animating: function () {                                     // 322
            return $results.hasClass(className.animating);             // 323
          },                                                           //
          hidden: function () {                                        // 325
            return $results.hasClass(className.hidden);                // 326
          },                                                           //
          empty: function () {                                         // 328
            return $results.html() === '';                             // 329
          },                                                           //
          visible: function () {                                       // 331
            return $results.filter(':visible').length > 0;             // 332
          },                                                           //
          focused: function () {                                       // 334
            return $prompt.filter(':focus').length > 0;                // 335
          }                                                            //
        },                                                             //
                                                                       //
        trigger: {                                                     // 339
          blur: function () {                                          // 340
            var events = document.createEvent('HTMLEvents'),           // 341
                promptElement = $prompt[0];                            //
            if (promptElement) {                                       // 345
              module.verbose('Triggering native blur event');          // 346
              events.initEvent('blur', false, false);                  // 347
              promptElement.dispatchEvent(events);                     // 348
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 353
          inputEvent: function () {                                    // 354
            var prompt = $prompt[0],                                   // 355
                inputEvent = prompt !== undefined && prompt.oninput !== undefined ? 'input' : prompt !== undefined && prompt.onpropertychange !== undefined ? 'propertychange' : 'keyup';
            return inputEvent;                                         // 363
          },                                                           //
          value: function () {                                         // 365
            return $prompt.val();                                      // 366
          },                                                           //
          results: function () {                                       // 368
            var results = $module.data(metadata.results);              // 369
            return results;                                            // 372
          },                                                           //
          result: function (value, results) {                          // 374
            var lookupFields = ['title', 'id'],                        // 375
                result = false;                                        //
            value = value !== undefined ? value : module.get.value();  // 379
            results = results !== undefined ? results : module.get.results();
            if (settings.type === 'category') {                        // 387
              module.debug('Finding result that matches', value);      // 388
              $.each(results, function (index, category) {             // 389
                if ($.isArray(category.results)) {                     // 390
                  result = module.search.object(value, category.results, lookupFields)[0];
                  // don't continue searching if a result is found     //
                  if (result) {                                        // 393
                    return false;                                      // 394
                  }                                                    //
                }                                                      //
              });                                                      //
            } else {                                                   //
              module.debug('Finding result in results object', value);
              result = module.search.object(value, results, lookupFields)[0];
            }                                                          //
            return result || false;                                    // 403
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 407
          focus: function () {                                         // 408
            $module.addClass(className.focus);                         // 409
          },                                                           //
          loading: function () {                                       // 411
            $module.addClass(className.loading);                       // 412
          },                                                           //
          value: function (value) {                                    // 414
            module.verbose('Setting search input value', value);       // 415
            $prompt.val(value);                                        // 416
          },                                                           //
          type: function (type) {                                      // 420
            type = type || settings.type;                              // 421
            if (settings.type == 'category') {                         // 422
              $module.addClass(settings.type);                         // 423
            }                                                          //
          },                                                           //
          buttonPressed: function () {                                 // 426
            $searchButton.addClass(className.pressed);                 // 427
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 431
          loading: function () {                                       // 432
            $module.removeClass(className.loading);                    // 433
          },                                                           //
          focus: function () {                                         // 435
            $module.removeClass(className.focus);                      // 436
          },                                                           //
          buttonPressed: function () {                                 // 438
            $searchButton.removeClass(className.pressed);              // 439
          }                                                            //
        },                                                             //
                                                                       //
        query: function () {                                           // 443
          var searchTerm = module.get.value(),                         // 444
              cache = module.read.cache(searchTerm);                   //
          if (module.has.minimumCharacters()) {                        // 448
            if (cache) {                                               // 449
              module.debug('Reading result from cache', searchTerm);   // 450
              module.save.results(cache.results);                      // 451
              module.addResults(cache.html);                           // 452
              module.inject.id(cache.results);                         // 453
            } else {                                                   //
              module.debug('Querying for', searchTerm);                // 456
              if ($.isPlainObject(settings.source) || $.isArray(settings.source)) {
                module.search.local(searchTerm);                       // 458
              } else if (module.can.useAPI()) {                        //
                module.search.remote(searchTerm);                      // 461
              } else {                                                 //
                module.error(error.source);                            // 464
              }                                                        //
            }                                                          //
            settings.onSearchQuery.call(element, searchTerm);          // 467
          } else {                                                     //
            module.hideResults();                                      // 470
          }                                                            //
        },                                                             //
                                                                       //
        search: {                                                      // 474
          local: function (searchTerm) {                               // 475
            var results = module.search.object(searchTerm, settings.content),
                searchHTML;                                            //
            module.set.loading();                                      // 480
            module.save.results(results);                              // 481
            module.debug('Returned local search results', results);    // 482
                                                                       //
            searchHTML = module.generateResults({                      // 484
              results: results                                         // 485
            });                                                        //
            module.remove.loading();                                   // 487
            module.addResults(searchHTML);                             // 488
            module.inject.id(results);                                 // 489
            module.write.cache(searchTerm, {                           // 490
              html: searchHTML,                                        // 491
              results: results                                         // 492
            });                                                        //
          },                                                           //
          remote: function (searchTerm) {                              // 495
            var apiSettings = {                                        // 496
              onSuccess: function (response) {                         // 498
                module.parse.response.call(element, response, searchTerm);
              },                                                       //
              onFailure: function () {                                 // 501
                module.displayMessage(error.serverError);              // 502
              },                                                       //
              urlData: {                                               // 504
                query: searchTerm                                      // 505
              }                                                        //
            };                                                         //
            if (!$module.api('get request')) {                         // 509
              module.setup.api();                                      // 510
            }                                                          //
            $.extend(true, apiSettings, settings.apiSettings);         // 512
            module.debug('Executing search', apiSettings);             // 513
            module.cancel.query();                                     // 514
            $module.api('setting', apiSettings).api('query');          // 515
          },                                                           //
          object: function (searchTerm, source, searchFields) {        // 520
            var results = [],                                          // 521
                fuzzyResults = [],                                     //
                searchExp = searchTerm.toString().replace(regExp.escape, '\\$&'),
                matchRegExp = new RegExp(regExp.beginsWith + searchExp, 'i'),
                                                                       //
            // avoid duplicates when pushing results                   //
            addResult = function (array, result) {                     // 528
              var notResult = $.inArray(result, results) == -1,        // 529
                  notFuzzyResult = $.inArray(result, fuzzyResults) == -1;
              if (notResult && notFuzzyResult) {                       // 533
                array.push(result);                                    // 534
              }                                                        //
            };                                                         //
            source = source || settings.source;                        // 538
            searchFields = searchFields !== undefined ? searchFields : settings.searchFields;
                                                                       //
            // search fields should be array to loop correctly         //
            if (!$.isArray(searchFields)) {                            // 545
              searchFields = [searchFields];                           // 546
            }                                                          //
                                                                       //
            // exit conditions if no source                            //
            if (source === undefined || source === false) {            // 550
              module.error(error.source);                              // 551
              return [];                                               // 552
            }                                                          //
                                                                       //
            // iterate through search fields looking for matches       //
            $.each(searchFields, function (index, field) {             // 556
              $.each(source, function (label, content) {               // 557
                var fieldExists = typeof content[field] == 'string';   // 558
                if (fieldExists) {                                     // 561
                  if (content[field].search(matchRegExp) !== -1) {     // 562
                    // content starts with value (first in results)    //
                    addResult(results, content);                       // 564
                  } else if (settings.searchFullText && module.fuzzySearch(searchTerm, content[field])) {
                    // content fuzzy matches (last in results)         //
                    addResult(fuzzyResults, content);                  // 568
                  }                                                    //
                }                                                      //
              });                                                      //
            });                                                        //
            return $.merge(results, fuzzyResults);                     // 573
          }                                                            //
        },                                                             //
                                                                       //
        fuzzySearch: function (query, term) {                          // 577
          var termLength = term.length,                                // 578
              queryLength = query.length;                              //
          if (typeof query !== 'string') {                             // 582
            return false;                                              // 583
          }                                                            //
          query = query.toLowerCase();                                 // 585
          term = term.toLowerCase();                                   // 586
          if (queryLength > termLength) {                              // 587
            return false;                                              // 588
          }                                                            //
          if (queryLength === termLength) {                            // 590
            return query === term;                                     // 591
          }                                                            //
          search: for (var characterIndex = 0, nextCharacterIndex = 0; characterIndex < queryLength; characterIndex++) {
            var queryCharacter = query.charCodeAt(characterIndex);     // 594
            while (nextCharacterIndex < termLength) {                  // 597
              if (term.charCodeAt(nextCharacterIndex++) === queryCharacter) {
                continue search;                                       // 599
              }                                                        //
            }                                                          //
            return false;                                              // 602
          }                                                            //
          return true;                                                 // 604
        },                                                             //
                                                                       //
        parse: {                                                       // 607
          response: function (response, searchTerm) {                  // 608
            var searchHTML = module.generateResults(response);         // 609
            module.verbose('Parsing server response', response);       // 612
            if (response !== undefined) {                              // 613
              if (searchTerm !== undefined && response[fields.results] !== undefined) {
                module.addResults(searchHTML);                         // 615
                module.inject.id(response[fields.results]);            // 616
                module.write.cache(searchTerm, {                       // 617
                  html: searchHTML,                                    // 618
                  results: response[fields.results]                    // 619
                });                                                    //
                module.save.results(response[fields.results]);         // 621
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        cancel: {                                                      // 627
          query: function () {                                         // 628
            if (module.can.useAPI()) {                                 // 629
              $module.api('abort');                                    // 630
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 635
          minimumCharacters: function () {                             // 636
            var searchTerm = module.get.value(),                       // 637
                numCharacters = searchTerm.length;                     //
            return numCharacters >= settings.minCharacters;            // 641
          }                                                            //
        },                                                             //
                                                                       //
        clear: {                                                       // 645
          cache: function (value) {                                    // 646
            var cache = $module.data(metadata.cache);                  // 647
            if (!value) {                                              // 650
              module.debug('Clearing cache', value);                   // 651
              $module.removeData(metadata.cache);                      // 652
            } else if (value && cache && cache[value]) {               //
              module.debug('Removing value from cache', value);        // 655
              delete cache[value];                                     // 656
              $module.data(metadata.cache, cache);                     // 657
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        read: {                                                        // 662
          cache: function (name) {                                     // 663
            var cache = $module.data(metadata.cache);                  // 664
            if (settings.cache) {                                      // 667
              module.verbose('Checking cache for generated html for query', name);
              return typeof cache == 'object' && cache[name] !== undefined ? cache[name] : false;
            }                                                          //
            return false;                                              // 674
          }                                                            //
        },                                                             //
                                                                       //
        create: {                                                      // 678
          id: function (resultIndex, categoryIndex) {                  // 679
            var resultID = resultIndex + 1,                            // 680
                // not zero indexed                                    //
            categoryID = categoryIndex + 1,                            // 682
                firstCharCode,                                         //
                letterID,                                              //
                id;                                                    //
            if (categoryIndex !== undefined) {                         // 687
              // start char code for "A"                               //
              letterID = String.fromCharCode(97 + categoryIndex);      // 689
              id = letterID + resultID;                                // 690
              module.verbose('Creating category result id', id);       // 691
            } else {                                                   //
              id = resultID;                                           // 694
              module.verbose('Creating result id', id);                // 695
            }                                                          //
            return id;                                                 // 697
          },                                                           //
          results: function () {                                       // 699
            if ($results.length === 0) {                               // 700
              $results = $('<div />').addClass(className.results).appendTo($module);
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        inject: {                                                      // 709
          result: function (result, resultIndex, categoryIndex) {      // 710
            module.verbose('Injecting result into results');           // 711
            var $selectedResult = categoryIndex !== undefined ? $results.children().eq(categoryIndex).children(selector.result).eq(resultIndex) : $results.children(selector.result).eq(resultIndex);
            module.verbose('Injecting results metadata', $selectedResult);
            $selectedResult.data(metadata.result, result);             // 721
          },                                                           //
          id: function (results) {                                     // 725
            module.debug('Injecting unique ids into results');         // 726
            var                                                        // 727
            // since results may be object, we must use counters       //
            categoryIndex = 0,                                         // 729
                resultIndex = 0;                                       //
            if (settings.type === 'category') {                        // 732
              // iterate through each category result                  //
              $.each(results, function (index, category) {             // 734
                resultIndex = 0;                                       // 735
                $.each(category.results, function (index, value) {     // 736
                  var result = category.results[index];                // 737
                  if (result.id === undefined) {                       // 740
                    result.id = module.create.id(resultIndex, categoryIndex);
                  }                                                    //
                  module.inject.result(result, resultIndex, categoryIndex);
                  resultIndex++;                                       // 744
                });                                                    //
                categoryIndex++;                                       // 746
              });                                                      //
            } else {                                                   //
              // top level                                             //
              $.each(results, function (index, value) {                // 751
                var result = results[index];                           // 752
                if (result.id === undefined) {                         // 755
                  result.id = module.create.id(resultIndex);           // 756
                }                                                      //
                module.inject.result(result, resultIndex);             // 758
                resultIndex++;                                         // 759
              });                                                      //
            }                                                          //
            return results;                                            // 762
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 766
          results: function (results) {                                // 767
            module.verbose('Saving current search results to metadata', results);
            $module.data(metadata.results, results);                   // 769
          }                                                            //
        },                                                             //
                                                                       //
        write: {                                                       // 773
          cache: function (name, value) {                              // 774
            var cache = $module.data(metadata.cache) !== undefined ? $module.data(metadata.cache) : {};
            if (settings.cache) {                                      // 780
              module.verbose('Writing generated html to cache', name, value);
              cache[name] = value;                                     // 782
              $module.data(metadata.cache, cache);                     // 783
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        addResults: function (html) {                                  // 790
          if ($.isFunction(settings.onResultsAdd)) {                   // 791
            if (settings.onResultsAdd.call($results, html) === false) {
              module.debug('onResultsAdd callback cancelled default action');
              return false;                                            // 794
            }                                                          //
          }                                                            //
          $results.html(html);                                         // 797
          if (module.can.show()) {                                     // 800
            module.showResults();                                      // 801
          }                                                            //
        },                                                             //
                                                                       //
        showResults: function () {                                     // 805
          if (!module.is.visible()) {                                  // 806
            if (module.can.transition()) {                             // 807
              module.debug('Showing results with css animations');     // 808
              $results.transition({                                    // 809
                animation: settings.transition + ' in',                // 811
                debug: settings.debug,                                 // 812
                verbose: settings.verbose,                             // 813
                duration: settings.duration,                           // 814
                queue: true                                            // 815
              });                                                      //
            } else {                                                   //
              module.debug('Showing results with javascript');         // 820
              $results.stop().fadeIn(settings.duration, settings.easing);
            }                                                          //
            settings.onResultsOpen.call($results);                     // 826
          }                                                            //
        },                                                             //
        hideResults: function () {                                     // 829
          if (module.is.visible()) {                                   // 830
            if (module.can.transition()) {                             // 831
              module.debug('Hiding results with css animations');      // 832
              $results.transition({                                    // 833
                animation: settings.transition + ' out',               // 835
                debug: settings.debug,                                 // 836
                verbose: settings.verbose,                             // 837
                duration: settings.duration,                           // 838
                queue: true                                            // 839
              });                                                      //
            } else {                                                   //
              module.debug('Hiding results with javascript');          // 844
              $results.stop().fadeOut(settings.duration, settings.easing);
            }                                                          //
            settings.onResultsClose.call($results);                    // 850
          }                                                            //
        },                                                             //
                                                                       //
        generateResults: function (response) {                         // 854
          module.debug('Generating html from response', response);     // 855
          var template = settings.templates[settings.type],            // 856
              isProperObject = $.isPlainObject(response[fields.results]) && !$.isEmptyObject(response[fields.results]),
              isProperArray = $.isArray(response[fields.results]) && response[fields.results].length > 0,
              html = '';                                               //
          if (isProperObject || isProperArray) {                       // 862
            if (settings.maxResults > 0) {                             // 863
              if (isProperObject) {                                    // 864
                if (settings.type == 'standard') {                     // 865
                  module.error(error.maxResults);                      // 866
                }                                                      //
              } else {                                                 //
                response[fields.results] = response[fields.results].slice(0, settings.maxResults);
              }                                                        //
            }                                                          //
            if ($.isFunction(template)) {                              // 873
              html = template(response, fields);                       // 874
            } else {                                                   //
              module.error(error.noTemplate, false);                   // 877
            }                                                          //
          } else {                                                     //
            html = module.displayMessage(error.noResults, 'empty');    // 881
          }                                                            //
          settings.onResults.call(element, response);                  // 883
          return html;                                                 // 884
        },                                                             //
                                                                       //
        displayMessage: function (text, type) {                        // 887
          type = type || 'standard';                                   // 888
          module.debug('Displaying message', text, type);              // 889
          module.addResults(settings.templates.message(text, type));   // 890
          return settings.templates.message(text, type);               // 891
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 894
          if ($.isPlainObject(name)) {                                 // 895
            $.extend(true, settings, name);                            // 896
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 899
          } else {                                                     //
            return settings[name];                                     // 902
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 905
          if ($.isPlainObject(name)) {                                 // 906
            $.extend(true, module, name);                              // 907
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 910
          } else {                                                     //
            return module[name];                                       // 913
          }                                                            //
        },                                                             //
        debug: function () {                                           // 916
          if (settings.debug) {                                        // 917
            if (settings.performance) {                                // 918
              module.performance.log(arguments);                       // 919
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 923
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 927
          if (settings.verbose && settings.debug) {                    // 928
            if (settings.performance) {                                // 929
              module.performance.log(arguments);                       // 930
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 934
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 938
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 940
        },                                                             //
        performance: {                                                 // 942
          log: function (message) {                                    // 943
            var currentTime, executionTime, previousTime;              // 944
            if (settings.performance) {                                // 949
              currentTime = new Date().getTime();                      // 950
              previousTime = time || currentTime;                      // 951
              executionTime = currentTime - previousTime;              // 952
              time = currentTime;                                      // 953
              performance.push({                                       // 954
                'Name': message[0],                                    // 955
                'Arguments': [].slice.call(message, 1) || '',          // 956
                'Element': element,                                    // 957
                'Execution Time': executionTime                        // 958
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 961
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 964
            var title = settings.name + ':',                           // 965
                totalTime = 0;                                         //
            time = false;                                              // 969
            clearTimeout(module.performance.timer);                    // 970
            $.each(performance, function (index, data) {               // 971
              totalTime += data['Execution Time'];                     // 972
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 974
            if (moduleSelector) {                                      // 975
              title += ' \'' + moduleSelector + '\'';                  // 976
            }                                                          //
            if ($allModules.length > 1) {                              // 978
              title += ' ' + '(' + $allModules.length + ')';           // 979
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 982
              if (console.table) {                                     // 983
                console.table(performance);                            // 984
              } else {                                                 //
                $.each(performance, function (index, data) {           // 987
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 991
            }                                                          //
            performance = [];                                          // 993
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 996
          var object = instance,                                       // 997
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 1003
          context = element || context;                                // 1004
          if (typeof query == 'string' && object !== undefined) {      // 1005
            query = query.split(/[\. ]/);                              // 1006
            maxDepth = query.length - 1;                               // 1007
            $.each(query, function (depth, value) {                    // 1008
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 1014
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 1017
                return false;                                          // 1018
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 1021
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 1024
                return false;                                          // 1025
              } else {                                                 //
                return false;                                          // 1028
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 1032
            response = found.apply(context, passedArguments);          // 1033
          } else if (found !== undefined) {                            //
            response = found;                                          // 1036
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 1038
            returnedValue.push(response);                              // 1039
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 1042
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 1045
          }                                                            //
          return found;                                                // 1047
        }                                                              //
      };                                                               //
      if (methodInvoked) {                                             // 1050
        if (instance === undefined) {                                  // 1051
          module.initialize();                                         // 1052
        }                                                              //
        module.invoke(query);                                          // 1054
      } else {                                                         //
        if (instance !== undefined) {                                  // 1057
          instance.invoke('destroy');                                  // 1058
        }                                                              //
        module.initialize();                                           // 1060
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 1066
  };                                                                   //
                                                                       //
  $.fn.search.settings = {                                             // 1072
                                                                       //
    name: 'Search',                                                    // 1074
    namespace: 'search',                                               // 1075
                                                                       //
    debug: false,                                                      // 1077
    verbose: false,                                                    // 1078
    performance: true,                                                 // 1079
                                                                       //
    type: 'standard',                                                  // 1081
    // template to use (specified in settings.templates)               //
                                                                       //
    minCharacters: 1,                                                  // 1084
    // minimum characters required to search                           //
                                                                       //
    apiSettings: false,                                                // 1087
    // API config                                                      //
                                                                       //
    source: false,                                                     // 1090
    // object to search                                                //
                                                                       //
    searchFields: ['title', 'description'],                            // 1093
    // fields to search                                                //
                                                                       //
    displayField: '',                                                  // 1099
    // field to display in standard results template                   //
                                                                       //
    searchFullText: true,                                              // 1102
    // whether to include fuzzy results in local search                //
                                                                       //
    automatic: true,                                                   // 1105
    // whether to add events to prompt automatically                   //
                                                                       //
    hideDelay: 0,                                                      // 1108
    // delay before hiding menu after blur                             //
                                                                       //
    searchDelay: 200,                                                  // 1111
    // delay before searching                                          //
                                                                       //
    maxResults: 7,                                                     // 1114
    // maximum results returned from local                             //
                                                                       //
    cache: true,                                                       // 1117
    // whether to store lookups in local cache                         //
                                                                       //
    // transition settings                                             //
    transition: 'scale',                                               // 1121
    duration: 200,                                                     // 1122
    easing: 'easeOutExpo',                                             // 1123
                                                                       //
    // callbacks                                                       //
    onSelect: false,                                                   // 1126
    onResultsAdd: false,                                               // 1127
                                                                       //
    onSearchQuery: function (query) {},                                // 1129
    onResults: function (response) {},                                 // 1130
                                                                       //
    onResultsOpen: function () {},                                     // 1132
    onResultsClose: function () {},                                    // 1133
                                                                       //
    className: {                                                       // 1135
      animating: 'animating',                                          // 1136
      active: 'active',                                                // 1137
      empty: 'empty',                                                  // 1138
      focus: 'focus',                                                  // 1139
      hidden: 'hidden',                                                // 1140
      loading: 'loading',                                              // 1141
      results: 'results',                                              // 1142
      pressed: 'down'                                                  // 1143
    },                                                                 //
                                                                       //
    error: {                                                           // 1146
      source: 'Cannot search. No source used, and Semantic API module was not included',
      noResults: 'Your search returned no results',                    // 1148
      logging: 'Error in debug logging, exiting.',                     // 1149
      noEndpoint: 'No search endpoint was specified',                  // 1150
      noTemplate: 'A valid template name was not specified.',          // 1151
      serverError: 'There was an issue querying the server.',          // 1152
      maxResults: 'Results must be an array to use maxResults setting',
      method: 'The method you called is not defined.'                  // 1154
    },                                                                 //
                                                                       //
    metadata: {                                                        // 1157
      cache: 'cache',                                                  // 1158
      results: 'results',                                              // 1159
      result: 'result'                                                 // 1160
    },                                                                 //
                                                                       //
    regExp: {                                                          // 1163
      escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,                   // 1164
      beginsWith: '(?:\s|^)'                                           // 1165
    },                                                                 //
                                                                       //
    // maps api response attributes to internal representation         //
    fields: {                                                          // 1169
      categories: 'results', // array of categories (category view)    // 1170
      categoryName: 'name', // name of category (category view)        // 1171
      categoryResults: 'results', // array of results (category view)  // 1172
      description: 'description', // result description                // 1173
      image: 'image', // result image                                  // 1174
      price: 'price', // result price                                  // 1175
      results: 'results', // array of results (standard)               // 1176
      title: 'title', // result title                                  // 1177
      url: 'url', // result url                                        // 1178
      action: 'action', // "view more" object name                     // 1179
      actionText: 'text', // "view more" text                          // 1180
      actionURL: 'url' // "view more" url                              // 1181
    },                                                                 //
                                                                       //
    selector: {                                                        // 1184
      prompt: '.prompt',                                               // 1185
      searchButton: '.search.button',                                  // 1186
      results: '.results',                                             // 1187
      category: '.category',                                           // 1188
      result: '.result',                                               // 1189
      title: '.title, .name'                                           // 1190
    },                                                                 //
                                                                       //
    templates: {                                                       // 1193
      escape: function (string) {                                      // 1194
        var badChars = /[&<>"'`]/g,                                    // 1195
            shouldEscape = /[&<>"'`]/,                                 //
            escape = {                                                 //
          "&": "&amp;",                                                // 1199
          "<": "&lt;",                                                 // 1200
          ">": "&gt;",                                                 // 1201
          '"': "&quot;",                                               // 1202
          "'": "&#x27;",                                               // 1203
          "`": "&#x60;"                                                // 1204
        },                                                             //
            escapedChar = function (chr) {                             //
          return escape[chr];                                          // 1207
        };                                                             //
        if (shouldEscape.test(string)) {                               // 1210
          return string.replace(badChars, escapedChar);                // 1211
        }                                                              //
        return string;                                                 // 1213
      },                                                               //
      message: function (message, type) {                              // 1215
        var html = '';                                                 // 1216
        if (message !== undefined && type !== undefined) {             // 1219
          html += '' + '<div class="message ' + type + '">';           // 1220
          // message type                                              //
          if (type == 'empty') {                                       // 1224
            html += '' + '<div class="header">No Results</div class="header">' + '<div class="description">' + message + '</div class="description">';
          } else {                                                     //
            html += ' <div class="description">' + message + '</div>';
          }                                                            //
          html += '</div>';                                            // 1233
        }                                                              //
        return html;                                                   // 1235
      },                                                               //
      category: function (response, fields) {                          // 1237
        var html = '',                                                 // 1238
            escape = $.fn.search.settings.templates.escape;            //
        if (response[fields.categoryResults] !== undefined) {          // 1242
                                                                       //
          // each category                                             //
          $.each(response[fields.categoryResults], function (index, category) {
            if (category[fields.results] !== undefined && category.results.length > 0) {
                                                                       //
              html += '<div class="category">';                        // 1248
                                                                       //
              if (category[fields.categoryName] !== undefined) {       // 1250
                html += '<div class="name">' + category[fields.categoryName] + '</div>';
              }                                                        //
                                                                       //
              // each item inside category                             //
              $.each(category.results, function (index, result) {      // 1255
                if (result[fields.url]) {                              // 1256
                  html += '<a class="result" href="' + result[fields.url] + '">';
                } else {                                               //
                  html += '<a class="result">';                        // 1260
                }                                                      //
                if (result[fields.image] !== undefined) {              // 1262
                  html += '' + '<div class="image">' + ' <img src="' + result[fields.image] + '">' + '</div>';
                }                                                      //
                html += '<div class="content">';                       // 1269
                if (result[fields.price] !== undefined) {              // 1270
                  html += '<div class="price">' + result[fields.price] + '</div>';
                }                                                      //
                if (result[fields.title] !== undefined) {              // 1273
                  html += '<div class="title">' + result[fields.title] + '</div>';
                }                                                      //
                if (result[fields.description] !== undefined) {        // 1276
                  html += '<div class="description">' + result[fields.description] + '</div>';
                }                                                      //
                html += '' + '</div>';                                 // 1279
                html += '</a>';                                        // 1282
              });                                                      //
              html += '' + '</div>';                                   // 1284
            }                                                          //
          });                                                          //
          if (response[fields.action]) {                               // 1289
            html += '' + '<a href="' + response[fields.action][fields.actionURL] + '" class="action">' + response[fields.action][fields.actionText] + '</a>';
          }                                                            //
          return html;                                                 // 1295
        }                                                              //
        return false;                                                  // 1297
      },                                                               //
      standard: function (response, fields) {                          // 1299
        var html = '';                                                 // 1300
        if (response[fields.results] !== undefined) {                  // 1303
                                                                       //
          // each result                                               //
          $.each(response[fields.results], function (index, result) {  // 1306
            if (result[fields.url]) {                                  // 1307
              html += '<a class="result" href="' + result[fields.url] + '">';
            } else {                                                   //
              html += '<a class="result">';                            // 1311
            }                                                          //
            if (result[fields.image] !== undefined) {                  // 1313
              html += '' + '<div class="image">' + ' <img src="' + result[fields.image] + '">' + '</div>';
            }                                                          //
            html += '<div class="content">';                           // 1320
            if (result[fields.price] !== undefined) {                  // 1321
              html += '<div class="price">' + result[fields.price] + '</div>';
            }                                                          //
            if (result[fields.title] !== undefined) {                  // 1324
              html += '<div class="title">' + result[fields.title] + '</div>';
            }                                                          //
            if (result[fields.description] !== undefined) {            // 1327
              html += '<div class="description">' + result[fields.description] + '</div>';
            }                                                          //
            html += '' + '</div>';                                     // 1330
            html += '</a>';                                            // 1333
          });                                                          //
                                                                       //
          if (response[fields.action]) {                               // 1336
            html += '' + '<a href="' + response[fields.action][fields.actionURL] + '" class="action">' + response[fields.action][fields.actionText] + '</a>';
          }                                                            //
          return html;                                                 // 1342
        }                                                              //
        return false;                                                  // 1344
      }                                                                //
    }                                                                  //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
