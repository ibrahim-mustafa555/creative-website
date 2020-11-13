// Check If There's Color In Local Storage
let mainColor = localStorage.getItem('color_option');

if (mainColor !== null) {
  // console.log('local Storage not empty');
  document.documentElement.style.setProperty('--main-color', mainColor);

  // Remove Active Class From All Childerns
  document.querySelectorAll('.color-list li').forEach((element) => {
    element.classList.remove('active');

    // Add Active Class On Element With Data Color === local Storage Items
    if (element.dataset.color === mainColor) {
      // Add Active Class
      element.classList.add('active');
    }
  });
}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Interval
let backgroundInterval;

// Check if there's localStorage random background item
let backgroundLocalItem = localStorage.getItem('background_option');

// Check if random background localStorage is not empty
if (backgroundLocalItem !== null) {
  // Remove Active Class from all Spans
  document.querySelectorAll('.random-background span').forEach((element) => {
    element.classList.remove('active');
  });
  if (backgroundLocalItem === 'true') {
    backgroundOption = true;
    document.querySelector('.random-background .yes').classList.add('active');
  } else {
    backgroundOption = false;
    document.querySelector('.random-background .no').classList.add('active');
  }
}

//Add Toggle Spin class on Icon
let toggleIcon = document.querySelector('.toggle-setting .icon');
let settingBox = document.querySelector('.setting-box');
let optionBoxs = document.querySelector('.setting-container');

toggleIcon.onclick = function (e) {
  e.stopPropagation();
  // Add class fa-spin to icon
  this.classList.toggle('fa-spin');

  // Add Toggle Class open to setting-box
  settingBox.classList.toggle('open');
};

// Click Anywhere Outside Setting-box
document.addEventListener('click', (e) => {
  if (e.target !== toggleIcon && e.target !== settingBox) {
    // Check If Setting-box Is Open
    if (settingBox.classList.contains('open')) {
      // Add class fa-spin to icon
      toggleIcon.classList.toggle('fa-spin');

      // Add Toggle Class open to setting-box
      settingBox.classList.toggle('open');
    }
  }
});

// Stop Propagation On Option-box
optionBoxs.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
};

// Switch Colors
const colorsLi = document.querySelectorAll('.color-list li');

// Loop on All List Items
colorsLi.forEach((colorli) => {
  // Click On Every List Items
  colorli.addEventListener('click', (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      '--main-color',
      e.target.dataset.color
    );

    // set color on local storage
    localStorage.setItem('color_option', e.target.dataset.color);

    handleActive(e);
  });
});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll('.random-background span');

// Loop on All spans
randomBackEl.forEach((span) => {
  // Click On Every span
  span.addEventListener('click', (e) => {
    handleActive(e);

    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem('background_option', true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem('background_option', false);
    }
  });
});
/*/ ===================================================================== /*/
// Select LandingPage Element
let landingPage = document.querySelector('.landing-page');

// Get Array of imgs
let imgsArray = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'];

// Function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number

      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change background img URL
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;

      // console.log(randomNumber);
    }, 1000);
  }
}
randomizeImgs();
/*/ ===================================================================== /*/

// Select Skills Selector

let ourSkills = document.querySelector('.skills');

window.onscroll = function () {
  // Skill Offset Top

  let skillsOffsetTop = ourSkills.offsetTop;
  // console.log(`skillsOffsetTop ${skillsOffsetTop}`);

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // console.log(`skillsOuterHeight ${skillsOuterHeight}`);

  // Window Height
  let windowHeight = this.innerHeight;
  // console.log(`windowHeight ${windowHeight}`);

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;
  //console.log(windowScrollTop);

  if (document.documentElement.scrollTop > 500) {
    goUp.style.display = 'block';
  } else {
    goUp.style.display = 'none';
  }

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      '.skill-box .skill-progress span'
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

/** ====================  Scroll To Top Button ====================================== */
var goUp = document.getElementById('goUp');

goUp.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/** ============================== Create Popup With Images =============================== */

// Create Popup With Images

let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach((img) => {
  img.addEventListener('click', (e) => {
    e.preventDefault();
    // Create Overlay Element
    let overlay = document.createElement('div');

    // Add Class To Ovarlay
    overlay.className = 'popup-overlay';

    // Append Overlay to The Body
    document.body.appendChild(overlay);

    // Create Popup Box
    let popupBox = document.createElement('div');

    // Add Class to Popup Box
    popupBox.className = 'popup-box';

    if (img.alt !== null) {
      // Create Heading

      let imgHeading = document.createElement('h3');

      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append Text to The Heading
      imgHeading.appendChild(imgText);

      // Append Heading To Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement('img');

    // Set Image Src
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Add Popup Box To Body
    document.body.appendChild(popupBox);

    // Create Close Span
    let closeButton = document.createElement('span');

    // Create Close closeButtonText
    let closeButtonText = document.createTextNode('X');

    // Append Text To close Button
    closeButton.appendChild(closeButtonText);

    // Add Class To close Button
    closeButton.className = 'close-button';

    // Add Close closeButton to the PopupBox
    popupBox.appendChild(closeButton);
  });
});

/** ============================== close Popup =============================== */
// close Popup

document.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.className == 'close-button') {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Popup Overlay
    document.querySelector('.popup-overlay').remove();
  }
});

// Click Anywhere Outside to close popup
document.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.className == 'popup-overlay') {
    document.querySelector('.popup-box').remove();
    document.querySelector('.popup-overlay').remove();
  }
});

/** ============================== Navigation Bullets  =============================== */

// Select All Bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
scrollToSection(allBullets);
/** ============================== Navbar Links  =============================== */

// Select All links
const allLinks = document.querySelectorAll('.links li a');
scrollToSection(allLinks);

/** ============================== Function Scroll To section  =============================== */
function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    });
  });
}

/** ============================== Function Handle Active Classes  =============================== */
/** Function Handle Active Classes */
function handleActive(ev) {
  // Remove Active Class From All Childerns

  ev.target.parentElement.querySelectorAll('.active').forEach((element) => {
    element.classList.remove('active');
  });

  // Add Active Class On Self
  ev.target.classList.add('active');
}

/** ============================== Bullets Option-Box  =============================== */

let bulletSpan = document.querySelectorAll('.bullets-option span');

let bulletsContainer = document.querySelector('.nav-bullets');

let bulletLocalStorage = localStorage.getItem('bullet_option');

if (bulletLocalStorage !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove('active');
  });

  if (bulletLocalStorage == 'block') {
    bulletsContainer.style.display = 'block';

    document.querySelector('.bullets-option .yes').classList.add('active');
  } else {
    bulletsContainer.style.display = 'none';

    document.querySelector('.bullets-option .no').classList.add('active');
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener('click', (e) => {
    if (span.dataset.display === 'show') {
      bulletsContainer.style.display = 'block';

      localStorage.setItem('bullet_option', 'block');
    } else {
      bulletsContainer.style.display = 'none';

      localStorage.setItem('bullet_option', 'none');
    }
    handleActive(e);
  });
});

/** ============================== Reset Option =============================== */

document.querySelector('.reset-options').onclick = function () {
  // localStorage.clear(); // this remove all data in site

  localStorage.removeItem('color_option');
  localStorage.removeItem('background_option');
  localStorage.removeItem('bullet_option');

  // Relode Window
  window.location.reload();
};

/** ============================== Toggle menu Navbar =============================== */

let toggleBtn = document.querySelector('.links-container .toggle-menu');

let tLink = document.querySelector('.links-container .links');

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();

  // Toggle Class 'menu-active' On Button
  this.classList.toggle('menu-active');

  // Toggle Class 'open' On Links
  tLink.classList.toggle('open');
};

// Click Anywhere Outside Menu And Toggle Button

document.addEventListener('click', (e) => {
  if (e.target !== toggleBtn && e.target !== tLink) {
    // Check If Menu Is Open

    if (tLink.classList.contains('open')) {
      // Toggle Class 'menu-active' On Button
      toggleBtn.classList.toggle('menu-active');

      // Toggle Class 'open' On Links
      tLink.classList.toggle('open');
    }
  }
});

// Stop Propagation On Menu
tLink.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
};
