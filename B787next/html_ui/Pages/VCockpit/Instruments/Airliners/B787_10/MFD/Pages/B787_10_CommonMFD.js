var B787_10_CommonMFD;
(function (B787_10_CommonMFD) {
    class MFDTemplateElement extends TemplateElement {
        constructor() {
            super();
            this.initialised = false;
            this.visible = false;
        }
        connectedCallback() {
            super.connectedCallback();
            TemplateElement.call(this, this.init.bind(this));
        }
        init() {
            this.initChild();
            this.initialised = true;
        }
        show(_xPercent, _widthPercent) {
            this.style.left = _xPercent + "%";
            this.style.width = _widthPercent + "%";
            this.style.display = "block";
            if (_widthPercent < 55 && _xPercent < 5) {
                this.setAttribute("border", "right");
            }
            else {
                this.setAttribute("border", "");
            }
            this.visible = true;
        }
        hide() {
            this.style.display = "none";
            this.visible = false;
        }
        update(_deltaTime) {
            if (this.initialised && this.visible) {
                this.updateChild(_deltaTime);
            }
        }
        isVisible() { return this.visible; }
    }
    B787_10_CommonMFD.MFDTemplateElement = MFDTemplateElement;
})(B787_10_CommonMFD || (B787_10_CommonMFD = {}));
//# sourceMappingURL=B787_10_CommonMFD.js.map