// #region Initial
setButtonAddCustom();
setNavCustom();
getCartList();
renderMenuList();
// #endregion Initial

// #region Checkout
function addToCartCustom() {
  const variantId = document.querySelector('form[action="/cart/add"] [name="id"]').value;
  const qty = document.querySelector('input[name="quantity"]') 
  ? document.querySelector('input[name="quantity"]').value
  : 1;
  
  let formData = {
   'items': [{
    'id': variantId,
    'quantity': qty
    }]
  };
  
  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    return response.json();
  }).then(data => {
    getCartList(true);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function updateCartCustom(id, qty) {
  fetch(`/cart/change.js?id=${id}&quantity=${qty}`, {
    method: 'POST'
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    getCartList();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function checkoutCustom() {
	window.location.href = '/checkout';
//   const element = document.querySelector('button.mu-checkout-btn');
//   element.click();
}
// #endregion Checkout

// #region Cart List
function getCartList(showCart=false) {
  fetch('/cart.js', {
    method: 'GET'
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    renderCartList(data.items, data.total_price);
    if(showCart) {
      toggleCartList();
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function renderCartList(items, totalPrice) {
  let itemList = "";
  const checkoutBtn = document.querySelector('#bottom-nav-checkout');
  const emptyCart = document.querySelector('.quick-cart__empty');
  const cartCountWrapper = document.querySelector('.cart-icon__count');
  const cartCountText = document.querySelector('.cart-icon__count-text tspan');
  const deleteIconSrc = document.querySelector('#delete-src-icon').getAttribute('value');
  
  const totalPriceFormat = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(totalPrice/100);
  
  if(items.length > 0) {
    items.forEach((item,index) => {
      const id = item.variant_id;
      itemList +=
      `<div class="quick-cart-item">
        <div class="quick-cart-item__img-wrapper">
			<img class="quick-cart-item__img" src="${item.featured_image.url}">
			<img onclick="updateCartCustom(${id},0)" class="quick-cart-item__delete" src="${deleteIconSrc}">
        </div>
        <div class="quick-cart-item__detail">
			<p>${item.product_title}</p>
        </div>
        <div class="quick-cart-item__qty">
            <div class="cart-item-qty">
                <div class="cart-item-qty__min" onclick="updateCartCustom(${id},${item.quantity-1})">-</div>
                <div class="cart-item-qty__qty">${item.quantity}</div>
                <div class="cart-item-qty__plus" onclick="updateCartCustom(${id},${item.quantity+1})">+</div>
            </div>
            <p>A${totalPriceFormat}</p>
        </div>
      </div>`
    });
    
    cartCountText.innerHTML = `${items.length}`;
    cartCountWrapper.removeAttribute('style');
    
    checkoutBtn.classList.remove('custom-button--continue');
    checkoutBtn.setAttribute('onclick', 'checkoutCustom()')
    checkoutBtn.innerHTML = 'CHECKOUT';
    emptyCart.style.display = 'none';
    
    renderCartListTotal(totalPrice, true);
  } else {
    cartCountWrapper.style.display = 'none';
    
    checkoutBtn.classList.add('custom-button--continue');
    checkoutBtn.setAttribute('onclick', 'window.location.href = "/collections/all"');
    checkoutBtn.innerHTML = 'Continue Shopping';
    emptyCart.removeAttribute('style');
    
    renderCartListTotal(totalPrice, false);
  }
  
  document.querySelector('.quick-cart__list').innerHTML = itemList;
}

function renderCartListTotal(totalPrice, isShow) {
  const cartTotalWrapper = document.querySelector('.quick-cart__total');
  const totalPriceFormat = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(totalPrice/100);
  
  if(isShow) {
    cartTotalWrapper.style.display = 'flex';
    cartTotalWrapper.querySelector('#total-price').innerHTML = `A${totalPriceFormat}`;
  } else {
    cartTotalWrapper.style.display = 'none';
  }
}
// #endregion Cart List

// #region Menu List
function renderMenuList() {
  const navElement = document.querySelector('ul.site-nav');
  const menuElements = navElement.children;
  
  let menuList = '';
  
  [...menuElements].forEach(selectedItem => {
    const item = selectedItem.firstElementChild;
    const nextIconSrc = document.querySelector('#next-icon').getAttribute('value');
    
    if(selectedItem.childElementCount > 1) {
      const subItemTitle = item.text.replace(/\s+/g, ' ').trim();
      const subItemId = subItemTitle.replace(' ','');
      
      menuList += 
        `<li onclick="renderSubMenuList('menu','${subItemId}')">
			<span class="side-menu__item">${subItemTitle}</span>
			<img class="side-menu__arrow" src="${nextIconSrc}">
		</li>`;
      
      let subNav = ''
      subNav += 
        `
			<div id="nav-${subItemId}" class="side-menu__sub" style="transform: translateX(100%)" data-nav-parent="menu">
				<h2>${subItemTitle}</h2>
				<div class="side-menu__nav">
					<ul class="side-menu__list">
		`
      
      const subMenuElements = selectedItem.querySelector('ul').children;
      [...subMenuElements].forEach(selectedSubItem => {
        const subItem = selectedSubItem.firstElementChild;
        
        if(selectedSubItem.childElementCount > 1) {
          const subSubItemTitle = subItem.text.replace(/\s+/g, ' ').trim();
          const subSubItemId = subSubItemTitle.replace(' ','');
          
          subNav += 
            `<li onclick="renderSubMenuList('${subItemId}','${subSubItemId}')">
                <span class="side-menu__item">${subSubItemTitle}</span>
				<img class="side-menu__arrow" src="${nextIconSrc}">
            </li>`;
          
          let subSubNav = ''
          subSubNav += 
            `
                <div id="nav-${subSubItemId}" class="side-menu__sub" style="transform: translateX(100%)" data-nav-parent="${subItemId}">
                    <h2>${subSubItemTitle}</h2>
                    <div class="side-menu__nav">
                        <ul class="side-menu__list">
            `
          
          const subSubMenuElements = selectedSubItem.querySelector('ul').children;
          [...subSubMenuElements].forEach(selectedSubSubItem => {
            subSubNav += menuListItem(selectedSubSubItem);
          })
          
          subSubNav += `</ul></div></div>`;
          document.querySelector('.side-menu').innerHTML += subSubNav;
          
        } else {
          subNav += menuListItem(selectedSubItem);
        }
      })
      
      subNav += `</ul></div></div>`;
      document.querySelector('.side-menu').innerHTML += subNav;
      
    } else {
      menuList += menuListItem(selectedItem);
    }
  })
  
  document.querySelector('.side-menu__list').innerHTML = menuList;
}

function renderSubMenuList(prevNav, nextNav, goBack = false) {
  const prevNavElement = document.querySelector(`#nav-${prevNav}`);
  const nextNavElement = document.querySelector(`#nav-${nextNav}`);
  const backNavButton = document.querySelector('.side-menu__back');
  
  if(goBack) {
    prevNavElement.style.transform = 'translateX(100%)';
  	nextNavElement.style.transform = 'translateX(0)';
    
    if(nextNav === 'menu') {
      backNavButton.style.visibility = 'hidden';
    }
    
    const navParent = nextNavElement.getAttribute('data-nav-parent');
    backNavButton.setAttribute('onclick', `renderSubMenuList('${nextNav}','${navParent}',true)`);
    
  } else {
    prevNavElement.style.transform = 'translateX(-100%)';
  	nextNavElement.style.transform = 'translateX(0)';
    
    if(prevNav === 'menu') {
      backNavButton.style.visibility = 'visible';
    }
    
    backNavButton.setAttribute('onclick', `renderSubMenuList('${nextNav}','${prevNav}',true)`);
  }
}

function menuListItem(item) {
  const selectedItem = item.firstElementChild;
  const isActive = item.classList.contains('site-nav--active');
  
  const itemList = 
    `<li>
		<a href="${selectedItem.getAttribute('href')}" class="side-menu__item ${isActive ? 'side-menu__item--active' : ''}">
			${selectedItem.innerHTML}
		</a>
	</li>`

  return itemList;
}
// #endregion Menu List

// #region UI Toggle
// Make 'Button Add' from template to trigger custom add function
function setButtonAddCustom() {
  const buttonAdd = document.querySelector('button[name="add"]');
  if(buttonAdd !== null) {
    buttonAdd.setAttribute('onclick', 'setTimeout("getCartList(false)", 3000);');
  }
}
function setNavCustom() {
  const pathname = window.location.pathname;
  if(pathname.includes('/products/')) {
    toggleButtonNavCustom('menu-hide--product');
  }
}

function toggleSideMenu() {
  const cartDisplay = document.querySelector('.quick-cart');
  const menuDisplay = document.querySelector('.side-menu');
  const pathname = window.location.pathname;
  
  let toggleButtonTo = '';
  if(menuDisplay.hasAttribute('style')) {
    if(!cartDisplay.hasAttribute('style')) {
      toggleCartList();
    }
    toggleButtonTo = 'menu-show';
    menuDisplay.removeAttribute('style');
  } else {
    toggleButtonTo = 'menu-hide';
    menuDisplay.style.maxHeight = 'calc(var(--bottom-nav-base-size) * 6)';
    
    setTimeout(function(){
      document.querySelector('.side-menu__back').style.visibility = 'hidden';
      
      const subNavElements = document.querySelectorAll('.side-menu__sub');
      subNavElements.forEach(nav => {
        if(nav.id === 'nav-menu') {
          nav.style.transform = 'translateX(0)';
        } else {
          nav.style.transform = 'translateX(100%)';
        }
      })
    }, 550);
  }
  
  if(pathname.includes('/products/')) {
    toggleButtonTo += '--product';
  }
  
  toggleButtonNavCustom(toggleButtonTo);
}

function toggleCartList() {
  const cartDisplay = document.querySelector('.quick-cart');
  const menuDisplay = document.querySelector('.side-menu');
  const pathname = window.location.pathname;
  
  let toggleButtonTo = '';
  if(cartDisplay.hasAttribute('style')) {
    if(!menuDisplay.hasAttribute('style')) {
      toggleSideMenu();
    }
    toggleButtonTo = 'cart-show';
    cartDisplay.removeAttribute('style');
  } else {
    toggleButtonTo = 'cart-hide';
    cartDisplay.style.maxHeight = 'calc(var(--bottom-nav-base-size) * 6)';
  }
  
  if(pathname.includes('/products/')) {
    toggleButtonTo += '--product';
  } else {
    cartDisplay.classList.add('quick-cart--product');
  }
  
  toggleButtonNavCustom(toggleButtonTo);
}

function toggleButtonNavCustom(toCase) {
  const wrapper = document.querySelector('.bottom-navigation');
  const menuIconBtn = document.querySelector('.bottom-navigation__menu');
  
  const menuBtn = document.querySelector('.custom-button--menu');
  const addBtn = document.querySelector('.custom-button--add');
  const closeBtn = document.querySelector('.custom-button--close');
  const checkoutBtn = document.querySelector('.custom-button--checkout');
  
  const cartIconBtn = document.querySelector('.bottom-navigation__cart');
  
  switch (toCase) {
    case 'menu-show':
      menuIconBtn.style.opacity = '0';
      menuBtn.style.display = 'none';
      closeBtn.removeAttribute('style');
      break;
    case 'menu-hide':
      menuIconBtn.removeAttribute('style');
      menuBtn.removeAttribute('style');
      closeBtn.style.display = 'none';
      break;
    case 'cart-show':
      wrapper.classList.add('bottom-navigation--product');
      cartIconBtn.style.display = 'none';
      menuBtn.style.display = 'none';
      checkoutBtn.removeAttribute('style');
      break;
    case 'cart-hide':
      wrapper.classList.remove('bottom-navigation--product');
      cartIconBtn.removeAttribute('style');
      menuBtn.removeAttribute('style');
      checkoutBtn.style.display = 'none';
      break;
    case 'menu-hide--product':
      wrapper.classList.add('bottom-navigation--product');
      menuIconBtn.removeAttribute('style');
      menuBtn.style.display = 'none';
      addBtn.removeAttribute('style');
      closeBtn.style.display = 'none';
      break;
    case 'menu-show--product':
      wrapper.classList.remove('bottom-navigation--product');
      menuIconBtn.style.opacity= '0';
      addBtn.style.display = 'none';
      closeBtn.removeAttribute('style');
      break;
    case 'cart-show--product':
      cartIconBtn.style.display = 'none';
      addBtn.style.display = 'none';
      checkoutBtn.removeAttribute('style');
      break;
    case 'cart-hide--product':
      cartIconBtn.removeAttribute('style');
      addBtn.removeAttribute('style');
      checkoutBtn.style.display = 'none';
      break;
    default:
  }
}
// #endregion UI Toggle
