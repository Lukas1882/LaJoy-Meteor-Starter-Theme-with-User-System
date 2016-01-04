(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/sticky.js                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Sticky                                              //
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
  $.fn.sticky = function (parameters) {                                // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 34
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.sticky.settings, parameters) : $.extend({}, $.fn.sticky.settings),
          className = settings.className,                              //
          namespace = settings.namespace,                              //
          error = settings.error,                                      //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          $module = $(this),                                           //
          $window = $(window),                                         //
          $scroll = $(settings.scrollContext),                         //
          $container,                                                  //
          $context,                                                    //
          selector = $module.selector || '',                           //
          instance = $module.data(moduleNamespace),                    //
          requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        setTimeout(callback, 0);                                       // 61
      },                                                               //
          element = this,                                              //
          observer,                                                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 68
                                                                       //
        initialize: function () {                                      // 70
                                                                       //
          module.determineContainer();                                 // 72
          module.determineContext();                                   // 73
          module.verbose('Initializing sticky', settings, $container);
                                                                       //
          module.save.positions();                                     // 76
          module.checkErrors();                                        // 77
          module.bind.events();                                        // 78
                                                                       //
          if (settings.observeChanges) {                               // 80
            module.observeChanges();                                   // 81
          }                                                            //
          module.instantiate();                                        // 83
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 86
          module.verbose('Storing instance of module', module);        // 87
          instance = module;                                           // 88
          $module.data(moduleNamespace, module);                       // 89
        },                                                             //
                                                                       //
        destroy: function () {                                         // 94
          module.verbose('Destroying previous instance');              // 95
          module.reset();                                              // 96
          if (observer) {                                              // 97
            observer.disconnect();                                     // 98
          }                                                            //
          $window.off('load' + eventNamespace, module.event.load).off('resize' + eventNamespace, module.event.resize);
          $scroll.off('scrollchange' + eventNamespace, module.event.scrollchange);
          $module.removeData(moduleNamespace);                         // 107
        },                                                             //
                                                                       //
        observeChanges: function () {                                  // 110
          var context = $context[0];                                   // 111
          if ('MutationObserver' in window) {                          // 114
            observer = new MutationObserver(function (mutations) {     // 115
              clearTimeout(module.timer);                              // 116
              module.timer = setTimeout(function () {                  // 117
                module.verbose('DOM tree modified, updating sticky menu', mutations);
                module.refresh();                                      // 119
              }, 100);                                                 //
            });                                                        //
            observer.observe(element, {                                // 122
              childList: true,                                         // 123
              subtree: true                                            // 124
            });                                                        //
            observer.observe(context, {                                // 126
              childList: true,                                         // 127
              subtree: true                                            // 128
            });                                                        //
            module.debug('Setting up mutation observer', observer);    // 130
          }                                                            //
        },                                                             //
                                                                       //
        determineContainer: function () {                              // 134
          $container = $module.offsetParent();                         // 135
        },                                                             //
                                                                       //
        determineContext: function () {                                // 138
          if (settings.context) {                                      // 139
            $context = $(settings.context);                            // 140
          } else {                                                     //
            $context = $container;                                     // 143
          }                                                            //
          if ($context.length === 0) {                                 // 145
            module.error(error.invalidContext, settings.context, $module);
            return;                                                    // 147
          }                                                            //
        },                                                             //
                                                                       //
        checkErrors: function () {                                     // 151
          if (module.is.hidden()) {                                    // 152
            module.error(error.visible, $module);                      // 153
          }                                                            //
          if (module.cache.element.height > module.cache.context.height) {
            module.reset();                                            // 156
            module.error(error.elementSize, $module);                  // 157
            return;                                                    // 158
          }                                                            //
        },                                                             //
                                                                       //
        bind: {                                                        // 162
          events: function () {                                        // 163
            $window.on('load' + eventNamespace, module.event.load).on('resize' + eventNamespace, module.event.resize);
            // pub/sub pattern                                         //
            $scroll.off('scroll' + eventNamespace).on('scroll' + eventNamespace, module.event.scroll).on('scrollchange' + eventNamespace, module.event.scrollchange);
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 177
          load: function () {                                          // 178
            module.verbose('Page contents finished loading');          // 179
            requestAnimationFrame(module.refresh);                     // 180
          },                                                           //
          resize: function () {                                        // 182
            module.verbose('Window resized');                          // 183
            requestAnimationFrame(module.refresh);                     // 184
          },                                                           //
          scroll: function () {                                        // 186
            requestAnimationFrame(function () {                        // 187
              $scroll.triggerHandler('scrollchange' + eventNamespace, $scroll.scrollTop());
            });                                                        //
          },                                                           //
          scrollchange: function (event, scrollPosition) {             // 191
            module.stick(scrollPosition);                              // 192
            settings.onScroll.call(element);                           // 193
          }                                                            //
        },                                                             //
                                                                       //
        refresh: function (hardRefresh) {                              // 197
          module.reset();                                              // 198
          if (!settings.context) {                                     // 199
            module.determineContext();                                 // 200
          }                                                            //
          if (hardRefresh) {                                           // 202
            module.determineContainer();                               // 203
          }                                                            //
          module.save.positions();                                     // 205
          module.stick();                                              // 206
          settings.onReposition.call(element);                         // 207
        },                                                             //
                                                                       //
        supports: {                                                    // 210
          sticky: function () {                                        // 211
            var $element = $('<div/>'),                                // 212
                element = $element[0];                                 //
            $element.addClass(className.supported);                    // 216
            return $element.css('position').match('sticky');           // 217
          }                                                            //
        },                                                             //
                                                                       //
        save: {                                                        // 221
          lastScroll: function (scroll) {                              // 222
            module.lastScroll = scroll;                                // 223
          },                                                           //
          elementScroll: function (scroll) {                           // 225
            module.elementScroll = scroll;                             // 226
          },                                                           //
          positions: function () {                                     // 228
            var scrollContext = {                                      // 229
              height: $scroll.height()                                 // 231
            },                                                         //
                element = {                                            //
              margin: {                                                // 234
                top: parseInt($module.css('margin-top'), 10),          // 235
                bottom: parseInt($module.css('margin-bottom'), 10)     // 236
              },                                                       //
              offset: $module.offset(),                                // 238
              width: $module.outerWidth(),                             // 239
              height: $module.outerHeight()                            // 240
            },                                                         //
                context = {                                            //
              offset: $context.offset(),                               // 243
              height: $context.outerHeight()                           // 244
            },                                                         //
                container = {                                          //
              height: $container.outerHeight()                         // 247
            };                                                         //
            if (!module.is.standardScroll()) {                         // 250
              module.debug('Non-standard scroll. Removing scroll offset from element offset');
                                                                       //
              scrollContext.top = $scroll.scrollTop();                 // 253
              scrollContext.left = $scroll.scrollLeft();               // 254
                                                                       //
              element.offset.top += scrollContext.top;                 // 256
              context.offset.top += scrollContext.top;                 // 257
              element.offset.left += scrollContext.left;               // 258
              context.offset.left += scrollContext.left;               // 259
            }                                                          //
            module.cache = {                                           // 261
              fits: element.height < scrollContext.height,             // 262
              scrollContext: {                                         // 263
                height: scrollContext.height                           // 264
              },                                                       //
              element: {                                               // 266
                margin: element.margin,                                // 267
                top: element.offset.top - element.margin.top,          // 268
                left: element.offset.left,                             // 269
                width: element.width,                                  // 270
                height: element.height,                                // 271
                bottom: element.offset.top + element.height            // 272
              },                                                       //
              context: {                                               // 274
                top: context.offset.top,                               // 275
                height: context.height,                                // 276
                bottom: context.offset.top + context.height            // 277
              }                                                        //
            };                                                         //
            module.set.containerSize();                                // 280
            module.set.size();                                         // 281
            module.stick();                                            // 282
            module.debug('Caching element positions', module.cache);   // 283
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 287
          direction: function (scroll) {                               // 288
            var direction = 'down';                                    // 289
            scroll = scroll || $scroll.scrollTop();                    // 292
            if (module.lastScroll !== undefined) {                     // 293
              if (module.lastScroll < scroll) {                        // 294
                direction = 'down';                                    // 295
              } else if (module.lastScroll > scroll) {                 //
                direction = 'up';                                      // 298
              }                                                        //
            }                                                          //
            return direction;                                          // 301
          },                                                           //
          scrollChange: function (scroll) {                            // 303
            scroll = scroll || $scroll.scrollTop();                    // 304
            return module.lastScroll ? scroll - module.lastScroll : 0;
          },                                                           //
          currentElementScroll: function () {                          // 310
            if (module.elementScroll) {                                // 311
              return module.elementScroll;                             // 312
            }                                                          //
            return module.is.top() ? Math.abs(parseInt($module.css('top'), 10)) || 0 : Math.abs(parseInt($module.css('bottom'), 10)) || 0;
          },                                                           //
                                                                       //
          elementScroll: function (scroll) {                           // 320
            scroll = scroll || $scroll.scrollTop();                    // 321
            var element = module.cache.element,                        // 322
                scrollContext = module.cache.scrollContext,            //
                delta = module.get.scrollChange(scroll),               //
                maxScroll = element.height - scrollContext.height + settings.offset,
                elementScroll = module.get.currentElementScroll(),     //
                possibleScroll = elementScroll + delta;                //
            if (module.cache.fits || possibleScroll < 0) {             // 330
              elementScroll = 0;                                       // 331
            } else if (possibleScroll > maxScroll) {                   //
              elementScroll = maxScroll;                               // 334
            } else {                                                   //
              elementScroll = possibleScroll;                          // 337
            }                                                          //
            return elementScroll;                                      // 339
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 343
          lastScroll: function () {                                    // 344
            delete module.lastScroll;                                  // 345
          },                                                           //
          elementScroll: function (scroll) {                           // 347
            delete module.elementScroll;                               // 348
          },                                                           //
          offset: function () {                                        // 350
            $module.css('margin-top', '');                             // 351
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 355
          offset: function () {                                        // 356
            module.verbose('Setting offset on element', settings.offset);
            $module.css('margin-top', settings.offset);                // 358
          },                                                           //
          containerSize: function () {                                 // 362
            var tagName = $container.get(0).tagName;                   // 363
            if (tagName === 'HTML' || tagName == 'body') {             // 366
              // this can trigger for too many reasons                 //
              //module.error(error.container, tagName, $module);       //
              module.determineContainer();                             // 369
            } else {                                                   //
              if (Math.abs($container.outerHeight() - module.cache.context.height) > settings.jitter) {
                module.debug('Context has padding, specifying exact height for container', module.cache.context.height);
                $container.css({                                       // 374
                  height: module.cache.context.height                  // 375
                });                                                    //
              }                                                        //
            }                                                          //
          },                                                           //
          minimumSize: function () {                                   // 380
            var element = module.cache.element;                        // 381
            $container.css('min-height', element.height);              // 384
          },                                                           //
          scroll: function (scroll) {                                  // 388
            module.debug('Setting scroll on element', scroll);         // 389
            if (module.elementScroll == scroll) {                      // 390
              return;                                                  // 391
            }                                                          //
            if (module.is.top()) {                                     // 393
              $module.css('bottom', '').css('top', -scroll);           // 394
            }                                                          //
            if (module.is.bottom()) {                                  // 399
              $module.css('top', '').css('bottom', scroll);            // 400
            }                                                          //
          },                                                           //
          size: function () {                                          // 406
            if (module.cache.element.height !== 0 && module.cache.element.width !== 0) {
              element.style.setProperty('width', module.cache.element.width + 'px', 'important');
              element.style.setProperty('height', module.cache.element.height + 'px', 'important');
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 414
          standardScroll: function () {                                // 415
            return $scroll[0] == window;                               // 416
          },                                                           //
          top: function () {                                           // 418
            return $module.hasClass(className.top);                    // 419
          },                                                           //
          bottom: function () {                                        // 421
            return $module.hasClass(className.bottom);                 // 422
          },                                                           //
          initialPosition: function () {                               // 424
            return !module.is.fixed() && !module.is.bound();           // 425
          },                                                           //
          hidden: function () {                                        // 427
            return !$module.is(':visible');                            // 428
          },                                                           //
          bound: function () {                                         // 430
            return $module.hasClass(className.bound);                  // 431
          },                                                           //
          fixed: function () {                                         // 433
            return $module.hasClass(className.fixed);                  // 434
          }                                                            //
        },                                                             //
                                                                       //
        stick: function (scroll) {                                     // 438
          var cachedPosition = scroll || $scroll.scrollTop(),          // 439
              cache = module.cache,                                    //
              fits = cache.fits,                                       //
              element = cache.element,                                 //
              scrollContext = cache.scrollContext,                     //
              context = cache.context,                                 //
              offset = module.is.bottom() && settings.pushing ? settings.bottomOffset : settings.offset,
              scroll = {                                               //
            top: cachedPosition + offset,                              // 450
            bottom: cachedPosition + offset + scrollContext.height     // 451
          },                                                           //
              direction = module.get.direction(scroll.top),            //
              elementScroll = fits ? 0 : module.get.elementScroll(scroll.top),
                                                                       //
          // shorthand                                                 //
          doesntFit = !fits,                                           // 459
              elementVisible = element.height !== 0;                   //
                                                                       //
          if (elementVisible) {                                        // 463
                                                                       //
            if (module.is.initialPosition()) {                         // 465
              if (scroll.top >= context.bottom) {                      // 466
                module.debug('Initial element position is bottom of container');
                module.bindBottom();                                   // 468
              } else if (scroll.top > element.top) {                   //
                if (element.height + scroll.top - elementScroll >= context.bottom) {
                  module.debug('Initial element position is bottom of container');
                  module.bindBottom();                                 // 473
                } else {                                               //
                  module.debug('Initial element position is fixed');   // 476
                  module.fixTop();                                     // 477
                }                                                      //
              }                                                        //
            } else if (module.is.fixed()) {                            //
                                                                       //
              // currently fixed top                                   //
              if (module.is.top()) {                                   // 485
                if (scroll.top <= element.top) {                       // 486
                  module.debug('Fixed element reached top of container');
                  module.setInitialPosition();                         // 488
                } else if (element.height + scroll.top - elementScroll >= context.bottom) {
                  module.debug('Fixed element reached bottom of container');
                  module.bindBottom();                                 // 492
                }                                                      //
                // scroll element if larger than screen                //
                else if (doesntFit) {                                  //
                    module.set.scroll(elementScroll);                  // 496
                    module.save.lastScroll(scroll.top);                // 497
                    module.save.elementScroll(elementScroll);          // 498
                  }                                                    //
              }                                                        //
                                                                       //
              // currently fixed bottom                                //
              else if (module.is.bottom()) {                           //
                                                                       //
                  // top edge                                          //
                  if (scroll.bottom - element.height <= element.top) {
                    module.debug('Bottom fixed rail has reached top of container');
                    module.setInitialPosition();                       // 508
                  }                                                    //
                  // bottom edge                                       //
                  else if (scroll.bottom >= context.bottom) {          //
                      module.debug('Bottom fixed rail has reached bottom of container');
                      module.bindBottom();                             // 513
                    }                                                  //
                    // scroll element if larger than screen            //
                    else if (doesntFit) {                              //
                        module.set.scroll(elementScroll);              // 517
                        module.save.lastScroll(scroll.top);            // 518
                        module.save.elementScroll(elementScroll);      // 519
                      }                                                //
                }                                                      //
            } else if (module.is.bottom()) {                           //
              if (scroll.top <= element.top) {                         // 525
                module.debug('Jumped from bottom fixed to top fixed, most likely used home/end button');
                module.setInitialPosition();                           // 527
              } else {                                                 //
                if (settings.pushing) {                                // 530
                  if (module.is.bound() && scroll.bottom <= context.bottom) {
                    module.debug('Fixing bottom attached element to bottom of browser.');
                    module.fixBottom();                                // 533
                  }                                                    //
                } else {                                               //
                  if (module.is.bound() && scroll.top <= context.bottom - element.height) {
                    module.debug('Fixing bottom attached element to top of browser.');
                    module.fixTop();                                   // 539
                  }                                                    //
                }                                                      //
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        bindTop: function () {                                         // 547
          module.debug('Binding element to top of parent container');  // 548
          module.remove.offset();                                      // 549
          $module.css({                                                // 550
            left: '',                                                  // 552
            top: '',                                                   // 553
            marginBottom: ''                                           // 554
          }).removeClass(className.fixed).removeClass(className.bottom).addClass(className.bound).addClass(className.top);
          settings.onTop.call(element);                                // 561
          settings.onUnstick.call(element);                            // 562
        },                                                             //
        bindBottom: function () {                                      // 564
          module.debug('Binding element to bottom of parent container');
          module.remove.offset();                                      // 566
          $module.css({                                                // 567
            left: '',                                                  // 569
            top: ''                                                    // 570
          }).removeClass(className.fixed).removeClass(className.top).addClass(className.bound).addClass(className.bottom);
          settings.onBottom.call(element);                             // 577
          settings.onUnstick.call(element);                            // 578
        },                                                             //
                                                                       //
        setInitialPosition: function () {                              // 581
          module.debug('Returning to initial position');               // 582
          module.unfix();                                              // 583
          module.unbind();                                             // 584
        },                                                             //
                                                                       //
        fixTop: function () {                                          // 588
          module.debug('Fixing element to top of page');               // 589
          module.set.minimumSize();                                    // 590
          module.set.offset();                                         // 591
          $module.css({                                                // 592
            left: module.cache.element.left,                           // 594
            bottom: '',                                                // 595
            marginBottom: ''                                           // 596
          }).removeClass(className.bound).removeClass(className.bottom).addClass(className.fixed).addClass(className.top);
          settings.onStick.call(element);                              // 603
        },                                                             //
                                                                       //
        fixBottom: function () {                                       // 606
          module.debug('Sticking element to bottom of page');          // 607
          module.set.minimumSize();                                    // 608
          module.set.offset();                                         // 609
          $module.css({                                                // 610
            left: module.cache.element.left,                           // 612
            bottom: '',                                                // 613
            marginBottom: ''                                           // 614
          }).removeClass(className.bound).removeClass(className.top).addClass(className.fixed).addClass(className.bottom);
          settings.onStick.call(element);                              // 621
        },                                                             //
                                                                       //
        unbind: function () {                                          // 624
          if (module.is.bound()) {                                     // 625
            module.debug('Removing container bound position on element');
            module.remove.offset();                                    // 627
            $module.removeClass(className.bound).removeClass(className.top).removeClass(className.bottom);
          }                                                            //
        },                                                             //
                                                                       //
        unfix: function () {                                           // 636
          if (module.is.fixed()) {                                     // 637
            module.debug('Removing fixed position on element');        // 638
            module.remove.offset();                                    // 639
            $module.removeClass(className.fixed).removeClass(className.top).removeClass(className.bottom);
            settings.onUnstick.call(element);                          // 645
          }                                                            //
        },                                                             //
                                                                       //
        reset: function () {                                           // 649
          module.debug('Reseting elements position');                  // 650
          module.unbind();                                             // 651
          module.unfix();                                              // 652
          module.resetCSS();                                           // 653
          module.remove.offset();                                      // 654
          module.remove.lastScroll();                                  // 655
        },                                                             //
                                                                       //
        resetCSS: function () {                                        // 658
          $module.css({                                                // 659
            width: '',                                                 // 661
            height: ''                                                 // 662
          });                                                          //
          $container.css({                                             // 665
            height: ''                                                 // 667
          });                                                          //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 672
          if ($.isPlainObject(name)) {                                 // 673
            $.extend(true, settings, name);                            // 674
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 677
          } else {                                                     //
            return settings[name];                                     // 680
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 683
          if ($.isPlainObject(name)) {                                 // 684
            $.extend(true, module, name);                              // 685
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 688
          } else {                                                     //
            return module[name];                                       // 691
          }                                                            //
        },                                                             //
        debug: function () {                                           // 694
          if (settings.debug) {                                        // 695
            if (settings.performance) {                                // 696
              module.performance.log(arguments);                       // 697
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 701
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 705
          if (settings.verbose && settings.debug) {                    // 706
            if (settings.performance) {                                // 707
              module.performance.log(arguments);                       // 708
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 712
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 716
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 718
        },                                                             //
        performance: {                                                 // 720
          log: function (message) {                                    // 721
            var currentTime, executionTime, previousTime;              // 722
            if (settings.performance) {                                // 727
              currentTime = new Date().getTime();                      // 728
              previousTime = time || currentTime;                      // 729
              executionTime = currentTime - previousTime;              // 730
              time = currentTime;                                      // 731
              performance.push({                                       // 732
                'Name': message[0],                                    // 733
                'Arguments': [].slice.call(message, 1) || '',          // 734
                'Element': element,                                    // 735
                'Execution Time': executionTime                        // 736
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 739
            module.performance.timer = setTimeout(module.performance.display, 0);
          },                                                           //
          display: function () {                                       // 742
            var title = settings.name + ':',                           // 743
                totalTime = 0;                                         //
            time = false;                                              // 747
            clearTimeout(module.performance.timer);                    // 748
            $.each(performance, function (index, data) {               // 749
              totalTime += data['Execution Time'];                     // 750
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 752
            if (moduleSelector) {                                      // 753
              title += ' \'' + moduleSelector + '\'';                  // 754
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 757
              if (console.table) {                                     // 758
                console.table(performance);                            // 759
              } else {                                                 //
                $.each(performance, function (index, data) {           // 762
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 766
            }                                                          //
            performance = [];                                          // 768
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 771
          var object = instance,                                       // 772
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 778
          context = element || context;                                // 779
          if (typeof query == 'string' && object !== undefined) {      // 780
            query = query.split(/[\. ]/);                              // 781
            maxDepth = query.length - 1;                               // 782
            $.each(query, function (depth, value) {                    // 783
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 789
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 792
                return false;                                          // 793
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 796
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 799
                return false;                                          // 800
              } else {                                                 //
                return false;                                          // 803
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 807
            response = found.apply(context, passedArguments);          // 808
          } else if (found !== undefined) {                            //
            response = found;                                          // 811
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 813
            returnedValue.push(response);                              // 814
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 817
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 820
          }                                                            //
          return found;                                                // 822
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 826
        if (instance === undefined) {                                  // 827
          module.initialize();                                         // 828
        }                                                              //
        module.invoke(query);                                          // 830
      } else {                                                         //
        if (instance !== undefined) {                                  // 833
          instance.invoke('destroy');                                  // 834
        }                                                              //
        module.initialize();                                           // 836
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 841
  };                                                                   //
                                                                       //
  $.fn.sticky.settings = {                                             // 847
                                                                       //
    name: 'Sticky',                                                    // 849
    namespace: 'sticky',                                               // 850
                                                                       //
    debug: false,                                                      // 852
    verbose: true,                                                     // 853
    performance: true,                                                 // 854
                                                                       //
    // whether to stick in the opposite direction on scroll up         //
    pushing: false,                                                    // 857
                                                                       //
    context: false,                                                    // 859
                                                                       //
    // Context to watch scroll events                                  //
    scrollContext: window,                                             // 862
                                                                       //
    // Offset to adjust scroll                                         //
    offset: 0,                                                         // 865
                                                                       //
    // Offset to adjust scroll when attached to bottom of screen       //
    bottomOffset: 0,                                                   // 868
                                                                       //
    jitter: 5, // will only set container height if difference between context and container is larger than this number
                                                                       //
    // Whether to automatically observe changes with Mutation Observers
    observeChanges: false,                                             // 873
                                                                       //
    // Called when position is recalculated                            //
    onReposition: function () {},                                      // 876
                                                                       //
    // Called on each scroll                                           //
    onScroll: function () {},                                          // 879
                                                                       //
    // Called when element is stuck to viewport                        //
    onStick: function () {},                                           // 882
                                                                       //
    // Called when element is unstuck from viewport                    //
    onUnstick: function () {},                                         // 885
                                                                       //
    // Called when element reaches top of context                      //
    onTop: function () {},                                             // 888
                                                                       //
    // Called when element reaches bottom of context                   //
    onBottom: function () {},                                          // 891
                                                                       //
    error: {                                                           // 893
      container: 'Sticky element must be inside a relative container',
      visible: 'Element is hidden, you must call refresh after element becomes visible',
      method: 'The method you called is not defined.',                 // 896
      invalidContext: 'Context specified does not exist',              // 897
      elementSize: 'Sticky element is larger than its container, cannot create sticky.'
    },                                                                 //
                                                                       //
    className: {                                                       // 901
      bound: 'bound',                                                  // 902
      fixed: 'fixed',                                                  // 903
      supported: 'native',                                             // 904
      top: 'top',                                                      // 905
      bottom: 'bottom'                                                 // 906
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
