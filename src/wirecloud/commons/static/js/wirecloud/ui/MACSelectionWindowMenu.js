/*
 *     Copyright (c) 2014-2016 CoNWeT Lab., Universidad Politécnica de Madrid
 *
 *     This file is part of Wirecloud Platform.
 *
 *     Wirecloud Platform is free software: you can redistribute it and/or
 *     modify it under the terms of the GNU Affero General Public License as
 *     published by the Free Software Foundation, either version 3 of the
 *     License, or (at your option) any later version.
 *
 *     Wirecloud is distributed in the hope that it will be useful, but WITHOUT
 *     ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *     FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public
 *     License for more details.
 *
 *     You should have received a copy of the GNU Affero General Public License
 *     along with Wirecloud Platform.  If not, see
 *     <http://www.gnu.org/licenses/>.
 *
 */

/* globals StyledElements, Wirecloud */


(function (utils) {

    "use strict";

    var MACSelectionWindowMenu = function MACSelectionWindowMenu(title, options) {
        Wirecloud.ui.WindowMenu.call(this, title, 'mac_selection_dialog');

        // Events
        Object.defineProperty(this, 'events', {
            value: {'select': new StyledElements.Event()}
        });
        Object.freeze(this.events);

        this.macsearch = new Wirecloud.ui.MACSearch({
            scope: options.scope,
            resourceButtonIconClass: 'fa fa-check',
            resourceButtonTooltip: utils.gettext('Select'),
            resourceButtonListener: function (resource) {
                this._closeListener();
                this.events.select.dispatch(resource);
            }.bind(this)
        });
        this.macsearch.insertInto(this.windowContent);

        // Accept button
        this.button = new StyledElements.Button({
            text: utils.gettext('Close'),
            class: 'btn-primary'
        });
        this.button.insertInto(this.windowBottom);
        this.button.addEventListener("click", this._closeListener);
    };
    MACSelectionWindowMenu.prototype = new Wirecloud.ui.WindowMenu();

    MACSelectionWindowMenu.prototype.addEventListener = StyledElements.ObjectWithEvents.prototype.addEventListener;
    MACSelectionWindowMenu.prototype.removeEventListener = StyledElements.ObjectWithEvents.prototype.removeEventListener;

    MACSelectionWindowMenu.prototype.setFocus = function setFocus() {
        this.macsearch.focus();
    };

    /**
     * @override
     */
    MACSelectionWindowMenu.prototype.show = function show(parentWindow) {
        this.macsearch.refresh();
        Wirecloud.ui.WindowMenu.prototype.show.call(this, parentWindow);
    };

    Wirecloud.ui.MACSelectionWindowMenu = MACSelectionWindowMenu;

})(Wirecloud.Utils);
