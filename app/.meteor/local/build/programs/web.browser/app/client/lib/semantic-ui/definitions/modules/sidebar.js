(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/sidebar.js               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Sidebar                                             //
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
  $.fn.sidebar = function (parameters) {                               // 20
    var $allModules = $(this),                                         // 21
        $window = $(window),                                           //
        $document = $(document),                                       //
        $html = $('html'),                                             //
        $head = $('head'),                                             //
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);                                         // 41
    },                                                                 //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 46
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.sidebar.settings, parameters) : $.extend({}, $.fn.sidebar.settings),
          selector = settings.selector,                                //
          className = settings.className,                              //
          namespace = settings.namespace,                              //
          regExp = settings.regExp,                                    //
          error = settings.error,                                      //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          $module = $(this),                                           //
          $context = $(settings.context),                              //
          $sidebars = $module.children(selector.sidebar),              //
          $fixed = $context.children(selector.fixed),                  //
          $pusher = $context.children(selector.pusher),                //
          $style,                                                      //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          elementNamespace,                                            //
          id,                                                          //
          currentScroll,                                               //
          transitionEvent,                                             //
          module;                                                      //
                                                                       //
      module = {                                                       // 81
                                                                       //
        initialize: function () {                                      // 83
          module.debug('Initializing sidebar', parameters);            // 84
                                                                       //
          module.create.id();                                          // 86
                                                                       //
          transitionEvent = module.get.transitionEvent();              // 88
                                                                       //
          if (module.is.ios()) {                                       // 90
            module.set.ios();                                          // 91
          }                                                            //
                                                                       //
          // avoids locking rendering if initialized in onReady        //
          if (settings.delaySetup) {                                   // 95
            requestAnimationFrame(module.setup.layout);                // 96
          } else {                                                     //
            module.setup.layout();                                     // 99
          }                                                            //
                                                                       //
          requestAnimationFrame(function () {                          // 102
            module.setup.cache();                                      // 103
          });                                                          //
                                                                       //
          module.instantiate();                                        // 106
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 109
          module.verbose('Storing instance of module', module);        // 110
          instance = module;                                           // 111
          $module.data(moduleNamespace, module);                       // 112
        },                                                             //
                                                                       //
        create: {                                                      // 117
          id: function () {                                            // 118
            id = (Math.random().toString(16) + '000000000').substr(2, 8);
            elementNamespace = '.' + id;                               // 120
            module.verbose('Creating unique id for element', id);      // 121
          }                                                            //
        },                                                             //
                                                                       //
        destroy: function () {                                         // 125
          module.verbose('Destroying previous module for', $module);   // 126
          $module.off(eventNamespace).removeData(moduleNamespace);     // 127
          if (module.is.ios()) {                                       // 131
            module.remove.ios();                                       // 132
          }                                                            //
          // bound by uuid                                             //
          $context.off(elementNamespace);                              // 135
          $window.off(elementNamespace);                               // 136
          $document.off(elementNamespace);                             // 137
        },                                                             //
                                                                       //
        event: {                                                       // 140
          clickaway: function (event) {                                // 141
            var clickedInPusher = $pusher.find(event.target).length > 0 || $pusher.is(event.target),
                clickedContext = $context.is(event.target);            //
            if (clickedInPusher) {                                     // 146
              module.verbose('User clicked on dimmed page');           // 147
              module.hide();                                           // 148
            }                                                          //
            if (clickedContext) {                                      // 150
              module.verbose('User clicked on dimmable context (scaled out page)');
              module.hide();                                           // 152
            }                                                          //
          },                                                           //
          touch: function (event) {                                    // 155
            //event.stopPropagation();                                 //
          },                                                           //
          containScroll: function (event) {                            // 158
            if (element.scrollTop <= 0) {                              // 159
              element.scrollTop = 1;                                   // 160
            }                                                          //
            if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
              element.scrollTop = element.scrollHeight - element.offsetHeight - 1;
            }                                                          //
          },                                                           //
          scroll: function (event) {                                   // 166
            if ($(event.target).closest(selector.sidebar).length === 0) {
              event.preventDefault();                                  // 168
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        bind: {                                                        // 173
          clickaway: function () {                                     // 174
            module.verbose('Adding clickaway events to context', $context);
            if (settings.closable) {                                   // 176
              $context.on('click' + elementNamespace, module.event.clickaway).on('touchend' + elementNamespace, module.event.clickaway);
            }                                                          //
          },                                                           //
          scrollLock: function () {                                    // 183
            if (settings.scrollLock) {                                 // 184
              module.debug('Disabling page scroll');                   // 185
              $window.on('DOMMouseScroll' + elementNamespace, module.event.scroll);
            }                                                          //
            module.verbose('Adding events to contain sidebar scroll');
            $document.on('touchmove' + elementNamespace, module.event.touch);
            $module.on('scroll' + eventNamespace, module.event.containScroll);
          }                                                            //
        },                                                             //
        unbind: {                                                      // 199
          clickaway: function () {                                     // 200
            module.verbose('Removing clickaway events from context', $context);
            $context.off(elementNamespace);                            // 202
          },                                                           //
          scrollLock: function () {                                    // 204
            module.verbose('Removing scroll lock from page');          // 205
            $document.off(elementNamespace);                           // 206
            $window.off(elementNamespace);                             // 207
            $module.off('scroll' + eventNamespace);                    // 208
          }                                                            //
        },                                                             //
                                                                       //
        add: {                                                         // 212
          inlineCSS: function () {                                     // 213
            var width = module.cache.width || $module.outerWidth(),    // 214
                height = module.cache.height || $module.outerHeight(),
                isRTL = module.is.rtl(),                               //
                direction = module.get.direction(),                    //
                distance = {                                           //
              left: width,                                             // 220
              right: -width,                                           // 221
              top: height,                                             // 222
              bottom: -height                                          // 223
            },                                                         //
                style;                                                 //
                                                                       //
            if (isRTL) {                                               // 228
              module.verbose('RTL detected, flipping widths');         // 229
              distance.left = -width;                                  // 230
              distance.right = width;                                  // 231
            }                                                          //
                                                                       //
            style = '<style>';                                         // 234
                                                                       //
            if (direction === 'left' || direction === 'right') {       // 236
              module.debug('Adding CSS rules for animation distance', width);
              style += '' + ' .ui.visible.' + direction + '.sidebar ~ .fixed,' + ' .ui.visible.' + direction + '.sidebar ~ .pusher {' + '   -webkit-transform: translate3d(' + distance[direction] + 'px, 0, 0);' + '           transform: translate3d(' + distance[direction] + 'px, 0, 0);' + ' }';
            } else if (direction === 'top' || direction == 'bottom') {
              style += '' + ' .ui.visible.' + direction + '.sidebar ~ .fixed,' + ' .ui.visible.' + direction + '.sidebar ~ .pusher {' + '   -webkit-transform: translate3d(0, ' + distance[direction] + 'px, 0);' + '           transform: translate3d(0, ' + distance[direction] + 'px, 0);' + ' }';
            }                                                          //
                                                                       //
            /* IE is only browser not to create context with transforms */
            /* https://www.w3.org/Bugs/Public/show_bug.cgi?id=16328 */
            if (module.is.ie()) {                                      // 258
              if (direction === 'left' || direction === 'right') {     // 259
                module.debug('Adding CSS rules for animation distance', width);
                style += '' + ' body.pushable > .ui.visible.' + direction + '.sidebar ~ .pusher:after {' + '   -webkit-transform: translate3d(' + distance[direction] + 'px, 0, 0);' + '           transform: translate3d(' + distance[direction] + 'px, 0, 0);' + ' }';
              } else if (direction === 'top' || direction == 'bottom') {
                style += '' + ' body.pushable > .ui.visible.' + direction + '.sidebar ~ .pusher:after {' + '   -webkit-transform: translate3d(0, ' + distance[direction] + 'px, 0);' + '           transform: translate3d(0, ' + distance[direction] + 'px, 0);' + ' }';
              }                                                        //
              /* opposite sides visible forces content overlay */      //
              style += '' + ' body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after,' + ' body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {' + '   -webkit-transform: translate3d(0px, 0, 0);' + '           transform: translate3d(0px, 0, 0);' + ' }';
            }                                                          //
            style += '</style>';                                       // 285
            $style = $(style).appendTo($head);                         // 286
            module.debug('Adding sizing css to head', $style);         // 289
          }                                                            //
        },                                                             //
                                                                       //
        refresh: function () {                                         // 293
          module.verbose('Refreshing selector cache');                 // 294
          $context = $(settings.context);                              // 295
          $sidebars = $context.children(selector.sidebar);             // 296
          $pusher = $context.children(selector.pusher);                // 297
          $fixed = $context.children(selector.fixed);                  // 298
          module.clear.cache();                                        // 299
        },                                                             //
                                                                       //
        refreshSidebars: function () {                                 // 302
          module.verbose('Refreshing other sidebars');                 // 303
          $sidebars = $context.children(selector.sidebar);             // 304
        },                                                             //
                                                                       //
        repaint: function () {                                         // 307
          module.verbose('Forcing repaint event');                     // 308
          element.style.display = 'none';                              // 309
          var ignored = element.offsetHeight;                          // 310
          element.scrollTop = element.scrollTop;                       // 311
          element.style.display = '';                                  // 312
        },                                                             //
                                                                       //
        setup: {                                                       // 315
          cache: function () {                                         // 316
            module.cache = {                                           // 317
              width: $module.outerWidth(),                             // 318
              height: $module.outerHeight(),                           // 319
              rtl: $module.css('direction') == 'rtl'                   // 320
            };                                                         //
          },                                                           //
          layout: function () {                                        // 323
            if ($context.children(selector.pusher).length === 0) {     // 324
              module.debug('Adding wrapper element for sidebar');      // 325
              module.error(error.pusher);                              // 326
              $pusher = $('<div class="pusher" />');                   // 327
              $context.children().not(selector.omitted).not($sidebars).wrapAll($pusher);
              module.refresh();                                        // 334
            }                                                          //
            if ($module.nextAll(selector.pusher).length === 0 || $module.nextAll(selector.pusher)[0] !== $pusher[0]) {
              module.debug('Moved sidebar to correct parent element');
              module.error(error.movedSidebar, element);               // 338
              $module.detach().prependTo($context);                    // 339
              module.refresh();                                        // 340
            }                                                          //
            module.clear.cache();                                      // 342
            module.set.pushable();                                     // 343
            module.set.direction();                                    // 344
          }                                                            //
        },                                                             //
                                                                       //
        attachEvents: function (selector, event) {                     // 348
          var $toggle = $(selector);                                   // 349
          event = $.isFunction(module[event]) ? module[event] : module.toggle;
          if ($toggle.length > 0) {                                    // 356
            module.debug('Attaching sidebar events to element', selector, event);
            $toggle.on('click' + eventNamespace, event);               // 358
          } else {                                                     //
            module.error(error.notFound, selector);                    // 363
          }                                                            //
        },                                                             //
                                                                       //
        show: function (callback) {                                    // 367
          callback = $.isFunction(callback) ? callback : function () {};
          if (module.is.hidden()) {                                    // 372
            module.refreshSidebars();                                  // 373
            if (settings.overlay) {                                    // 374
              module.error(error.overlay);                             // 375
              settings.transition = 'overlay';                         // 376
            }                                                          //
            module.refresh();                                          // 378
            if (module.othersActive()) {                               // 379
              module.debug('Other sidebars currently visible');        // 380
              if (settings.exclusive) {                                // 381
                // if not overlay queue animation after hide           //
                if (settings.transition != 'overlay') {                // 383
                  module.hideOthers(module.show);                      // 384
                  return;                                              // 385
                } else {                                               //
                  module.hideOthers();                                 // 388
                }                                                      //
              } else {                                                 //
                settings.transition = 'overlay';                       // 392
              }                                                        //
            }                                                          //
            module.pushPage(function () {                              // 395
              callback.call(element);                                  // 396
              settings.onShow.call(element);                           // 397
            });                                                        //
            settings.onChange.call(element);                           // 399
            settings.onVisible.call(element);                          // 400
          } else {                                                     //
            module.debug('Sidebar is already visible');                // 403
          }                                                            //
        },                                                             //
                                                                       //
        hide: function (callback) {                                    // 407
          callback = $.isFunction(callback) ? callback : function () {};
          if (module.is.visible() || module.is.animating()) {          // 412
            module.debug('Hiding sidebar', callback);                  // 413
            module.refreshSidebars();                                  // 414
            module.pullPage(function () {                              // 415
              callback.call(element);                                  // 416
              settings.onHidden.call(element);                         // 417
            });                                                        //
            settings.onChange.call(element);                           // 419
            settings.onHide.call(element);                             // 420
          }                                                            //
        },                                                             //
                                                                       //
        othersAnimating: function () {                                 // 424
          return $sidebars.not($module).filter('.' + className.animating).length > 0;
        },                                                             //
        othersVisible: function () {                                   // 427
          return $sidebars.not($module).filter('.' + className.visible).length > 0;
        },                                                             //
        othersActive: function () {                                    // 430
          return module.othersVisible() || module.othersAnimating();   // 431
        },                                                             //
                                                                       //
        hideOthers: function (callback) {                              // 434
          var $otherSidebars = $sidebars.not($module).filter('.' + className.visible),
              sidebarCount = $otherSidebars.length,                    //
              callbackCount = 0;                                       //
          callback = callback || function () {};                       // 440
          $otherSidebars.sidebar('hide', function () {                 // 441
            callbackCount++;                                           // 443
            if (callbackCount == sidebarCount) {                       // 444
              callback();                                              // 445
            }                                                          //
          });                                                          //
        },                                                             //
                                                                       //
        toggle: function () {                                          // 451
          module.verbose('Determining toggled direction');             // 452
          if (module.is.hidden()) {                                    // 453
            module.show();                                             // 454
          } else {                                                     //
            module.hide();                                             // 457
          }                                                            //
        },                                                             //
                                                                       //
        pushPage: function (callback) {                                // 461
          var transition = module.get.transition(),                    // 462
              $transition = transition === 'overlay' || module.othersActive() ? $module : $pusher,
              animate,                                                 //
              dim,                                                     //
              transitionEnd;                                           //
          callback = $.isFunction(callback) ? callback : function () {};
          if (settings.transition == 'scale down') {                   // 475
            module.scrollToTop();                                      // 476
          }                                                            //
          module.set.transition(transition);                           // 478
          module.repaint();                                            // 479
          animate = function () {                                      // 480
            module.bind.clickaway();                                   // 481
            module.add.inlineCSS();                                    // 482
            module.set.animating();                                    // 483
            module.set.visible();                                      // 484
          };                                                           //
          dim = function () {                                          // 486
            module.set.dimmed();                                       // 487
          };                                                           //
          transitionEnd = function (event) {                           // 489
            if (event.target == $transition[0]) {                      // 490
              $transition.off(transitionEvent + elementNamespace, transitionEnd);
              module.remove.animating();                               // 492
              module.bind.scrollLock();                                // 493
              callback.call(element);                                  // 494
            }                                                          //
          };                                                           //
          $transition.off(transitionEvent + elementNamespace);         // 497
          $transition.on(transitionEvent + elementNamespace, transitionEnd);
          requestAnimationFrame(animate);                              // 499
          if (settings.dimPage && !module.othersVisible()) {           // 500
            requestAnimationFrame(dim);                                // 501
          }                                                            //
        },                                                             //
                                                                       //
        pullPage: function (callback) {                                // 505
          var transition = module.get.transition(),                    // 506
              $transition = transition == 'overlay' || module.othersActive() ? $module : $pusher,
              animate,                                                 //
              transitionEnd;                                           //
          callback = $.isFunction(callback) ? callback : function () {};
          module.verbose('Removing context push state', module.get.direction());
                                                                       //
          module.unbind.clickaway();                                   // 520
          module.unbind.scrollLock();                                  // 521
                                                                       //
          animate = function () {                                      // 523
            module.set.transition(transition);                         // 524
            module.set.animating();                                    // 525
            module.remove.visible();                                   // 526
            if (settings.dimPage && !module.othersVisible()) {         // 527
              $pusher.removeClass(className.dimmed);                   // 528
            }                                                          //
          };                                                           //
          transitionEnd = function (event) {                           // 531
            if (event.target == $transition[0]) {                      // 532
              $transition.off(transitionEvent + elementNamespace, transitionEnd);
              module.remove.animating();                               // 534
              module.remove.transition();                              // 535
              module.remove.inlineCSS();                               // 536
              if (transition == 'scale down' || settings.returnScroll && module.is.mobile()) {
                module.scrollBack();                                   // 538
              }                                                        //
              callback.call(element);                                  // 540
            }                                                          //
          };                                                           //
          $transition.off(transitionEvent + elementNamespace);         // 543
          $transition.on(transitionEvent + elementNamespace, transitionEnd);
          requestAnimationFrame(animate);                              // 545
        },                                                             //
                                                                       //
        scrollToTop: function () {                                     // 548
          module.verbose('Scrolling to top of page to avoid animation issues');
          currentScroll = $(window).scrollTop();                       // 550
          $module.scrollTop(0);                                        // 551
          window.scrollTo(0, 0);                                       // 552
        },                                                             //
                                                                       //
        scrollBack: function () {                                      // 555
          module.verbose('Scrolling back to original page position');  // 556
          window.scrollTo(0, currentScroll);                           // 557
        },                                                             //
                                                                       //
        clear: {                                                       // 560
          cache: function () {                                         // 561
            module.verbose('Clearing cached dimensions');              // 562
            module.cache = {};                                         // 563
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 567
                                                                       //
          // ios only (scroll on html not document). This prevent auto-resize canvas/scroll in ios
          ios: function () {                                           // 570
            $html.addClass(className.ios);                             // 571
          },                                                           //
                                                                       //
          // container                                                 //
          pushed: function () {                                        // 575
            $context.addClass(className.pushed);                       // 576
          },                                                           //
          pushable: function () {                                      // 578
            $context.addClass(className.pushable);                     // 579
          },                                                           //
                                                                       //
          // pusher                                                    //
          dimmed: function () {                                        // 583
            $pusher.addClass(className.dimmed);                        // 584
          },                                                           //
                                                                       //
          // sidebar                                                   //
          active: function () {                                        // 588
            $module.addClass(className.active);                        // 589
          },                                                           //
          animating: function () {                                     // 591
            $module.addClass(className.animating);                     // 592
          },                                                           //
          transition: function (transition) {                          // 594
            transition = transition || module.get.transition();        // 595
            $module.addClass(transition);                              // 596
          },                                                           //
          direction: function (direction) {                            // 598
            direction = direction || module.get.direction();           // 599
            $module.addClass(className[direction]);                    // 600
          },                                                           //
          visible: function () {                                       // 602
            $module.addClass(className.visible);                       // 603
          },                                                           //
          overlay: function () {                                       // 605
            $module.addClass(className.overlay);                       // 606
          }                                                            //
        },                                                             //
        remove: {                                                      // 609
                                                                       //
          inlineCSS: function () {                                     // 611
            module.debug('Removing inline css styles', $style);        // 612
            if ($style && $style.length > 0) {                         // 613
              $style.remove();                                         // 614
            }                                                          //
          },                                                           //
                                                                       //
          // ios scroll on html not document                           //
          ios: function () {                                           // 619
            $html.removeClass(className.ios);                          // 620
          },                                                           //
                                                                       //
          // context                                                   //
          pushed: function () {                                        // 624
            $context.removeClass(className.pushed);                    // 625
          },                                                           //
          pushable: function () {                                      // 627
            $context.removeClass(className.pushable);                  // 628
          },                                                           //
                                                                       //
          // sidebar                                                   //
          active: function () {                                        // 632
            $module.removeClass(className.active);                     // 633
          },                                                           //
          animating: function () {                                     // 635
            $module.removeClass(className.animating);                  // 636
          },                                                           //
          transition: function (transition) {                          // 638
            transition = transition || module.get.transition();        // 639
            $module.removeClass(transition);                           // 640
          },                                                           //
          direction: function (direction) {                            // 642
            direction = direction || module.get.direction();           // 643
            $module.removeClass(className[direction]);                 // 644
          },                                                           //
          visible: function () {                                       // 646
            $module.removeClass(className.visible);                    // 647
          },                                                           //
          overlay: function () {                                       // 649
            $module.removeClass(className.overlay);                    // 650
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 654
          direction: function () {                                     // 655
            if ($module.hasClass(className.top)) {                     // 656
              return className.top;                                    // 657
            } else if ($module.hasClass(className.right)) {            //
              return className.right;                                  // 660
            } else if ($module.hasClass(className.bottom)) {           //
              return className.bottom;                                 // 663
            }                                                          //
            return className.left;                                     // 665
          },                                                           //
          transition: function () {                                    // 667
            var direction = module.get.direction(),                    // 668
                transition;                                            //
            transition = module.is.mobile() ? settings.mobileTransition == 'auto' ? settings.defaultTransition.mobile[direction] : settings.mobileTransition : settings.transition == 'auto' ? settings.defaultTransition.computer[direction] : settings.transition;
            module.verbose('Determined transition', transition);       // 680
            return transition;                                         // 681
          },                                                           //
          transitionEvent: function () {                               // 683
            var element = document.createElement('element'),           // 684
                transitions = {                                        //
              'transition': 'transitionend',                           // 687
              'OTransition': 'oTransitionEnd',                         // 688
              'MozTransition': 'transitionend',                        // 689
              'WebkitTransition': 'webkitTransitionEnd'                // 690
            },                                                         //
                transition;                                            //
            for (transition in babelHelpers.sanitizeForInObject(transitions)) {
              if (element.style[transition] !== undefined) {           // 695
                return transitions[transition];                        // 696
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 702
                                                                       //
          ie: function () {                                            // 704
            var isIE11 = !window.ActiveXObject && 'ActiveXObject' in window,
                isIE = ('ActiveXObject' in window);                    //
            return isIE11 || isIE;                                     // 709
          },                                                           //
                                                                       //
          ios: function () {                                           // 712
            var userAgent = navigator.userAgent,                       // 713
                isIOS = userAgent.match(regExp.ios),                   //
                isMobileChrome = userAgent.match(regExp.mobileChrome);
            if (isIOS && !isMobileChrome) {                            // 718
              module.verbose('Browser was found to be iOS', userAgent);
              return true;                                             // 720
            } else {                                                   //
              return false;                                            // 723
            }                                                          //
          },                                                           //
          mobile: function () {                                        // 726
            var userAgent = navigator.userAgent,                       // 727
                isMobile = userAgent.match(regExp.mobile);             //
            if (isMobile) {                                            // 731
              module.verbose('Browser was found to be mobile', userAgent);
              return true;                                             // 733
            } else {                                                   //
              module.verbose('Browser is not mobile, using regular transition', userAgent);
              return false;                                            // 737
            }                                                          //
          },                                                           //
          hidden: function () {                                        // 740
            return !module.is.visible();                               // 741
          },                                                           //
          visible: function () {                                       // 743
            return $module.hasClass(className.visible);                // 744
          },                                                           //
          // alias                                                     //
          open: function () {                                          // 747
            return module.is.visible();                                // 748
          },                                                           //
          closed: function () {                                        // 750
            return module.is.hidden();                                 // 751
          },                                                           //
          vertical: function () {                                      // 753
            return $module.hasClass(className.top);                    // 754
          },                                                           //
          animating: function () {                                     // 756
            return $context.hasClass(className.animating);             // 757
          },                                                           //
          rtl: function () {                                           // 759
            if (module.cache.rtl === undefined) {                      // 760
              module.cache.rtl = $module.css('direction') == 'rtl';    // 761
            }                                                          //
            return module.cache.rtl;                                   // 763
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 767
          module.debug('Changing setting', name, value);               // 768
          if ($.isPlainObject(name)) {                                 // 769
            $.extend(true, settings, name);                            // 770
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 773
          } else {                                                     //
            return settings[name];                                     // 776
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 779
          if ($.isPlainObject(name)) {                                 // 780
            $.extend(true, module, name);                              // 781
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 784
          } else {                                                     //
            return module[name];                                       // 787
          }                                                            //
        },                                                             //
        debug: function () {                                           // 790
          if (settings.debug) {                                        // 791
            if (settings.performance) {                                // 792
              module.performance.log(arguments);                       // 793
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 797
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 801
          if (settings.verbose && settings.debug) {                    // 802
            if (settings.performance) {                                // 803
              module.performance.log(arguments);                       // 804
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 808
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 812
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 814
        },                                                             //
        performance: {                                                 // 816
          log: function (message) {                                    // 817
            var currentTime, executionTime, previousTime;              // 818
            if (settings.performance) {                                // 823
              currentTime = new Date().getTime();                      // 824
              previousTime = time || currentTime;                      // 825
              executionTime = currentTime - previousTime;              // 826
              time = currentTime;                                      // 827
              performance.push({                                       // 828
                'Name': message[0],                                    // 829
                'Arguments': [].slice.call(message, 1) || '',          // 830
                'Element': element,                                    // 831
                'Execution Time': executionTime                        // 832
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 835
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 838
            var title = settings.name + ':',                           // 839
                totalTime = 0;                                         //
            time = false;                                              // 843
            clearTimeout(module.performance.timer);                    // 844
            $.each(performance, function (index, data) {               // 845
              totalTime += data['Execution Time'];                     // 846
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 848
            if (moduleSelector) {                                      // 849
              title += ' \'' + moduleSelector + '\'';                  // 850
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 853
              if (console.table) {                                     // 854
                console.table(performance);                            // 855
              } else {                                                 //
                $.each(performance, function (index, data) {           // 858
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 862
            }                                                          //
            performance = [];                                          // 864
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 867
          var object = instance,                                       // 868
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 874
          context = element || context;                                // 875
          if (typeof query == 'string' && object !== undefined) {      // 876
            query = query.split(/[\. ]/);                              // 877
            maxDepth = query.length - 1;                               // 878
            $.each(query, function (depth, value) {                    // 879
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 885
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 888
                return false;                                          // 889
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 892
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 895
                return false;                                          // 896
              } else {                                                 //
                module.error(error.method, query);                     // 899
                return false;                                          // 900
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 904
            response = found.apply(context, passedArguments);          // 905
          } else if (found !== undefined) {                            //
            response = found;                                          // 908
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 910
            returnedValue.push(response);                              // 911
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 914
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 917
          }                                                            //
          return found;                                                // 919
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 924
        if (instance === undefined) {                                  // 925
          module.initialize();                                         // 926
        }                                                              //
        module.invoke(query);                                          // 928
      } else {                                                         //
        if (instance !== undefined) {                                  // 931
          module.invoke('destroy');                                    // 932
        }                                                              //
        module.initialize();                                           // 934
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 938
  };                                                                   //
                                                                       //
  $.fn.sidebar.settings = {                                            // 944
                                                                       //
    name: 'Sidebar',                                                   // 946
    namespace: 'sidebar',                                              // 947
                                                                       //
    debug: false,                                                      // 949
    verbose: false,                                                    // 950
    performance: true,                                                 // 951
                                                                       //
    transition: 'auto',                                                // 953
    mobileTransition: 'auto',                                          // 954
                                                                       //
    defaultTransition: {                                               // 956
      computer: {                                                      // 957
        left: 'uncover',                                               // 958
        right: 'uncover',                                              // 959
        top: 'overlay',                                                // 960
        bottom: 'overlay'                                              // 961
      },                                                               //
      mobile: {                                                        // 963
        left: 'uncover',                                               // 964
        right: 'uncover',                                              // 965
        top: 'overlay',                                                // 966
        bottom: 'overlay'                                              // 967
      }                                                                //
    },                                                                 //
                                                                       //
    context: 'body',                                                   // 971
    exclusive: false,                                                  // 972
    closable: true,                                                    // 973
    dimPage: true,                                                     // 974
    scrollLock: false,                                                 // 975
    returnScroll: false,                                               // 976
    delaySetup: false,                                                 // 977
                                                                       //
    duration: 500,                                                     // 979
                                                                       //
    onChange: function () {},                                          // 981
    onShow: function () {},                                            // 982
    onHide: function () {},                                            // 983
                                                                       //
    onHidden: function () {},                                          // 985
    onVisible: function () {},                                         // 986
                                                                       //
    className: {                                                       // 988
      active: 'active',                                                // 989
      animating: 'animating',                                          // 990
      dimmed: 'dimmed',                                                // 991
      ios: 'ios',                                                      // 992
      pushable: 'pushable',                                            // 993
      pushed: 'pushed',                                                // 994
      right: 'right',                                                  // 995
      top: 'top',                                                      // 996
      left: 'left',                                                    // 997
      bottom: 'bottom',                                                // 998
      visible: 'visible'                                               // 999
    },                                                                 //
                                                                       //
    selector: {                                                        // 1002
      fixed: '.fixed',                                                 // 1003
      omitted: 'script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed',
      pusher: '.pusher',                                               // 1005
      sidebar: '.ui.sidebar'                                           // 1006
    },                                                                 //
                                                                       //
    regExp: {                                                          // 1009
      ios: /(iPad|iPhone|iPod)/g,                                      // 1010
      mobileChrome: /(CriOS)/g,                                        // 1011
      mobile: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g
    },                                                                 //
                                                                       //
    error: {                                                           // 1015
      method: 'The method you called is not defined.',                 // 1016
      pusher: 'Had to add pusher element. For optimal performance make sure body content is inside a pusher element',
      movedSidebar: 'Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag',
      overlay: 'The overlay setting is no longer supported, use animation: overlay',
      notFound: 'There were no elements that matched the specified selector'
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
