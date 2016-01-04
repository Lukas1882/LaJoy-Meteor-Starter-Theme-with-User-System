(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/behaviors/api.js                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - API                                                 //
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
  $.api = $.fn.api = function (parameters) {                           // 20
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
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 38
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.api.settings, parameters) : $.extend({}, $.fn.api.settings),
                                                                       //
      // internal aliases                                              //
      namespace = settings.namespace,                                  // 46
          metadata = settings.metadata,                                //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          className = settings.className,                              //
                                                                       //
      // define namespaces for modules                                 //
      eventNamespace = '.' + namespace,                                // 53
          moduleNamespace = 'module-' + namespace,                     //
                                                                       //
      // element that creates request                                  //
      $module = $(this),                                               // 57
          $form = $module.closest(selector.form),                      //
                                                                       //
      // context used for state                                        //
      $context = settings.stateContext ? $(settings.stateContext) : $module,
                                                                       //
      // request details                                               //
      ajaxSettings,                                                    // 66
          requestSettings,                                             //
          url,                                                         //
          data,                                                        //
          requestStartTime,                                            //
                                                                       //
      // standard module                                               //
      element = this,                                                  // 73
          context = $context[0],                                       //
          instance = $module.data(moduleNamespace),                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 79
                                                                       //
        initialize: function () {                                      // 81
          if (!methodInvoked) {                                        // 82
            module.bind.events();                                      // 83
          }                                                            //
          module.instantiate();                                        // 85
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 88
          module.verbose('Storing instance of module', module);        // 89
          instance = module;                                           // 90
          $module.data(moduleNamespace, instance);                     // 91
        },                                                             //
                                                                       //
        destroy: function () {                                         // 96
          module.verbose('Destroying previous module for', element);   // 97
          $module.removeData(moduleNamespace).off(eventNamespace);     // 98
        },                                                             //
                                                                       //
        bind: {                                                        // 104
          events: function () {                                        // 105
            var triggerEvent = module.get.event();                     // 106
            if (triggerEvent) {                                        // 109
              module.verbose('Attaching API events to element', triggerEvent);
              $module.on(triggerEvent + eventNamespace, module.event.trigger);
            } else if (settings.on == 'now') {                         //
              module.debug('Querying API endpoint immediately');       // 116
              module.query();                                          // 117
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        decode: {                                                      // 122
          json: function (response) {                                  // 123
            if (response !== undefined && typeof response == 'string') {
              try {                                                    // 125
                response = JSON.parse(response);                       // 126
              } catch (e) {                                            //
                // isnt json string                                    //
              }                                                        //
            }                                                          //
            return response;                                           // 132
          }                                                            //
        },                                                             //
                                                                       //
        read: {                                                        // 136
          cachedResponse: function (url) {                             // 137
            var response;                                              // 138
            if (window.Storage === undefined) {                        // 141
              module.error(error.noStorage);                           // 142
              return;                                                  // 143
            }                                                          //
            response = sessionStorage.getItem(url);                    // 145
            module.debug('Using cached response', url, response);      // 146
            response = module.decode.json(response);                   // 147
            return false;                                              // 148
          }                                                            //
        },                                                             //
        write: {                                                       // 151
          cachedResponse: function (url, response) {                   // 152
            if (response && response === '') {                         // 153
              module.debug('Response empty, not caching', response);   // 154
              return;                                                  // 155
            }                                                          //
            if (window.Storage === undefined) {                        // 157
              module.error(error.noStorage);                           // 158
              return;                                                  // 159
            }                                                          //
            if ($.isPlainObject(response)) {                           // 161
              response = JSON.stringify(response);                     // 162
            }                                                          //
            sessionStorage.setItem(url, response);                     // 164
            module.verbose('Storing cached response for url', url, response);
          }                                                            //
        },                                                             //
                                                                       //
        query: function () {                                           // 169
                                                                       //
          if (module.is.disabled()) {                                  // 171
            module.debug('Element is disabled API request aborted');   // 172
            return;                                                    // 173
          }                                                            //
                                                                       //
          if (module.is.loading()) {                                   // 176
            if (settings.interruptRequests) {                          // 177
              module.debug('Interrupting previous request');           // 178
              module.abort();                                          // 179
            } else {                                                   //
              module.debug('Cancelling request, previous request is still pending');
              return;                                                  // 183
            }                                                          //
          }                                                            //
                                                                       //
          // pass element metadata to url (value, text)                //
          if (settings.defaultData) {                                  // 188
            $.extend(true, settings.urlData, module.get.defaultData());
          }                                                            //
                                                                       //
          // Add form content                                          //
          if (settings.serializeForm) {                                // 193
            settings.data = module.add.formData(settings.data);        // 194
          }                                                            //
                                                                       //
          // call beforesend and get any settings changes              //
          requestSettings = module.get.settings();                     // 198
                                                                       //
          // check if before send cancelled request                    //
          if (requestSettings === false) {                             // 201
            module.cancelled = true;                                   // 202
            module.error(error.beforeSend);                            // 203
            return;                                                    // 204
          } else {                                                     //
            module.cancelled = false;                                  // 207
          }                                                            //
                                                                       //
          // get url                                                   //
          url = module.get.templatedURL();                             // 211
                                                                       //
          if (!url && !module.is.mocked()) {                           // 213
            module.error(error.missingURL);                            // 214
            return;                                                    // 215
          }                                                            //
                                                                       //
          // replace variables                                         //
          url = module.add.urlData(url);                               // 219
          // missing url parameters                                    //
          if (!url && !module.is.mocked()) {                           // 221
            return;                                                    // 222
          }                                                            //
                                                                       //
          requestSettings.url = settings.base + url;                   // 225
                                                                       //
          // look for jQuery ajax parameters in settings               //
          ajaxSettings = $.extend(true, {}, settings, {                // 228
            type: settings.method || settings.type,                    // 229
            data: data,                                                // 230
            url: settings.base + url,                                  // 231
            beforeSend: settings.beforeXHR,                            // 232
            success: function () {},                                   // 233
            failure: function () {},                                   // 234
            complete: function () {}                                   // 235
          });                                                          //
                                                                       //
          module.debug('Querying URL', ajaxSettings.url);              // 238
          module.verbose('Using AJAX settings', ajaxSettings);         // 239
                                                                       //
          if (settings.cache === 'local' && module.read.cachedResponse(url)) {
            module.debug('Response returned from local cache');        // 242
            module.request = module.create.request();                  // 243
            module.request.resolveWith(context, [module.read.cachedResponse(url)]);
            return;                                                    // 245
          }                                                            //
                                                                       //
          if (!settings.throttle) {                                    // 248
            module.debug('Sending request', data, ajaxSettings.method);
            module.send.request();                                     // 250
          } else {                                                     //
            if (!settings.throttleFirstRequest && !module.timer) {     // 253
              module.debug('Sending request', data, ajaxSettings.method);
              module.send.request();                                   // 255
              module.timer = setTimeout(function () {}, settings.throttle);
            } else {                                                   //
              module.debug('Throttling request', settings.throttle);   // 259
              clearTimeout(module.timer);                              // 260
              module.timer = setTimeout(function () {                  // 261
                if (module.timer) {                                    // 262
                  delete module.timer;                                 // 263
                }                                                      //
                module.debug('Sending throttled request', data, ajaxSettings.method);
                module.send.request();                                 // 266
              }, settings.throttle);                                   //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        should: {                                                      // 273
          removeError: function () {                                   // 274
            return settings.hideError === true || settings.hideError === 'auto' && !module.is.form();
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 279
          disabled: function () {                                      // 280
            return $module.filter(selector.disabled).length > 0;       // 281
          },                                                           //
          form: function () {                                          // 283
            return $module.is('form') || $context.is('form');          // 284
          },                                                           //
          mocked: function () {                                        // 286
            return settings.mockResponse || settings.mockResponseAsync || settings.response || settings.responseAsync;
          },                                                           //
          input: function () {                                         // 289
            return $module.is('input');                                // 290
          },                                                           //
          loading: function () {                                       // 292
            return module.request && module.request.state() == 'pending';
          },                                                           //
          abortedRequest: function (xhr) {                             // 295
            if (xhr && xhr.readyState !== undefined && xhr.readyState === 0) {
              module.verbose('XHR request determined to be aborted');  // 297
              return true;                                             // 298
            } else {                                                   //
              module.verbose('XHR request was not aborted');           // 301
              return false;                                            // 302
            }                                                          //
          },                                                           //
          validResponse: function (response) {                         // 305
            if (settings.dataType !== 'json' && settings.dataType !== 'jsonp' || !$.isFunction(settings.successTest)) {
              module.verbose('Response is not JSON, skipping validation', settings.successTest, response);
              return true;                                             // 308
            }                                                          //
            module.debug('Checking JSON returned success', settings.successTest, response);
            if (settings.successTest(response)) {                      // 311
              module.debug('Response passed success test', response);  // 312
              return true;                                             // 313
            } else {                                                   //
              module.debug('Response failed success test', response);  // 316
              return false;                                            // 317
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        was: {                                                         // 322
          cancelled: function () {                                     // 323
            return module.cancelled || false;                          // 324
          },                                                           //
          succesful: function () {                                     // 326
            return module.request && module.request.state() == 'resolved';
          },                                                           //
          failure: function () {                                       // 329
            return module.request && module.request.state() == 'rejected';
          },                                                           //
          complete: function () {                                      // 332
            return module.request && (module.request.state() == 'resolved' || module.request.state() == 'rejected');
          }                                                            //
        },                                                             //
                                                                       //
        add: {                                                         // 337
          urlData: function (url, urlData) {                           // 338
            var requiredVariables, optionalVariables;                  // 339
            if (url) {                                                 // 343
              requiredVariables = url.match(settings.regExp.required);
              optionalVariables = url.match(settings.regExp.optional);
              urlData = urlData || settings.urlData;                   // 346
              if (requiredVariables) {                                 // 347
                module.debug('Looking for required URL variables', requiredVariables);
                $.each(requiredVariables, function (index, templatedString) {
                  var                                                  // 350
                  // allow legacy {$var} style                         //
                  variable = templatedString.indexOf('$') !== -1 ? templatedString.substr(2, templatedString.length - 3) : templatedString.substr(1, templatedString.length - 2),
                      value = $.isPlainObject(urlData) && urlData[variable] !== undefined ? urlData[variable] : $module.data(variable) !== undefined ? $module.data(variable) : $context.data(variable) !== undefined ? $context.data(variable) : urlData[variable];
                  // remove value                                      //
                  if (value === undefined) {                           // 364
                    module.error(error.requiredParameter, variable, url);
                    url = false;                                       // 366
                    return false;                                      // 367
                  } else {                                             //
                    module.verbose('Found required variable', variable, value);
                    value = settings.encodeParameters ? module.get.urlEncodedValue(value) : value;
                    url = url.replace(templatedString, value);         // 375
                  }                                                    //
                });                                                    //
              }                                                        //
              if (optionalVariables) {                                 // 379
                module.debug('Looking for optional URL variables', requiredVariables);
                $.each(optionalVariables, function (index, templatedString) {
                  var                                                  // 382
                  // allow legacy {/$var} style                        //
                  variable = templatedString.indexOf('$') !== -1 ? templatedString.substr(3, templatedString.length - 4) : templatedString.substr(2, templatedString.length - 3),
                      value = $.isPlainObject(urlData) && urlData[variable] !== undefined ? urlData[variable] : $module.data(variable) !== undefined ? $module.data(variable) : $context.data(variable) !== undefined ? $context.data(variable) : urlData[variable];
                  // optional replacement                              //
                  if (value !== undefined) {                           // 396
                    module.verbose('Optional variable Found', variable, value);
                    url = url.replace(templatedString, value);         // 398
                  } else {                                             //
                    module.verbose('Optional variable not found', variable);
                    // remove preceding slash if set                   //
                    if (url.indexOf('/' + templatedString) !== -1) {   // 403
                      url = url.replace('/' + templatedString, '');    // 404
                    } else {                                           //
                      url = url.replace(templatedString, '');          // 407
                    }                                                  //
                  }                                                    //
                });                                                    //
              }                                                        //
            }                                                          //
            return url;                                                // 413
          },                                                           //
          formData: function (data) {                                  // 415
            var canSerialize = $.fn.serializeObject !== undefined,     // 416
                formData = canSerialize ? $form.serializeObject() : $form.serialize(),
                hasOtherData;                                          //
            data = data || settings.data;                              // 423
            hasOtherData = $.isPlainObject(data);                      // 424
                                                                       //
            if (hasOtherData) {                                        // 426
              if (canSerialize) {                                      // 427
                module.debug('Extending existing data with form data', data, formData);
                data = $.extend(true, {}, data, formData);             // 429
              } else {                                                 //
                module.error(error.missingSerialize);                  // 432
                module.debug('Cant extend data. Replacing data with form data', data, formData);
                data = formData;                                       // 434
              }                                                        //
            } else {                                                   //
              module.debug('Adding form data', formData);              // 438
              data = formData;                                         // 439
            }                                                          //
            return data;                                               // 441
          }                                                            //
        },                                                             //
                                                                       //
        send: {                                                        // 445
          request: function () {                                       // 446
            module.set.loading();                                      // 447
            module.request = module.create.request();                  // 448
            if (module.is.mocked()) {                                  // 449
              module.mockedXHR = module.create.mockedXHR();            // 450
            } else {                                                   //
              module.xhr = module.create.xhr();                        // 453
            }                                                          //
            settings.onRequest.call(context, module.request, module.xhr);
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 459
          trigger: function (event) {                                  // 460
            module.query();                                            // 461
            if (event.type == 'submit' || event.type == 'click') {     // 462
              event.preventDefault();                                  // 463
            }                                                          //
          },                                                           //
          xhr: {                                                       // 466
            always: function () {                                      // 467
              // nothing special                                       //
            },                                                         //
            done: function (response, textStatus, xhr) {               // 470
              var context = this,                                      // 471
                  elapsedTime = new Date().getTime() - requestStartTime,
                  timeLeft = settings.loadingDuration - elapsedTime,   //
                  translatedResponse = $.isFunction(settings.onResponse) ? settings.onResponse.call(context, $.extend(true, {}, response)) : false;
              timeLeft = timeLeft > 0 ? timeLeft : 0;                  // 479
              if (translatedResponse) {                                // 483
                module.debug('Modified API response in onResponse callback', settings.onResponse, translatedResponse, response);
                response = translatedResponse;                         // 485
              }                                                        //
              if (timeLeft > 0) {                                      // 487
                module.debug('Response completed early delaying state change by', timeLeft);
              }                                                        //
              setTimeout(function () {                                 // 490
                if (module.is.validResponse(response)) {               // 491
                  module.request.resolveWith(context, [response, xhr]);
                } else {                                               //
                  module.request.rejectWith(context, [xhr, 'invalid']);
                }                                                      //
              }, timeLeft);                                            //
            },                                                         //
            fail: function (xhr, status, httpMessage) {                // 499
              var context = this,                                      // 500
                  elapsedTime = new Date().getTime() - requestStartTime,
                  timeLeft = settings.loadingDuration - elapsedTime;   //
              timeLeft = timeLeft > 0 ? timeLeft : 0;                  // 505
              if (timeLeft > 0) {                                      // 509
                module.debug('Response completed early delaying state change by', timeLeft);
              }                                                        //
              setTimeout(function () {                                 // 512
                if (module.is.abortedRequest(xhr)) {                   // 513
                  module.request.rejectWith(context, [xhr, 'aborted', httpMessage]);
                } else {                                               //
                  module.request.rejectWith(context, [xhr, 'error', status, httpMessage]);
                }                                                      //
              }, timeLeft);                                            //
            }                                                          //
          },                                                           //
          request: {                                                   // 522
            done: function (response, xhr) {                           // 523
              module.debug('Successful API Response', response);       // 524
              if (settings.cache === 'local' && url) {                 // 525
                module.write.cachedResponse(url, response);            // 526
                module.debug('Saving server response locally', module.cache);
              }                                                        //
              settings.onSuccess.call(context, response, $module, xhr);
            },                                                         //
            complete: function (firstParameter, secondParameter) {     // 531
              var xhr, response;                                       // 532
              // have to guess callback parameters based on request success
              if (module.was.succesful()) {                            // 537
                response = firstParameter;                             // 538
                xhr = secondParameter;                                 // 539
              } else {                                                 //
                xhr = firstParameter;                                  // 542
                response = module.get.responseFromXHR(xhr);            // 543
              }                                                        //
              module.remove.loading();                                 // 545
              settings.onComplete.call(context, response, $module, xhr);
            },                                                         //
            fail: function (xhr, status, httpMessage) {                // 548
              var                                                      // 549
              // pull response from xhr if available                   //
              response = module.get.responseFromXHR(xhr),              // 551
                  errorMessage = module.get.errorFromRequest(response, status, httpMessage);
              if (status == 'aborted') {                               // 554
                module.debug('XHR Aborted (Most likely caused by page navigation or CORS Policy)', status, httpMessage);
                settings.onAbort.call(context, status, $module, xhr);  // 556
              } else if (status == 'invalid') {                        //
                module.debug('JSON did not pass success test. A server-side error has most likely occurred', response);
              } else if (status == 'error') {                          //
                if (xhr !== undefined) {                               // 562
                  module.debug('XHR produced a server error', status, httpMessage);
                  // make sure we have an error to display to console  //
                  if (xhr.status != 200 && httpMessage !== undefined && httpMessage !== '') {
                    module.error(error.statusMessage + httpMessage, ajaxSettings.url);
                  }                                                    //
                  settings.onError.call(context, errorMessage, $module, xhr);
                }                                                      //
              }                                                        //
                                                                       //
              if (settings.errorDuration && status !== 'aborted') {    // 572
                module.debug('Adding error state');                    // 573
                module.set.error();                                    // 574
                if (module.should.removeError()) {                     // 575
                  setTimeout(module.remove.error, settings.errorDuration);
                }                                                      //
              }                                                        //
              module.debug('API Request failed', errorMessage, xhr);   // 579
              settings.onFailure.call(context, response, $module, xhr);
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        create: {                                                      // 585
                                                                       //
          request: function () {                                       // 587
            // api request promise                                     //
            return $.Deferred().always(module.event.request.complete).done(module.event.request.done).fail(module.event.request.fail);
          },                                                           //
                                                                       //
          mockedXHR: function () {                                     // 596
            var                                                        // 597
            // xhr does not simulate these properties of xhr but must return them
            textStatus = false,                                        // 599
                status = false,                                        //
                httpMessage = false,                                   //
                responder = settings.mockResponse || settings.response,
                asyncResponder = settings.mockResponseAsync || settings.responseAsync,
                asyncCallback,                                         //
                response,                                              //
                mockedXHR;                                             //
                                                                       //
            mockedXHR = $.Deferred().always(module.event.xhr.complete).done(module.event.xhr.done).fail(module.event.xhr.fail);
                                                                       //
            if (responder) {                                           // 615
              if ($.isFunction(responder)) {                           // 616
                module.debug('Using specified synchronous callback', responder);
                response = responder.call(context, requestSettings);   // 618
              } else {                                                 //
                module.debug('Using settings specified response', responder);
                response = responder;                                  // 622
              }                                                        //
              // simulating response                                   //
              mockedXHR.resolveWith(context, [response, textStatus, { responseText: response }]);
            } else if ($.isFunction(asyncResponder)) {                 //
              asyncCallback = function (response) {                    // 628
                module.debug('Async callback returned response', response);
                                                                       //
                if (response) {                                        // 631
                  mockedXHR.resolveWith(context, [response, textStatus, { responseText: response }]);
                } else {                                               //
                  mockedXHR.rejectWith(context, [{ responseText: response }, status, httpMessage]);
                }                                                      //
              };                                                       //
              module.debug('Using specified async response callback', asyncResponder);
              asyncResponder.call(context, requestSettings, asyncCallback);
            }                                                          //
            return mockedXHR;                                          // 641
          },                                                           //
                                                                       //
          xhr: function () {                                           // 644
            var xhr;                                                   // 645
            // ajax request promise                                    //
            xhr = $.ajax(ajaxSettings).always(module.event.xhr.always).done(module.event.xhr.done).fail(module.event.xhr.fail);
            module.verbose('Created server request', xhr);             // 654
            return xhr;                                                // 655
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 659
          error: function () {                                         // 660
            module.verbose('Adding error state to element', $context);
            $context.addClass(className.error);                        // 662
          },                                                           //
          loading: function () {                                       // 664
            module.verbose('Adding loading state to element', $context);
            $context.addClass(className.loading);                      // 666
            requestStartTime = new Date().getTime();                   // 667
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 671
          error: function () {                                         // 672
            module.verbose('Removing error state from element', $context);
            $context.removeClass(className.error);                     // 674
          },                                                           //
          loading: function () {                                       // 676
            module.verbose('Removing loading state from element', $context);
            $context.removeClass(className.loading);                   // 678
          }                                                            //
        },                                                             //
                                                                       //
        get: {                                                         // 682
          responseFromXHR: function (xhr) {                            // 683
            return $.isPlainObject(xhr) ? settings.dataType == 'json' || settings.dataType == 'jsonp' ? module.decode.json(xhr.responseText) : xhr.responseText : false;
          },                                                           //
          errorFromRequest: function (response, status, httpMessage) {
            return $.isPlainObject(response) && response.error !== undefined ? response.error // use json error message
            : settings.error[status] !== undefined ? // use server error message
            settings.error[status] : httpMessage;                      // 695
          },                                                           //
          request: function () {                                       // 699
            return module.request || false;                            // 700
          },                                                           //
          xhr: function () {                                           // 702
            return module.xhr || false;                                // 703
          },                                                           //
          settings: function () {                                      // 705
            var runSettings;                                           // 706
            runSettings = settings.beforeSend.call(context, settings);
            if (runSettings) {                                         // 710
              if (runSettings.success !== undefined) {                 // 711
                module.debug('Legacy success callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.success);
                runSettings.onSuccess = runSettings.success;           // 714
              }                                                        //
              if (runSettings.failure !== undefined) {                 // 716
                module.debug('Legacy failure callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.failure);
                runSettings.onFailure = runSettings.failure;           // 719
              }                                                        //
              if (runSettings.complete !== undefined) {                // 721
                module.debug('Legacy complete callback detected', runSettings);
                module.error(error.legacyParameters, runSettings.complete);
                runSettings.onComplete = runSettings.complete;         // 724
              }                                                        //
            }                                                          //
            if (runSettings === undefined) {                           // 727
              module.error(error.noReturnedValue);                     // 728
            }                                                          //
            return runSettings !== undefined ? $.extend(true, {}, runSettings) : $.extend(true, {}, settings);
          },                                                           //
          urlEncodedValue: function (value) {                          // 735
            var decodedValue = window.decodeURIComponent(value),       // 736
                encodedValue = window.encodeURIComponent(value),       //
                alreadyEncoded = decodedValue !== value;               //
            if (alreadyEncoded) {                                      // 741
              module.debug('URL value is already encoded, avoiding double encoding', value);
              return value;                                            // 743
            }                                                          //
            module.verbose('Encoding value using encodeURIComponent', value, encodedValue);
            return encodedValue;                                       // 746
          },                                                           //
          defaultData: function () {                                   // 748
            var data = {};                                             // 749
            if (!$.isWindow(element)) {                                // 752
              if (module.is.input()) {                                 // 753
                data.value = $module.val();                            // 754
              } else if (!module.is.form()) {} else {                  //
                data.text = $module.text();                            // 760
              }                                                        //
            }                                                          //
            return data;                                               // 763
          },                                                           //
          event: function () {                                         // 765
            if ($.isWindow(element) || settings.on == 'now') {         // 766
              module.debug('API called without element, no events attached');
              return false;                                            // 768
            } else if (settings.on == 'auto') {                        //
              if ($module.is('input')) {                               // 771
                return element.oninput !== undefined ? 'input' : element.onpropertychange !== undefined ? 'propertychange' : 'keyup';
              } else if ($module.is('form')) {                         //
                return 'submit';                                       // 780
              } else {                                                 //
                return 'click';                                        // 783
              }                                                        //
            } else {                                                   //
              return settings.on;                                      // 787
            }                                                          //
          },                                                           //
          templatedURL: function (action) {                            // 790
            action = action || $module.data(metadata.action) || settings.action || false;
            url = $module.data(metadata.url) || settings.url || false;
            if (url) {                                                 // 793
              module.debug('Using specified url', url);                // 794
              return url;                                              // 795
            }                                                          //
            if (action) {                                              // 797
              module.debug('Looking up url for action', action, settings.api);
              if (settings.api[action] === undefined && !module.is.mocked()) {
                module.error(error.missingAction, settings.action, settings.api);
                return;                                                // 801
              }                                                        //
              url = settings.api[action];                              // 803
            } else if (module.is.form()) {                             //
              url = $module.attr('action') || $context.attr('action') || false;
              module.debug('No url or action specified, defaulting to form action', url);
            }                                                          //
            return url;                                                // 809
          }                                                            //
        },                                                             //
                                                                       //
        abort: function () {                                           // 813
          var xhr = module.get.xhr();                                  // 814
          if (xhr && xhr.state() !== 'resolved') {                     // 817
            module.debug('Cancelling API request');                    // 818
            xhr.abort();                                               // 819
          }                                                            //
        },                                                             //
                                                                       //
        // reset state                                                 //
        reset: function () {                                           // 824
          module.remove.error();                                       // 825
          module.remove.loading();                                     // 826
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 829
          module.debug('Changing setting', name, value);               // 830
          if ($.isPlainObject(name)) {                                 // 831
            $.extend(true, settings, name);                            // 832
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 835
          } else {                                                     //
            return settings[name];                                     // 838
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 841
          if ($.isPlainObject(name)) {                                 // 842
            $.extend(true, module, name);                              // 843
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 846
          } else {                                                     //
            return module[name];                                       // 849
          }                                                            //
        },                                                             //
        debug: function () {                                           // 852
          if (settings.debug) {                                        // 853
            if (settings.performance) {                                // 854
              module.performance.log(arguments);                       // 855
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 859
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 863
          if (settings.verbose && settings.debug) {                    // 864
            if (settings.performance) {                                // 865
              module.performance.log(arguments);                       // 866
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 870
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 874
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 876
        },                                                             //
        performance: {                                                 // 878
          log: function (message) {                                    // 879
            var currentTime, executionTime, previousTime;              // 880
            if (settings.performance) {                                // 885
              currentTime = new Date().getTime();                      // 886
              previousTime = time || currentTime;                      // 887
              executionTime = currentTime - previousTime;              // 888
              time = currentTime;                                      // 889
              performance.push({                                       // 890
                'Name': message[0],                                    // 891
                'Arguments': [].slice.call(message, 1) || '',          // 892
                //'Element'        : element,                          //
                'Execution Time': executionTime                        // 894
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 897
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 900
            var title = settings.name + ':',                           // 901
                totalTime = 0;                                         //
            time = false;                                              // 905
            clearTimeout(module.performance.timer);                    // 906
            $.each(performance, function (index, data) {               // 907
              totalTime += data['Execution Time'];                     // 908
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 910
            if (moduleSelector) {                                      // 911
              title += ' \'' + moduleSelector + '\'';                  // 912
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 915
              if (console.table) {                                     // 916
                console.table(performance);                            // 917
              } else {                                                 //
                $.each(performance, function (index, data) {           // 920
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 924
            }                                                          //
            performance = [];                                          // 926
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 929
          var object = instance,                                       // 930
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 936
          context = element || context;                                // 937
          if (typeof query == 'string' && object !== undefined) {      // 938
            query = query.split(/[\. ]/);                              // 939
            maxDepth = query.length - 1;                               // 940
            $.each(query, function (depth, value) {                    // 941
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 947
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 950
                return false;                                          // 951
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 954
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 957
                return false;                                          // 958
              } else {                                                 //
                module.error(error.method, query);                     // 961
                return false;                                          // 962
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 966
            response = found.apply(context, passedArguments);          // 967
          } else if (found !== undefined) {                            //
            response = found;                                          // 970
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 972
            returnedValue.push(response);                              // 973
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 976
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 979
          }                                                            //
          return found;                                                // 981
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 985
        if (instance === undefined) {                                  // 986
          module.initialize();                                         // 987
        }                                                              //
        module.invoke(query);                                          // 989
      } else {                                                         //
        if (instance !== undefined) {                                  // 992
          instance.invoke('destroy');                                  // 993
        }                                                              //
        module.initialize();                                           // 995
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 1000
  };                                                                   //
                                                                       //
  $.api.settings = {                                                   // 1006
                                                                       //
    name: 'API',                                                       // 1008
    namespace: 'api',                                                  // 1009
                                                                       //
    debug: false,                                                      // 1011
    verbose: false,                                                    // 1012
    performance: true,                                                 // 1013
                                                                       //
    // object containing all templates endpoints                       //
    api: {},                                                           // 1016
                                                                       //
    // whether to cache responses                                      //
    cache: true,                                                       // 1019
                                                                       //
    // whether new requests should abort previous requests             //
    interruptRequests: true,                                           // 1022
                                                                       //
    // event binding                                                   //
    on: 'auto',                                                        // 1025
                                                                       //
    // context for applying state classes                              //
    stateContext: false,                                               // 1028
                                                                       //
    // duration for loading state                                      //
    loadingDuration: 0,                                                // 1031
                                                                       //
    // whether to hide errors after a period of time                   //
    hideError: 'auto',                                                 // 1034
                                                                       //
    // duration for error state                                        //
    errorDuration: 2000,                                               // 1037
                                                                       //
    // whether parameters should be encoded with encodeURIComponent    //
    encodeParameters: true,                                            // 1040
                                                                       //
    // API action to use                                               //
    action: false,                                                     // 1043
                                                                       //
    // templated URL to use                                            //
    url: false,                                                        // 1046
                                                                       //
    // base URL to apply to all endpoints                              //
    base: '',                                                          // 1049
                                                                       //
    // data that will                                                  //
    urlData: {},                                                       // 1052
                                                                       //
    // whether to add default data to url data                         //
    defaultData: true,                                                 // 1055
                                                                       //
    // whether to serialize closest form                               //
    serializeForm: false,                                              // 1058
                                                                       //
    // how long to wait before request should occur                    //
    throttle: 0,                                                       // 1061
                                                                       //
    // whether to throttle first request or only repeated              //
    throttleFirstRequest: true,                                        // 1064
                                                                       //
    // standard ajax settings                                          //
    method: 'get',                                                     // 1067
    data: {},                                                          // 1068
    dataType: 'json',                                                  // 1069
                                                                       //
    // mock response                                                   //
    mockResponse: false,                                               // 1072
    mockResponseAsync: false,                                          // 1073
                                                                       //
    // aliases for mock                                                //
    response: false,                                                   // 1076
    responseAsync: false,                                              // 1077
                                                                       //
    // callbacks before request                                        //
    beforeSend: function (settings) {                                  // 1080
      return settings;                                                 // 1080
    },                                                                 //
    beforeXHR: function (xhr) {},                                      // 1081
    onRequest: function (promise, xhr) {},                             // 1082
                                                                       //
    // after request                                                   //
    onResponse: false, // function(response) { },                      // 1085
                                                                       //
    // response was successful, if JSON passed validation              //
    onSuccess: function (response, $module) {},                        // 1088
                                                                       //
    // request finished without aborting                               //
    onComplete: function (response, $module) {},                       // 1091
                                                                       //
    // failed JSON success test                                        //
    onFailure: function (response, $module) {},                        // 1094
                                                                       //
    // server error                                                    //
    onError: function (errorMessage, $module) {},                      // 1097
                                                                       //
    // request aborted                                                 //
    onAbort: function (errorMessage, $module) {},                      // 1100
                                                                       //
    successTest: false,                                                // 1102
                                                                       //
    // errors                                                          //
    error: {                                                           // 1105
      beforeSend: 'The before send function has aborted the request',  // 1106
      error: 'There was an error with your request',                   // 1107
      exitConditions: 'API Request Aborted. Exit conditions met',      // 1108
      JSONParse: 'JSON could not be parsed during error handling',     // 1109
      legacyParameters: 'You are using legacy API success callback names',
      method: 'The method you called is not defined',                  // 1111
      missingAction: 'API action used but no url was defined',         // 1112
      missingSerialize: 'jquery-serialize-object is required to add form data to an existing data object',
      missingURL: 'No URL specified for api event',                    // 1114
      noReturnedValue: 'The beforeSend callback must return a settings object, beforeSend ignored.',
      noStorage: 'Caching responses locally requires session storage',
      parseError: 'There was an error parsing your request',           // 1117
      requiredParameter: 'Missing a required URL parameter: ',         // 1118
      statusMessage: 'Server gave an error: ',                         // 1119
      timeout: 'Your request timed out'                                // 1120
    },                                                                 //
                                                                       //
    regExp: {                                                          // 1123
      required: /\{\$*[A-z0-9]+\}/g,                                   // 1124
      optional: /\{\/\$*[A-z0-9]+\}/g                                  // 1125
    },                                                                 //
                                                                       //
    className: {                                                       // 1128
      loading: 'loading',                                              // 1129
      error: 'error'                                                   // 1130
    },                                                                 //
                                                                       //
    selector: {                                                        // 1133
      disabled: '.disabled',                                           // 1134
      form: 'form'                                                     // 1135
    },                                                                 //
                                                                       //
    metadata: {                                                        // 1138
      action: 'action',                                                // 1139
      url: 'url'                                                       // 1140
    }                                                                  //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
