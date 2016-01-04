(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/progress.js              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Progress                                            //
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
  $.fn.progress = function (parameters) {                              // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 36
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.progress.settings, parameters) : $.extend({}, $.fn.progress.settings),
          className = settings.className,                              //
          metadata = settings.metadata,                                //
          namespace = settings.namespace,                              //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          $module = $(this),                                           //
          $bar = $(this).find(selector.bar),                           //
          $progress = $(this).find(selector.progress),                 //
          $label = $(this).find(selector.label),                       //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          animating = false,                                           //
          transitionEnd,                                               //
          module;                                                      //
                                                                       //
      module = {                                                       // 65
                                                                       //
        initialize: function () {                                      // 67
          module.debug('Initializing progress bar', settings);         // 68
                                                                       //
          module.set.duration();                                       // 70
          module.set.transitionEvent();                                // 71
                                                                       //
          module.read.metadata();                                      // 73
          module.read.settings();                                      // 74
                                                                       //
          module.instantiate();                                        // 76
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 79
          module.verbose('Storing instance of progress', module);      // 80
          instance = module;                                           // 81
          $module.data(moduleNamespace, module);                       // 82
        },                                                             //
        destroy: function () {                                         // 86
          module.verbose('Destroying previous progress for', $module);
          clearInterval(instance.interval);                            // 88
          module.remove.state();                                       // 89
          $module.removeData(moduleNamespace);                         // 90
          instance = undefined;                                        // 91
        },                                                             //
                                                                       //
        reset: function () {                                           // 94
          module.set.percent(0);                                       // 95
          module.set.value(0);                                         // 96
        },                                                             //
                                                                       //
        complete: function () {                                        // 99
          if (module.percent === undefined || module.percent < 100) {  // 100
            module.set.percent(100);                                   // 101
          }                                                            //
        },                                                             //
                                                                       //
        read: {                                                        // 105
          metadata: function () {                                      // 106
            var data = {                                               // 107
              percent: $module.data(metadata.percent),                 // 109
              total: $module.data(metadata.total),                     // 110
              value: $module.data(metadata.value)                      // 111
            };                                                         //
            if (data.percent) {                                        // 114
              module.debug('Current percent value set from metadata', data.percent);
              module.set.percent(data.percent);                        // 116
            }                                                          //
            if (data.total) {                                          // 118
              module.debug('Total value set from metadata', data.total);
              module.set.total(data.total);                            // 120
            }                                                          //
            if (data.value) {                                          // 122
              module.debug('Current value set from metadata', data.value);
              module.set.value(data.value);                            // 124
              module.set.progress(data.value);                         // 125
            }                                                          //
          },                                                           //
          settings: function () {                                      // 128
            if (settings.total !== false) {                            // 129
              module.debug('Current total set in settings', settings.total);
              module.set.total(settings.total);                        // 131
            }                                                          //
            if (settings.value !== false) {                            // 133
              module.debug('Current value set in settings', settings.value);
              module.set.value(settings.value);                        // 135
              module.set.progress(module.value);                       // 136
            }                                                          //
            if (settings.percent !== false) {                          // 138
              module.debug('Current percent set in settings', settings.percent);
              module.set.percent(settings.percent);                    // 140
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        increment: function (incrementValue) {                         // 145
          var maxValue, startValue, newValue;                          // 146
          if (module.has.total()) {                                    // 151
            startValue = module.get.value();                           // 152
            incrementValue = incrementValue || 1;                      // 153
                                                                       //
            newValue = startValue + incrementValue;                    // 155
            maxValue = module.get.total();                             // 156
                                                                       //
            module.debug('Incrementing value', startValue, newValue, maxValue);
            if (newValue > maxValue) {                                 // 159
              module.debug('Value cannot increment above total', maxValue);
              newValue = maxValue;                                     // 161
            }                                                          //
          } else {                                                     //
            startValue = module.get.percent();                         // 165
            incrementValue = incrementValue || module.get.randomValue();
                                                                       //
            newValue = startValue + incrementValue;                    // 168
            maxValue = 100;                                            // 169
                                                                       //
            module.debug('Incrementing percentage by', startValue, newValue);
            if (newValue > maxValue) {                                 // 172
              module.debug('Value cannot increment above 100 percent');
              newValue = maxValue;                                     // 174
            }                                                          //
          }                                                            //
          module.set.progress(newValue);                               // 177
        },                                                             //
        decrement: function (decrementValue) {                         // 179
          var total = module.get.total(),                              // 180
              startValue,                                              //
              newValue;                                                //
          if (total) {                                                 // 185
            startValue = module.get.value();                           // 186
            decrementValue = decrementValue || 1;                      // 187
            newValue = startValue - decrementValue;                    // 188
            module.debug('Decrementing value by', decrementValue, startValue);
          } else {                                                     //
            startValue = module.get.percent();                         // 192
            decrementValue = decrementValue || module.get.randomValue();
            newValue = startValue - decrementValue;                    // 194
            module.debug('Decrementing percentage by', decrementValue, startValue);
          }                                                            //
                                                                       //
          if (newValue < 0) {                                          // 198
            module.debug('Value cannot decrement below 0');            // 199
            newValue = 0;                                              // 200
          }                                                            //
          module.set.progress(newValue);                               // 202
        },                                                             //
                                                                       //
        has: {                                                         // 205
          total: function () {                                         // 206
            return module.get.total() !== false;                       // 207
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 211
          text: function (templateText) {                              // 212
            var value = module.value || 0,                             // 213
                total = module.total || 0,                             //
                percent = animating ? module.get.displayPercent() : module.percent || 0,
                left = module.total > 0 ? total - value : 100 - percent;
            templateText = templateText || '';                         // 223
            templateText = templateText.replace('{value}', value).replace('{total}', total).replace('{left}', left).replace('{percent}', percent);
            module.debug('Adding variables to progress bar text', templateText);
            return templateText;                                       // 231
          },                                                           //
                                                                       //
          randomValue: function () {                                   // 235
            module.debug('Generating random increment percentage');    // 236
            return Math.floor(Math.random() * settings.random.max + settings.random.min);
          },                                                           //
                                                                       //
          numericValue: function (value) {                             // 240
            return typeof value === 'string' ? value.replace(/[^\d.]/g, '') !== '' ? +value.replace(/[^\d.]/g, '') : false : value;
          },                                                           //
                                                                       //
          transitionEnd: function () {                                 // 249
            var element = document.createElement('element'),           // 250
                transitions = {                                        //
              'transition': 'transitionend',                           // 253
              'OTransition': 'oTransitionEnd',                         // 254
              'MozTransition': 'transitionend',                        // 255
              'WebkitTransition': 'webkitTransitionEnd'                // 256
            },                                                         //
                transition;                                            //
            for (transition in babelHelpers.sanitizeForInObject(transitions)) {
              if (element.style[transition] !== undefined) {           // 261
                return transitions[transition];                        // 262
              }                                                        //
            }                                                          //
          },                                                           //
                                                                       //
          // gets current displayed percentage (if animating values this is the intermediary value)
          displayPercent: function () {                                // 268
            var barWidth = $bar.width(),                               // 269
                totalWidth = $module.width(),                          //
                minDisplay = parseInt($bar.css('min-width'), 10),      //
                displayPercent = barWidth > minDisplay ? barWidth / totalWidth * 100 : module.percent;
            return settings.precision > 0 ? Math.round(displayPercent * (10 * settings.precision)) / (10 * settings.precision) : Math.round(displayPercent);
          },                                                           //
                                                                       //
          percent: function () {                                       // 283
            return module.percent || 0;                                // 284
          },                                                           //
          value: function () {                                         // 286
            return module.value || 0;                                  // 287
          },                                                           //
          total: function () {                                         // 289
            return module.total || false;                              // 290
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 294
          success: function () {                                       // 295
            return $module.hasClass(className.success);                // 296
          },                                                           //
          warning: function () {                                       // 298
            return $module.hasClass(className.warning);                // 299
          },                                                           //
          error: function () {                                         // 301
            return $module.hasClass(className.error);                  // 302
          },                                                           //
          active: function () {                                        // 304
            return $module.hasClass(className.active);                 // 305
          },                                                           //
          visible: function () {                                       // 307
            return $module.is(':visible');                             // 308
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 312
          state: function () {                                         // 313
            module.verbose('Removing stored state');                   // 314
            delete module.total;                                       // 315
            delete module.percent;                                     // 316
            delete module.value;                                       // 317
          },                                                           //
          active: function () {                                        // 319
            module.verbose('Removing active state');                   // 320
            $module.removeClass(className.active);                     // 321
          },                                                           //
          success: function () {                                       // 323
            module.verbose('Removing success state');                  // 324
            $module.removeClass(className.success);                    // 325
          },                                                           //
          warning: function () {                                       // 327
            module.verbose('Removing warning state');                  // 328
            $module.removeClass(className.warning);                    // 329
          },                                                           //
          error: function () {                                         // 331
            module.verbose('Removing error state');                    // 332
            $module.removeClass(className.error);                      // 333
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 337
          barWidth: function (value) {                                 // 338
            if (value > 100) {                                         // 339
              module.error(error.tooHigh, value);                      // 340
            } else if (value < 0) {                                    //
              module.error(error.tooLow, value);                       // 343
            } else {                                                   //
              $bar.css('width', value + '%');                          // 346
              $module.attr('data-percent', parseInt(value, 10));       // 349
            }                                                          //
          },                                                           //
          duration: function (duration) {                              // 354
            duration = duration || settings.duration;                  // 355
            duration = typeof duration == 'number' ? duration + 'ms' : duration;
            module.verbose('Setting progress bar transition duration', duration);
            $bar.css({                                                 // 361
              'transition-duration': duration                          // 363
            });                                                        //
          },                                                           //
          percent: function (percent) {                                // 367
            percent = typeof percent == 'string' ? +percent.replace('%', '') : percent;
            // round display percentage                                //
            percent = settings.precision > 0 ? Math.round(percent * (10 * settings.precision)) / (10 * settings.precision) : Math.round(percent);
            module.percent = percent;                                  // 377
            if (!module.has.total()) {                                 // 378
              module.value = settings.precision > 0 ? Math.round(percent / 100 * module.total * (10 * settings.precision)) / (10 * settings.precision) : Math.round(percent / 100 * module.total * 10) / 10;
              if (settings.limitValues) {                              // 383
                module.value = module.value > 100 ? 100 : module.value < 0 ? 0 : module.value;
              }                                                        //
            }                                                          //
            module.set.barWidth(percent);                              // 392
            module.set.labelInterval();                                // 393
            module.set.labels();                                       // 394
            settings.onChange.call(element, percent, module.value, module.total);
          },                                                           //
          labelInterval: function () {                                 // 397
            var animationCallback = function () {                      // 398
              module.verbose('Bar finished animating, removing continuous label updates');
              clearInterval(module.interval);                          // 401
              animating = false;                                       // 402
              module.set.labels();                                     // 403
            };                                                         //
            clearInterval(module.interval);                            // 406
            $bar.one(transitionEnd + eventNamespace, animationCallback);
            module.timer = setTimeout(animationCallback, settings.duration + 100);
            animating = true;                                          // 409
            module.interval = setInterval(module.set.labels, settings.framerate);
          },                                                           //
          labels: function () {                                        // 412
            module.verbose('Setting both bar progress and outer label text');
            module.set.barLabel();                                     // 414
            module.set.state();                                        // 415
          },                                                           //
          label: function (text) {                                     // 417
            text = text || '';                                         // 418
            if (text) {                                                // 419
              text = module.get.text(text);                            // 420
              module.debug('Setting label to text', text);             // 421
              $label.text(text);                                       // 422
            }                                                          //
          },                                                           //
          state: function (percent) {                                  // 425
            percent = percent !== undefined ? percent : module.percent;
            if (percent === 100) {                                     // 430
              if (settings.autoSuccess && !(module.is.warning() || module.is.error())) {
                module.set.success();                                  // 432
                module.debug('Automatically triggering success at 100%');
              } else {                                                 //
                module.verbose('Reached 100% removing active state');  // 436
                module.remove.active();                                // 437
              }                                                        //
            } else if (percent > 0) {                                  //
              module.verbose('Adjusting active progress bar label', percent);
              module.set.active();                                     // 442
            } else {                                                   //
              module.remove.active();                                  // 445
              module.set.label(settings.text.active);                  // 446
            }                                                          //
          },                                                           //
          barLabel: function (text) {                                  // 449
            if (text !== undefined) {                                  // 450
              $progress.text(module.get.text(text));                   // 451
            } else if (settings.label == 'ratio' && module.total) {    //
              module.debug('Adding ratio to bar label');               // 454
              $progress.text(module.get.text(settings.text.ratio));    // 455
            } else if (settings.label == 'percent') {                  //
              module.debug('Adding percentage to bar label');          // 458
              $progress.text(module.get.text(settings.text.percent));  // 459
            }                                                          //
          },                                                           //
          active: function (text) {                                    // 462
            text = text || settings.text.active;                       // 463
            module.debug('Setting active state');                      // 464
            if (settings.showActivity && !module.is.active()) {        // 465
              $module.addClass(className.active);                      // 466
            }                                                          //
            module.remove.warning();                                   // 468
            module.remove.error();                                     // 469
            module.remove.success();                                   // 470
            if (text) {                                                // 471
              module.set.label(text);                                  // 472
            }                                                          //
            settings.onActive.call(element, module.value, module.total);
          },                                                           //
          success: function (text) {                                   // 476
            text = text || settings.text.success;                      // 477
            module.debug('Setting success state');                     // 478
            $module.addClass(className.success);                       // 479
            module.remove.active();                                    // 480
            module.remove.warning();                                   // 481
            module.remove.error();                                     // 482
            module.complete();                                         // 483
            if (text) {                                                // 484
              module.set.label(text);                                  // 485
            }                                                          //
            settings.onSuccess.call(element, module.total);            // 487
          },                                                           //
          warning: function (text) {                                   // 489
            text = text || settings.text.warning;                      // 490
            module.debug('Setting warning state');                     // 491
            $module.addClass(className.warning);                       // 492
            module.remove.active();                                    // 493
            module.remove.success();                                   // 494
            module.remove.error();                                     // 495
            module.complete();                                         // 496
            if (text) {                                                // 497
              module.set.label(text);                                  // 498
            }                                                          //
            settings.onWarning.call(element, module.value, module.total);
          },                                                           //
          error: function (text) {                                     // 502
            text = text || settings.text.error;                        // 503
            module.debug('Setting error state');                       // 504
            $module.addClass(className.error);                         // 505
            module.remove.active();                                    // 506
            module.remove.success();                                   // 507
            module.remove.warning();                                   // 508
            module.complete();                                         // 509
            if (text) {                                                // 510
              module.set.label(text);                                  // 511
            }                                                          //
            settings.onError.call(element, module.value, module.total);
          },                                                           //
          transitionEvent: function () {                               // 515
            transitionEnd = module.get.transitionEnd();                // 516
          },                                                           //
          total: function (totalValue) {                               // 518
            module.total = totalValue;                                 // 519
          },                                                           //
          value: function (value) {                                    // 521
            module.value = value;                                      // 522
          },                                                           //
          progress: function (value) {                                 // 524
            var numericValue = module.get.numericValue(value),         // 525
                percentComplete;                                       //
            if (numericValue === false) {                              // 529
              module.error(error.nonNumeric, value);                   // 530
            }                                                          //
            if (module.has.total()) {                                  // 532
              module.set.value(numericValue);                          // 533
              percentComplete = numericValue / module.total * 100;     // 534
              module.debug('Calculating percent complete from total', percentComplete);
              module.set.percent(percentComplete);                     // 536
            } else {                                                   //
              percentComplete = numericValue;                          // 539
              module.debug('Setting value to exact percentage value', percentComplete);
              module.set.percent(percentComplete);                     // 541
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 546
          module.debug('Changing setting', name, value);               // 547
          if ($.isPlainObject(name)) {                                 // 548
            $.extend(true, settings, name);                            // 549
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 552
          } else {                                                     //
            return settings[name];                                     // 555
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 558
          if ($.isPlainObject(name)) {                                 // 559
            $.extend(true, module, name);                              // 560
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 563
          } else {                                                     //
            return module[name];                                       // 566
          }                                                            //
        },                                                             //
        debug: function () {                                           // 569
          if (settings.debug) {                                        // 570
            if (settings.performance) {                                // 571
              module.performance.log(arguments);                       // 572
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 576
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 580
          if (settings.verbose && settings.debug) {                    // 581
            if (settings.performance) {                                // 582
              module.performance.log(arguments);                       // 583
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 587
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 591
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 593
        },                                                             //
        performance: {                                                 // 595
          log: function (message) {                                    // 596
            var currentTime, executionTime, previousTime;              // 597
            if (settings.performance) {                                // 602
              currentTime = new Date().getTime();                      // 603
              previousTime = time || currentTime;                      // 604
              executionTime = currentTime - previousTime;              // 605
              time = currentTime;                                      // 606
              performance.push({                                       // 607
                'Name': message[0],                                    // 608
                'Arguments': [].slice.call(message, 1) || '',          // 609
                'Element': element,                                    // 610
                'Execution Time': executionTime                        // 611
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 614
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 617
            var title = settings.name + ':',                           // 618
                totalTime = 0;                                         //
            time = false;                                              // 622
            clearTimeout(module.performance.timer);                    // 623
            $.each(performance, function (index, data) {               // 624
              totalTime += data['Execution Time'];                     // 625
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 627
            if (moduleSelector) {                                      // 628
              title += ' \'' + moduleSelector + '\'';                  // 629
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 632
              if (console.table) {                                     // 633
                console.table(performance);                            // 634
              } else {                                                 //
                $.each(performance, function (index, data) {           // 637
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 641
            }                                                          //
            performance = [];                                          // 643
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 646
          var object = instance,                                       // 647
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 653
          context = element || context;                                // 654
          if (typeof query == 'string' && object !== undefined) {      // 655
            query = query.split(/[\. ]/);                              // 656
            maxDepth = query.length - 1;                               // 657
            $.each(query, function (depth, value) {                    // 658
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 664
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 667
                return false;                                          // 668
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 671
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 674
                return false;                                          // 675
              } else {                                                 //
                module.error(error.method, query);                     // 678
                return false;                                          // 679
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 683
            response = found.apply(context, passedArguments);          // 684
          } else if (found !== undefined) {                            //
            response = found;                                          // 687
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 689
            returnedValue.push(response);                              // 690
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 693
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 696
          }                                                            //
          return found;                                                // 698
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 702
        if (instance === undefined) {                                  // 703
          module.initialize();                                         // 704
        }                                                              //
        module.invoke(query);                                          // 706
      } else {                                                         //
        if (instance !== undefined) {                                  // 709
          instance.invoke('destroy');                                  // 710
        }                                                              //
        module.initialize();                                           // 712
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 717
  };                                                                   //
                                                                       //
  $.fn.progress.settings = {                                           // 723
                                                                       //
    name: 'Progress',                                                  // 725
    namespace: 'progress',                                             // 726
                                                                       //
    debug: false,                                                      // 728
    verbose: false,                                                    // 729
    performance: true,                                                 // 730
                                                                       //
    random: {                                                          // 732
      min: 2,                                                          // 733
      max: 5                                                           // 734
    },                                                                 //
                                                                       //
    duration: 300,                                                     // 737
                                                                       //
    autoSuccess: true,                                                 // 739
    showActivity: true,                                                // 740
    limitValues: true,                                                 // 741
                                                                       //
    label: 'percent',                                                  // 743
    precision: 0,                                                      // 744
    framerate: 1000 / 30, /// 30 fps                                   // 745
                                                                       //
    percent: false,                                                    // 747
    total: false,                                                      // 748
    value: false,                                                      // 749
                                                                       //
    onChange: function (percent, value, total) {},                     // 751
    onSuccess: function (total) {},                                    // 752
    onActive: function (value, total) {},                              // 753
    onError: function (value, total) {},                               // 754
    onWarning: function (value, total) {},                             // 755
                                                                       //
    error: {                                                           // 757
      method: 'The method you called is not defined.',                 // 758
      nonNumeric: 'Progress value is non numeric',                     // 759
      tooHigh: 'Value specified is above 100%',                        // 760
      tooLow: 'Value specified is below 0%'                            // 761
    },                                                                 //
                                                                       //
    regExp: {                                                          // 764
      variable: /\{\$*[A-z0-9]+\}/g                                    // 765
    },                                                                 //
                                                                       //
    metadata: {                                                        // 768
      percent: 'percent',                                              // 769
      total: 'total',                                                  // 770
      value: 'value'                                                   // 771
    },                                                                 //
                                                                       //
    selector: {                                                        // 774
      bar: '> .bar',                                                   // 775
      label: '> .label',                                               // 776
      progress: '.bar > .progress'                                     // 777
    },                                                                 //
                                                                       //
    text: {                                                            // 780
      active: false,                                                   // 781
      error: false,                                                    // 782
      success: false,                                                  // 783
      warning: false,                                                  // 784
      percent: '{percent}%',                                           // 785
      ratio: '{value} of {total}'                                      // 786
    },                                                                 //
                                                                       //
    className: {                                                       // 789
      active: 'active',                                                // 790
      error: 'error',                                                  // 791
      success: 'success',                                              // 792
      warning: 'warning'                                               // 793
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
