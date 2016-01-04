(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/tab.js                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Tab                                                 //
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
  $.fn.tab = function (parameters) {                                   // 20
                                                                       //
    var                                                                // 22
    // use window context if none specified                            //
    $allModules = $.isFunction(this) ? $(window) : $(this),            // 24
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        initializedHistory = false,                                    //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 40
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.tab.settings, parameters) : $.extend({}, $.fn.tab.settings),
          className = settings.className,                              //
          metadata = settings.metadata,                                //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          eventNamespace = '.' + settings.namespace,                   //
          moduleNamespace = 'module-' + settings.namespace,            //
          $module = $(this),                                           //
          $context,                                                    //
          $tabs,                                                       //
          cache = {},                                                  //
          firstLoad = true,                                            //
          recursionDepth = 0,                                          //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          activeTabPath,                                               //
          parameterArray,                                              //
          module,                                                      //
          historyEvent;                                                //
                                                                       //
      module = {                                                       // 74
                                                                       //
        initialize: function () {                                      // 76
          module.debug('Initializing tab menu item', $module);         // 77
          module.fix.callbacks();                                      // 78
          module.determineTabs();                                      // 79
                                                                       //
          module.debug('Determining tabs', settings.context, $tabs);   // 81
          // set up automatic routing                                  //
          if (settings.auto) {                                         // 83
            module.set.auto();                                         // 84
          }                                                            //
          module.bind.events();                                        // 86
                                                                       //
          if (settings.history && !initializedHistory) {               // 88
            module.initializeHistory();                                // 89
            initializedHistory = true;                                 // 90
          }                                                            //
                                                                       //
          module.instantiate();                                        // 93
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 96
          module.verbose('Storing instance of module', module);        // 97
          instance = module;                                           // 98
          $module.data(moduleNamespace, module);                       // 99
        },                                                             //
                                                                       //
        destroy: function () {                                         // 104
          module.debug('Destroying tabs', $module);                    // 105
          $module.removeData(moduleNamespace).off(eventNamespace);     // 106
        },                                                             //
                                                                       //
        bind: {                                                        // 112
          events: function () {                                        // 113
            // if using $.tab don't add events                         //
            if (!$.isWindow(element)) {                                // 115
              module.debug('Attaching tab activation events to element', $module);
              $module.on('click' + eventNamespace, module.event.click);
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        determineTabs: function () {                                   // 124
          var $reference;                                              // 125
                                                                       //
          // determine tab context                                     //
          if (settings.context === 'parent') {                         // 130
            if ($module.closest(selector.ui).length > 0) {             // 131
              $reference = $module.closest(selector.ui);               // 132
              module.verbose('Using closest UI element as parent', $reference);
            } else {                                                   //
              $reference = $module;                                    // 136
            }                                                          //
            $context = $reference.parent();                            // 138
            module.verbose('Determined parent element for creating context', $context);
          } else if (settings.context) {                               //
            $context = $(settings.context);                            // 142
            module.verbose('Using selector for tab context', settings.context, $context);
          } else {                                                     //
            $context = $('body');                                      // 146
          }                                                            //
          // find tabs                                                 //
          if (settings.childrenOnly) {                                 // 149
            $tabs = $context.children(selector.tabs);                  // 150
            module.debug('Searching tab context children for tabs', $context, $tabs);
          } else {                                                     //
            $tabs = $context.find(selector.tabs);                      // 154
            module.debug('Searching tab context for tabs', $context, $tabs);
          }                                                            //
        },                                                             //
                                                                       //
        fix: {                                                         // 159
          callbacks: function () {                                     // 160
            if ($.isPlainObject(parameters) && (parameters.onTabLoad || parameters.onTabInit)) {
              if (parameters.onTabLoad) {                              // 162
                parameters.onLoad = parameters.onTabLoad;              // 163
                delete parameters.onTabLoad;                           // 164
                module.error(error.legacyLoad, parameters.onLoad);     // 165
              }                                                        //
              if (parameters.onTabInit) {                              // 167
                parameters.onFirstLoad = parameters.onTabInit;         // 168
                delete parameters.onTabInit;                           // 169
                module.error(error.legacyInit, parameters.onFirstLoad);
              }                                                        //
              settings = $.extend(true, {}, $.fn.tab.settings, parameters);
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        initializeHistory: function () {                               // 177
          module.debug('Initializing page state');                     // 178
          if ($.address === undefined) {                               // 179
            module.error(error.state);                                 // 180
            return false;                                              // 181
          } else {                                                     //
            if (settings.historyType == 'state') {                     // 184
              module.debug('Using HTML5 to manage state');             // 185
              if (settings.path !== false) {                           // 186
                $.address.history(true).state(settings.path);          // 187
              } else {                                                 //
                module.error(error.path);                              // 193
                return false;                                          // 194
              }                                                        //
            }                                                          //
            $.address.bind('change', module.event.history.change);     // 197
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 203
          click: function (event) {                                    // 204
            var tabPath = $(this).data(metadata.tab);                  // 205
            if (tabPath !== undefined) {                               // 208
              if (settings.history) {                                  // 209
                module.verbose('Updating page state', event);          // 210
                $.address.value(tabPath);                              // 211
              } else {                                                 //
                module.verbose('Changing tab', event);                 // 214
                module.changeTab(tabPath);                             // 215
              }                                                        //
              event.preventDefault();                                  // 217
            } else {                                                   //
              module.debug('No tab specified');                        // 220
            }                                                          //
          },                                                           //
          history: {                                                   // 223
            change: function (event) {                                 // 224
              var tabPath = event.pathNames.join('/') || module.get.initialPath(),
                  pageTitle = settings.templates.determineTitle(tabPath) || false;
              module.performance.display();                            // 229
              module.debug('History change event', tabPath, event);    // 230
              historyEvent = event;                                    // 231
              if (tabPath !== undefined) {                             // 232
                module.changeTab(tabPath);                             // 233
              }                                                        //
              if (pageTitle) {                                         // 235
                $.address.title(pageTitle);                            // 236
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        refresh: function () {                                         // 242
          if (activeTabPath) {                                         // 243
            module.debug('Refreshing tab', activeTabPath);             // 244
            module.changeTab(activeTabPath);                           // 245
          }                                                            //
        },                                                             //
                                                                       //
        cache: {                                                       // 249
                                                                       //
          read: function (cacheKey) {                                  // 251
            return cacheKey !== undefined ? cache[cacheKey] : false;   // 252
          },                                                           //
          add: function (cacheKey, content) {                          // 257
            cacheKey = cacheKey || activeTabPath;                      // 258
            module.debug('Adding cached content for', cacheKey);       // 259
            cache[cacheKey] = content;                                 // 260
          },                                                           //
          remove: function (cacheKey) {                                // 262
            cacheKey = cacheKey || activeTabPath;                      // 263
            module.debug('Removing cached content for', cacheKey);     // 264
            delete cache[cacheKey];                                    // 265
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 269
          auto: function () {                                          // 270
            var url = typeof settings.path == 'string' ? settings.path.replace(/\/$/, '') + '/{$tab}' : '/{$tab}';
            module.verbose('Setting up automatic tab retrieval from server', url);
            if ($.isPlainObject(settings.apiSettings)) {               // 277
              settings.apiSettings.url = url;                          // 278
            } else {                                                   //
              settings.apiSettings = {                                 // 281
                url: url                                               // 282
              };                                                       //
            }                                                          //
          },                                                           //
          loading: function (tabPath) {                                // 286
            var $tab = module.get.tabElement(tabPath),                 // 287
                isLoading = $tab.hasClass(className.loading);          //
            if (!isLoading) {                                          // 291
              module.verbose('Setting loading state for', $tab);       // 292
              $tab.addClass(className.loading).siblings($tabs).removeClass(className.active + ' ' + className.loading);
              if ($tab.length > 0) {                                   // 298
                settings.onRequest.call($tab[0], tabPath);             // 299
              }                                                        //
            }                                                          //
          },                                                           //
          state: function (state) {                                    // 303
            $.address.value(state);                                    // 304
          }                                                            //
        },                                                             //
                                                                       //
        changeTab: function (tabPath) {                                // 308
          var pushStateAvailable = window.history && window.history.pushState,
              shouldIgnoreLoad = pushStateAvailable && settings.ignoreFirstLoad && firstLoad,
              remoteContent = settings.auto || $.isPlainObject(settings.apiSettings),
                                                                       //
          // only add default path if not remote content               //
          pathArray = remoteContent && !shouldIgnoreLoad ? module.utilities.pathToArray(tabPath) : module.get.defaultPathArray(tabPath);
          tabPath = module.utilities.arrayToPath(pathArray);           // 318
          $.each(pathArray, function (index, tab) {                    // 319
            var currentPathArray = pathArray.slice(0, index + 1),      // 320
                currentPath = module.utilities.arrayToPath(currentPathArray),
                isTab = module.is.tab(currentPath),                    //
                isLastIndex = index + 1 == pathArray.length,           //
                $tab = module.get.tabElement(currentPath),             //
                $anchor,                                               //
                nextPathArray,                                         //
                nextPath,                                              //
                isLastTab;                                             //
            module.verbose('Looking for tab', tab);                    // 333
            if (isTab) {                                               // 334
              module.verbose('Tab was found', tab);                    // 335
              // scope up                                              //
              activeTabPath = currentPath;                             // 337
              parameterArray = module.utilities.filterArray(pathArray, currentPathArray);
                                                                       //
              if (isLastIndex) {                                       // 340
                isLastTab = true;                                      // 341
              } else {                                                 //
                nextPathArray = pathArray.slice(0, index + 2);         // 344
                nextPath = module.utilities.arrayToPath(nextPathArray);
                isLastTab = !module.is.tab(nextPath);                  // 346
                if (isLastTab) {                                       // 347
                  module.verbose('Tab parameters found', nextPathArray);
                }                                                      //
              }                                                        //
              if (isLastTab && remoteContent) {                        // 351
                if (!shouldIgnoreLoad) {                               // 352
                  module.activate.navigation(currentPath);             // 353
                  module.fetch.content(currentPath, tabPath);          // 354
                } else {                                               //
                  module.debug('Ignoring remote content on first tab load', currentPath);
                  firstLoad = false;                                   // 358
                  module.cache.add(tabPath, $tab.html());              // 359
                  module.activate.all(currentPath);                    // 360
                  settings.onFirstLoad.call($tab[0], currentPath, parameterArray, historyEvent);
                  settings.onLoad.call($tab[0], currentPath, parameterArray, historyEvent);
                }                                                      //
                return false;                                          // 364
              } else {                                                 //
                module.debug('Opened local tab', currentPath);         // 367
                module.activate.all(currentPath);                      // 368
                if (!module.cache.read(currentPath)) {                 // 369
                  module.cache.add(currentPath, true);                 // 370
                  module.debug('First time tab loaded calling tab init');
                  settings.onFirstLoad.call($tab[0], currentPath, parameterArray, historyEvent);
                }                                                      //
                settings.onLoad.call($tab[0], currentPath, parameterArray, historyEvent);
              }                                                        //
            } else if (tabPath.search('/') == -1 && tabPath !== '') {  //
              // look for in page anchor                               //
              $anchor = $('#' + tabPath + ', a[name="' + tabPath + '"]');
              currentPath = $anchor.closest('[data-tab]').data(metadata.tab);
              $tab = module.get.tabElement(currentPath);               // 382
              // if anchor exists use parent tab                       //
              if ($anchor && $anchor.length > 0 && currentPath) {      // 384
                module.debug('Anchor link used, opening parent tab', $tab, $anchor);
                if (!$tab.hasClass(className.active)) {                // 386
                  setTimeout(function () {                             // 387
                    module.scrollTo($anchor);                          // 388
                  }, 0);                                               //
                }                                                      //
                module.activate.all(currentPath);                      // 391
                if (!module.cache.read(currentPath)) {                 // 392
                  module.cache.add(currentPath, true);                 // 393
                  module.debug('First time tab loaded calling tab init');
                  settings.onFirstLoad.call($tab[0], currentPath, parameterArray, historyEvent);
                }                                                      //
                settings.onLoad.call($tab[0], currentPath, parameterArray, historyEvent);
                return false;                                          // 398
              }                                                        //
            } else {                                                   //
              module.error(error.missingTab, $module, $context, currentPath);
              return false;                                            // 403
            }                                                          //
          });                                                          //
        },                                                             //
                                                                       //
        scrollTo: function ($element) {                                // 408
          var scrollOffset = $element && $element.length > 0 ? $element.offset().top : false;
          if (scrollOffset !== false) {                                // 414
            module.debug('Forcing scroll to an in-page link in a hidden tab', scrollOffset, $element);
            $(document).scrollTop(scrollOffset);                       // 416
          }                                                            //
        },                                                             //
                                                                       //
        update: {                                                      // 420
          content: function (tabPath, html, evaluateScripts) {         // 421
            var $tab = module.get.tabElement(tabPath),                 // 422
                tab = $tab[0];                                         //
            evaluateScripts = evaluateScripts !== undefined ? evaluateScripts : settings.evaluateScripts;
            if (evaluateScripts) {                                     // 430
              module.debug('Updating HTML and evaluating inline scripts', tabPath, html);
              $tab.html(html);                                         // 432
            } else {                                                   //
              module.debug('Updating HTML', tabPath, html);            // 435
              tab.innerHTML = html;                                    // 436
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        fetch: {                                                       // 441
                                                                       //
          content: function (tabPath, fullTabPath) {                   // 443
            var $tab = module.get.tabElement(tabPath),                 // 444
                apiSettings = {                                        //
              dataType: 'html',                                        // 447
              encodeParameters: false,                                 // 448
              on: 'now',                                               // 449
              cache: settings.alwaysRefresh,                           // 450
              headers: {                                               // 451
                'X-Remote': true                                       // 452
              },                                                       //
              onSuccess: function (response) {                         // 454
                module.cache.add(fullTabPath, response);               // 455
                module.update.content(tabPath, response);              // 456
                if (tabPath == activeTabPath) {                        // 457
                  module.debug('Content loaded', tabPath);             // 458
                  module.activate.tab(tabPath);                        // 459
                } else {                                               //
                  module.debug('Content loaded in background', tabPath);
                }                                                      //
                settings.onFirstLoad.call($tab[0], tabPath, parameterArray, historyEvent);
                settings.onLoad.call($tab[0], tabPath, parameterArray, historyEvent);
              },                                                       //
              urlData: {                                               // 467
                tab: fullTabPath                                       // 468
              }                                                        //
            },                                                         //
                request = $tab.api('get request') || false,            //
                existingRequest = request && request.state() === 'pending',
                requestSettings,                                       //
                cachedContent;                                         //
                                                                       //
            fullTabPath = fullTabPath || tabPath;                      // 477
            cachedContent = module.cache.read(fullTabPath);            // 478
                                                                       //
            if (settings.cache && cachedContent) {                     // 481
              module.activate.tab(tabPath);                            // 482
              module.debug('Adding cached content', fullTabPath);      // 483
              if (settings.evaluateScripts == 'once') {                // 484
                module.update.content(tabPath, cachedContent, false);  // 485
              } else {                                                 //
                module.update.content(tabPath, cachedContent);         // 488
              }                                                        //
              settings.onLoad.call($tab[0], tabPath, parameterArray, historyEvent);
            } else if (existingRequest) {                              //
              module.set.loading(tabPath);                             // 493
              module.debug('Content is already loading', fullTabPath);
            } else if ($.api !== undefined) {                          //
              requestSettings = $.extend(true, {}, settings.apiSettings, apiSettings);
              module.debug('Retrieving remote content', fullTabPath, requestSettings);
              module.set.loading(tabPath);                             // 499
              $tab.api(requestSettings);                               // 500
            } else {                                                   //
              module.error(error.api);                                 // 503
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        activate: {                                                    // 508
          all: function (tabPath) {                                    // 509
            module.activate.tab(tabPath);                              // 510
            module.activate.navigation(tabPath);                       // 511
          },                                                           //
          tab: function (tabPath) {                                    // 513
            var $tab = module.get.tabElement(tabPath),                 // 514
                isActive = $tab.hasClass(className.active);            //
            module.verbose('Showing tab content for', $tab);           // 518
            if (!isActive) {                                           // 519
              $tab.addClass(className.active).siblings($tabs).removeClass(className.active + ' ' + className.loading);
              if ($tab.length > 0) {                                   // 525
                settings.onVisible.call($tab[0], tabPath);             // 526
              }                                                        //
            }                                                          //
          },                                                           //
          navigation: function (tabPath) {                             // 530
            var $navigation = module.get.navElement(tabPath),          // 531
                isActive = $navigation.hasClass(className.active);     //
            module.verbose('Activating tab navigation for', $navigation, tabPath);
            if (!isActive) {                                           // 536
              $navigation.addClass(className.active).siblings($allModules).removeClass(className.active + ' ' + className.loading);
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        deactivate: {                                                  // 546
          all: function () {                                           // 547
            module.deactivate.navigation();                            // 548
            module.deactivate.tabs();                                  // 549
          },                                                           //
          navigation: function () {                                    // 551
            $allModules.removeClass(className.active);                 // 552
          },                                                           //
          tabs: function () {                                          // 556
            $tabs.removeClass(className.active + ' ' + className.loading);
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 563
          tab: function (tabName) {                                    // 564
            return tabName !== undefined ? module.get.tabElement(tabName).length > 0 : false;
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 572
          initialPath: function () {                                   // 573
            return $allModules.eq(0).data(metadata.tab) || $tabs.eq(0).data(metadata.tab);
          },                                                           //
          path: function () {                                          // 576
            return $.address.value();                                  // 577
          },                                                           //
          // adds default tabs to tab path                             //
          defaultPathArray: function (tabPath) {                       // 580
            return module.utilities.pathToArray(module.get.defaultPath(tabPath));
          },                                                           //
          defaultPath: function (tabPath) {                            // 583
            var $defaultNav = $allModules.filter('[data-' + metadata.tab + '^="' + tabPath + '/"]').eq(0),
                defaultTab = $defaultNav.data(metadata.tab) || false;  //
            if (defaultTab) {                                          // 588
              module.debug('Found default tab', defaultTab);           // 589
              if (recursionDepth < settings.maxDepth) {                // 590
                recursionDepth++;                                      // 591
                return module.get.defaultPath(defaultTab);             // 592
              }                                                        //
              module.error(error.recursion);                           // 594
            } else {                                                   //
              module.debug('No default tabs found for', tabPath, $tabs);
            }                                                          //
            recursionDepth = 0;                                        // 599
            return tabPath;                                            // 600
          },                                                           //
          navElement: function (tabPath) {                             // 602
            tabPath = tabPath || activeTabPath;                        // 603
            return $allModules.filter('[data-' + metadata.tab + '="' + tabPath + '"]');
          },                                                           //
          tabElement: function (tabPath) {                             // 606
            var $fullPathTab, $simplePathTab, tabPathArray, lastTab;   // 607
            tabPath = tabPath || activeTabPath;                        // 613
            tabPathArray = module.utilities.pathToArray(tabPath);      // 614
            lastTab = module.utilities.last(tabPathArray);             // 615
            $fullPathTab = $tabs.filter('[data-' + metadata.tab + '="' + tabPath + '"]');
            $simplePathTab = $tabs.filter('[data-' + metadata.tab + '="' + lastTab + '"]');
            return $fullPathTab.length > 0 ? $fullPathTab : $simplePathTab;
          },                                                           //
          tab: function () {                                           // 623
            return activeTabPath;                                      // 624
          }                                                            //
        },                                                             //
                                                                       //
        utilities: {                                                   // 628
          filterArray: function (keepArray, removeArray) {             // 629
            return $.grep(keepArray, function (keepValue) {            // 630
              return $.inArray(keepValue, removeArray) == -1;          // 631
            });                                                        //
          },                                                           //
          last: function (array) {                                     // 634
            return $.isArray(array) ? array[array.length - 1] : false;
          },                                                           //
          pathToArray: function (pathName) {                           // 640
            if (pathName === undefined) {                              // 641
              pathName = activeTabPath;                                // 642
            }                                                          //
            return typeof pathName == 'string' ? pathName.split('/') : [pathName];
          },                                                           //
          arrayToPath: function (pathArray) {                          // 649
            return $.isArray(pathArray) ? pathArray.join('/') : false;
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 657
          module.debug('Changing setting', name, value);               // 658
          if ($.isPlainObject(name)) {                                 // 659
            $.extend(true, settings, name);                            // 660
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 663
          } else {                                                     //
            return settings[name];                                     // 666
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 669
          if ($.isPlainObject(name)) {                                 // 670
            $.extend(true, module, name);                              // 671
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 674
          } else {                                                     //
            return module[name];                                       // 677
          }                                                            //
        },                                                             //
        debug: function () {                                           // 680
          if (settings.debug) {                                        // 681
            if (settings.performance) {                                // 682
              module.performance.log(arguments);                       // 683
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 687
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 691
          if (settings.verbose && settings.debug) {                    // 692
            if (settings.performance) {                                // 693
              module.performance.log(arguments);                       // 694
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 698
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 702
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 704
        },                                                             //
        performance: {                                                 // 706
          log: function (message) {                                    // 707
            var currentTime, executionTime, previousTime;              // 708
            if (settings.performance) {                                // 713
              currentTime = new Date().getTime();                      // 714
              previousTime = time || currentTime;                      // 715
              executionTime = currentTime - previousTime;              // 716
              time = currentTime;                                      // 717
              performance.push({                                       // 718
                'Name': message[0],                                    // 719
                'Arguments': [].slice.call(message, 1) || '',          // 720
                'Element': element,                                    // 721
                'Execution Time': executionTime                        // 722
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 725
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 728
            var title = settings.name + ':',                           // 729
                totalTime = 0;                                         //
            time = false;                                              // 733
            clearTimeout(module.performance.timer);                    // 734
            $.each(performance, function (index, data) {               // 735
              totalTime += data['Execution Time'];                     // 736
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 738
            if (moduleSelector) {                                      // 739
              title += ' \'' + moduleSelector + '\'';                  // 740
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 743
              if (console.table) {                                     // 744
                console.table(performance);                            // 745
              } else {                                                 //
                $.each(performance, function (index, data) {           // 748
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 752
            }                                                          //
            performance = [];                                          // 754
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 757
          var object = instance,                                       // 758
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 764
          context = element || context;                                // 765
          if (typeof query == 'string' && object !== undefined) {      // 766
            query = query.split(/[\. ]/);                              // 767
            maxDepth = query.length - 1;                               // 768
            $.each(query, function (depth, value) {                    // 769
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 775
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 778
                return false;                                          // 779
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 782
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 785
                return false;                                          // 786
              } else {                                                 //
                module.error(error.method, query);                     // 789
                return false;                                          // 790
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 794
            response = found.apply(context, passedArguments);          // 795
          } else if (found !== undefined) {                            //
            response = found;                                          // 798
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 800
            returnedValue.push(response);                              // 801
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 804
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 807
          }                                                            //
          return found;                                                // 809
        }                                                              //
      };                                                               //
      if (methodInvoked) {                                             // 812
        if (instance === undefined) {                                  // 813
          module.initialize();                                         // 814
        }                                                              //
        module.invoke(query);                                          // 816
      } else {                                                         //
        if (instance !== undefined) {                                  // 819
          instance.invoke('destroy');                                  // 820
        }                                                              //
        module.initialize();                                           // 822
      }                                                                //
    });                                                                //
    return returnedValue !== undefined ? returnedValue : this;         // 826
  };                                                                   //
                                                                       //
  // shortcut for tabbed content with no defined navigation            //
  $.tab = function () {                                                // 834
    $(window).tab.apply(this, arguments);                              // 835
  };                                                                   //
                                                                       //
  $.fn.tab.settings = {                                                // 838
                                                                       //
    name: 'Tab',                                                       // 840
    namespace: 'tab',                                                  // 841
                                                                       //
    debug: false,                                                      // 843
    verbose: false,                                                    // 844
    performance: true,                                                 // 845
                                                                       //
    auto: false, // uses pjax style endpoints fetching content from same url with remote-content headers
    history: false, // use browser history                             // 848
    historyType: 'hash', // #/ or html5 state                          // 849
    path: false, // base path of url                                   // 850
                                                                       //
    context: false, // specify a context that tabs must appear inside  // 852
    childrenOnly: false, // use only tabs that are children of context
    maxDepth: 25, // max depth a tab can be nested                     // 854
                                                                       //
    alwaysRefresh: false, // load tab content new every tab click      // 856
    cache: true, // cache the content requests to pull locally         // 857
    ignoreFirstLoad: false, // don't load remote content on first load
                                                                       //
    apiSettings: false, // settings for api call                       // 860
    evaluateScripts: 'once', // whether inline scripts should be parsed (true/false/once). Once will not re-evaluate on cached content
                                                                       //
    onFirstLoad: function (tabPath, parameterArray, historyEvent) {}, // called first time loaded
    onLoad: function (tabPath, parameterArray, historyEvent) {}, // called on every load
    onVisible: function (tabPath, parameterArray, historyEvent) {}, // called every time tab visible
    onRequest: function (tabPath, parameterArray, historyEvent) {}, // called ever time a tab beings loading remote content
                                                                       //
    templates: {                                                       // 868
      determineTitle: function (tabArray) {} // returns page title for path
    },                                                                 //
                                                                       //
    error: {                                                           // 872
      api: 'You attempted to load content without API module',         // 873
      method: 'The method you called is not defined',                  // 874
      missingTab: 'Activated tab cannot be found. Tabs are case-sensitive.',
      noContent: 'The tab you specified is missing a content url.',    // 876
      path: 'History enabled, but no path was specified',              // 877
      recursion: 'Max recursive depth reached',                        // 878
      legacyInit: 'onTabInit has been renamed to onFirstLoad in 2.0, please adjust your code.',
      legacyLoad: 'onTabLoad has been renamed to onLoad in 2.0. Please adjust your code',
      state: 'History requires Asual\'s Address library <https://github.com/asual/jquery-address>'
    },                                                                 //
                                                                       //
    metadata: {                                                        // 884
      tab: 'tab',                                                      // 885
      loaded: 'loaded',                                                // 886
      promise: 'promise'                                               // 887
    },                                                                 //
                                                                       //
    className: {                                                       // 890
      loading: 'loading',                                              // 891
      active: 'active'                                                 // 892
    },                                                                 //
                                                                       //
    selector: {                                                        // 895
      tabs: '.ui.tab',                                                 // 896
      ui: '.ui'                                                        // 897
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
