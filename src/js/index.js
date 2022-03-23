(function () {
  window.onload = load;

  function load() {

    (function () {
      const list = document.querySelector('.list');

      try {
        if (list.childElementCount === 0)
          list.parentElement.classList.add('hidden');
        else
          list.parentElement.classList.remove('hidden');
      } catch (e) {
        //
      }
    })();

    (function () {
      const checkboxes = document.querySelectorAll('input[type=checkbox]');

      try {
        checkboxes.forEach(checkbox => {
          markCheckBox(checkbox)
          checkbox.addEventListener('change', () => markCheckBox(checkbox))
        })
      } catch (e) {
        console.log(e)
      }

    })();
  }

  function markCheckBox(checkbox) {
    if (checkbox.checked)
      checkbox.nextElementSibling.classList.add('line-through');
    else
      checkbox.nextElementSibling.classList.remove('line-through');
  }
})();
