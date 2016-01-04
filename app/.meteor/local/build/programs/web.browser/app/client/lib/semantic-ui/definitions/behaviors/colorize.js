(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/behaviors/colorize.js            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Colorize                                            //
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
  $.fn.colorize = function (parameters) {                              // 20
    var settings = $.isPlainObject(parameters) ? $.extend(true, {}, $.fn.colorize.settings, parameters) : $.extend({}, $.fn.colorize.settings),
                                                                       //
    // hoist arguments                                                 //
    moduleArguments = arguments || false;                              // 26
    $(this).each(function (instanceIndex) {                            // 28
                                                                       //
      var $module = $(this),                                           // 31
          mainCanvas = $('<canvas />')[0],                             //
          imageCanvas = $('<canvas />')[0],                            //
          overlayCanvas = $('<canvas />')[0],                          //
          backgroundImage = new Image(),                               //
                                                                       //
      // defs                                                          //
      mainContext,                                                     // 41
          imageContext,                                                //
          overlayContext,                                              //
          image,                                                       //
          imageName,                                                   //
          width,                                                       //
          height,                                                      //
                                                                       //
      // shortucts                                                     //
      colors = settings.colors,                                        // 52
          paths = settings.paths,                                      //
          namespace = settings.namespace,                              //
          error = settings.error,                                      //
                                                                       //
      // boilerplate                                                   //
      instance = $module.data('module-' + namespace),                  // 58
          module;                                                      //
                                                                       //
      module = {                                                       // 62
                                                                       //
        checkPreconditions: function () {                              // 64
          module.debug('Checking pre-conditions');                     // 65
                                                                       //
          if (!$.isPlainObject(colors) || $.isEmptyObject(colors)) {   // 67
            module.error(error.undefinedColors);                       // 68
            return false;                                              // 69
          }                                                            //
          return true;                                                 // 71
        },                                                             //
                                                                       //
        async: function (callback) {                                   // 74
          if (settings.async) {                                        // 75
            setTimeout(callback, 0);                                   // 76
          } else {                                                     //
            callback();                                                // 79
          }                                                            //
        },                                                             //
                                                                       //
        getMetadata: function () {                                     // 83
          module.debug('Grabbing metadata');                           // 84
          image = $module.data('image') || settings.image || undefined;
          imageName = $module.data('name') || settings.name || instanceIndex;
          width = settings.width || $module.width();                   // 87
          height = settings.height || $module.height();                // 88
          if (width === 0 || height === 0) {                           // 89
            module.error(error.undefinedSize);                         // 90
          }                                                            //
        },                                                             //
                                                                       //
        initialize: function () {                                      // 94
          module.debug('Initializing with colors', colors);            // 95
          if (module.checkPreconditions()) {                           // 96
                                                                       //
            module.async(function () {                                 // 98
              module.getMetadata();                                    // 99
              module.canvas.create();                                  // 100
                                                                       //
              module.draw.image(function () {                          // 102
                module.draw.colors();                                  // 103
                module.canvas.merge();                                 // 104
              });                                                      //
              $module.data('module-' + namespace, module);             // 106
            });                                                        //
          }                                                            //
        },                                                             //
                                                                       //
        redraw: function () {                                          // 113
          module.debug('Redrawing image');                             // 114
          module.async(function () {                                   // 115
            module.canvas.clear();                                     // 116
            module.draw.colors();                                      // 117
            module.canvas.merge();                                     // 118
          });                                                          //
        },                                                             //
                                                                       //
        change: {                                                      // 122
          color: function (colorName, color) {                         // 123
            module.debug('Changing color', colorName);                 // 124
            if (colors[colorName] === undefined) {                     // 125
              module.error(error.missingColor);                        // 126
              return false;                                            // 127
            }                                                          //
            colors[colorName] = color;                                 // 129
            module.redraw();                                           // 130
          }                                                            //
        },                                                             //
                                                                       //
        canvas: {                                                      // 134
          create: function () {                                        // 135
            module.debug('Creating canvases');                         // 136
                                                                       //
            mainCanvas.width = width;                                  // 138
            mainCanvas.height = height;                                // 139
            imageCanvas.width = width;                                 // 140
            imageCanvas.height = height;                               // 141
            overlayCanvas.width = width;                               // 142
            overlayCanvas.height = height;                             // 143
                                                                       //
            mainContext = mainCanvas.getContext('2d');                 // 145
            imageContext = imageCanvas.getContext('2d');               // 146
            overlayContext = overlayCanvas.getContext('2d');           // 147
                                                                       //
            $module.append(mainCanvas);                                // 149
            mainContext = $module.children('canvas')[0].getContext('2d');
          },                                                           //
          clear: function (context) {                                  // 154
            module.debug('Clearing canvas');                           // 155
            overlayContext.fillStyle = '#FFFFFF';                      // 156
            overlayContext.fillRect(0, 0, width, height);              // 157
          },                                                           //
          merge: function () {                                         // 159
            if (!$.isFunction(mainContext.blendOnto)) {                // 160
              module.error(error.missingPlugin);                       // 161
              return;                                                  // 162
            }                                                          //
            mainContext.putImageData(imageContext.getImageData(0, 0, width, height), 0, 0);
            overlayContext.blendOnto(mainContext, 'multiply');         // 165
          }                                                            //
        },                                                             //
                                                                       //
        draw: {                                                        // 169
                                                                       //
          image: function (callback) {                                 // 171
            module.debug('Drawing image');                             // 172
            callback = callback || function () {};                     // 173
            if (image) {                                               // 174
              backgroundImage.src = image;                             // 175
              backgroundImage.onload = function () {                   // 176
                imageContext.drawImage(backgroundImage, 0, 0);         // 177
                callback();                                            // 178
              };                                                       //
            } else {                                                   //
              module.error(error.noImage);                             // 182
              callback();                                              // 183
            }                                                          //
          },                                                           //
                                                                       //
          colors: function () {                                        // 187
            module.debug('Drawing color overlays', colors);            // 188
            $.each(colors, function (colorName, color) {               // 189
              settings.onDraw(overlayContext, imageName, colorName, color);
            });                                                        //
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        debug: function (message, variableName) {                      // 196
          if (settings.debug) {                                        // 197
            if (variableName !== undefined) {                          // 198
              console.info(settings.name + ': ' + message, variableName);
            } else {                                                   //
              console.info(settings.name + ': ' + message);            // 202
            }                                                          //
          }                                                            //
        },                                                             //
        error: function (errorMessage) {                               // 206
          console.warn(settings.name + ': ' + errorMessage);           // 207
        },                                                             //
        invoke: function (methodName, context, methodArguments) {      // 209
          var method;                                                  // 210
          methodArguments = methodArguments || Array.prototype.slice.call(arguments, 2);
                                                                       //
          if (typeof methodName == 'string' && instance !== undefined) {
            methodName = methodName.split('.');                        // 216
            $.each(methodName, function (index, name) {                // 217
              if ($.isPlainObject(instance[name])) {                   // 218
                instance = instance[name];                             // 219
                return true;                                           // 220
              } else if ($.isFunction(instance[name])) {               //
                method = instance[name];                               // 223
                return true;                                           // 224
              }                                                        //
              module.error(settings.error.method);                     // 226
              return false;                                            // 227
            });                                                        //
          }                                                            //
          return $.isFunction(method) ? method.apply(context, methodArguments) : false;
        }                                                              //
                                                                       //
      };                                                               //
      if (instance !== undefined && moduleArguments) {                 // 237
        // simpler than invoke realizing to invoke itself (and losing scope due prototype.call()
        if (moduleArguments[0] == 'invoke') {                          // 239
          moduleArguments = Array.prototype.slice.call(moduleArguments, 1);
        }                                                              //
        return module.invoke(moduleArguments[0], this, Array.prototype.slice.call(moduleArguments, 1));
      }                                                                //
      // initializing                                                  //
      module.initialize();                                             // 245
    });                                                                //
    return this;                                                       // 248
  };                                                                   //
                                                                       //
  $.fn.colorize.settings = {                                           // 251
    name: 'Image Colorizer',                                           // 252
    debug: true,                                                       // 253
    namespace: 'colorize',                                             // 254
                                                                       //
    onDraw: function (overlayContext, imageName, colorName, color) {},
                                                                       //
    // whether to block execution while updating canvas                //
    async: true,                                                       // 259
    // object containing names and default values of color regions     //
    colors: {},                                                        // 261
                                                                       //
    metadata: {                                                        // 263
      image: 'image',                                                  // 264
      name: 'name'                                                     // 265
    },                                                                 //
                                                                       //
    error: {                                                           // 268
      noImage: 'No tracing image specified',                           // 269
      undefinedColors: 'No default colors specified.',                 // 270
      missingColor: 'Attempted to change color that does not exist',   // 271
      missingPlugin: 'Blend onto plug-in must be included',            // 272
      undefinedHeight: 'The width or height of image canvas could not be automatically determined. Please specify a height.'
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
