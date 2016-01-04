(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/accordion.js             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Accordion                                           //
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
  $.fn.accordion = function (parameters) {                             // 20
    var $allModules = $(this),                                         // 21
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);                                         // 35
    },                                                                 //
        returnedValue;                                                 //
    $allModules.each(function () {                                     // 39
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.accordion.settings, parameters) : $.extend({}, $.fn.accordion.settings),
          className = settings.className,                              //
          namespace = settings.namespace,                              //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          moduleSelector = $allModules.selector || '',                 //
          $module = $(this),                                           //
          $title = $module.find(selector.title),                       //
          $content = $module.find(selector.content),                   //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          observer,                                                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 65
                                                                       //
        initialize: function () {                                      // 67
          module.debug('Initializing', $module);                       // 68
          module.bind.events();                                        // 69
          if (settings.observeChanges) {                               // 70
            module.observeChanges();                                   // 71
          }                                                            //
          module.instantiate();                                        // 73
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 76
          instance = module;                                           // 77
          $module.data(moduleNamespace, module);                       // 78
        },                                                             //
                                                                       //
        destroy: function () {                                         // 83
          module.debug('Destroying previous instance', $module);       // 84
          $module.off(eventNamespace).removeData(moduleNamespace);     // 85
        },                                                             //
                                                                       //
        refresh: function () {                                         // 91
          $title = $module.find(selector.title);                       // 92
          $content = $module.find(selector.content);                   // 93
        },                                                             //
                                                                       //
        observeChanges: function () {                                  // 96
          if ('MutationObserver' in window) {                          // 97
            observer = new MutationObserver(function (mutations) {     // 98
              module.debug('DOM tree modified, updating selector cache');
              module.refresh();                                        // 100
            });                                                        //
            observer.observe(element, {                                // 102
              childList: true,                                         // 103
              subtree: true                                            // 104
            });                                                        //
            module.debug('Setting up mutation observer', observer);    // 106
          }                                                            //
        },                                                             //
                                                                       //
        bind: {                                                        // 110
          events: function () {                                        // 111
            module.debug('Binding delegated events');                  // 112
            $module.on(settings.on + eventNamespace, selector.trigger, module.event.click);
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 119
          click: function () {                                         // 120
            module.toggle.call(this);                                  // 121
          }                                                            //
        },                                                             //
                                                                       //
        toggle: function (query) {                                     // 125
          var $activeTitle = query !== undefined ? typeof query === 'number' ? $title.eq(query) : $(query).closest(selector.title) : $(this).closest(selector.title),
              $activeContent = $activeTitle.next($content),            //
              isAnimating = $activeContent.hasClass(className.animating),
              isActive = $activeContent.hasClass(className.active),    //
              isOpen = isActive && !isAnimating,                       //
              isOpening = !isActive && isAnimating;                    //
          module.debug('Toggling visibility of content', $activeTitle);
          if (isOpen || isOpening) {                                   // 139
            if (settings.collapsible) {                                // 140
              module.close.call($activeTitle);                         // 141
            } else {                                                   //
              module.debug('Cannot close accordion content collapsing is disabled');
            }                                                          //
          } else {                                                     //
            module.open.call($activeTitle);                            // 148
          }                                                            //
        },                                                             //
                                                                       //
        open: function (query) {                                       // 152
          var $activeTitle = query !== undefined ? typeof query === 'number' ? $title.eq(query) : $(query).closest(selector.title) : $(this).closest(selector.title),
              $activeContent = $activeTitle.next($content),            //
              isAnimating = $activeContent.hasClass(className.animating),
              isActive = $activeContent.hasClass(className.active),    //
              isOpen = isActive || isAnimating;                        //
          if (isOpen) {                                                // 164
            module.debug('Accordion already open, skipping', $activeContent);
            return;                                                    // 166
          }                                                            //
          module.debug('Opening accordion content', $activeTitle);     // 168
          settings.onOpening.call($activeContent);                     // 169
          if (settings.exclusive) {                                    // 170
            module.closeOthers.call($activeTitle);                     // 171
          }                                                            //
          $activeTitle.addClass(className.active);                     // 173
          $activeContent.stop(true, true).addClass(className.animating);
          if (settings.animateChildren) {                              // 180
            if ($.fn.transition !== undefined && $module.transition('is supported')) {
              $activeContent.children().transition({                   // 182
                animation: 'fade in',                                  // 185
                queue: false,                                          // 186
                useFailSafe: true,                                     // 187
                debug: settings.debug,                                 // 188
                verbose: settings.verbose,                             // 189
                duration: settings.duration                            // 190
              });                                                      //
            } else {                                                   //
              $activeContent.children().stop(true, true).animate({     // 195
                opacity: 1                                             // 199
              }, settings.duration, module.resetOpacity);              //
            }                                                          //
          }                                                            //
          $activeContent.slideDown(settings.duration, settings.easing, function () {
            $activeContent.removeClass(className.animating).addClass(className.active);
            module.reset.display.call(this);                           // 210
            settings.onOpen.call(this);                                // 211
            settings.onChange.call(this);                              // 212
          });                                                          //
        },                                                             //
                                                                       //
        close: function (query) {                                      // 217
          var $activeTitle = query !== undefined ? typeof query === 'number' ? $title.eq(query) : $(query).closest(selector.title) : $(this).closest(selector.title),
              $activeContent = $activeTitle.next($content),            //
              isAnimating = $activeContent.hasClass(className.animating),
              isActive = $activeContent.hasClass(className.active),    //
              isOpening = !isActive && isAnimating,                    //
              isClosing = isActive && isAnimating;                     //
          if ((isActive || isOpening) && !isClosing) {                 // 230
            module.debug('Closing accordion content', $activeContent);
            settings.onClosing.call($activeContent);                   // 232
            $activeTitle.removeClass(className.active);                // 233
            $activeContent.stop(true, true).addClass(className.animating);
            if (settings.animateChildren) {                            // 240
              if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $activeContent.children().transition({                 // 242
                  animation: 'fade out',                               // 245
                  queue: false,                                        // 246
                  useFailSafe: true,                                   // 247
                  debug: settings.debug,                               // 248
                  verbose: settings.verbose,                           // 249
                  duration: settings.duration                          // 250
                });                                                    //
              } else {                                                 //
                $activeContent.children().stop(true, true).animate({   // 255
                  opacity: 0                                           // 259
                }, settings.duration, module.resetOpacity);            //
              }                                                        //
            }                                                          //
            $activeContent.slideUp(settings.duration, settings.easing, function () {
              $activeContent.removeClass(className.animating).removeClass(className.active);
              module.reset.display.call(this);                         // 270
              settings.onClose.call(this);                             // 271
              settings.onChange.call(this);                            // 272
            });                                                        //
          }                                                            //
        },                                                             //
                                                                       //
        closeOthers: function (index) {                                // 278
          var $activeTitle = index !== undefined ? $title.eq(index) : $(this).closest(selector.title),
              $parentTitles = $activeTitle.parents(selector.content).prev(selector.title),
              $activeAccordion = $activeTitle.closest(selector.accordion),
              activeSelector = selector.title + '.' + className.active + ':visible',
              activeContent = selector.content + '.' + className.active + ':visible',
              $openTitles,                                             //
              $nestedTitles,                                           //
              $openContents;                                           //
          if (settings.closeNested) {                                  // 291
            $openTitles = $activeAccordion.find(activeSelector).not($parentTitles);
            $openContents = $openTitles.next($content);                // 293
          } else {                                                     //
            $openTitles = $activeAccordion.find(activeSelector).not($parentTitles);
            $nestedTitles = $activeAccordion.find(activeContent).find(activeSelector).not($parentTitles);
            $openTitles = $openTitles.not($nestedTitles);              // 298
            $openContents = $openTitles.next($content);                // 299
          }                                                            //
          if ($openTitles.length > 0) {                                // 301
            module.debug('Exclusive enabled, closing other content', $openTitles);
            $openTitles.removeClass(className.active);                 // 303
            $openContents.removeClass(className.animating).stop(true, true);
            if (settings.animateChildren) {                            // 310
              if ($.fn.transition !== undefined && $module.transition('is supported')) {
                $openContents.children().transition({                  // 312
                  animation: 'fade out',                               // 315
                  useFailSafe: true,                                   // 316
                  debug: settings.debug,                               // 317
                  verbose: settings.verbose,                           // 318
                  duration: settings.duration                          // 319
                });                                                    //
              } else {                                                 //
                $openContents.children().stop(true, true).animate({    // 324
                  opacity: 0                                           // 328
                }, settings.duration, module.resetOpacity);            //
              }                                                        //
            }                                                          //
            $openContents.slideUp(settings.duration, settings.easing, function () {
              $(this).removeClass(className.active);                   // 335
              module.reset.display.call(this);                         // 336
            });                                                        //
          }                                                            //
        },                                                             //
                                                                       //
        reset: {                                                       // 342
                                                                       //
          display: function () {                                       // 344
            module.verbose('Removing inline display from element', this);
            $(this).css('display', '');                                // 346
            if ($(this).attr('style') === '') {                        // 347
              $(this).attr('style', '').removeAttr('style');           // 348
            }                                                          //
          },                                                           //
                                                                       //
          opacity: function () {                                       // 355
            module.verbose('Removing inline opacity from element', this);
            $(this).css('opacity', '');                                // 357
            if ($(this).attr('style') === '') {                        // 358
              $(this).attr('style', '').removeAttr('style');           // 359
            }                                                          //
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 368
          module.debug('Changing setting', name, value);               // 369
          if ($.isPlainObject(name)) {                                 // 370
            $.extend(true, settings, name);                            // 371
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 374
          } else {                                                     //
            return settings[name];                                     // 377
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 380
          module.debug('Changing internal', name, value);              // 381
          if (value !== undefined) {                                   // 382
            if ($.isPlainObject(name)) {                               // 383
              $.extend(true, module, name);                            // 384
            } else {                                                   //
              module[name] = value;                                    // 387
            }                                                          //
          } else {                                                     //
            return module[name];                                       // 391
          }                                                            //
        },                                                             //
        debug: function () {                                           // 394
          if (settings.debug) {                                        // 395
            if (settings.performance) {                                // 396
              module.performance.log(arguments);                       // 397
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 401
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 405
          if (settings.verbose && settings.debug) {                    // 406
            if (settings.performance) {                                // 407
              module.performance.log(arguments);                       // 408
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 412
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 416
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 418
        },                                                             //
        performance: {                                                 // 420
          log: function (message) {                                    // 421
            var currentTime, executionTime, previousTime;              // 422
            if (settings.performance) {                                // 427
              currentTime = new Date().getTime();                      // 428
              previousTime = time || currentTime;                      // 429
              executionTime = currentTime - previousTime;              // 430
              time = currentTime;                                      // 431
              performance.push({                                       // 432
                'Name': message[0],                                    // 433
                'Arguments': [].slice.call(message, 1) || '',          // 434
                'Element': element,                                    // 435
                'Execution Time': executionTime                        // 436
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 439
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 442
            var title = settings.name + ':',                           // 443
                totalTime = 0;                                         //
            time = false;                                              // 447
            clearTimeout(module.performance.timer);                    // 448
            $.each(performance, function (index, data) {               // 449
              totalTime += data['Execution Time'];                     // 450
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 452
            if (moduleSelector) {                                      // 453
              title += ' \'' + moduleSelector + '\'';                  // 454
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 457
              if (console.table) {                                     // 458
                console.table(performance);                            // 459
              } else {                                                 //
                $.each(performance, function (index, data) {           // 462
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 466
            }                                                          //
            performance = [];                                          // 468
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 471
          var object = instance,                                       // 472
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 478
          context = element || context;                                // 479
          if (typeof query == 'string' && object !== undefined) {      // 480
            query = query.split(/[\. ]/);                              // 481
            maxDepth = query.length - 1;                               // 482
            $.each(query, function (depth, value) {                    // 483
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 489
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 492
                return false;                                          // 493
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 496
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 499
                return false;                                          // 500
              } else {                                                 //
                module.error(error.method, query);                     // 503
                return false;                                          // 504
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 508
            response = found.apply(context, passedArguments);          // 509
          } else if (found !== undefined) {                            //
            response = found;                                          // 512
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 514
            returnedValue.push(response);                              // 515
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 518
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 521
          }                                                            //
          return found;                                                // 523
        }                                                              //
      };                                                               //
      if (methodInvoked) {                                             // 526
        if (instance === undefined) {                                  // 527
          module.initialize();                                         // 528
        }                                                              //
        module.invoke(query);                                          // 530
      } else {                                                         //
        if (instance !== undefined) {                                  // 533
          instance.invoke('destroy');                                  // 534
        }                                                              //
        module.initialize();                                           // 536
      }                                                                //
    });                                                                //
    return returnedValue !== undefined ? returnedValue : this;         // 540
  };                                                                   //
                                                                       //
  $.fn.accordion.settings = {                                          // 546
                                                                       //
    name: 'Accordion',                                                 // 548
    namespace: 'accordion',                                            // 549
                                                                       //
    debug: false,                                                      // 551
    verbose: false,                                                    // 552
    performance: true,                                                 // 553
                                                                       //
    on: 'click', // event on title that opens accordion                // 555
                                                                       //
    observeChanges: true, // whether accordion should automatically refresh on DOM insertion
                                                                       //
    exclusive: true, // whether a single accordion content panel should be open at once
    collapsible: true, // whether accordion content can be closed      // 560
    closeNested: false, // whether nested content should be closed when a panel is closed
    animateChildren: true, // whether children opacity should be animated
                                                                       //
    duration: 350, // duration of animation                            // 564
    easing: 'easeOutQuad', // easing equation for animation            // 565
                                                                       //
    onOpening: function () {}, // callback before open animation       // 568
    onOpen: function () {}, // callback after open animation           // 569
    onClosing: function () {}, // callback before closing animation    // 570
    onClose: function () {}, // callback after closing animation       // 571
    onChange: function () {}, // callback after closing or opening animation
                                                                       //
    error: {                                                           // 574
      method: 'The method you called is not defined'                   // 575
    },                                                                 //
                                                                       //
    className: {                                                       // 578
      active: 'active',                                                // 579
      animating: 'animating'                                           // 580
    },                                                                 //
                                                                       //
    selector: {                                                        // 583
      accordion: '.accordion',                                         // 584
      title: '.title',                                                 // 585
      trigger: '.title',                                               // 586
      content: '.content'                                              // 587
    }                                                                  //
                                                                       //
  };                                                                   //
                                                                       //
  // Adds easing                                                       //
  $.extend($.easing, {                                                 // 593
    easeOutQuad: function (x, t, b, c, d) {                            // 594
      return -c * (t /= d) * (t - 2) + b;                              // 595
    }                                                                  //
  });                                                                  //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
