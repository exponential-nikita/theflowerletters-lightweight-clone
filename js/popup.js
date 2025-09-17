document.addEventListener('DOMContentLoaded', () => {
  const popupProgress = localStorage.getItem('popupProgress');
  if (popupProgress && popupProgress === 'completed') {
    return;
  }

  const $popup = document.getElementById('popup');
  if ($popup) {
    setTimeout(() => {
      $popup.style.display = 'block';
    }, 5000);

    const $popupClose = document.getElementById('popup-close');
    if ($popupClose) {
      $popupClose.addEventListener('click', () => {
        $popup.style.display = 'none';
      });
    }

    const $emailForm = document.getElementById('email-form');

    $emailForm?.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!$emailForm) {
        return;
      }

      const formData = new FormData($emailForm);

      const data = Object.fromEntries(formData.entries());
      localStorage.setItem('email', data.email);
      showPhoneStep();
    });

    const $phoneInput = document.getElementById('phone-input');
    if ($phoneInput) {
      $phoneInput.addEventListener('input', (event) => {
        $phoneInput.value = event.target.value.replace(/\D/g, "");
      });
    }

    const $phoneForm = document.getElementById('phone-form');

    $phoneForm?.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!$phoneForm) {
        return;
      }

      const formData = new FormData($phoneForm);

      const data = Object.fromEntries(formData.entries());
      localStorage.setItem('phone', data.phone);

      const [email, phone, phoneCountry] = [localStorage.getItem('email'), data.phone, data['phone-country']];

      void fetch('https://yourhealthcoveragetoday.com/letters-form', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, phoneCountry, phone}),
      }).then(() => {
        showCompletedStep();
        localStorage.setItem('popupProgress', 'completed');
      });
    });

    const $countrySelect = document.querySelector(
      '.popup__content-submit-form-phone-country-select'
    );
    const $countryIcon = document.querySelector(
      '.popup__content-submit-form-phone-country-icon'
    );

    $countrySelect.addEventListener('change', () => {
      const code = $countrySelect.value;
      $countryIcon.src = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`;
    });

    const $storyButtons = document.getElementById('story-buttons');
    if ($storyButtons) {
      for (const $button of $storyButtons.children) {
        $button.addEventListener('click', () => {
          localStorage.setItem('popupProgress', 'phone');
          showEmailStep();
        });
      }
    }

    const $shopNowButton = document.getElementById('shop-now-button');
    if ($shopNowButton) {
      $shopNowButton.addEventListener('click', () => {
        $popup.style.display = 'none';
      });
    }

    switch (popupProgress) {
      case 'email': {
        showEmailStep();
        break;
      }
      case 'phone': {
        showPhoneStep();
      }
    }
  }
});

function showEmailStep() {
  const $modalChooseStory = document.getElementById('modal-choose-story');
  if ($modalChooseStory) {
    $modalChooseStory.style.display = 'none';
  }
  const $modalEmail = document.getElementById('modal-email');
  if ($modalEmail) {
    $modalEmail.style.display = 'block';
  }
}

function showPhoneStep() {
  const $modalChooseStory = document.getElementById('modal-choose-story');
  if ($modalChooseStory) {
    $modalChooseStory.style.display = 'none';
  }
  const $modalEmail = document.getElementById('modal-email');
  if ($modalEmail) {
    $modalEmail.style.display = 'none';
  }
  const $modalPhone = document.getElementById('modal-phone');
  if ($modalPhone) {
    $modalPhone.style.display = 'block';
  }
}

function showCompletedStep() {
  const $modalPhone = document.getElementById('modal-phone');
  if ($modalPhone) {
    $modalPhone.style.display = 'none';
  }
  const $modalCompleted = document.getElementById('modal-completed');
  if ($modalCompleted) {
    $modalCompleted.style.display = 'block';
  }
}
