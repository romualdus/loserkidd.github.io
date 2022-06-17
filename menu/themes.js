const baseSize = "10px";
const primaryColor = "#87ceeb";
const secondaryColor = "#FFFFFF";
const activeColor = "#F35050";
const checkoutColor = "#6BC313";
const assetImageUrl = "https://romualdus.github.io/menu/img";

const menu = `
	<div class="bottom-navigation bounce-in">
      <div class="bottom-navigation__menu">
        <div onclick="toggleSideMenu();">
			<svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="23.5" cy="23.5" r="23.5" fill="${primaryColor}"/>
				<path d="M13 29.4077H33.1626" stroke="${secondaryColor}" stroke-width="2" stroke-linecap="round"/>
				<path d="M13 23H29" stroke="${secondaryColor}" stroke-width="2" stroke-linecap="round"/>
				<path d="M13 17H33.1626" stroke="${secondaryColor}" stroke-width="2" stroke-linecap="round"/>
			</svg>
        </div>
      </div>
      <div class="bottom-navigation__button">
        <div class="custom-button custom-button--menu" onclick="toggleSideMenu();">Menu</div>
        <div class="custom-button custom-button--add" onclick="addToCartCustom();" style="display: none">Add to Cart</div>
        <div class="custom-button custom-button--close" onclick="toggleSideMenu();" style="display: none">
          <img src="${assetImageUrl}/close-white-icon.svg">
        </div>
        <div id="bottom-nav-checkout" class="custom-button custom-button--checkout" onclick="checkoutCustom();" style="display: none">Checkout</div>
      </div>
      <div class="bottom-navigation__cart">
        <div onclick="toggleCartList();">
          <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle class="cart-icon__background" id="Ellipse 32" cx="30" cy="30" r="29.5" fill="${secondaryColor}" stroke="${primaryColor}"/>
            <path class="cart-icon__path" id="Vector_2" d="M41.238 19.9065H21.6905L21.3757 18.1501C21.0782 16.5093 19.6543 15.3191 17.9878 15.3191H16.4657C15.8332 15.3191 15.3191 15.8333 15.3191 16.4659C15.3191 17.0986 15.8332 17.6128 16.4657 17.6128H17.9878C18.5424 17.6128 19.0189 18.0086 19.1171 18.5574C19.2211 19.141 21.6761 32.8107 21.7945 33.4781C20.5526 33.998 19.6774 35.2258 19.6774 36.6528C19.6774 38.2388 20.7547 39.5734 22.2133 39.9721C22.0573 40.3649 21.9707 40.7925 21.9707 41.2402C21.9707 43.1382 23.513 44.6808 25.4106 44.6808C27.3081 44.6808 28.8504 43.1382 28.8504 41.2402C28.8504 40.8387 28.7811 40.4516 28.654 40.0934H35.9295C35.8024 40.4516 35.7331 40.8387 35.7331 41.2402C35.7331 43.1382 37.2754 44.6808 39.1729 44.6808C41.0705 44.6808 42.6128 43.1382 42.6128 41.2402C42.6128 40.7087 42.4915 40.2061 42.2778 39.7583C42.4857 39.5503 42.6128 39.2643 42.6128 38.9465C42.6128 38.3139 42.0987 37.7997 41.4662 37.7997H23.1173C22.4848 37.7997 21.9707 37.2855 21.9707 36.6528C21.9707 36.0202 22.4848 35.506 23.1144 35.506C23.1173 35.506 23.1173 35.506 23.1202 35.506H38.9448C40.5246 35.506 41.8937 34.4371 42.2807 32.909L44.5739 24.1964C44.5739 24.1906 44.5768 24.1877 44.5768 24.1819C44.6461 23.9104 44.6808 23.6273 44.6808 23.3442C44.6779 21.452 43.1356 19.9065 41.238 19.9065ZM39.1729 40.0963C39.8055 40.0963 40.3196 40.6105 40.3196 41.2431C40.3196 41.8758 39.8055 42.39 39.1729 42.39C38.5404 42.39 38.0263 41.8758 38.0263 41.2431C38.0263 40.6105 38.5404 40.0963 39.1729 40.0963ZM25.4106 40.0963C26.0431 40.0963 26.5572 40.6105 26.5572 41.2431C26.5572 41.8758 26.0431 42.39 25.4106 42.39C24.778 42.39 24.2639 41.8758 24.2639 41.2431C24.2639 40.6105 24.778 40.0963 25.4106 40.0963ZM42.3529 23.6215L40.0596 32.3341C40.0596 32.3399 40.0567 32.3428 40.0567 32.3485C39.9297 32.8598 39.4704 33.2152 38.9448 33.2152H24.0762L22.1006 22.2031H41.238C41.8705 22.2031 42.3847 22.7173 42.3847 23.3499C42.3847 23.4424 42.3731 23.5348 42.3529 23.6215Z" fill="${primaryColor}"/>
            <g class="cart-icon__count" style="display: none;">
              <circle class="cart-icon__count-background" id="Ellipse 23" cx="40.5" cy="20.5" r="12.5" fill="#ED1515"/>
              <text class="cart-icon__count-text" fill="${secondaryColor}" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="14" letter-spacing="0em"><tspan x="37.6072" y="25.5909">1</tspan></text>
            </g>
          </svg>
        </div>
      </div>
    </div>
    
    <div class="quick-cart bounce-in" style="max-height: calc(var(--cmc-base-size) * 6);">
      <h2>Cart</h2>
      <div class="quick-cart__wrapper">
        <div class="quick-cart__list"></div>
        <div class="quick-cart__total">
          <h3>Total</h3>
          <h3 id="total-price"></h3>
        </div>
        <div class="quick-cart__empty">
          <img src="${assetImageUrl}/empty-cart-icon.svg">
          <h3>Unfortunately, Your Cart is Empty</h3>
          <p>Please Add Something in your Cart</p>
        </div>
        <div class="quick-cart__close" onclick="toggleCartList();">
          <img src="${assetImageUrl}/close-icon.svg">
        </div>
      </div>
      <input id="delete-src-icon" type="hidden" value="${assetImageUrl}/close-round-icon.svg">
    </div>
    
    <div class="side-menu bounce-in" style="max-height: calc(var(--cnc-base-size) * 6);">
      <input id="next-icon" type="hidden" value="${assetImageUrl}/next-icon.svg">
      <div class="side-menu__close" onclick="toggleSideMenu();">
        <img src="${assetImageUrl}/close-white-icon.svg">
      </div>
      <div class="side-menu__back" style="visibility: hidden">
        <img src="${assetImageUrl}/back-icon.svg">
      </div>
      <div id="nav-menu" class="side-menu__sub" style="position: relative">
        <h2>Menu</h2>
        <nav class="side-menu__nav">
          <ul class="side-menu__list"></ul>
        </nav>
      </div>
    </div>
`
document.body.insertAdjacentHTML("beforeend", menu);


const rootVar = document.querySelector(':root');
rootVar.style.setProperty("--cmc-base-size", baseSize);
rootVar.style.setProperty("--cmc-primary-color", primaryColor);
rootVar.style.setProperty("--cmc-secondary-color", secondaryColor);
rootVar.style.setProperty("--cmc-active-color", activeColor);
rootVar.style.setProperty("--cmc-checkout-color", checkoutColor);


loadCSS('https://romualdus.github.io/menu/bottom-navigation.css');
loadJS('https://romualdus.github.io/menu/bottom-navigation.js');

function loadJS(FILE_URL) {
    let scriptEle = document.createElement("script");

    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("defer", "defer");

    document.head.appendChild(scriptEle);

    // success event 
    scriptEle.addEventListener("load", () => {
        console.log("File loaded")
    });
    // error event
    scriptEle.addEventListener("error", (ev) => {
        console.log("Error on loading file", ev);
    });
}
function loadCSS(FILE_URL) {
    let scriptEle = document.createElement("link");

    scriptEle.setAttribute("href", FILE_URL);
    scriptEle.setAttribute("rel", "stylesheet");

    document.head.appendChild(scriptEle);

    // success event 
    scriptEle.addEventListener("load", () => {
        console.log("File loaded")
    });
    // error event
    scriptEle.addEventListener("error", (ev) => {
        console.log("Error on loading file", ev);
    });
}
