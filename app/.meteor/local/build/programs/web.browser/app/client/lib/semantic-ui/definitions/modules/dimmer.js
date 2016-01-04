(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/dimmer.js                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Dimmer                                              //
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
  $.fn.dimmer = function (parameters) {                                // 20
    var $allModules = $(this),                                         // 21
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 34
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.dimmer.settings, parameters) : $.extend({}, $.fn.dimmer.settings),
          selector = settings.selector,                                //
          namespace = settings.namespace,                              //
          className = settings.className,                              //
          error = settings.error,                                      //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          moduleSelector = $allModules.selector || '',                 //
          clickEvent = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click',
          $module = $(this),                                           //
          $dimmer,                                                     //
          $dimmable,                                                   //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 63
                                                                       //
        preinitialize: function () {                                   // 65
          if (module.is.dimmer()) {                                    // 66
                                                                       //
            $dimmable = $module.parent();                              // 68
            $dimmer = $module;                                         // 69
          } else {                                                     //
            $dimmable = $module;                                       // 72
            if (module.has.dimmer()) {                                 // 73
              if (settings.dimmerName) {                               // 74
                $dimmer = $dimmable.find(selector.dimmer).filter('.' + settings.dimmerName);
              } else {                                                 //
                $dimmer = $dimmable.find(selector.dimmer);             // 78
              }                                                        //
            } else {                                                   //
              $dimmer = module.create();                               // 82
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        initialize: function () {                                      // 87
          module.debug('Initializing dimmer', settings);               // 88
                                                                       //
          module.bind.events();                                        // 90
          module.set.dimmable();                                       // 91
          module.instantiate();                                        // 92
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 95
          module.verbose('Storing instance of module', module);        // 96
          instance = module;                                           // 97
          $module.data(moduleNamespace, instance);                     // 98
        },                                                             //
                                                                       //
        destroy: function () {                                         // 103
          module.verbose('Destroying previous module', $dimmer);       // 104
          module.unbind.events();                                      // 105
          module.remove.variation();                                   // 106
          $dimmable.off(eventNamespace);                               // 107
        },                                                             //
                                                                       //
        bind: {                                                        // 112
          events: function () {                                        // 113
            if (settings.on == 'hover') {                              // 114
              $dimmable.on('mouseenter' + eventNamespace, module.show).on('mouseleave' + eventNamespace, module.hide);
            } else if (settings.on == 'click') {                       //
              $dimmable.on(clickEvent + eventNamespace, module.toggle);
            }                                                          //
            if (module.is.page()) {                                    // 125
              module.debug('Setting as a page dimmer', $dimmable);     // 126
              module.set.pageDimmer();                                 // 127
            }                                                          //
                                                                       //
            if (module.is.closable()) {                                // 130
              module.verbose('Adding dimmer close event', $dimmer);    // 131
              $dimmable.on(clickEvent + eventNamespace, selector.dimmer, module.event.click);
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        unbind: {                                                      // 139
          events: function () {                                        // 140
            $module.removeData(moduleNamespace);                       // 141
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 147
          click: function (event) {                                    // 148
            module.verbose('Determining if event occured on dimmer', event);
            if ($dimmer.find(event.target).length === 0 || $(event.target).is(selector.content)) {
              module.hide();                                           // 151
              event.stopImmediatePropagation();                        // 152
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        addContent: function (element) {                               // 157
          var $content = $(element);                                   // 158
          module.debug('Add content to dimmer', $content);             // 161
          if ($content.parent()[0] !== $dimmer[0]) {                   // 162
            $content.detach().appendTo($dimmer);                       // 163
          }                                                            //
        },                                                             //
                                                                       //
        create: function () {                                          // 167
          var $element = $(settings.template.dimmer());                // 168
          if (settings.variation) {                                    // 171
            module.debug('Creating dimmer with variation', settings.variation);
            $element.addClass(settings.variation);                     // 173
          }                                                            //
          if (settings.dimmerName) {                                   // 175
            module.debug('Creating named dimmer', settings.dimmerName);
            $element.addClass(settings.dimmerName);                    // 177
          }                                                            //
          $element.appendTo($dimmable);                                // 179
          return $element;                                             // 182
        },                                                             //
                                                                       //
        show: function (callback) {                                    // 185
          callback = $.isFunction(callback) ? callback : function () {};
          module.debug('Showing dimmer', $dimmer, settings);           // 190
          if ((!module.is.dimmed() || module.is.animating()) && module.is.enabled()) {
            module.animate.show(callback);                             // 192
            settings.onShow.call(element);                             // 193
            settings.onChange.call(element);                           // 194
          } else {                                                     //
            module.debug('Dimmer is already shown or disabled');       // 197
          }                                                            //
        },                                                             //
                                                                       //
        hide: function (callback) {                                    // 201
          callback = $.isFunction(callback) ? callback : function () {};
          if (module.is.dimmed() || module.is.animating()) {           // 206
            module.debug('Hiding dimmer', $dimmer);                    // 207
            module.animate.hide(callback);                             // 208
            settings.onHide.call(element);                             // 209
            settings.onChange.call(element);                           // 210
          } else {                                                     //
            module.debug('Dimmer is not visible');                     // 213
          }                                                            //
        },                                                             //
                                                                       //
        toggle: function () {                                          // 217
          module.verbose('Toggling dimmer visibility', $dimmer);       // 218
          if (!module.is.dimmed()) {                                   // 219
            module.show();                                             // 220
          } else {                                                     //
            module.hide();                                             // 223
          }                                                            //
        },                                                             //
                                                                       //
        animate: {                                                     // 227
          show: function (callback) {                                  // 228
            callback = $.isFunction(callback) ? callback : function () {};
            if (settings.useCSS && $.fn.transition !== undefined && $dimmer.transition('is supported')) {
              if (settings.opacity !== 'auto') {                       // 234
                module.set.opacity();                                  // 235
              }                                                        //
              $dimmer.transition({                                     // 237
                animation: settings.transition + ' in',                // 239
                queue: false,                                          // 240
                duration: module.get.duration(),                       // 241
                useFailSafe: true,                                     // 242
                onStart: function () {                                 // 243
                  module.set.dimmed();                                 // 244
                },                                                     //
                onComplete: function () {                              // 246
                  module.set.active();                                 // 247
                  callback();                                          // 248
                }                                                      //
              });                                                      //
            } else {                                                   //
              module.verbose('Showing dimmer animation with javascript');
              module.set.dimmed();                                     // 255
              if (settings.opacity == 'auto') {                        // 256
                settings.opacity = 0.8;                                // 257
              }                                                        //
              $dimmer.stop().css({                                     // 259
                opacity: 0,                                            // 262
                width: '100%',                                         // 263
                height: '100%'                                         // 264
              }).fadeTo(module.get.duration(), settings.opacity, function () {
                $dimmer.removeAttr('style');                           // 267
                module.set.active();                                   // 268
                callback();                                            // 269
              });                                                      //
            }                                                          //
          },                                                           //
          hide: function (callback) {                                  // 274
            callback = $.isFunction(callback) ? callback : function () {};
            if (settings.useCSS && $.fn.transition !== undefined && $dimmer.transition('is supported')) {
              module.verbose('Hiding dimmer with css');                // 280
              $dimmer.transition({                                     // 281
                animation: settings.transition + ' out',               // 283
                queue: false,                                          // 284
                duration: module.get.duration(),                       // 285
                useFailSafe: true,                                     // 286
                onStart: function () {                                 // 287
                  module.remove.dimmed();                              // 288
                },                                                     //
                onComplete: function () {                              // 290
                  module.remove.active();                              // 291
                  callback();                                          // 292
                }                                                      //
              });                                                      //
            } else {                                                   //
              module.verbose('Hiding dimmer with javascript');         // 298
              module.remove.dimmed();                                  // 299
              $dimmer.stop().fadeOut(module.get.duration(), function () {
                module.remove.active();                                // 303
                $dimmer.removeAttr('style');                           // 304
                callback();                                            // 305
              });                                                      //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 312
          dimmer: function () {                                        // 313
            return $dimmer;                                            // 314
          },                                                           //
          duration: function () {                                      // 316
            if (typeof settings.duration == 'object') {                // 317
              if (module.is.active()) {                                // 318
                return settings.duration.hide;                         // 319
              } else {                                                 //
                return settings.duration.show;                         // 322
              }                                                        //
            }                                                          //
            return settings.duration;                                  // 325
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 329
          dimmer: function () {                                        // 330
            if (settings.dimmerName) {                                 // 331
              return $module.find(selector.dimmer).filter('.' + settings.dimmerName).length > 0;
            } else {                                                   //
              return $module.find(selector.dimmer).length > 0;         // 335
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 340
          active: function () {                                        // 341
            return $dimmer.hasClass(className.active);                 // 342
          },                                                           //
          animating: function () {                                     // 344
            return $dimmer.is(':animated') || $dimmer.hasClass(className.animating);
          },                                                           //
          closable: function () {                                      // 347
            if (settings.closable == 'auto') {                         // 348
              if (settings.on == 'hover') {                            // 349
                return false;                                          // 350
              }                                                        //
              return true;                                             // 352
            }                                                          //
            return settings.closable;                                  // 354
          },                                                           //
          dimmer: function () {                                        // 356
            return $module.hasClass(className.dimmer);                 // 357
          },                                                           //
          dimmable: function () {                                      // 359
            return $module.hasClass(className.dimmable);               // 360
          },                                                           //
          dimmed: function () {                                        // 362
            return $dimmable.hasClass(className.dimmed);               // 363
          },                                                           //
          disabled: function () {                                      // 365
            return $dimmable.hasClass(className.disabled);             // 366
          },                                                           //
          enabled: function () {                                       // 368
            return !module.is.disabled();                              // 369
          },                                                           //
          page: function () {                                          // 371
            return $dimmable.is('body');                               // 372
          },                                                           //
          pageDimmer: function () {                                    // 374
            return $dimmer.hasClass(className.pageDimmer);             // 375
          }                                                            //
        },                                                             //
                                                                       //
        can: {                                                         // 379
          show: function () {                                          // 380
            return !$dimmer.hasClass(className.disabled);              // 381
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 385
          opacity: function (opacity) {                                // 386
            var color = $dimmer.css('background-color'),               // 387
                colorArray = color.split(','),                         //
                isRGBA = colorArray && colorArray.length == 4;         //
            opacity = settings.opacity === 0 ? 0 : settings.opacity || opacity;
            if (isRGBA) {                                              // 393
              colorArray[3] = opacity + ')';                           // 394
              color = colorArray.join(',');                            // 395
            } else {                                                   //
              color = 'rgba(0, 0, 0, ' + opacity + ')';                // 398
            }                                                          //
            module.debug('Setting opacity to', opacity);               // 400
            $dimmer.css('background-color', color);                    // 401
          },                                                           //
          active: function () {                                        // 403
            $dimmer.addClass(className.active);                        // 404
          },                                                           //
          dimmable: function () {                                      // 406
            $dimmable.addClass(className.dimmable);                    // 407
          },                                                           //
          dimmed: function () {                                        // 409
            $dimmable.addClass(className.dimmed);                      // 410
          },                                                           //
          pageDimmer: function () {                                    // 412
            $dimmer.addClass(className.pageDimmer);                    // 413
          },                                                           //
          disabled: function () {                                      // 415
            $dimmer.addClass(className.disabled);                      // 416
          },                                                           //
          variation: function (variation) {                            // 418
            variation = variation || settings.variation;               // 419
            if (variation) {                                           // 420
              $dimmer.addClass(variation);                             // 421
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 426
          active: function () {                                        // 427
            $dimmer.removeClass(className.active);                     // 428
          },                                                           //
          dimmed: function () {                                        // 432
            $dimmable.removeClass(className.dimmed);                   // 433
          },                                                           //
          disabled: function () {                                      // 435
            $dimmer.removeClass(className.disabled);                   // 436
          },                                                           //
          variation: function (variation) {                            // 438
            variation = variation || settings.variation;               // 439
            if (variation) {                                           // 440
              $dimmer.removeClass(variation);                          // 441
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 446
          module.debug('Changing setting', name, value);               // 447
          if ($.isPlainObject(name)) {                                 // 448
            $.extend(true, settings, name);                            // 449
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 452
          } else {                                                     //
            return settings[name];                                     // 455
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 458
          if ($.isPlainObject(name)) {                                 // 459
            $.extend(true, module, name);                              // 460
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 463
          } else {                                                     //
            return module[name];                                       // 466
          }                                                            //
        },                                                             //
        debug: function () {                                           // 469
          if (settings.debug) {                                        // 470
            if (settings.performance) {                                // 471
              module.performance.log(arguments);                       // 472
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 476
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 480
          if (settings.verbose && settings.debug) {                    // 481
            if (settings.performance) {                                // 482
              module.performance.log(arguments);                       // 483
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 487
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 491
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 493
        },                                                             //
        performance: {                                                 // 495
          log: function (message) {                                    // 496
            var currentTime, executionTime, previousTime;              // 497
            if (settings.performance) {                                // 502
              currentTime = new Date().getTime();                      // 503
              previousTime = time || currentTime;                      // 504
              executionTime = currentTime - previousTime;              // 505
              time = currentTime;                                      // 506
              performance.push({                                       // 507
                'Name': message[0],                                    // 508
                'Arguments': [].slice.call(message, 1) || '',          // 509
                'Element': element,                                    // 510
                'Execution Time': executionTime                        // 511
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 514
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 517
            var title = settings.name + ':',                           // 518
                totalTime = 0;                                         //
            time = false;                                              // 522
            clearTimeout(module.performance.timer);                    // 523
            $.each(performance, function (index, data) {               // 524
              totalTime += data['Execution Time'];                     // 525
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 527
            if (moduleSelector) {                                      // 528
              title += ' \'' + moduleSelector + '\'';                  // 529
            }                                                          //
            if ($allModules.length > 1) {                              // 531
              title += ' ' + '(' + $allModules.length + ')';           // 532
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 535
              if (console.table) {                                     // 536
                console.table(performance);                            // 537
              } else {                                                 //
                $.each(performance, function (index, data) {           // 540
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 544
            }                                                          //
            performance = [];                                          // 546
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 549
          var object = instance,                                       // 550
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 556
          context = element || context;                                // 557
          if (typeof query == 'string' && object !== undefined) {      // 558
            query = query.split(/[\. ]/);                              // 559
            maxDepth = query.length - 1;                               // 560
            $.each(query, function (depth, value) {                    // 561
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 567
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 570
                return false;                                          // 571
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 574
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 577
                return false;                                          // 578
              } else {                                                 //
                module.error(error.method, query);                     // 581
                return false;                                          // 582
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 586
            response = found.apply(context, passedArguments);          // 587
          } else if (found !== undefined) {                            //
            response = found;                                          // 590
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 592
            returnedValue.push(response);                              // 593
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 596
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 599
          }                                                            //
          return found;                                                // 601
        }                                                              //
      };                                                               //
                                                                       //
      module.preinitialize();                                          // 605
                                                                       //
      if (methodInvoked) {                                             // 607
        if (instance === undefined) {                                  // 608
          module.initialize();                                         // 609
        }                                                              //
        module.invoke(query);                                          // 611
      } else {                                                         //
        if (instance !== undefined) {                                  // 614
          instance.invoke('destroy');                                  // 615
        }                                                              //
        module.initialize();                                           // 617
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 622
  };                                                                   //
                                                                       //
  $.fn.dimmer.settings = {                                             // 628
                                                                       //
    name: 'Dimmer',                                                    // 630
    namespace: 'dimmer',                                               // 631
                                                                       //
    debug: false,                                                      // 633
    verbose: false,                                                    // 634
    performance: true,                                                 // 635
                                                                       //
    // name to distinguish between multiple dimmers in context         //
    dimmerName: false,                                                 // 638
                                                                       //
    // whether to add a variation type                                 //
    variation: false,                                                  // 641
                                                                       //
    // whether to bind close events                                    //
    closable: 'auto',                                                  // 644
                                                                       //
    // whether to use css animations                                   //
    useCSS: true,                                                      // 647
                                                                       //
    // css animation to use                                            //
    transition: 'fade',                                                // 650
                                                                       //
    // event to bind to                                                //
    on: false,                                                         // 653
                                                                       //
    // overriding opacity value                                        //
    opacity: 'auto',                                                   // 656
                                                                       //
    // transition durations                                            //
    duration: {                                                        // 659
      show: 500,                                                       // 660
      hide: 500                                                        // 661
    },                                                                 //
                                                                       //
    onChange: function () {},                                          // 664
    onShow: function () {},                                            // 665
    onHide: function () {},                                            // 666
                                                                       //
    error: {                                                           // 668
      method: 'The method you called is not defined.'                  // 669
    },                                                                 //
                                                                       //
    className: {                                                       // 672
      active: 'active',                                                // 673
      animating: 'animating',                                          // 674
      dimmable: 'dimmable',                                            // 675
      dimmed: 'dimmed',                                                // 676
      dimmer: 'dimmer',                                                // 677
      disabled: 'disabled',                                            // 678
      hide: 'hide',                                                    // 679
      pageDimmer: 'page',                                              // 680
      show: 'show'                                                     // 681
    },                                                                 //
                                                                       //
    selector: {                                                        // 684
      dimmer: '> .ui.dimmer',                                          // 685
      content: '.ui.dimmer > .content, .ui.dimmer > .content > .center'
    },                                                                 //
                                                                       //
    template: {                                                        // 689
      dimmer: function () {                                            // 690
        return $('<div />').attr('class', 'ui dimmer');                // 691
      }                                                                //
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
