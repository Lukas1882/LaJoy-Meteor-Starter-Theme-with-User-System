(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/nag.js                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Nag                                                 //
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
  $.fn.nag = function (parameters) {                                   // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
    $allModules.each(function () {                                     // 33
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.nag.settings, parameters) : $.extend({}, $.fn.nag.settings),
          className = settings.className,                              //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          namespace = settings.namespace,                              //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = namespace + '-module',                     //
          $module = $(this),                                           //
          $close = $module.find(selector.close),                       //
          $context = settings.context ? $(settings.context) : $('body'),
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          moduleOffset,                                                //
          moduleHeight,                                                //
          contextWidth,                                                //
          contextHeight,                                               //
          contextOffset,                                               //
          yOffset,                                                     //
          yPosition,                                                   //
          timer,                                                       //
          module,                                                      //
          requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        setTimeout(callback, 0);                                       // 75
      };                                                               //
      module = {                                                       // 77
                                                                       //
        initialize: function () {                                      // 79
          module.verbose('Initializing element');                      // 80
                                                                       //
          $module.on('click' + eventNamespace, selector.close, module.dismiss).data(moduleNamespace, module);
                                                                       //
          if (settings.detachable && $module.parent()[0] !== $context[0]) {
            $module.detach().prependTo($context);                      // 88
          }                                                            //
                                                                       //
          if (settings.displayTime > 0) {                              // 94
            setTimeout(module.hide, settings.displayTime);             // 95
          }                                                            //
          module.show();                                               // 97
        },                                                             //
                                                                       //
        destroy: function () {                                         // 100
          module.verbose('Destroying instance');                       // 101
          $module.removeData(moduleNamespace).off(eventNamespace);     // 102
        },                                                             //
                                                                       //
        show: function () {                                            // 108
          if (module.should.show() && !$module.is(':visible')) {       // 109
            module.debug('Showing nag', settings.animation.show);      // 110
            if (settings.animation.show == 'fade') {                   // 111
              $module.fadeIn(settings.duration, settings.easing);      // 112
            } else {                                                   //
              $module.slideDown(settings.duration, settings.easing);   // 117
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        hide: function () {                                            // 124
          module.debug('Showing nag', settings.animation.hide);        // 125
          if (settings.animation.show == 'fade') {                     // 126
            $module.fadeIn(settings.duration, settings.easing);        // 127
          } else {                                                     //
            $module.slideUp(settings.duration, settings.easing);       // 132
          }                                                            //
        },                                                             //
                                                                       //
        onHide: function () {                                          // 138
          module.debug('Removing nag', settings.animation.hide);       // 139
          $module.remove();                                            // 140
          if (settings.onHide) {                                       // 141
            settings.onHide();                                         // 142
          }                                                            //
        },                                                             //
                                                                       //
        dismiss: function (event) {                                    // 146
          if (settings.storageMethod) {                                // 147
            module.storage.set(settings.key, settings.value);          // 148
          }                                                            //
          module.hide();                                               // 150
          event.stopImmediatePropagation();                            // 151
          event.preventDefault();                                      // 152
        },                                                             //
                                                                       //
        should: {                                                      // 155
          show: function () {                                          // 156
            if (settings.persist) {                                    // 157
              module.debug('Persistent nag is set, can show nag');     // 158
              return true;                                             // 159
            }                                                          //
            if (module.storage.get(settings.key) != settings.value.toString()) {
              module.debug('Stored value is not set, can show nag', module.storage.get(settings.key));
              return true;                                             // 163
            }                                                          //
            module.debug('Stored value is set, cannot show nag', module.storage.get(settings.key));
            return false;                                              // 166
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 170
          storageOptions: function () {                                // 171
            var options = {};                                          // 172
            if (settings.expires) {                                    // 175
              options.expires = settings.expires;                      // 176
            }                                                          //
            if (settings.domain) {                                     // 178
              options.domain = settings.domain;                        // 179
            }                                                          //
            if (settings.path) {                                       // 181
              options.path = settings.path;                            // 182
            }                                                          //
            return options;                                            // 184
          }                                                            //
        },                                                             //
                                                                       //
        clear: function () {                                           // 188
          module.storage.remove(settings.key);                         // 189
        },                                                             //
                                                                       //
        storage: {                                                     // 192
          set: function (key, value) {                                 // 193
            var options = module.get.storageOptions();                 // 194
            if (settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
              window.localStorage.setItem(key, value);                 // 198
              module.debug('Value stored using local storage', key, value);
            } else if (settings.storageMethod == 'sessionstorage' && window.sessionStorage !== undefined) {
              window.sessionStorage.setItem(key, value);               // 202
              module.debug('Value stored using session storage', key, value);
            } else if ($.cookie !== undefined) {                       //
              $.cookie(key, value, options);                           // 206
              module.debug('Value stored using cookie', key, value, options);
            } else {                                                   //
              module.error(error.noCookieStorage);                     // 210
              return;                                                  // 211
            }                                                          //
          },                                                           //
          get: function (key, value) {                                 // 214
            var storedValue;                                           // 215
            if (settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
              storedValue = window.localStorage.getItem(key);          // 219
            } else if (settings.storageMethod == 'sessionstorage' && window.sessionStorage !== undefined) {
              storedValue = window.sessionStorage.getItem(key);        // 222
            }                                                          //
            // get by cookie                                           //
            else if ($.cookie !== undefined) {                         //
                storedValue = $.cookie(key);                           // 226
              } else {                                                 //
                module.error(error.noCookieStorage);                   // 229
              }                                                        //
            if (storedValue == 'undefined' || storedValue == 'null' || storedValue === undefined || storedValue === null) {
              storedValue = undefined;                                 // 232
            }                                                          //
            return storedValue;                                        // 234
          },                                                           //
          remove: function (key) {                                     // 236
            var options = module.get.storageOptions();                 // 237
            if (settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
              window.localStorage.removeItem(key);                     // 241
            } else if (settings.storageMethod == 'sessionstorage' && window.sessionStorage !== undefined) {
              window.sessionStorage.removeItem(key);                   // 244
            }                                                          //
            // store by cookie                                         //
            else if ($.cookie !== undefined) {                         //
                $.removeCookie(key, options);                          // 248
              } else {                                                 //
                module.error(error.noStorage);                         // 251
              }                                                        //
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 256
          module.debug('Changing setting', name, value);               // 257
          if ($.isPlainObject(name)) {                                 // 258
            $.extend(true, settings, name);                            // 259
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 262
          } else {                                                     //
            return settings[name];                                     // 265
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 268
          if ($.isPlainObject(name)) {                                 // 269
            $.extend(true, module, name);                              // 270
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 273
          } else {                                                     //
            return module[name];                                       // 276
          }                                                            //
        },                                                             //
        debug: function () {                                           // 279
          if (settings.debug) {                                        // 280
            if (settings.performance) {                                // 281
              module.performance.log(arguments);                       // 282
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 286
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 290
          if (settings.verbose && settings.debug) {                    // 291
            if (settings.performance) {                                // 292
              module.performance.log(arguments);                       // 293
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 297
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 301
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 303
        },                                                             //
        performance: {                                                 // 305
          log: function (message) {                                    // 306
            var currentTime, executionTime, previousTime;              // 307
            if (settings.performance) {                                // 312
              currentTime = new Date().getTime();                      // 313
              previousTime = time || currentTime;                      // 314
              executionTime = currentTime - previousTime;              // 315
              time = currentTime;                                      // 316
              performance.push({                                       // 317
                'Name': message[0],                                    // 318
                'Arguments': [].slice.call(message, 1) || '',          // 319
                'Element': element,                                    // 320
                'Execution Time': executionTime                        // 321
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 324
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 327
            var title = settings.name + ':',                           // 328
                totalTime = 0;                                         //
            time = false;                                              // 332
            clearTimeout(module.performance.timer);                    // 333
            $.each(performance, function (index, data) {               // 334
              totalTime += data['Execution Time'];                     // 335
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 337
            if (moduleSelector) {                                      // 338
              title += ' \'' + moduleSelector + '\'';                  // 339
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 342
              if (console.table) {                                     // 343
                console.table(performance);                            // 344
              } else {                                                 //
                $.each(performance, function (index, data) {           // 347
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 351
            }                                                          //
            performance = [];                                          // 353
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 356
          var object = instance,                                       // 357
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 363
          context = element || context;                                // 364
          if (typeof query == 'string' && object !== undefined) {      // 365
            query = query.split(/[\. ]/);                              // 366
            maxDepth = query.length - 1;                               // 367
            $.each(query, function (depth, value) {                    // 368
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 374
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 377
                return false;                                          // 378
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 381
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 384
                return false;                                          // 385
              } else {                                                 //
                module.error(error.method, query);                     // 388
                return false;                                          // 389
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 393
            response = found.apply(context, passedArguments);          // 394
          } else if (found !== undefined) {                            //
            response = found;                                          // 397
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 399
            returnedValue.push(response);                              // 400
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 403
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 406
          }                                                            //
          return found;                                                // 408
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 412
        if (instance === undefined) {                                  // 413
          module.initialize();                                         // 414
        }                                                              //
        module.invoke(query);                                          // 416
      } else {                                                         //
        if (instance !== undefined) {                                  // 419
          instance.invoke('destroy');                                  // 420
        }                                                              //
        module.initialize();                                           // 422
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 427
  };                                                                   //
                                                                       //
  $.fn.nag.settings = {                                                // 433
                                                                       //
    name: 'Nag',                                                       // 435
                                                                       //
    debug: false,                                                      // 437
    verbose: false,                                                    // 438
    performance: true,                                                 // 439
                                                                       //
    namespace: 'Nag',                                                  // 441
                                                                       //
    // allows cookie to be overriden                                   //
    persist: false,                                                    // 444
                                                                       //
    // set to zero to require manually dismissal, otherwise hides on its own
    displayTime: 0,                                                    // 447
                                                                       //
    animation: {                                                       // 449
      show: 'slide',                                                   // 450
      hide: 'slide'                                                    // 451
    },                                                                 //
                                                                       //
    context: false,                                                    // 454
    detachable: false,                                                 // 455
                                                                       //
    expires: 30,                                                       // 457
    domain: false,                                                     // 458
    path: '/',                                                         // 459
                                                                       //
    // type of storage to use                                          //
    storageMethod: 'cookie',                                           // 462
                                                                       //
    // value to store in dismissed localstorage/cookie                 //
    key: 'nag',                                                        // 465
    value: 'dismiss',                                                  // 466
                                                                       //
    error: {                                                           // 468
      noCookieStorage: '$.cookie is not included. A storage solution is required.',
      noStorage: 'Neither $.cookie or store is defined. A storage solution is required for storing state',
      method: 'The method you called is not defined.'                  // 471
    },                                                                 //
                                                                       //
    className: {                                                       // 474
      bottom: 'bottom',                                                // 475
      fixed: 'fixed'                                                   // 476
    },                                                                 //
                                                                       //
    selector: {                                                        // 479
      close: '.close.icon'                                             // 480
    },                                                                 //
                                                                       //
    speed: 500,                                                        // 483
    easing: 'easeOutQuad',                                             // 484
                                                                       //
    onHide: function () {}                                             // 486
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
