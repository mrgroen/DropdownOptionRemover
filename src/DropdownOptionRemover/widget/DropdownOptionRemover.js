define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase"
], function (declare, _WidgetBase) {
    "use strict";

    return declare("DropdownOptionRemover.widget.DropdownOptionRemover", [ _WidgetBase ], {

        nameDropdownWidget: null,
        optionsToRemove: null,
        _handles: null,
        _contextObj: null,
        _readOnly: false,

        constructor: function () {
            this._handles = [];
        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");
            if (this.readOnly || this.get("disabled") || this.readonly) {
                this._readOnly = true;
            }
            if (!this._readOnly) {
                this._updateRendering();
            }
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");
            this._contextObj = obj;
            if (!this._readOnly) {
                this._updateRendering(callback);
            } else {
                this._executeCallback(callback);
            }
        },

        resize: function (box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function () {
            logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");

            try {
                if (this._contextObj !== null) {
                    var dropDownWidgetElements = document.getElementsByClassName('mx-name-' +
                        this.nameDropdownWidget);
                    if (dropDownWidgetElements) {
                        var selectElements = dropDownWidgetElements[0].getElementsByTagName('select');
                        if (selectElements) {
                            var optionArray = this.optionsToRemove.split(";");
                            var select = selectElements[0];
                            if (select) {
                                for (var i=0;i<select.length;i++) {
                                    if (optionArray.indexOf(select.options[i].value) !== -1) {
                                        select.remove(i);
                                    }
                                }
                            }
                        }
                    }
                }
            } catch(error) {
                logger.error(error.message);
            }

            this._executeCallback(callback, "_updateRendering");
        },

        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["DropdownOptionRemover/widget/DropdownOptionRemover"]);
