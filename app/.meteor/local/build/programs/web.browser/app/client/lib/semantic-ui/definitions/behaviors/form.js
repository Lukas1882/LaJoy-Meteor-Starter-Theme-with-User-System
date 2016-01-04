(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/behaviors/form.js                //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.7                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Form Validation                                     //
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
  $.fn.form = function (parameters) {                                  // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        legacyParameters = arguments[1],                               //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
    $allModules.each(function () {                                     // 34
      var $module = $(this),                                           // 36
          element = this,                                              //
          formErrors = [],                                             //
          keyHeldDown = false,                                         //
                                                                       //
      // set at run-time                                               //
      $field,                                                          // 44
          $group,                                                      //
          $message,                                                    //
          $prompt,                                                     //
          $submit,                                                     //
          $clear,                                                      //
          $reset,                                                      //
          settings,                                                    //
          validation,                                                  //
          metadata,                                                    //
          selector,                                                    //
          className,                                                   //
          error,                                                       //
          namespace,                                                   //
          moduleNamespace,                                             //
          eventNamespace,                                              //
          instance,                                                    //
          module;                                                      //
                                                                       //
      module = {                                                       // 68
                                                                       //
        initialize: function () {                                      // 70
                                                                       //
          // settings grabbed at run time                              //
          module.get.settings();                                       // 73
          if (methodInvoked) {                                         // 74
            if (instance === undefined) {                              // 75
              module.instantiate();                                    // 76
            }                                                          //
            module.invoke(query);                                      // 78
          } else {                                                     //
            module.verbose('Initializing form validation', $module, settings);
            module.bindEvents();                                       // 82
            module.set.defaults();                                     // 83
            module.instantiate();                                      // 84
          }                                                            //
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
          module.removeEvents();                                       // 98
          $module.removeData(moduleNamespace);                         // 99
        },                                                             //
                                                                       //
        refresh: function () {                                         // 104
          module.verbose('Refreshing selector cache');                 // 105
          $field = $module.find(selector.field);                       // 106
          $group = $module.find(selector.group);                       // 107
          $message = $module.find(selector.message);                   // 108
          $prompt = $module.find(selector.prompt);                     // 109
                                                                       //
          $submit = $module.find(selector.submit);                     // 111
          $clear = $module.find(selector.clear);                       // 112
          $reset = $module.find(selector.reset);                       // 113
        },                                                             //
                                                                       //
        submit: function () {                                          // 116
          module.verbose('Submitting form', $module);                  // 117
          $module.submit();                                            // 118
        },                                                             //
                                                                       //
        attachEvents: function (selector, action) {                    // 123
          action = action || 'submit';                                 // 124
          $(selector).on('click' + eventNamespace, function (event) {  // 125
            module[action]();                                          // 127
            event.preventDefault();                                    // 128
          });                                                          //
        },                                                             //
                                                                       //
        bindEvents: function () {                                      // 133
          module.verbose('Attaching form events');                     // 134
          $module.on('submit' + eventNamespace, module.validate.form).on('blur' + eventNamespace, selector.field, module.event.field.blur).on('click' + eventNamespace, selector.submit, module.submit).on('click' + eventNamespace, selector.reset, module.reset).on('click' + eventNamespace, selector.clear, module.clear);
          if (settings.keyboardShortcuts) {                            // 142
            $module.on('keydown' + eventNamespace, selector.field, module.event.field.keydown);
          }                                                            //
          $field.each(function () {                                    // 147
            var $input = $(this),                                      // 149
                type = $input.prop('type'),                            //
                inputEvent = module.get.changeEvent(type, $input);     //
            $(this).on(inputEvent + eventNamespace, module.event.field.change);
          });                                                          //
        },                                                             //
                                                                       //
        clear: function () {                                           // 161
          $field.each(function () {                                    // 162
            var $field = $(this),                                      // 164
                $element = $field.parent(),                            //
                $fieldGroup = $field.closest($group),                  //
                $prompt = $fieldGroup.find(selector.prompt),           //
                defaultValue = $field.data(metadata.defaultValue) || '',
                isCheckbox = $element.is(selector.uiCheckbox),         //
                isDropdown = $element.is(selector.uiDropdown),         //
                isErrored = $fieldGroup.hasClass(className.error);     //
            if (isErrored) {                                           // 174
              module.verbose('Resetting error on field', $fieldGroup);
              $fieldGroup.removeClass(className.error);                // 176
              $prompt.remove();                                        // 177
            }                                                          //
            if (isDropdown) {                                          // 179
              module.verbose('Resetting dropdown value', $element, defaultValue);
              $element.dropdown('clear');                              // 181
            } else if (isCheckbox) {                                   //
              $field.prop('checked', false);                           // 184
            } else {                                                   //
              module.verbose('Resetting field value', $field, defaultValue);
              $field.val('');                                          // 188
            }                                                          //
          });                                                          //
        },                                                             //
                                                                       //
        reset: function () {                                           // 194
          $field.each(function () {                                    // 195
            var $field = $(this),                                      // 197
                $element = $field.parent(),                            //
                $fieldGroup = $field.closest($group),                  //
                $prompt = $fieldGroup.find(selector.prompt),           //
                defaultValue = $field.data(metadata.defaultValue),     //
                isCheckbox = $element.is(selector.uiCheckbox),         //
                isDropdown = $element.is(selector.uiDropdown),         //
                isErrored = $fieldGroup.hasClass(className.error);     //
            if (defaultValue === undefined) {                          // 207
              return;                                                  // 208
            }                                                          //
            if (isErrored) {                                           // 210
              module.verbose('Resetting error on field', $fieldGroup);
              $fieldGroup.removeClass(className.error);                // 212
              $prompt.remove();                                        // 213
            }                                                          //
            if (isDropdown) {                                          // 215
              module.verbose('Resetting dropdown value', $element, defaultValue);
              $element.dropdown('restore defaults');                   // 217
            } else if (isCheckbox) {                                   //
              module.verbose('Resetting checkbox value', $element, defaultValue);
              $field.prop('checked', defaultValue);                    // 221
            } else {                                                   //
              module.verbose('Resetting field value', $field, defaultValue);
              $field.val(defaultValue);                                // 225
            }                                                          //
          });                                                          //
        },                                                             //
                                                                       //
        is: {                                                          // 231
          bracketedRule: function (rule) {                             // 232
            return rule.type && rule.type.match(settings.regExp.bracket);
          },                                                           //
          valid: function () {                                         // 235
            var allValid = true;                                       // 236
            module.verbose('Checking if form is valid');               // 239
            $.each(validation, function (fieldName, field) {           // 240
              if (!module.validate.field(field, fieldName)) {          // 241
                allValid = false;                                      // 242
              }                                                        //
            });                                                        //
            return allValid;                                           // 245
          }                                                            //
        },                                                             //
                                                                       //
        removeEvents: function () {                                    // 249
          $module.off(eventNamespace);                                 // 250
          $field.off(eventNamespace);                                  // 253
          $submit.off(eventNamespace);                                 // 256
          $field.off(eventNamespace);                                  // 259
        },                                                             //
                                                                       //
        event: {                                                       // 264
          field: {                                                     // 265
            keydown: function (event) {                                // 266
              var $field = $(this),                                    // 267
                  key = event.which,                                   //
                  keyCode = {                                          //
                enter: 13,                                             // 271
                escape: 27                                             // 272
              };                                                       //
              if (key == keyCode.escape) {                             // 275
                module.verbose('Escape key pressed blurring field');   // 276
                $field.blur();                                         // 277
              }                                                        //
              if (!event.ctrlKey && key == keyCode.enter && $field.is(selector.input) && $field.not(selector.checkbox).length > 0) {
                if (!keyHeldDown) {                                    // 282
                  $field.one('keyup' + eventNamespace, module.event.field.keyup);
                  module.submit();                                     // 286
                  module.debug('Enter pressed on input submitting form');
                }                                                      //
                keyHeldDown = true;                                    // 289
              }                                                        //
            },                                                         //
            keyup: function () {                                       // 292
              keyHeldDown = false;                                     // 293
            },                                                         //
            blur: function (event) {                                   // 295
              var $field = $(this),                                    // 296
                  $fieldGroup = $field.closest($group),                //
                  validationRules = module.get.validation($field);     //
              if ($fieldGroup.hasClass(className.error)) {             // 301
                module.debug('Revalidating field', $field, validationRules);
                module.validate.form.call(module, event, true);        // 303
              } else if (settings.on == 'blur' || settings.on == 'change') {
                if (validationRules) {                                 // 306
                  module.validate.field(validationRules);              // 307
                }                                                      //
              }                                                        //
            },                                                         //
            change: function (event) {                                 // 311
              var $field = $(this),                                    // 312
                  $fieldGroup = $field.closest($group);                //
              if (settings.on == 'change' || $fieldGroup.hasClass(className.error) && settings.revalidate) {
                clearTimeout(module.timer);                            // 317
                module.timer = setTimeout(function () {                // 318
                  module.debug('Revalidating field', $field, module.get.validation($field));
                  module.validate.form.call(module, event, true);      // 320
                }, settings.delay);                                    //
              }                                                        //
            }                                                          //
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        get: {                                                         // 328
          ancillaryValue: function (rule) {                            // 329
            if (!rule.type || !module.is.bracketedRule(rule)) {        // 330
              return false;                                            // 331
            }                                                          //
            return rule.type.match(settings.regExp.bracket)[1] + '';   // 333
          },                                                           //
          ruleName: function (rule) {                                  // 335
            if (module.is.bracketedRule(rule)) {                       // 336
              return rule.type.replace(rule.type.match(settings.regExp.bracket)[0], '');
            }                                                          //
            return rule.type;                                          // 339
          },                                                           //
          changeEvent: function (type, $input) {                       // 341
            if (type == 'checkbox' || type == 'radio' || type == 'hidden' || $input.is('select')) {
              return 'change';                                         // 343
            } else {                                                   //
              return module.get.inputEvent();                          // 346
            }                                                          //
          },                                                           //
          inputEvent: function () {                                    // 349
            return document.createElement('input').oninput !== undefined ? 'input' : document.createElement('input').onpropertychange !== undefined ? 'propertychange' : 'keyup';
          },                                                           //
          prompt: function (rule, field) {                             // 357
            var ruleName = module.get.ruleName(rule),                  // 358
                ancillary = module.get.ancillaryValue(rule),           //
                prompt = rule.prompt || settings.prompt[ruleName] || settings.text.unspecifiedRule,
                requiresValue = prompt.search('{value}') !== -1,       //
                requiresName = prompt.search('{name}') !== -1,         //
                $label,                                                //
                $field,                                                //
                name;                                                  //
            if (requiresName || requiresValue) {                       // 368
              $field = module.get.field(field.identifier);             // 369
            }                                                          //
            if (requiresValue) {                                       // 371
              prompt = prompt.replace('{value}', $field.val());        // 372
            }                                                          //
            if (requiresName) {                                        // 374
              $label = $field.closest(selector.group).find('label').eq(0);
              name = $label.size() == 1 ? $label.text() : $field.prop('placeholder') || settings.text.unspecifiedField;
              prompt = prompt.replace('{name}', name);                 // 380
            }                                                          //
            prompt = prompt.replace('{identifier}', field.identifier);
            prompt = prompt.replace('{ruleValue}', ancillary);         // 383
            if (!rule.prompt) {                                        // 384
              module.verbose('Using default validation prompt for type', prompt, ruleName);
            }                                                          //
            return prompt;                                             // 387
          },                                                           //
          settings: function () {                                      // 389
            if ($.isPlainObject(parameters)) {                         // 390
              var keys = Object.keys(parameters),                      // 391
                  isLegacySettings = keys.length > 0 ? parameters[keys[0]].identifier !== undefined && parameters[keys[0]].rules !== undefined : false,
                  ruleKeys;                                            //
              if (isLegacySettings) {                                  // 398
                // 1.x (ducktyped)                                     //
                settings = $.extend(true, {}, $.fn.form.settings, legacyParameters);
                validation = $.extend({}, $.fn.form.settings.defaults, parameters);
                module.error(settings.error.oldSyntax, element);       // 402
                module.verbose('Extending settings from legacy parameters', validation, settings);
              } else {                                                 //
                // 2.x                                                 //
                if (parameters.fields) {                               // 407
                  ruleKeys = Object.keys(parameters.fields);           // 408
                  if (typeof parameters.fields[ruleKeys[0]] == 'string' || $.isArray(parameters.fields[ruleKeys[0]])) {
                    $.each(parameters.fields, function (name, rules) {
                      if (typeof rules == 'string') {                  // 411
                        rules = [rules];                               // 412
                      }                                                //
                      parameters.fields[name] = {                      // 414
                        rules: []                                      // 415
                      };                                               //
                      $.each(rules, function (index, rule) {           // 417
                        parameters.fields[name].rules.push({ type: rule });
                      });                                              //
                    });                                                //
                  }                                                    //
                }                                                      //
                                                                       //
                settings = $.extend(true, {}, $.fn.form.settings, parameters);
                validation = $.extend({}, $.fn.form.settings.defaults, settings.fields);
                module.verbose('Extending settings', validation, settings);
              }                                                        //
            } else {                                                   //
              settings = $.fn.form.settings;                           // 430
              validation = $.fn.form.settings.defaults;                // 431
              module.verbose('Using default form validation', validation, settings);
            }                                                          //
                                                                       //
            // shorthand                                               //
            namespace = settings.namespace;                            // 436
            metadata = settings.metadata;                              // 437
            selector = settings.selector;                              // 438
            className = settings.className;                            // 439
            error = settings.error;                                    // 440
            moduleNamespace = 'module-' + namespace;                   // 441
            eventNamespace = '.' + namespace;                          // 442
                                                                       //
            // grab instance                                           //
            instance = $module.data(moduleNamespace);                  // 445
                                                                       //
            // refresh selector cache                                  //
            module.refresh();                                          // 448
          },                                                           //
          field: function (identifier) {                               // 450
            module.verbose('Finding field with identifier', identifier);
            if ($field.filter('#' + identifier).length > 0) {          // 452
              return $field.filter('#' + identifier);                  // 453
            } else if ($field.filter('[name="' + identifier + '"]').length > 0) {
              return $field.filter('[name="' + identifier + '"]');     // 456
            } else if ($field.filter('[name="' + identifier + '[]"]').length > 0) {
              return $field.filter('[name="' + identifier + '[]"]');   // 459
            } else if ($field.filter('[data-' + metadata.validate + '="' + identifier + '"]').length > 0) {
              return $field.filter('[data-' + metadata.validate + '="' + identifier + '"]');
            }                                                          //
            return $('<input/>');                                      // 464
          },                                                           //
          fields: function (fields) {                                  // 466
            var $fields = $();                                         // 467
            $.each(fields, function (index, name) {                    // 470
              $fields = $fields.add(module.get.field(name));           // 471
            });                                                        //
            return $fields;                                            // 473
          },                                                           //
          validation: function ($field) {                              // 475
            var fieldValidation, identifier;                           // 476
            if (!validation) {                                         // 480
              return false;                                            // 481
            }                                                          //
            $.each(validation, function (fieldName, field) {           // 483
              identifier = field.identifier || fieldName;              // 484
              if (module.get.field(identifier)[0] == $field[0]) {      // 485
                field.identifier = identifier;                         // 486
                fieldValidation = field;                               // 487
              }                                                        //
            });                                                        //
            return fieldValidation || false;                           // 490
          },                                                           //
          value: function (field) {                                    // 492
            var fields = [],                                           // 493
                results;                                               //
            fields.push(field);                                        // 497
            results = module.get.values.call(element, fields);         // 498
            return results[field];                                     // 499
          },                                                           //
          values: function (fields) {                                  // 501
            var $fields = $.isArray(fields) ? module.get.fields(fields) : $field,
                values = {};                                           //
            $fields.each(function (index, field) {                     // 508
              var $field = $(field),                                   // 509
                  type = $field.prop('type'),                          //
                  name = $field.prop('name'),                          //
                  value = $field.val(),                                //
                  isCheckbox = $field.is(selector.checkbox),           //
                  isRadio = $field.is(selector.radio),                 //
                  isMultiple = name.indexOf('[]') !== -1,              //
                  isChecked = isCheckbox ? $field.is(':checked') : false;
              if (name) {                                              // 521
                if (isMultiple) {                                      // 522
                  name = name.replace('[]', '');                       // 523
                  if (!values[name]) {                                 // 524
                    values[name] = [];                                 // 525
                  }                                                    //
                  if (isCheckbox) {                                    // 527
                    if (isChecked) {                                   // 528
                      values[name].push(value || true);                // 529
                    } else {                                           //
                      values[name].push(false);                        // 532
                    }                                                  //
                  } else {                                             //
                    values[name].push(value);                          // 536
                  }                                                    //
                } else {                                               //
                  if (isRadio) {                                       // 540
                    if (isChecked) {                                   // 541
                      values[name] = value;                            // 542
                    }                                                  //
                  } else if (isCheckbox) {                             //
                    if (isChecked) {                                   // 546
                      values[name] = value || true;                    // 547
                    } else {                                           //
                      values[name] = false;                            // 550
                    }                                                  //
                  } else {                                             //
                    values[name] = value;                              // 554
                  }                                                    //
                }                                                      //
              }                                                        //
            });                                                        //
            return values;                                             // 559
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 563
                                                                       //
          field: function (identifier) {                               // 565
            module.verbose('Checking for existence of a field with identifier', identifier);
            if (typeof identifier !== 'string') {                      // 567
              module.error(error.identifier, identifier);              // 568
            }                                                          //
            if ($field.filter('#' + identifier).length > 0) {          // 570
              return true;                                             // 571
            } else if ($field.filter('[name="' + identifier + '"]').length > 0) {
              return true;                                             // 574
            } else if ($field.filter('[data-' + metadata.validate + '="' + identifier + '"]').length > 0) {
              return true;                                             // 577
            }                                                          //
            return false;                                              // 579
          }                                                            //
                                                                       //
        },                                                             //
                                                                       //
        add: {                                                         // 584
          prompt: function (identifier, errors) {                      // 585
            var $field = module.get.field(identifier),                 // 586
                $fieldGroup = $field.closest($group),                  //
                $prompt = $fieldGroup.children(selector.prompt),       //
                promptExists = $prompt.length !== 0;                   //
            errors = typeof errors == 'string' ? [errors] : errors;    // 592
            module.verbose('Adding field error state', identifier);    // 596
            $fieldGroup.addClass(className.error);                     // 597
            if (settings.inline) {                                     // 600
              if (!promptExists) {                                     // 601
                $prompt = settings.templates.prompt(errors);           // 602
                $prompt.appendTo($fieldGroup);                         // 603
              }                                                        //
              $prompt.html(errors[0]);                                 // 607
              if (!promptExists) {                                     // 610
                if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                  module.verbose('Displaying error with css transition', settings.transition);
                  $prompt.transition(settings.transition + ' in', settings.duration);
                } else {                                               //
                  module.verbose('Displaying error with fallback javascript animation');
                  $prompt.fadeIn(settings.duration);                   // 617
                }                                                      //
              } else {                                                 //
                module.verbose('Inline errors are disabled, no inline error added', identifier);
              }                                                        //
            }                                                          //
          },                                                           //
          errors: function (errors) {                                  // 627
            module.debug('Adding form error messages', errors);        // 628
            module.set.error();                                        // 629
            $message.html(settings.templates.error(errors));           // 630
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 636
          prompt: function (identifier) {                              // 637
            var $field = module.get.field(identifier),                 // 638
                $fieldGroup = $field.closest($group),                  //
                $prompt = $fieldGroup.children(selector.prompt);       //
            $fieldGroup.removeClass(className.error);                  // 643
            if (settings.inline && $prompt.is(':visible')) {           // 646
              module.verbose('Removing prompt for field', identifier);
              if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                $prompt.transition(settings.transition + ' out', settings.duration, function () {
                  $prompt.remove();                                    // 650
                });                                                    //
              } else {                                                 //
                $prompt.fadeOut(settings.duration, function () {       // 654
                  $prompt.remove();                                    // 656
                });                                                    //
              }                                                        //
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 664
          success: function () {                                       // 665
            $module.removeClass(className.error).addClass(className.success);
          },                                                           //
          defaults: function () {                                      // 671
            $field.each(function () {                                  // 672
              var $field = $(this),                                    // 674
                  isCheckbox = $field.filter(selector.checkbox).length > 0,
                  value = isCheckbox ? $field.is(':checked') : $field.val();
              $field.data(metadata.defaultValue, value);               // 681
            });                                                        //
          },                                                           //
          error: function () {                                         // 685
            $module.removeClass(className.success).addClass(className.error);
          },                                                           //
          value: function (field, value) {                             // 691
            var fields = {};                                           // 692
            fields[field] = value;                                     // 695
            return module.set.values.call(element, fields);            // 696
          },                                                           //
          values: function (fields) {                                  // 698
            if ($.isEmptyObject(fields)) {                             // 699
              return;                                                  // 700
            }                                                          //
            $.each(fields, function (key, value) {                     // 702
              var $field = module.get.field(key),                      // 703
                  $element = $field.parent(),                          //
                  isMultiple = $.isArray(value),                       //
                  isCheckbox = $element.is(selector.uiCheckbox),       //
                  isDropdown = $element.is(selector.uiDropdown),       //
                  isRadio = $field.is(selector.radio) && isCheckbox,   //
                  fieldExists = $field.length > 0,                     //
                  $multipleField;                                      //
              if (fieldExists) {                                       // 713
                if (isMultiple && isCheckbox) {                        // 714
                  module.verbose('Selecting multiple', value, $field);
                  $element.checkbox('uncheck');                        // 716
                  $.each(value, function (index, value) {              // 717
                    $multipleField = $field.filter('[value="' + value + '"]');
                    $element = $multipleField.parent();                // 719
                    if ($multipleField.length > 0) {                   // 720
                      $element.checkbox('check');                      // 721
                    }                                                  //
                  });                                                  //
                } else if (isRadio) {                                  //
                  module.verbose('Selecting radio value', value, $field);
                  $field.filter('[value="' + value + '"]').parent(selector.uiCheckbox).checkbox('check');
                } else if (isCheckbox) {                               //
                  module.verbose('Setting checkbox value', value, $element);
                  if (value === true) {                                // 734
                    $element.checkbox('check');                        // 735
                  } else {                                             //
                    $element.checkbox('uncheck');                      // 738
                  }                                                    //
                } else if (isDropdown) {                               //
                  module.verbose('Setting dropdown value', value, $element);
                  $element.dropdown('set selected', value);            // 743
                } else {                                               //
                  module.verbose('Setting field value', value, $field);
                  $field.val(value);                                   // 747
                }                                                      //
              }                                                        //
            });                                                        //
          }                                                            //
        },                                                             //
                                                                       //
        validate: {                                                    // 754
                                                                       //
          form: function (event, ignoreCallbacks) {                    // 756
            var values = module.get.values(),                          // 757
                apiRequest;                                            //
                                                                       //
            // input keydown event will fire submit repeatedly by browser default
            if (keyHeldDown) {                                         // 763
              return false;                                            // 764
            }                                                          //
                                                                       //
            // reset errors                                            //
            formErrors = [];                                           // 768
            if (module.is.valid()) {                                   // 769
              module.debug('Form has no validation errors, submitting');
              module.set.success();                                    // 771
              if (ignoreCallbacks !== true) {                          // 772
                return settings.onSuccess.call(element, event, values);
              }                                                        //
            } else {                                                   //
              module.debug('Form has errors');                         // 777
              module.set.error();                                      // 778
              if (!settings.inline) {                                  // 779
                module.add.errors(formErrors);                         // 780
              }                                                        //
              // prevent ajax submit                                   //
              if ($module.data('moduleApi') !== undefined) {           // 783
                event.stopImmediatePropagation();                      // 784
              }                                                        //
              if (ignoreCallbacks !== true) {                          // 786
                return settings.onFailure.call(element, formErrors, values);
              }                                                        //
            }                                                          //
          },                                                           //
                                                                       //
          // takes a validation object and returns whether field passes validation
          field: function (field, fieldName) {                         // 793
            var identifier = field.identifier || fieldName,            // 794
                $field = module.get.field(identifier),                 //
                fieldValid = true,                                     //
                fieldErrors = [];                                      //
            if (!field.identifier) {                                   // 800
              module.debug('Using field name as identifier', identifier);
              field.identifier = identifier;                           // 802
            }                                                          //
            if ($field.prop('disabled')) {                             // 804
              module.debug('Field is disabled. Skipping', identifier);
              fieldValid = true;                                       // 806
            } else if (field.optional && $.trim($field.val()) === '') {
              module.debug('Field is optional and empty. Skipping', identifier);
              fieldValid = true;                                       // 810
            } else if (field.rules !== undefined) {                    //
              $.each(field.rules, function (index, rule) {             // 813
                if (module.has.field(identifier) && !module.validate.rule(field, rule)) {
                  module.debug('Field is invalid', identifier, rule.type);
                  fieldErrors.push(module.get.prompt(rule, field));    // 816
                  fieldValid = false;                                  // 817
                }                                                      //
              });                                                      //
            }                                                          //
            if (fieldValid) {                                          // 821
              module.remove.prompt(identifier, fieldErrors);           // 822
              settings.onValid.call($field);                           // 823
            } else {                                                   //
              formErrors = formErrors.concat(fieldErrors);             // 826
              module.add.prompt(identifier, fieldErrors);              // 827
              settings.onInvalid.call($field, fieldErrors);            // 828
              return false;                                            // 829
            }                                                          //
            return true;                                               // 831
          },                                                           //
                                                                       //
          // takes validation rule and returns whether field passes rule
          rule: function (field, rule) {                               // 835
            var $field = module.get.field(field.identifier),           // 836
                type = rule.type,                                      //
                value = $field.val(),                                  //
                isValid = true,                                        //
                ancillary = module.get.ancillaryValue(rule),           //
                ruleName = module.get.ruleName(rule),                  //
                ruleFunction = settings.rules[ruleName];               //
            if (!$.isFunction(ruleFunction)) {                         // 845
              module.error(error.noRule, ruleName);                    // 846
              return;                                                  // 847
            }                                                          //
            // cast to string avoiding encoding special values         //
            value = value === undefined || value === '' || value === null ? '' : $.trim(value + '');
            return ruleFunction.call($field, value, ancillary);        // 854
          }                                                            //
        },                                                             //
                                                                       //
        setting: function (name, value) {                              // 858
          if ($.isPlainObject(name)) {                                 // 859
            $.extend(true, settings, name);                            // 860
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 863
          } else {                                                     //
            return settings[name];                                     // 866
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 869
          if ($.isPlainObject(name)) {                                 // 870
            $.extend(true, module, name);                              // 871
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 874
          } else {                                                     //
            return module[name];                                       // 877
          }                                                            //
        },                                                             //
        debug: function () {                                           // 880
          if (settings.debug) {                                        // 881
            if (settings.performance) {                                // 882
              module.performance.log(arguments);                       // 883
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 887
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 891
          if (settings.verbose && settings.debug) {                    // 892
            if (settings.performance) {                                // 893
              module.performance.log(arguments);                       // 894
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 898
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 902
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 904
        },                                                             //
        performance: {                                                 // 906
          log: function (message) {                                    // 907
            var currentTime, executionTime, previousTime;              // 908
            if (settings.performance) {                                // 913
              currentTime = new Date().getTime();                      // 914
              previousTime = time || currentTime;                      // 915
              executionTime = currentTime - previousTime;              // 916
              time = currentTime;                                      // 917
              performance.push({                                       // 918
                'Name': message[0],                                    // 919
                'Arguments': [].slice.call(message, 1) || '',          // 920
                'Element': element,                                    // 921
                'Execution Time': executionTime                        // 922
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 925
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 928
            var title = settings.name + ':',                           // 929
                totalTime = 0;                                         //
            time = false;                                              // 933
            clearTimeout(module.performance.timer);                    // 934
            $.each(performance, function (index, data) {               // 935
              totalTime += data['Execution Time'];                     // 936
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 938
            if (moduleSelector) {                                      // 939
              title += ' \'' + moduleSelector + '\'';                  // 940
            }                                                          //
            if ($allModules.length > 1) {                              // 942
              title += ' ' + '(' + $allModules.length + ')';           // 943
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 946
              if (console.table) {                                     // 947
                console.table(performance);                            // 948
              } else {                                                 //
                $.each(performance, function (index, data) {           // 951
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 955
            }                                                          //
            performance = [];                                          // 957
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 960
          var object = instance,                                       // 961
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 967
          context = element || context;                                // 968
          if (typeof query == 'string' && object !== undefined) {      // 969
            query = query.split(/[\. ]/);                              // 970
            maxDepth = query.length - 1;                               // 971
            $.each(query, function (depth, value) {                    // 972
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 978
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 981
                return false;                                          // 982
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 985
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 988
                return false;                                          // 989
              } else {                                                 //
                return false;                                          // 992
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 996
            response = found.apply(context, passedArguments);          // 997
          } else if (found !== undefined) {                            //
            response = found;                                          // 1000
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 1002
            returnedValue.push(response);                              // 1003
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 1006
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 1009
          }                                                            //
          return found;                                                // 1011
        }                                                              //
      };                                                               //
      module.initialize();                                             // 1014
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 1018
  };                                                                   //
                                                                       //
  $.fn.form.settings = {                                               // 1024
                                                                       //
    name: 'Form',                                                      // 1026
    namespace: 'form',                                                 // 1027
                                                                       //
    debug: false,                                                      // 1029
    verbose: false,                                                    // 1030
    performance: true,                                                 // 1031
                                                                       //
    fields: false,                                                     // 1033
                                                                       //
    keyboardShortcuts: true,                                           // 1035
    on: 'submit',                                                      // 1036
    inline: false,                                                     // 1037
                                                                       //
    delay: 200,                                                        // 1039
    revalidate: true,                                                  // 1040
                                                                       //
    transition: 'scale',                                               // 1042
    duration: 200,                                                     // 1043
                                                                       //
    onValid: function () {},                                           // 1045
    onInvalid: function () {},                                         // 1046
    onSuccess: function () {                                           // 1047
      return true;                                                     // 1047
    },                                                                 //
    onFailure: function () {                                           // 1048
      return false;                                                    // 1048
    },                                                                 //
                                                                       //
    metadata: {                                                        // 1050
      defaultValue: 'default',                                         // 1051
      validate: 'validate'                                             // 1052
    },                                                                 //
                                                                       //
    regExp: {                                                          // 1055
      bracket: /\[(.*)\]/i,                                            // 1056
      decimal: /^\d*(\.)\d+/,                                          // 1057
      email: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
      escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,                   // 1059
      flags: /^\/(.*)\/(.*)?/,                                         // 1060
      integer: /^\-?\d+$/,                                             // 1061
      number: /^\-?\d*(\.\d+)?$/,                                      // 1062
      url: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i
    },                                                                 //
                                                                       //
    text: {                                                            // 1066
      unspecifiedRule: 'Please enter a valid value',                   // 1067
      unspecifiedField: 'This field'                                   // 1068
    },                                                                 //
                                                                       //
    prompt: {                                                          // 1071
      empty: '{name} must have a value',                               // 1072
      checked: '{name} must be checked',                               // 1073
      email: '{name} must be a valid e-mail',                          // 1074
      url: '{name} must be a valid url',                               // 1075
      regExp: '{name} is not formatted correctly',                     // 1076
      integer: '{name} must be an integer',                            // 1077
      decimal: '{name} must be a decimal number',                      // 1078
      number: '{name} must be set to a number',                        // 1079
      is: '{name} must be "{ruleValue}"',                              // 1080
      isExactly: '{name} must be exactly "{ruleValue}"',               // 1081
      not: '{name} cannot be set to "{ruleValue}"',                    // 1082
      notExactly: '{name} cannot be set to exactly "{ruleValue}"',     // 1083
      contain: '{name} cannot contain "{ruleValue}"',                  // 1084
      containExactly: '{name} cannot contain exactly "{ruleValue}"',   // 1085
      doesntContain: '{name} must contain  "{ruleValue}"',             // 1086
      doesntContainExactly: '{name} must contain exactly "{ruleValue}"',
      minLength: '{name} must be at least {ruleValue} characters',     // 1088
      length: '{name} must be at least {ruleValue} characters',        // 1089
      exactLength: '{name} must be exactly {ruleValue} characters',    // 1090
      maxLength: '{name} cannot be longer than {ruleValue} characters',
      match: '{name} must match {ruleValue} field',                    // 1092
      different: '{name} must have a different value than {ruleValue} field',
      creditCard: '{name} must be a valid credit card number',         // 1094
      minCount: '{name} must have at least {ruleValue} choices',       // 1095
      exactCount: '{name} must have exactly {ruleValue} choices',      // 1096
      maxCount: '{name} must have {ruleValue} or less choices'         // 1097
    },                                                                 //
                                                                       //
    selector: {                                                        // 1100
      checkbox: 'input[type="checkbox"], input[type="radio"]',         // 1101
      clear: '.clear',                                                 // 1102
      field: 'input, textarea, select',                                // 1103
      group: '.field',                                                 // 1104
      input: 'input',                                                  // 1105
      message: '.error.message',                                       // 1106
      prompt: '.prompt.label',                                         // 1107
      radio: 'input[type="radio"]',                                    // 1108
      reset: '.reset:not([type="reset"])',                             // 1109
      submit: '.submit:not([type="submit"])',                          // 1110
      uiCheckbox: '.ui.checkbox',                                      // 1111
      uiDropdown: '.ui.dropdown'                                       // 1112
    },                                                                 //
                                                                       //
    className: {                                                       // 1115
      error: 'error',                                                  // 1116
      label: 'ui prompt label',                                        // 1117
      pressed: 'down',                                                 // 1118
      success: 'success'                                               // 1119
    },                                                                 //
                                                                       //
    error: {                                                           // 1122
      identifier: 'You must specify a string identifier for each field',
      method: 'The method you called is not defined.',                 // 1124
      noRule: 'There is no rule matching the one you specified',       // 1125
      oldSyntax: 'Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically.'
    },                                                                 //
                                                                       //
    templates: {                                                       // 1129
                                                                       //
      // template that produces error message                          //
      error: function (errors) {                                       // 1132
        var html = '<ul class="list">';                                // 1133
        $.each(errors, function (index, value) {                       // 1136
          html += '<li>' + value + '</li>';                            // 1137
        });                                                            //
        html += '</ul>';                                               // 1139
        return $(html);                                                // 1140
      },                                                               //
                                                                       //
      // template that produces label                                  //
      prompt: function (errors) {                                      // 1144
        return $('<div/>').addClass('ui basic red pointing prompt label').html(errors[0]);
      }                                                                //
    },                                                                 //
                                                                       //
    rules: {                                                           // 1152
                                                                       //
      // is not empty or blank string                                  //
      empty: function (value) {                                        // 1155
        return !(value === undefined || '' === value || $.isArray(value) && value.length === 0);
      },                                                               //
                                                                       //
      // checkbox checked                                              //
      checked: function () {                                           // 1160
        return $(this).filter(':checked').length > 0;                  // 1161
      },                                                               //
                                                                       //
      // is most likely an email                                       //
      email: function (value) {                                        // 1165
        var emailRegExp = new RegExp($.fn.form.settings.regExp.email, 'i');
        return emailRegExp.test(value);                                // 1169
      },                                                               //
                                                                       //
      // value is most likely url                                      //
      url: function (value) {                                          // 1173
        return $.fn.form.settings.regExp.url.test(value);              // 1174
      },                                                               //
                                                                       //
      // matches specified regExp                                      //
      regExp: function (value, regExp) {                               // 1178
        var regExpParts = regExp.match($.fn.form.settings.regExp.flags),
            flags;                                                     //
        // regular expression specified as /baz/gi (flags)             //
        if (regExpParts) {                                             // 1184
          regExp = regExpParts.length >= 2 ? regExpParts[1] : regExp;  // 1185
          flags = regExpParts.length >= 3 ? regExpParts[2] : '';       // 1189
        }                                                              //
        return value.match(new RegExp(regExp, flags));                 // 1194
      },                                                               //
                                                                       //
      // is valid integer or matches range                             //
      integer: function (value, range) {                               // 1198
        var intRegExp = $.fn.form.settings.regExp.integer,             // 1199
            min,                                                       //
            max,                                                       //
            parts;                                                     //
        if (!range || ['', '..'].indexOf(range) !== -1) {              // 1205
          // do nothing                                                //
        } else if (range.indexOf('..') == -1) {                        //
            if (intRegExp.test(range)) {                               // 1209
              min = max = range - 0;                                   // 1210
            }                                                          //
          } else {                                                     //
            parts = range.split('..', 2);                              // 1214
            if (intRegExp.test(parts[0])) {                            // 1215
              min = parts[0] - 0;                                      // 1216
            }                                                          //
            if (intRegExp.test(parts[1])) {                            // 1218
              max = parts[1] - 0;                                      // 1219
            }                                                          //
          }                                                            //
        return intRegExp.test(value) && (min === undefined || value >= min) && (max === undefined || value <= max);
      },                                                               //
                                                                       //
      // is valid number (with decimal)                                //
      decimal: function (value) {                                      // 1230
        return $.fn.form.settings.regExp.decimal.test(value);          // 1231
      },                                                               //
                                                                       //
      // is valid number                                               //
      number: function (value) {                                       // 1235
        return $.fn.form.settings.regExp.number.test(value);           // 1236
      },                                                               //
                                                                       //
      // is value (case insensitive)                                   //
      is: function (value, text) {                                     // 1240
        text = typeof text == 'string' ? text.toLowerCase() : text;    // 1241
        value = typeof value == 'string' ? value.toLowerCase() : value;
        return value == text;                                          // 1249
      },                                                               //
                                                                       //
      // is value                                                      //
      isExactly: function (value, text) {                              // 1253
        return value == text;                                          // 1254
      },                                                               //
                                                                       //
      // value is not another value (case insensitive)                 //
      not: function (value, notValue) {                                // 1258
        value = typeof value == 'string' ? value.toLowerCase() : value;
        notValue = typeof notValue == 'string' ? notValue.toLowerCase() : notValue;
        return value != notValue;                                      // 1267
      },                                                               //
                                                                       //
      // value is not another value (case sensitive)                   //
      notExactly: function (value, notValue) {                         // 1271
        return value != notValue;                                      // 1272
      },                                                               //
                                                                       //
      // value contains text (insensitive)                             //
      contains: function (value, text) {                               // 1276
        // escape regex characters                                     //
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text, 'i')) !== -1;             // 1279
      },                                                               //
                                                                       //
      // value contains text (case sensitive)                          //
      containsExactly: function (value, text) {                        // 1283
        // escape regex characters                                     //
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text)) !== -1;                  // 1286
      },                                                               //
                                                                       //
      // value contains text (insensitive)                             //
      doesntContain: function (value, text) {                          // 1290
        // escape regex characters                                     //
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text, 'i')) === -1;             // 1293
      },                                                               //
                                                                       //
      // value contains text (case sensitive)                          //
      doesntContainExactly: function (value, text) {                   // 1297
        // escape regex characters                                     //
        text = text.replace($.fn.form.settings.regExp.escape, "\\$&");
        return value.search(new RegExp(text)) === -1;                  // 1300
      },                                                               //
                                                                       //
      // is at least string length                                     //
      minLength: function (value, requiredLength) {                    // 1304
        return value !== undefined ? value.length >= requiredLength : false;
      },                                                               //
                                                                       //
      // see rls notes for 2.0.6 (this is a duplicate of minLength)    //
      length: function (value, requiredLength) {                       // 1312
        return value !== undefined ? value.length >= requiredLength : false;
      },                                                               //
                                                                       //
      // is exactly length                                             //
      exactLength: function (value, requiredLength) {                  // 1320
        return value !== undefined ? value.length == requiredLength : false;
      },                                                               //
                                                                       //
      // is less than length                                           //
      maxLength: function (value, maxLength) {                         // 1328
        return value !== undefined ? value.length <= maxLength : false;
      },                                                               //
                                                                       //
      // matches another field                                         //
      match: function (value, identifier) {                            // 1336
        var $form = $(this),                                           // 1337
            matchingValue;                                             //
        if ($('[data-validate="' + identifier + '"]').length > 0) {    // 1341
          matchingValue = $('[data-validate="' + identifier + '"]').val();
        } else if ($('#' + identifier).length > 0) {                   //
          matchingValue = $('#' + identifier).val();                   // 1345
        } else if ($('[name="' + identifier + '"]').length > 0) {      //
          matchingValue = $('[name="' + identifier + '"]').val();      // 1348
        } else if ($('[name="' + identifier + '[]"]').length > 0) {    //
          matchingValue = $('[name="' + identifier + '[]"]');          // 1351
        }                                                              //
        return matchingValue !== undefined ? value.toString() == matchingValue.toString() : false;
      },                                                               //
                                                                       //
      // different than another field                                  //
      different: function (value, identifier) {                        // 1360
        // use either id or name of field                              //
        var $form = $(this),                                           // 1362
            matchingValue;                                             //
        if ($('[data-validate="' + identifier + '"]').length > 0) {    // 1366
          matchingValue = $('[data-validate="' + identifier + '"]').val();
        } else if ($('#' + identifier).length > 0) {                   //
          matchingValue = $('#' + identifier).val();                   // 1370
        } else if ($('[name="' + identifier + '"]').length > 0) {      //
          matchingValue = $('[name="' + identifier + '"]').val();      // 1373
        } else if ($('[name="' + identifier + '[]"]').length > 0) {    //
          matchingValue = $('[name="' + identifier + '[]"]');          // 1376
        }                                                              //
        return matchingValue !== undefined ? value.toString() !== matchingValue.toString() : false;
      },                                                               //
                                                                       //
      creditCard: function (cardNumber, cardTypes) {                   // 1384
        var cards = {                                                  // 1385
          visa: {                                                      // 1387
            pattern: /^4/,                                             // 1388
            length: [16]                                               // 1389
          },                                                           //
          amex: {                                                      // 1391
            pattern: /^3[47]/,                                         // 1392
            length: [15]                                               // 1393
          },                                                           //
          mastercard: {                                                // 1395
            pattern: /^5[1-5]/,                                        // 1396
            length: [16]                                               // 1397
          },                                                           //
          discover: {                                                  // 1399
            pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
            length: [16]                                               // 1401
          },                                                           //
          unionPay: {                                                  // 1403
            pattern: /^(62|88)/,                                       // 1404
            length: [16, 17, 18, 19]                                   // 1405
          },                                                           //
          jcb: {                                                       // 1407
            pattern: /^35(2[89]|[3-8][0-9])/,                          // 1408
            length: [16]                                               // 1409
          },                                                           //
          maestro: {                                                   // 1411
            pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,           // 1412
            length: [12, 13, 14, 15, 16, 17, 18, 19]                   // 1413
          },                                                           //
          dinersClub: {                                                // 1415
            pattern: /^(30[0-5]|^36)/,                                 // 1416
            length: [14]                                               // 1417
          },                                                           //
          laser: {                                                     // 1419
            pattern: /^(6304|670[69]|6771)/,                           // 1420
            length: [16, 17, 18, 19]                                   // 1421
          },                                                           //
          visaElectron: {                                              // 1423
            pattern: /^(4026|417500|4508|4844|491(3|7))/,              // 1424
            length: [16]                                               // 1425
          }                                                            //
        },                                                             //
            valid = {},                                                //
            validCard = false,                                         //
            requiredTypes = typeof cardTypes == 'string' ? cardTypes.split(',') : false,
            unionPay,                                                  //
            validation;                                                //
                                                                       //
        if (typeof cardNumber !== 'string' || cardNumber.length === 0) {
          return;                                                      // 1438
        }                                                              //
                                                                       //
        // verify card types                                           //
        if (requiredTypes) {                                           // 1442
          $.each(requiredTypes, function (index, type) {               // 1443
            // verify each card type                                   //
            validation = cards[type];                                  // 1445
            if (validation) {                                          // 1446
              valid = {                                                // 1447
                length: $.inArray(cardNumber.length, validation.length) !== -1,
                pattern: cardNumber.search(validation.pattern) !== -1  // 1449
              };                                                       //
              if (valid.length && valid.pattern) {                     // 1451
                validCard = true;                                      // 1452
              }                                                        //
            }                                                          //
          });                                                          //
                                                                       //
          if (!validCard) {                                            // 1457
            return false;                                              // 1458
          }                                                            //
        }                                                              //
                                                                       //
        // skip luhn for UnionPay                                      //
        unionPay = {                                                   // 1463
          number: $.inArray(cardNumber.length, cards.unionPay.length) !== -1,
          pattern: cardNumber.search(cards.unionPay.pattern) !== -1    // 1465
        };                                                             //
        if (unionPay.number && unionPay.pattern) {                     // 1467
          return true;                                                 // 1468
        }                                                              //
                                                                       //
        // verify luhn, adapted from  <https://gist.github.com/2134376>
        var length = cardNumber.length,                                // 1472
            multiple = 0,                                              //
            producedValue = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
            sum = 0;                                                   //
        while (length--) {                                             // 1481
          sum += producedValue[multiple][parseInt(cardNumber.charAt(length), 10)];
          multiple ^= 1;                                               // 1483
        }                                                              //
        return sum % 10 === 0 && sum > 0;                              // 1485
      },                                                               //
                                                                       //
      minCount: function (value, minCount) {                           // 1488
        if (minCount == 0) {                                           // 1489
          return true;                                                 // 1490
        }                                                              //
        if (minCount == 1) {                                           // 1492
          return value !== '';                                         // 1493
        }                                                              //
        return value.split(',').length >= minCount;                    // 1495
      },                                                               //
                                                                       //
      exactCount: function (value, exactCount) {                       // 1498
        if (exactCount == 0) {                                         // 1499
          return value === '';                                         // 1500
        }                                                              //
        if (exactCount == 1) {                                         // 1502
          return value !== '' && value.search(',') === -1;             // 1503
        }                                                              //
        return value.split(',').length == exactCount;                  // 1505
      },                                                               //
                                                                       //
      maxCount: function (value, maxCount) {                           // 1508
        if (maxCount == 0) {                                           // 1509
          return false;                                                // 1510
        }                                                              //
        if (maxCount == 1) {                                           // 1512
          return value.search(',') === -1;                             // 1513
        }                                                              //
        return value.split(',').length <= maxCount;                    // 1515
      }                                                                //
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
