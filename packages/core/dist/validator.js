/**!
 * validator.tool v2.0.0-alpha.0
 * 轻量级的JavaScript表单验证，字符串验证。没有依赖，支持UMD，~3kb。
 * 
 * Copyright (c) 2021 kenny wang <wowohoo@qq.com> (https://github.com/jaywcjlove)
 * http://jaywcjlove.github.io/validator.js
 * 
 * Licensed under the MIT license.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Validator = factory());
})(this, (function () { 'use strict';

    var Validator = /** @class */ (function () {
        function Validator(options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            this.fields = {};
            this.rules = {};
            this.values = {};
            this.messagesShown = false;
            this.errorMessages = {};
            this.showMessages = function () { return _this.messagesShown = true; };
            this.hideMessages = function () { return _this.messagesShown = false; };
            this.getForm = function () { return _this.form; };
            this.setForm = function (form) {
                _this.form = form;
                _this.values = {};
                var formData = new FormData(_this.form);
                formData.forEach(function (value, key) {
                    var valArr = formData.getAll(key);
                    var elm = _this.form[key];
                    if (elm) {
                        if (elm.type === 'checkbox') {
                            _this.values[key] = elm.checked;
                        }
                        else if (elm.multiple) {
                            _this.values[key] = valArr;
                        }
                        else if (elm.type) {
                            _this.values[key] = formData.get(key);
                        }
                        else if (valArr.length > 0 && !elm.value) {
                            _this.values[key] = valArr;
                        }
                        else {
                            _this.values[key] = elm.value;
                        }
                    }
                    _this.message(key, _this.values[key], _this.rules[key]);
                });
                if (!_this.initValues) {
                    _this.initValues = _this.values;
                }
            };
            /** How you define validation rules and add messages into the form. */
            this.message = function (field, inputValue, options) {
                _this.fields[field] = true;
                _this.values[field] = inputValue;
                if (options) {
                    _this.rules[field] = options;
                }
                var validate = (_this.rules[field] || {}).validate;
                var msg = '';
                if (_this.validate) {
                    msg = _this.validate(_this.values[field], _this.values, field);
                }
                if (validate) {
                    msg = validate(_this.values[field], _this.values, field);
                }
                if (!msg) {
                    delete _this.errorMessages[field];
                }
                else {
                    _this.fields[field] = false;
                    _this.errorMessages[field] = msg;
                }
                if (_this.messagesShown) {
                    return _this.errorMessages[field];
                }
                return;
            };
            this.getValues = function () {
                if (_this.form) {
                    _this.setForm(_this.form);
                }
                return _this.values;
            };
            this.reset = function () {
                if (!_this.form)
                    return;
                _this.form.reset();
                _this.values = _this.initValues || {};
                return _this.initValues;
            };
            this.fieldValid = function (field) { return _this.fields[field] === true; };
            var form = options.form, rules = options.rules, messagesShown = options.messagesShown, validate = options.validate;
            this.messagesShown = !!messagesShown;
            this.rules = rules || {};
            this.validate = validate;
            if (form) {
                this.setForm(form);
            }
        }
        /**
         * Returns a boolean if all the fields pass validation or not.
         * @returns Boolean
         */
        Validator.prototype.allValid = function () {
            for (var key in this.fields) {
                if (this.fieldValid(key) === false) {
                    return false;
                }
            }
            return true;
        };
        return Validator;
    }());

    return Validator;

}));
//# sourceMappingURL=validator.js.map