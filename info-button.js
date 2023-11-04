class InfoToggle extends HTMLElement {
  constructor() {
    super(); // 1. first thing
    this._isVisible = false; // step 5
    this.attachShadow({ mode: 'open' }); // 2nd step
    this.shadowRoot.innerHTML = `
      <style>
        #info-box {
          display: none;
        }
      </style>
      <button>Show</button>
      <p id="info-box">
        <slot></slot>
      </p>
    `; // 3rd step
    this._toggleButton = this.shadowRoot.querySelector('button'); // Step 4
    this._infoBox = this.shadowRoot.querySelector('#info-box'); // step 4
    this._toggleButton.addEventListener(
      'click',
      this._toggleInfoBox.bind(this)
    ); // step 6
  }

  connectedCallback() {
    if (this.hasAttribute('is-visible')) {
      if (this.getAttribute('is-visible') === 'true') {
        this._isVisible = true;
        this._infoBox.style.display = 'block';
        this._toggleButton.textContent = 'Hide';
      }
    }
  } // Step 10

  _toggleInfoBox() {
    this._isVisible = !this._isVisible;
    this._infoBox.style.display = this._isVisible ? 'block' : 'none';
    this._toggleButton.textContent = this._isVisible ? 'Hide' : 'Show';
  } // step 5
}

customElements.define('uc-info-toggle', InfoToggle); // Step 8
