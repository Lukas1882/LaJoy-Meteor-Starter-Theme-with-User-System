(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/behaviors/state.js               //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - State                                               //
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
  $.fn.state = function (parameters) {                                 // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        hasTouch = ('ontouchstart' in document.documentElement),       //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
    $allModules.each(function () {                                     // 36
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.state.settings, parameters) : $.extend({}, $.fn.state.settings),
          error = settings.error,                                      //
          metadata = settings.metadata,                                //
          className = settings.className,                              //
          namespace = settings.namespace,                              //
          states = settings.states,                                    //
          text = settings.text,                                        //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = namespace + '-module',                     //
          $module = $(this),                                           //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          module;                                                      //
      module = {                                                       // 60
                                                                       //
        initialize: function () {                                      // 62
          module.verbose('Initializing module');                       // 63
                                                                       //
          // allow module to guess desired state based on element      //
          if (settings.automatic) {                                    // 66
            module.add.defaults();                                     // 67
          }                                                            //
                                                                       //
          // bind events with delegated events                         //
          if (settings.context && moduleSelector !== '') {             // 71
            $(settings.context).on(moduleSelector, 'mouseenter' + eventNamespace, module.change.text).on(moduleSelector, 'mouseleave' + eventNamespace, module.reset.text).on(moduleSelector, 'click' + eventNamespace, module.toggle.state);
          } else {                                                     //
            $module.on('mouseenter' + eventNamespace, module.change.text).on('mouseleave' + eventNamespace, module.reset.text).on('click' + eventNamespace, module.toggle.state);
          }                                                            //
          module.instantiate();                                        // 85
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 88
          module.verbose('Storing instance of module', module);        // 89
          instance = module;                                           // 90
          $module.data(moduleNamespace, module);                       // 91
        },                                                             //
                                                                       //
        destroy: function () {                                         // 96
          module.verbose('Destroying previous module', instance);      // 97
          $module.off(eventNamespace).removeData(moduleNamespace);     // 98
        },                                                             //
                                                                       //
        refresh: function () {                                         // 104
          module.verbose('Refreshing selector cache');                 // 105
          $module = $(element);                                        // 106
        },                                                             //
                                                                       //
        add: {                                                         // 109
          defaults: function () {                                      // 110
            var userStates = parameters && $.isPlainObject(parameters.states) ? parameters.states : {};
            $.each(settings.defaults, function (type, typeStates) {    // 116
              if (module.is[type] !== undefined && module.is[type]()) {
                module.verbose('Adding default states', type, element);
                $.extend(settings.states, typeStates, userStates);     // 119
              }                                                        //
            });                                                        //
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 125
                                                                       //
          active: function () {                                        // 127
            return $module.hasClass(className.active);                 // 128
          },                                                           //
          loading: function () {                                       // 130
            return $module.hasClass(className.loading);                // 131
          },                                                           //
          inactive: function () {                                      // 133
            return !$module.hasClass(className.active);                // 134
          },                                                           //
          state: function (state) {                                    // 136
            if (className[state] === undefined) {                      // 137
              return false;                                            // 138
            }                                                          //
            return $module.hasClass(className[state]);                 // 140
          },                                                           //
                                                                       //
          enabled: function () {                                       // 143
            return !$module.is(settings.filter.active);                // 144
          },                                                           //
          disabled: function () {                                      // 146
            return $module.is(settings.filter.active);                 // 147
          },                                                           //
          textEnabled: function () {                                   // 149
            return !$module.is(settings.filter.text);                  // 150
          },                                                           //
                                                                       //
          // definitions for automatic type detection                  //
          button: function () {                                        // 154
            return $module.is('.button:not(a, .submit)');              // 155
          },                                                           //
          input: function () {                                         // 157
            return $module.is('input');                                // 158
          },                                                           //
          progress: function () {                                      // 160
            return $module.is('.ui.progress');                         // 161
          }                                                            //
        },                                                             //
                                                                       //
        allow: function (state) {                                      // 165
          module.debug('Now allowing state', state);                   // 166
          states[state] = true;                                        // 167
        },                                                             //
        disallow: function (state) {                                   // 169
          module.debug('No longer allowing', state);                   // 170
          states[state] = false;                                       // 171
        },                                                             //
                                                                       //
        allows: function (state) {                                     // 174
          return states[state] || false;                               // 175
        },                                                             //
                                                                       //
        enable: function () {                                          // 178
          $module.removeClass(className.disabled);                     // 179
        },                                                             //
                                                                       //
        disable: function () {                                         // 182
          $module.addClass(className.disabled);                        // 183
        },                                                             //
                                                                       //
        setState: function (state) {                                   // 186
          if (module.allows(state)) {                                  // 187
            $module.addClass(className[state]);                        // 188
          }                                                            //
        },                                                             //
                                                                       //
        removeState: function (state) {                                // 192
          if (module.allows(state)) {                                  // 193
            $module.removeClass(className[state]);                     // 194
          }                                                            //
        },                                                             //
                                                                       //
        toggle: {                                                      // 198
          state: function () {                                         // 199
            var apiRequest, requestCancelled;                          // 200
            if (module.allows('active') && module.is.enabled()) {      // 204
              module.refresh();                                        // 205
              if ($.fn.api !== undefined) {                            // 206
                apiRequest = $module.api('get request');               // 207
                requestCancelled = $module.api('was cancelled');       // 208
                if (requestCancelled) {                                // 209
                  module.debug('API Request cancelled by beforesend');
                  settings.activateTest = function () {                // 211
                    return false;                                      // 211
                  };                                                   //
                  settings.deactivateTest = function () {              // 212
                    return false;                                      // 212
                  };                                                   //
                } else if (apiRequest) {                               //
                  module.listenTo(apiRequest);                         // 215
                  return;                                              // 216
                }                                                      //
              }                                                        //
              module.change.state();                                   // 219
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        listenTo: function (apiRequest) {                              // 224
          module.debug('API request detected, waiting for state signal', apiRequest);
          if (apiRequest) {                                            // 226
            if (text.loading) {                                        // 227
              module.update.text(text.loading);                        // 228
            }                                                          //
            $.when(apiRequest).then(function () {                      // 230
              if (apiRequest.state() == 'resolved') {                  // 232
                module.debug('API request succeeded');                 // 233
                settings.activateTest = function () {                  // 234
                  return true;                                         // 234
                };                                                     //
                settings.deactivateTest = function () {                // 235
                  return true;                                         // 235
                };                                                     //
              } else {                                                 //
                module.debug('API request failed');                    // 238
                settings.activateTest = function () {                  // 239
                  return false;                                        // 239
                };                                                     //
                settings.deactivateTest = function () {                // 240
                  return false;                                        // 240
                };                                                     //
              }                                                        //
              module.change.state();                                   // 242
            });                                                        //
          }                                                            //
        },                                                             //
                                                                       //
        // checks whether active/inactive state can be given           //
        change: {                                                      // 249
                                                                       //
          state: function () {                                         // 251
            module.debug('Determining state change direction');        // 252
            // inactive to active change                               //
            if (module.is.inactive()) {                                // 254
              module.activate();                                       // 255
            } else {                                                   //
              module.deactivate();                                     // 258
            }                                                          //
            if (settings.sync) {                                       // 260
              module.sync();                                           // 261
            }                                                          //
            settings.onChange.call(element);                           // 263
          },                                                           //
                                                                       //
          text: function () {                                          // 266
            if (module.is.textEnabled()) {                             // 267
              if (module.is.disabled()) {                              // 268
                module.verbose('Changing text to disabled text', text.hover);
                module.update.text(text.disabled);                     // 270
              } else if (module.is.active()) {                         //
                if (text.hover) {                                      // 273
                  module.verbose('Changing text to hover text', text.hover);
                  module.update.text(text.hover);                      // 275
                } else if (text.deactivate) {                          //
                  module.verbose('Changing text to deactivating text', text.deactivate);
                  module.update.text(text.deactivate);                 // 279
                }                                                      //
              } else {                                                 //
                if (text.hover) {                                      // 283
                  module.verbose('Changing text to hover text', text.hover);
                  module.update.text(text.hover);                      // 285
                } else if (text.activate) {                            //
                  module.verbose('Changing text to activating text', text.activate);
                  module.update.text(text.activate);                   // 289
                }                                                      //
              }                                                        //
            }                                                          //
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        activate: function () {                                        // 297
          if (settings.activateTest.call(element)) {                   // 298
            module.debug('Setting state to active');                   // 299
            $module.addClass(className.active);                        // 300
            module.update.text(text.active);                           // 303
            settings.onActivate.call(element);                         // 304
          }                                                            //
        },                                                             //
                                                                       //
        deactivate: function () {                                      // 308
          if (settings.deactivateTest.call(element)) {                 // 309
            module.debug('Setting state to inactive');                 // 310
            $module.removeClass(className.active);                     // 311
            module.update.text(text.inactive);                         // 314
            settings.onDeactivate.call(element);                       // 315
          }                                                            //
        },                                                             //
                                                                       //
        sync: function () {                                            // 319
          module.verbose('Syncing other buttons to current state');    // 320
          if (module.is.active()) {                                    // 321
            $allModules.not($module).state('activate');                // 322
          } else {                                                     //
            $allModules.not($module).state('deactivate');              // 327
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 334
          text: function () {                                          // 335
            return settings.selector.text ? $module.find(settings.selector.text).text() : $module.html();
          },                                                           //
          textFor: function (state) {                                  // 341
            return text[state] || false;                               // 342
          }                                                            //
        },                                                             //
                                                                       //
        flash: {                                                       // 346
          text: function (text, duration, callback) {                  // 347
            var previousText = module.get.text();                      // 348
            module.debug('Flashing text message', text, duration);     // 351
            text = text || settings.text.flash;                        // 352
            duration = duration || settings.flashDuration;             // 353
            callback = callback || function () {};                     // 354
            module.update.text(text);                                  // 355
            setTimeout(function () {                                   // 356
              module.update.text(previousText);                        // 357
              callback.call(element);                                  // 358
            }, duration);                                              //
          }                                                            //
        },                                                             //
                                                                       //
        reset: {                                                       // 363
          // on mouseout sets text to previous value                   //
          text: function () {                                          // 365
            var activeText = text.active || $module.data(metadata.storedText),
                inactiveText = text.inactive || $module.data(metadata.storedText);
            if (module.is.textEnabled()) {                             // 370
              if (module.is.active() && activeText) {                  // 371
                module.verbose('Resetting active text', activeText);   // 372
                module.update.text(activeText);                        // 373
              } else if (inactiveText) {                               //
                module.verbose('Resetting inactive text', activeText);
                module.update.text(inactiveText);                      // 377
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        update: {                                                      // 383
          text: function (text) {                                      // 384
            var currentText = module.get.text();                       // 385
            if (text && text !== currentText) {                        // 388
              module.debug('Updating text', text);                     // 389
              if (settings.selector.text) {                            // 390
                $module.data(metadata.storedText, text).find(settings.selector.text).text(text);
              } else {                                                 //
                $module.data(metadata.storedText, text).html(text);    // 398
              }                                                        //
            } else {                                                   //
              module.debug('Text is already set, ignoring update', text);
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 410
          module.debug('Changing setting', name, value);               // 411
          if ($.isPlainObject(name)) {                                 // 412
            $.extend(true, settings, name);                            // 413
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 416
          } else {                                                     //
            return settings[name];                                     // 419
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 422
          if ($.isPlainObject(name)) {                                 // 423
            $.extend(true, module, name);                              // 424
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 427
          } else {                                                     //
            return module[name];                                       // 430
          }                                                            //
        },                                                             //
        debug: function () {                                           // 433
          if (settings.debug) {                                        // 434
            if (settings.performance) {                                // 435
              module.performance.log(arguments);                       // 436
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 440
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 444
          if (settings.verbose && settings.debug) {                    // 445
            if (settings.performance) {                                // 446
              module.performance.log(arguments);                       // 447
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 451
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 455
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 457
        },                                                             //
        performance: {                                                 // 459
          log: function (message) {                                    // 460
            var currentTime, executionTime, previousTime;              // 461
            if (settings.performance) {                                // 466
              currentTime = new Date().getTime();                      // 467
              previousTime = time || currentTime;                      // 468
              executionTime = currentTime - previousTime;              // 469
              time = currentTime;                                      // 470
              performance.push({                                       // 471
                'Name': message[0],                                    // 472
                'Arguments': [].slice.call(message, 1) || '',          // 473
                'Element': element,                                    // 474
                'Execution Time': executionTime                        // 475
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 478
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 481
            var title = settings.name + ':',                           // 482
                totalTime = 0;                                         //
            time = false;                                              // 486
            clearTimeout(module.performance.timer);                    // 487
            $.each(performance, function (index, data) {               // 488
              totalTime += data['Execution Time'];                     // 489
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 491
            if (moduleSelector) {                                      // 492
              title += ' \'' + moduleSelector + '\'';                  // 493
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 496
              if (console.table) {                                     // 497
                console.table(performance);                            // 498
              } else {                                                 //
                $.each(performance, function (index, data) {           // 501
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 505
            }                                                          //
            performance = [];                                          // 507
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 510
          var object = instance,                                       // 511
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 517
          context = element || context;                                // 518
          if (typeof query == 'string' && object !== undefined) {      // 519
            query = query.split(/[\. ]/);                              // 520
            maxDepth = query.length - 1;                               // 521
            $.each(query, function (depth, value) {                    // 522
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 528
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 531
                return false;                                          // 532
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 535
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 538
                return false;                                          // 539
              } else {                                                 //
                module.error(error.method, query);                     // 542
                return false;                                          // 543
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 547
            response = found.apply(context, passedArguments);          // 548
          } else if (found !== undefined) {                            //
            response = found;                                          // 551
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 553
            returnedValue.push(response);                              // 554
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 557
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 560
          }                                                            //
          return found;                                                // 562
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 566
        if (instance === undefined) {                                  // 567
          module.initialize();                                         // 568
        }                                                              //
        module.invoke(query);                                          // 570
      } else {                                                         //
        if (instance !== undefined) {                                  // 573
          instance.invoke('destroy');                                  // 574
        }                                                              //
        module.initialize();                                           // 576
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 581
  };                                                                   //
                                                                       //
  $.fn.state.settings = {                                              // 587
                                                                       //
    // module info                                                     //
    name: 'State',                                                     // 590
                                                                       //
    // debug output                                                    //
    debug: false,                                                      // 593
                                                                       //
    // verbose debug output                                            //
    verbose: false,                                                    // 596
                                                                       //
    // namespace for events                                            //
    namespace: 'state',                                                // 599
                                                                       //
    // debug data includes performance                                 //
    performance: true,                                                 // 602
                                                                       //
    // callback occurs on state change                                 //
    onActivate: function () {},                                        // 605
    onDeactivate: function () {},                                      // 606
    onChange: function () {},                                          // 607
                                                                       //
    // state test functions                                            //
    activateTest: function () {                                        // 610
      return true;                                                     // 610
    },                                                                 //
    deactivateTest: function () {                                      // 611
      return true;                                                     // 611
    },                                                                 //
                                                                       //
    // whether to automatically map default states                     //
    automatic: true,                                                   // 614
                                                                       //
    // activate / deactivate changes all elements instantiated at same time
    sync: false,                                                       // 617
                                                                       //
    // default flash text duration, used for temporarily changing text of an element
    flashDuration: 1000,                                               // 620
                                                                       //
    // selector filter                                                 //
    filter: {                                                          // 623
      text: '.loading, .disabled',                                     // 624
      active: '.disabled'                                              // 625
    },                                                                 //
                                                                       //
    context: false,                                                    // 628
                                                                       //
    // error                                                           //
    error: {                                                           // 631
      beforeSend: 'The before send function has cancelled state change',
      method: 'The method you called is not defined.'                  // 633
    },                                                                 //
                                                                       //
    // metadata                                                        //
    metadata: {                                                        // 637
      promise: 'promise',                                              // 638
      storedText: 'stored-text'                                        // 639
    },                                                                 //
                                                                       //
    // change class on state                                           //
    className: {                                                       // 643
      active: 'active',                                                // 644
      disabled: 'disabled',                                            // 645
      error: 'error',                                                  // 646
      loading: 'loading',                                              // 647
      success: 'success',                                              // 648
      warning: 'warning'                                               // 649
    },                                                                 //
                                                                       //
    selector: {                                                        // 652
      // selector for text node                                        //
      text: false                                                      // 654
    },                                                                 //
                                                                       //
    defaults: {                                                        // 657
      input: {                                                         // 658
        disabled: true,                                                // 659
        loading: true,                                                 // 660
        active: true                                                   // 661
      },                                                               //
      button: {                                                        // 663
        disabled: true,                                                // 664
        loading: true,                                                 // 665
        active: true                                                   // 666
      },                                                               //
      progress: {                                                      // 668
        active: true,                                                  // 669
        success: true,                                                 // 670
        warning: true,                                                 // 671
        error: true                                                    // 672
      }                                                                //
    },                                                                 //
                                                                       //
    states: {                                                          // 676
      active: true,                                                    // 677
      disabled: true,                                                  // 678
      error: true,                                                     // 679
      loading: true,                                                   // 680
      success: true,                                                   // 681
      warning: true                                                    // 682
    },                                                                 //
                                                                       //
    text: {                                                            // 685
      disabled: false,                                                 // 686
      flash: false,                                                    // 687
      hover: false,                                                    // 688
      active: false,                                                   // 689
      inactive: false,                                                 // 690
      activate: false,                                                 // 691
      deactivate: false                                                // 692
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
