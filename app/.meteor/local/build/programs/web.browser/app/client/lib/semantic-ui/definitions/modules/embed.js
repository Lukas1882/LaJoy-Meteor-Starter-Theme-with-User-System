(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/embed.js                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Video                                               //
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
  $.fn.embed = function (parameters) {                                 // 20
                                                                       //
    var $allModules = $(this),                                         // 22
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 37
      var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.embed.settings, parameters) : $.extend({}, $.fn.embed.settings),
          selector = settings.selector,                                //
          className = settings.className,                              //
          sources = settings.sources,                                  //
          error = settings.error,                                      //
          metadata = settings.metadata,                                //
          namespace = settings.namespace,                              //
          templates = settings.templates,                              //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          $window = $(window),                                         //
          $module = $(this),                                           //
          $placeholder = $module.find(selector.placeholder),           //
          $icon = $module.find(selector.icon),                         //
          $embed = $module.find(selector.embed),                       //
          element = this,                                              //
          instance = $module.data(moduleNamespace),                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 66
                                                                       //
        initialize: function () {                                      // 68
          module.debug('Initializing embed');                          // 69
          module.determine.autoplay();                                 // 70
          module.create();                                             // 71
          module.bind.events();                                        // 72
          module.instantiate();                                        // 73
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 76
          module.verbose('Storing instance of module', module);        // 77
          instance = module;                                           // 78
          $module.data(moduleNamespace, module);                       // 79
        },                                                             //
                                                                       //
        destroy: function () {                                         // 84
          module.verbose('Destroying previous instance of embed');     // 85
          module.reset();                                              // 86
          $module.removeData(moduleNamespace).off(eventNamespace);     // 87
        },                                                             //
                                                                       //
        refresh: function () {                                         // 93
          module.verbose('Refreshing selector cache');                 // 94
          $placeholder = $module.find(selector.placeholder);           // 95
          $icon = $module.find(selector.icon);                         // 96
          $embed = $module.find(selector.embed);                       // 97
        },                                                             //
                                                                       //
        bind: {                                                        // 100
          events: function () {                                        // 101
            if (module.has.placeholder()) {                            // 102
              module.debug('Adding placeholder events');               // 103
              $module.on('click' + eventNamespace, selector.placeholder, module.createAndShow).on('click' + eventNamespace, selector.icon, module.createAndShow);
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        create: function () {                                          // 112
          var placeholder = module.get.placeholder();                  // 113
          if (placeholder) {                                           // 116
            module.createPlaceholder();                                // 117
          } else {                                                     //
            module.createAndShow();                                    // 120
          }                                                            //
        },                                                             //
                                                                       //
        createPlaceholder: function (placeholder) {                    // 124
          var icon = module.get.icon(),                                // 125
              url = module.get.url(),                                  //
              embed = module.generate.embed(url);                      //
          placeholder = placeholder || module.get.placeholder();       // 130
          $module.html(templates.placeholder(placeholder, icon));      // 131
          module.debug('Creating placeholder for embed', placeholder, icon);
        },                                                             //
                                                                       //
        createEmbed: function (url) {                                  // 135
          module.refresh();                                            // 136
          url = url || module.get.url();                               // 137
          $embed = $('<div/>').addClass(className.embed).html(module.generate.embed(url)).appendTo($module);
          settings.onCreate.call(element, url);                        // 143
          module.debug('Creating embed object', $embed);               // 144
        },                                                             //
                                                                       //
        createAndShow: function () {                                   // 147
          module.createEmbed();                                        // 148
          module.show();                                               // 149
        },                                                             //
                                                                       //
        // sets new embed                                              //
        change: function (source, id, url) {                           // 153
          module.debug('Changing video to ', source, id, url);         // 154
          $module.data(metadata.source, source).data(metadata.id, id).data(metadata.url, url);
          module.create();                                             // 160
        },                                                             //
                                                                       //
        // clears embed                                                //
        reset: function () {                                           // 164
          module.debug('Clearing embed and showing placeholder');      // 165
          module.remove.active();                                      // 166
          module.remove.embed();                                       // 167
          module.showPlaceholder();                                    // 168
          settings.onReset.call(element);                              // 169
        },                                                             //
                                                                       //
        // shows current embed                                         //
        show: function () {                                            // 173
          module.debug('Showing embed');                               // 174
          module.set.active();                                         // 175
          settings.onDisplay.call(element);                            // 176
        },                                                             //
                                                                       //
        hide: function () {                                            // 179
          module.debug('Hiding embed');                                // 180
          module.showPlaceholder();                                    // 181
        },                                                             //
                                                                       //
        showPlaceholder: function () {                                 // 184
          module.debug('Showing placeholder image');                   // 185
          module.remove.active();                                      // 186
          settings.onPlaceholderDisplay.call(element);                 // 187
        },                                                             //
                                                                       //
        get: {                                                         // 190
          id: function () {                                            // 191
            return settings.id || $module.data(metadata.id);           // 192
          },                                                           //
          placeholder: function () {                                   // 194
            return settings.placeholder || $module.data(metadata.placeholder);
          },                                                           //
          icon: function () {                                          // 197
            return settings.icon ? settings.icon : $module.data(metadata.icon) !== undefined ? $module.data(metadata.icon) : module.determine.icon();
          },                                                           //
          source: function (url) {                                     // 205
            return settings.source ? settings.source : $module.data(metadata.source) !== undefined ? $module.data(metadata.source) : module.determine.source();
          },                                                           //
          type: function () {                                          // 213
            var source = module.get.source();                          // 214
            return sources[source] !== undefined ? sources[source].type : false;
          },                                                           //
          url: function () {                                           // 220
            return settings.url ? settings.url : $module.data(metadata.url) !== undefined ? $module.data(metadata.url) : module.determine.url();
          }                                                            //
        },                                                             //
                                                                       //
        determine: {                                                   // 230
          autoplay: function () {                                      // 231
            if (module.should.autoplay()) {                            // 232
              settings.autoplay = true;                                // 233
            }                                                          //
          },                                                           //
          source: function (url) {                                     // 236
            var matchedSource = false;                                 // 237
            url = url || module.get.url();                             // 240
            if (url) {                                                 // 241
              $.each(sources, function (name, source) {                // 242
                if (url.search(source.domain) !== -1) {                // 243
                  matchedSource = name;                                // 244
                  return false;                                        // 245
                }                                                      //
              });                                                      //
            }                                                          //
            return matchedSource;                                      // 249
          },                                                           //
          icon: function () {                                          // 251
            var source = module.get.source();                          // 252
            return sources[source] !== undefined ? sources[source].icon : false;
          },                                                           //
          url: function () {                                           // 260
            var id = settings.id || $module.data(metadata.id),         // 261
                source = settings.source || $module.data(metadata.source),
                url;                                                   //
            url = sources[source] !== undefined ? sources[source].url.replace('{id}', id) : false;
            if (url) {                                                 // 270
              $module.data(metadata.url, url);                         // 271
            }                                                          //
            return url;                                                // 273
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 278
          active: function () {                                        // 279
            $module.addClass(className.active);                        // 280
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 284
          active: function () {                                        // 285
            $module.removeClass(className.active);                     // 286
          },                                                           //
          embed: function () {                                         // 288
            $embed.empty();                                            // 289
          }                                                            //
        },                                                             //
                                                                       //
        encode: {                                                      // 293
          parameters: function (parameters) {                          // 294
            var urlString = [],                                        // 295
                index;                                                 //
            for (index in babelHelpers.sanitizeForInObject(parameters)) {
              urlString.push(encodeURIComponent(index) + '=' + encodeURIComponent(parameters[index]));
            }                                                          //
            return urlString.join('&amp;');                            // 302
          }                                                            //
        },                                                             //
                                                                       //
        generate: {                                                    // 306
          embed: function (url) {                                      // 307
            module.debug('Generating embed html');                     // 308
            var source = module.get.source(),                          // 309
                html,                                                  //
                parameters;                                            //
            url = module.get.url(url);                                 // 314
            if (url) {                                                 // 315
              parameters = module.generate.parameters(source);         // 316
              html = templates.iframe(url, parameters);                // 317
            } else {                                                   //
              module.error(error.noURL, $module);                      // 320
            }                                                          //
            return html;                                               // 322
          },                                                           //
          parameters: function (source, extraParameters) {             // 324
            var parameters = sources[source] && sources[source].parameters !== undefined ? sources[source].parameters(settings) : {};
            extraParameters = extraParameters || settings.parameters;  // 330
            if (extraParameters) {                                     // 331
              parameters = $.extend({}, parameters, extraParameters);  // 332
            }                                                          //
            parameters = settings.onEmbed(parameters);                 // 334
            return module.encode.parameters(parameters);               // 335
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 339
          placeholder: function () {                                   // 340
            return settings.placeholder || $module.data(metadata.placeholder);
          }                                                            //
        },                                                             //
                                                                       //
        should: {                                                      // 345
          autoplay: function () {                                      // 346
            return settings.autoplay === 'auto' ? settings.placeholder || $module.data(metadata.placeholder) !== undefined : settings.autoplay;
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 354
          video: function () {                                         // 355
            return module.get.type() == 'video';                       // 356
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 360
          module.debug('Changing setting', name, value);               // 361
          if ($.isPlainObject(name)) {                                 // 362
            $.extend(true, settings, name);                            // 363
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 366
          } else {                                                     //
            return settings[name];                                     // 369
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 372
          if ($.isPlainObject(name)) {                                 // 373
            $.extend(true, module, name);                              // 374
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 377
          } else {                                                     //
            return module[name];                                       // 380
          }                                                            //
        },                                                             //
        debug: function () {                                           // 383
          if (settings.debug) {                                        // 384
            if (settings.performance) {                                // 385
              module.performance.log(arguments);                       // 386
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 390
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 394
          if (settings.verbose && settings.debug) {                    // 395
            if (settings.performance) {                                // 396
              module.performance.log(arguments);                       // 397
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 401
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 405
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 407
        },                                                             //
        performance: {                                                 // 409
          log: function (message) {                                    // 410
            var currentTime, executionTime, previousTime;              // 411
            if (settings.performance) {                                // 416
              currentTime = new Date().getTime();                      // 417
              previousTime = time || currentTime;                      // 418
              executionTime = currentTime - previousTime;              // 419
              time = currentTime;                                      // 420
              performance.push({                                       // 421
                'Name': message[0],                                    // 422
                'Arguments': [].slice.call(message, 1) || '',          // 423
                'Element': element,                                    // 424
                'Execution Time': executionTime                        // 425
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 428
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 431
            var title = settings.name + ':',                           // 432
                totalTime = 0;                                         //
            time = false;                                              // 436
            clearTimeout(module.performance.timer);                    // 437
            $.each(performance, function (index, data) {               // 438
              totalTime += data['Execution Time'];                     // 439
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 441
            if (moduleSelector) {                                      // 442
              title += ' \'' + moduleSelector + '\'';                  // 443
            }                                                          //
            if ($allModules.length > 1) {                              // 445
              title += ' ' + '(' + $allModules.length + ')';           // 446
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 449
              if (console.table) {                                     // 450
                console.table(performance);                            // 451
              } else {                                                 //
                $.each(performance, function (index, data) {           // 454
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 458
            }                                                          //
            performance = [];                                          // 460
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 463
          var object = instance,                                       // 464
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 470
          context = element || context;                                // 471
          if (typeof query == 'string' && object !== undefined) {      // 472
            query = query.split(/[\. ]/);                              // 473
            maxDepth = query.length - 1;                               // 474
            $.each(query, function (depth, value) {                    // 475
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 481
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 484
                return false;                                          // 485
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 488
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 491
                return false;                                          // 492
              } else {                                                 //
                module.error(error.method, query);                     // 495
                return false;                                          // 496
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 500
            response = found.apply(context, passedArguments);          // 501
          } else if (found !== undefined) {                            //
            response = found;                                          // 504
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 506
            returnedValue.push(response);                              // 507
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 510
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 513
          }                                                            //
          return found;                                                // 515
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 519
        if (instance === undefined) {                                  // 520
          module.initialize();                                         // 521
        }                                                              //
        module.invoke(query);                                          // 523
      } else {                                                         //
        if (instance !== undefined) {                                  // 526
          instance.invoke('destroy');                                  // 527
        }                                                              //
        module.initialize();                                           // 529
      }                                                                //
    });                                                                //
    return returnedValue !== undefined ? returnedValue : this;         // 533
  };                                                                   //
                                                                       //
  $.fn.embed.settings = {                                              // 539
                                                                       //
    name: 'Embed',                                                     // 541
    namespace: 'embed',                                                // 542
                                                                       //
    debug: false,                                                      // 544
    verbose: false,                                                    // 545
    performance: true,                                                 // 546
                                                                       //
    icon: false,                                                       // 548
    source: false,                                                     // 549
    url: false,                                                        // 550
    id: false,                                                         // 551
                                                                       //
    // standard video settings                                         //
    autoplay: 'auto',                                                  // 554
    color: '#444444',                                                  // 555
    hd: true,                                                          // 556
    brandedUI: false,                                                  // 557
                                                                       //
    // additional parameters to include with the embed                 //
    parameters: false,                                                 // 560
                                                                       //
    onDisplay: function () {},                                         // 562
    onPlaceholderDisplay: function () {},                              // 563
    onReset: function () {},                                           // 564
    onCreate: function (url) {},                                       // 565
    onEmbed: function (parameters) {                                   // 566
      return parameters;                                               // 567
    },                                                                 //
                                                                       //
    metadata: {                                                        // 570
      id: 'id',                                                        // 571
      icon: 'icon',                                                    // 572
      placeholder: 'placeholder',                                      // 573
      source: 'source',                                                // 574
      url: 'url'                                                       // 575
    },                                                                 //
                                                                       //
    error: {                                                           // 578
      noURL: 'No URL specified',                                       // 579
      method: 'The method you called is not defined'                   // 580
    },                                                                 //
                                                                       //
    className: {                                                       // 583
      active: 'active',                                                // 584
      embed: 'embed'                                                   // 585
    },                                                                 //
                                                                       //
    selector: {                                                        // 588
      embed: '.embed',                                                 // 589
      placeholder: '.placeholder',                                     // 590
      icon: '.icon'                                                    // 591
    },                                                                 //
                                                                       //
    sources: {                                                         // 594
      youtube: {                                                       // 595
        name: 'youtube',                                               // 596
        type: 'video',                                                 // 597
        icon: 'video play',                                            // 598
        domain: 'youtube.com',                                         // 599
        url: '//www.youtube.com/embed/{id}',                           // 600
        parameters: function (settings) {                              // 601
          return {                                                     // 602
            autohide: !settings.brandedUI,                             // 603
            autoplay: settings.autoplay,                               // 604
            color: settings.colors || undefined,                       // 605
            hq: settings.hd,                                           // 606
            jsapi: settings.api,                                       // 607
            modestbranding: !settings.brandedUI                        // 608
          };                                                           //
        }                                                              //
      },                                                               //
      vimeo: {                                                         // 612
        name: 'vimeo',                                                 // 613
        type: 'video',                                                 // 614
        icon: 'video play',                                            // 615
        domain: 'vimeo.com',                                           // 616
        url: '//player.vimeo.com/video/{id}',                          // 617
        parameters: function (settings) {                              // 618
          return {                                                     // 619
            api: settings.api,                                         // 620
            autoplay: settings.autoplay,                               // 621
            byline: settings.brandedUI,                                // 622
            color: settings.colors || undefined,                       // 623
            portrait: settings.brandedUI,                              // 624
            title: settings.brandedUI                                  // 625
          };                                                           //
        }                                                              //
      }                                                                //
    },                                                                 //
                                                                       //
    templates: {                                                       // 631
      iframe: function (url, parameters) {                             // 632
        return '' + '<iframe src="' + url + '?' + parameters + '"' + ' width="100%" height="100%"' + ' frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
      },                                                               //
      placeholder: function (image, icon) {                            // 639
        var html = '';                                                 // 640
        if (icon) {                                                    // 643
          html += '<i class="' + icon + ' icon"></i>';                 // 644
        }                                                              //
        if (image) {                                                   // 646
          html += '<img class="placeholder" src="' + image + '">';     // 647
        }                                                              //
        return html;                                                   // 649
      }                                                                //
    },                                                                 //
                                                                       //
    // NOT YET IMPLEMENTED                                             //
    api: true,                                                         // 654
    onPause: function () {},                                           // 655
    onPlay: function () {},                                            // 656
    onStop: function () {}                                             // 657
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
