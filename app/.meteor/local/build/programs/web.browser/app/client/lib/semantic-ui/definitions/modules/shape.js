(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/shape.js                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Shape                                               //
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
  $.fn.shape = function (parameters) {                                 // 20
    var $allModules = $(this),                                         // 21
        $body = $('body'),                                             //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      setTimeout(callback, 0);                                         // 36
    },                                                                 //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 41
      var moduleSelector = $allModules.selector || '',                 // 43
          settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.shape.settings, parameters) : $.extend({}, $.fn.shape.settings),
                                                                       //
      // internal aliases                                              //
      namespace = settings.namespace,                                  // 50
          selector = settings.selector,                                //
          error = settings.error,                                      //
          className = settings.className,                              //
                                                                       //
      // define namespaces for modules                                 //
      eventNamespace = '.' + namespace,                                // 56
          moduleNamespace = 'module-' + namespace,                     //
                                                                       //
      // selector cache                                                //
      $module = $(this),                                               // 60
          $sides = $module.find(selector.sides),                       //
          $side = $module.find(selector.side),                         //
                                                                       //
      // private variables                                             //
      nextIndex = false,                                               // 65
          $activeSide,                                                 //
          $nextSide,                                                   //
                                                                       //
      // standard module                                               //
      element = this,                                                  // 70
          instance = $module.data(moduleNamespace),                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 75
                                                                       //
        initialize: function () {                                      // 77
          module.verbose('Initializing module for', element);          // 78
          module.set.defaultSide();                                    // 79
          module.instantiate();                                        // 80
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 83
          module.verbose('Storing instance of module', module);        // 84
          instance = module;                                           // 85
          $module.data(moduleNamespace, instance);                     // 86
        },                                                             //
                                                                       //
        destroy: function () {                                         // 91
          module.verbose('Destroying previous module for', element);   // 92
          $module.removeData(moduleNamespace).off(eventNamespace);     // 93
        },                                                             //
                                                                       //
        refresh: function () {                                         // 99
          module.verbose('Refreshing selector cache for', element);    // 100
          $module = $(element);                                        // 101
          $sides = $(this).find(selector.shape);                       // 102
          $side = $(this).find(selector.side);                         // 103
        },                                                             //
                                                                       //
        repaint: function () {                                         // 106
          module.verbose('Forcing repaint event');                     // 107
          var shape = $sides[0] || document.createElement('div'),      // 108
              fakeAssignment = shape.offsetWidth;                      //
        },                                                             //
                                                                       //
        animate: function (propertyObject, callback) {                 // 114
          module.verbose('Animating box with properties', propertyObject);
          callback = callback || function (event) {                    // 116
            module.verbose('Executing animation callback');            // 117
            if (event !== undefined) {                                 // 118
              event.stopPropagation();                                 // 119
            }                                                          //
            module.reset();                                            // 121
            module.set.active();                                       // 122
          };                                                           //
          settings.beforeChange.call($nextSide[0]);                    // 124
          if (module.get.transitionEvent()) {                          // 125
            module.verbose('Starting CSS animation');                  // 126
            $module.addClass(className.animating);                     // 127
            $sides.css(propertyObject).one(module.get.transitionEvent(), callback);
            module.set.duration(settings.duration);                    // 134
            requestAnimationFrame(function () {                        // 135
              $module.addClass(className.animating);                   // 136
              $activeSide.addClass(className.hidden);                  // 139
            });                                                        //
          } else {                                                     //
            callback();                                                // 145
          }                                                            //
        },                                                             //
                                                                       //
        queue: function (method) {                                     // 149
          module.debug('Queueing animation of', method);               // 150
          $sides.one(module.get.transitionEvent(), function () {       // 151
            module.debug('Executing queued animation');                // 153
            setTimeout(function () {                                   // 154
              $module.shape(method);                                   // 155
            }, 0);                                                     //
          });                                                          //
        },                                                             //
                                                                       //
        reset: function () {                                           // 161
          module.verbose('Animating states reset');                    // 162
          $module.removeClass(className.animating).attr('style', '').removeAttr('style');
          // removeAttr style does not consistently work in safari     //
          $sides.attr('style', '').removeAttr('style');                // 169
          $side.attr('style', '').removeAttr('style').removeClass(className.hidden);
          $nextSide.removeClass(className.animating).attr('style', '').removeAttr('style');
        },                                                             //
                                                                       //
        is: {                                                          // 185
          complete: function () {                                      // 186
            return $side.filter('.' + className.active)[0] == $nextSide[0];
          },                                                           //
          animating: function () {                                     // 189
            return $module.hasClass(className.animating);              // 190
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 194
                                                                       //
          defaultSide: function () {                                   // 196
            $activeSide = $module.find('.' + settings.className.active);
            $nextSide = $activeSide.next(selector.side).length > 0 ? $activeSide.next(selector.side) : $module.find(selector.side).first();
            nextIndex = false;                                         // 202
            module.verbose('Active side set to', $activeSide);         // 203
            module.verbose('Next side set to', $nextSide);             // 204
          },                                                           //
                                                                       //
          duration: function (duration) {                              // 207
            duration = duration || settings.duration;                  // 208
            duration = typeof duration == 'number' ? duration + 'ms' : duration;
            module.verbose('Setting animation duration', duration);    // 213
            if (settings.duration || settings.duration === 0) {        // 214
              $sides.add($side).css({                                  // 215
                '-webkit-transition-duration': duration,               // 217
                '-moz-transition-duration': duration,                  // 218
                '-ms-transition-duration': duration,                   // 219
                '-o-transition-duration': duration,                    // 220
                'transition-duration': duration                        // 221
              });                                                      //
            }                                                          //
          },                                                           //
                                                                       //
          currentStageSize: function () {                              // 227
            var $activeSide = $module.find('.' + settings.className.active),
                width = $activeSide.outerWidth(true),                  //
                height = $activeSide.outerHeight(true);                //
            $module.css({                                              // 233
              width: width,                                            // 235
              height: height                                           // 236
            });                                                        //
          },                                                           //
                                                                       //
          stageSize: function () {                                     // 241
            var $clone = $module.clone().addClass(className.loading),  // 242
                $activeSide = $clone.find('.' + settings.className.active),
                $nextSide = nextIndex ? $clone.find(selector.side).eq(nextIndex) : $activeSide.next(selector.side).length > 0 ? $activeSide.next(selector.side) : $clone.find(selector.side).first(),
                newSize = {};                                          //
            module.set.currentStageSize();                             // 252
            $activeSide.removeClass(className.active);                 // 253
            $nextSide.addClass(className.active);                      // 254
            $clone.insertAfter($module);                               // 255
            newSize = {                                                // 256
              width: $nextSide.outerWidth(true),                       // 257
              height: $nextSide.outerHeight(true)                      // 258
            };                                                         //
            $clone.remove();                                           // 260
            $module.css(newSize);                                      // 261
            module.verbose('Resizing stage to fit new content', newSize);
          },                                                           //
                                                                       //
          nextSide: function (selector) {                              // 267
            nextIndex = selector;                                      // 268
            $nextSide = $side.filter(selector);                        // 269
            nextIndex = $side.index($nextSide);                        // 270
            if ($nextSide.length === 0) {                              // 271
              module.set.defaultSide();                                // 272
              module.error(error.side);                                // 273
            }                                                          //
            module.verbose('Next side manually set to', $nextSide);    // 275
          },                                                           //
                                                                       //
          active: function () {                                        // 278
            module.verbose('Setting new side to active', $nextSide);   // 279
            $side.removeClass(className.active);                       // 280
            $nextSide.addClass(className.active);                      // 283
            settings.onChange.call($nextSide[0]);                      // 286
            module.set.defaultSide();                                  // 287
          }                                                            //
        },                                                             //
                                                                       //
        flip: {                                                        // 291
                                                                       //
          up: function () {                                            // 293
            if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);         // 295
              return;                                                  // 296
            }                                                          //
            if (!module.is.animating()) {                              // 298
              module.debug('Flipping up', $nextSide);                  // 299
              module.set.stageSize();                                  // 300
              module.stage.above();                                    // 301
              module.animate(module.get.transform.up());               // 302
            } else {                                                   //
              module.queue('flip up');                                 // 305
            }                                                          //
          },                                                           //
                                                                       //
          down: function () {                                          // 309
            if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);         // 311
              return;                                                  // 312
            }                                                          //
            if (!module.is.animating()) {                              // 314
              module.debug('Flipping down', $nextSide);                // 315
              module.set.stageSize();                                  // 316
              module.stage.below();                                    // 317
              module.animate(module.get.transform.down());             // 318
            } else {                                                   //
              module.queue('flip down');                               // 321
            }                                                          //
          },                                                           //
                                                                       //
          left: function () {                                          // 325
            if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);         // 327
              return;                                                  // 328
            }                                                          //
            if (!module.is.animating()) {                              // 330
              module.debug('Flipping left', $nextSide);                // 331
              module.set.stageSize();                                  // 332
              module.stage.left();                                     // 333
              module.animate(module.get.transform.left());             // 334
            } else {                                                   //
              module.queue('flip left');                               // 337
            }                                                          //
          },                                                           //
                                                                       //
          right: function () {                                         // 341
            if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);         // 343
              return;                                                  // 344
            }                                                          //
            if (!module.is.animating()) {                              // 346
              module.debug('Flipping right', $nextSide);               // 347
              module.set.stageSize();                                  // 348
              module.stage.right();                                    // 349
              module.animate(module.get.transform.right());            // 350
            } else {                                                   //
              module.queue('flip right');                              // 353
            }                                                          //
          },                                                           //
                                                                       //
          over: function () {                                          // 357
            if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);         // 359
              return;                                                  // 360
            }                                                          //
            if (!module.is.animating()) {                              // 362
              module.debug('Flipping over', $nextSide);                // 363
              module.set.stageSize();                                  // 364
              module.stage.behind();                                   // 365
              module.animate(module.get.transform.over());             // 366
            } else {                                                   //
              module.queue('flip over');                               // 369
            }                                                          //
          },                                                           //
                                                                       //
          back: function () {                                          // 373
            if (module.is.complete() && !module.is.animating() && !settings.allowRepeats) {
              module.debug('Side already visible', $nextSide);         // 375
              return;                                                  // 376
            }                                                          //
            if (!module.is.animating()) {                              // 378
              module.debug('Flipping back', $nextSide);                // 379
              module.set.stageSize();                                  // 380
              module.stage.behind();                                   // 381
              module.animate(module.get.transform.back());             // 382
            } else {                                                   //
              module.queue('flip back');                               // 385
            }                                                          //
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        get: {                                                         // 391
                                                                       //
          transform: {                                                 // 393
            up: function () {                                          // 394
              var translate = {                                        // 395
                y: -(($activeSide.outerHeight(true) - $nextSide.outerHeight(true)) / 2),
                z: -($activeSide.outerHeight(true) / 2)                // 398
              };                                                       //
              return {                                                 // 401
                transform: 'translateY(' + translate.y + 'px) translateZ(' + translate.z + 'px) rotateX(-90deg)'
              };                                                       //
            },                                                         //
                                                                       //
            down: function () {                                        // 406
              var translate = {                                        // 407
                y: -(($activeSide.outerHeight(true) - $nextSide.outerHeight(true)) / 2),
                z: -($activeSide.outerHeight(true) / 2)                // 410
              };                                                       //
              return {                                                 // 413
                transform: 'translateY(' + translate.y + 'px) translateZ(' + translate.z + 'px) rotateX(90deg)'
              };                                                       //
            },                                                         //
                                                                       //
            left: function () {                                        // 418
              var translate = {                                        // 419
                x: -(($activeSide.outerWidth(true) - $nextSide.outerWidth(true)) / 2),
                z: -($activeSide.outerWidth(true) / 2)                 // 422
              };                                                       //
              return {                                                 // 425
                transform: 'translateX(' + translate.x + 'px) translateZ(' + translate.z + 'px) rotateY(90deg)'
              };                                                       //
            },                                                         //
                                                                       //
            right: function () {                                       // 430
              var translate = {                                        // 431
                x: -(($activeSide.outerWidth(true) - $nextSide.outerWidth(true)) / 2),
                z: -($activeSide.outerWidth(true) / 2)                 // 434
              };                                                       //
              return {                                                 // 437
                transform: 'translateX(' + translate.x + 'px) translateZ(' + translate.z + 'px) rotateY(-90deg)'
              };                                                       //
            },                                                         //
                                                                       //
            over: function () {                                        // 442
              var translate = {                                        // 443
                x: -(($activeSide.outerWidth(true) - $nextSide.outerWidth(true)) / 2)
              };                                                       //
              return {                                                 // 448
                transform: 'translateX(' + translate.x + 'px) rotateY(180deg)'
              };                                                       //
            },                                                         //
                                                                       //
            back: function () {                                        // 453
              var translate = {                                        // 454
                x: -(($activeSide.outerWidth(true) - $nextSide.outerWidth(true)) / 2)
              };                                                       //
              return {                                                 // 459
                transform: 'translateX(' + translate.x + 'px) rotateY(-180deg)'
              };                                                       //
            }                                                          //
          },                                                           //
                                                                       //
          transitionEvent: function () {                               // 465
            var element = document.createElement('element'),           // 466
                transitions = {                                        //
              'transition': 'transitionend',                           // 469
              'OTransition': 'oTransitionEnd',                         // 470
              'MozTransition': 'transitionend',                        // 471
              'WebkitTransition': 'webkitTransitionEnd'                // 472
            },                                                         //
                transition;                                            //
            for (transition in babelHelpers.sanitizeForInObject(transitions)) {
              if (element.style[transition] !== undefined) {           // 477
                return transitions[transition];                        // 478
              }                                                        //
            }                                                          //
          },                                                           //
                                                                       //
          nextSide: function () {                                      // 483
            return $activeSide.next(selector.side).length > 0 ? $activeSide.next(selector.side) : $module.find(selector.side).first();
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        stage: {                                                       // 492
                                                                       //
          above: function () {                                         // 494
            var box = {                                                // 495
              origin: ($activeSide.outerHeight(true) - $nextSide.outerHeight(true)) / 2,
              depth: {                                                 // 498
                active: $nextSide.outerHeight(true) / 2,               // 499
                next: $activeSide.outerHeight(true) / 2                // 500
              }                                                        //
            };                                                         //
            module.verbose('Setting the initial animation position as above', $nextSide, box);
            $sides.css({                                               // 505
              'transform': 'translateZ(-' + box.depth.active + 'px)'   // 507
            });                                                        //
            $activeSide.css({                                          // 510
              'transform': 'rotateY(0deg) translateZ(' + box.depth.active + 'px)'
            });                                                        //
            $nextSide.addClass(className.animating).css({              // 515
              'top': box.origin + 'px',                                // 518
              'transform': 'rotateX(90deg) translateZ(' + box.depth.next + 'px)'
            });                                                        //
          },                                                           //
                                                                       //
          below: function () {                                         // 524
            var box = {                                                // 525
              origin: ($activeSide.outerHeight(true) - $nextSide.outerHeight(true)) / 2,
              depth: {                                                 // 528
                active: $nextSide.outerHeight(true) / 2,               // 529
                next: $activeSide.outerHeight(true) / 2                // 530
              }                                                        //
            };                                                         //
            module.verbose('Setting the initial animation position as below', $nextSide, box);
            $sides.css({                                               // 535
              'transform': 'translateZ(-' + box.depth.active + 'px)'   // 537
            });                                                        //
            $activeSide.css({                                          // 540
              'transform': 'rotateY(0deg) translateZ(' + box.depth.active + 'px)'
            });                                                        //
            $nextSide.addClass(className.animating).css({              // 545
              'top': box.origin + 'px',                                // 548
              'transform': 'rotateX(-90deg) translateZ(' + box.depth.next + 'px)'
            });                                                        //
          },                                                           //
                                                                       //
          left: function () {                                          // 554
            var height = {                                             // 555
              active: $activeSide.outerWidth(true),                    // 557
              next: $nextSide.outerWidth(true)                         // 558
            },                                                         //
                box = {                                                //
              origin: (height.active - height.next) / 2,               // 561
              depth: {                                                 // 562
                active: height.next / 2,                               // 563
                next: height.active / 2                                // 564
              }                                                        //
            };                                                         //
            module.verbose('Setting the initial animation position as left', $nextSide, box);
            $sides.css({                                               // 569
              'transform': 'translateZ(-' + box.depth.active + 'px)'   // 571
            });                                                        //
            $activeSide.css({                                          // 574
              'transform': 'rotateY(0deg) translateZ(' + box.depth.active + 'px)'
            });                                                        //
            $nextSide.addClass(className.animating).css({              // 579
              'left': box.origin + 'px',                               // 582
              'transform': 'rotateY(-90deg) translateZ(' + box.depth.next + 'px)'
            });                                                        //
          },                                                           //
                                                                       //
          right: function () {                                         // 588
            var height = {                                             // 589
              active: $activeSide.outerWidth(true),                    // 591
              next: $nextSide.outerWidth(true)                         // 592
            },                                                         //
                box = {                                                //
              origin: (height.active - height.next) / 2,               // 595
              depth: {                                                 // 596
                active: height.next / 2,                               // 597
                next: height.active / 2                                // 598
              }                                                        //
            };                                                         //
            module.verbose('Setting the initial animation position as left', $nextSide, box);
            $sides.css({                                               // 603
              'transform': 'translateZ(-' + box.depth.active + 'px)'   // 605
            });                                                        //
            $activeSide.css({                                          // 608
              'transform': 'rotateY(0deg) translateZ(' + box.depth.active + 'px)'
            });                                                        //
            $nextSide.addClass(className.animating).css({              // 613
              'left': box.origin + 'px',                               // 616
              'transform': 'rotateY(90deg) translateZ(' + box.depth.next + 'px)'
            });                                                        //
          },                                                           //
                                                                       //
          behind: function () {                                        // 622
            var height = {                                             // 623
              active: $activeSide.outerWidth(true),                    // 625
              next: $nextSide.outerWidth(true)                         // 626
            },                                                         //
                box = {                                                //
              origin: (height.active - height.next) / 2,               // 629
              depth: {                                                 // 630
                active: height.next / 2,                               // 631
                next: height.active / 2                                // 632
              }                                                        //
            };                                                         //
            module.verbose('Setting the initial animation position as behind', $nextSide, box);
            $activeSide.css({                                          // 637
              'transform': 'rotateY(0deg)'                             // 639
            });                                                        //
            $nextSide.addClass(className.animating).css({              // 642
              'left': box.origin + 'px',                               // 645
              'transform': 'rotateY(-180deg)'                          // 646
            });                                                        //
          }                                                            //
        },                                                             //
        setting: function (name, value) {                              // 651
          module.debug('Changing setting', name, value);               // 652
          if ($.isPlainObject(name)) {                                 // 653
            $.extend(true, settings, name);                            // 654
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 657
          } else {                                                     //
            return settings[name];                                     // 660
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 663
          if ($.isPlainObject(name)) {                                 // 664
            $.extend(true, module, name);                              // 665
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 668
          } else {                                                     //
            return module[name];                                       // 671
          }                                                            //
        },                                                             //
        debug: function () {                                           // 674
          if (settings.debug) {                                        // 675
            if (settings.performance) {                                // 676
              module.performance.log(arguments);                       // 677
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 681
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 685
          if (settings.verbose && settings.debug) {                    // 686
            if (settings.performance) {                                // 687
              module.performance.log(arguments);                       // 688
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 692
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 696
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 698
        },                                                             //
        performance: {                                                 // 700
          log: function (message) {                                    // 701
            var currentTime, executionTime, previousTime;              // 702
            if (settings.performance) {                                // 707
              currentTime = new Date().getTime();                      // 708
              previousTime = time || currentTime;                      // 709
              executionTime = currentTime - previousTime;              // 710
              time = currentTime;                                      // 711
              performance.push({                                       // 712
                'Name': message[0],                                    // 713
                'Arguments': [].slice.call(message, 1) || '',          // 714
                'Element': element,                                    // 715
                'Execution Time': executionTime                        // 716
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 719
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 722
            var title = settings.name + ':',                           // 723
                totalTime = 0;                                         //
            time = false;                                              // 727
            clearTimeout(module.performance.timer);                    // 728
            $.each(performance, function (index, data) {               // 729
              totalTime += data['Execution Time'];                     // 730
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 732
            if (moduleSelector) {                                      // 733
              title += ' \'' + moduleSelector + '\'';                  // 734
            }                                                          //
            if ($allModules.length > 1) {                              // 736
              title += ' ' + '(' + $allModules.length + ')';           // 737
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 740
              if (console.table) {                                     // 741
                console.table(performance);                            // 742
              } else {                                                 //
                $.each(performance, function (index, data) {           // 745
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 749
            }                                                          //
            performance = [];                                          // 751
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 754
          var object = instance,                                       // 755
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 761
          context = element || context;                                // 762
          if (typeof query == 'string' && object !== undefined) {      // 763
            query = query.split(/[\. ]/);                              // 764
            maxDepth = query.length - 1;                               // 765
            $.each(query, function (depth, value) {                    // 766
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 772
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 775
                return false;                                          // 776
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 779
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 782
                return false;                                          // 783
              } else {                                                 //
                return false;                                          // 786
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 790
            response = found.apply(context, passedArguments);          // 791
          } else if (found !== undefined) {                            //
            response = found;                                          // 794
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 796
            returnedValue.push(response);                              // 797
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 800
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 803
          }                                                            //
          return found;                                                // 805
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 809
        if (instance === undefined) {                                  // 810
          module.initialize();                                         // 811
        }                                                              //
        module.invoke(query);                                          // 813
      } else {                                                         //
        if (instance !== undefined) {                                  // 816
          instance.invoke('destroy');                                  // 817
        }                                                              //
        module.initialize();                                           // 819
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 824
  };                                                                   //
                                                                       //
  $.fn.shape.settings = {                                              // 830
                                                                       //
    // module info                                                     //
    name: 'Shape',                                                     // 833
                                                                       //
    // debug content outputted to console                              //
    debug: false,                                                      // 836
                                                                       //
    // verbose debug output                                            //
    verbose: false,                                                    // 839
                                                                       //
    // performance data output                                         //
    performance: true,                                                 // 842
                                                                       //
    // event namespace                                                 //
    namespace: 'shape',                                                // 845
                                                                       //
    // callback occurs on side change                                  //
    beforeChange: function () {},                                      // 848
    onChange: function () {},                                          // 849
                                                                       //
    // allow animation to same side                                    //
    allowRepeats: false,                                               // 852
                                                                       //
    // animation duration                                              //
    duration: false,                                                   // 855
                                                                       //
    // possible errors                                                 //
    error: {                                                           // 858
      side: 'You tried to switch to a side that does not exist.',      // 859
      method: 'The method you called is not defined'                   // 860
    },                                                                 //
                                                                       //
    // classnames used                                                 //
    className: {                                                       // 864
      animating: 'animating',                                          // 865
      hidden: 'hidden',                                                // 866
      loading: 'loading',                                              // 867
      active: 'active'                                                 // 868
    },                                                                 //
                                                                       //
    // selectors used                                                  //
    selector: {                                                        // 872
      sides: '.sides',                                                 // 873
      side: '.side'                                                    // 874
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
