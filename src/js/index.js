(function () {
  window.onload = load;

  function load() {

    (function () {
      const list = document.querySelector('.list');

      if (list.childElementCount === 0)
        list.parentElement.classList.add('hidden');
      else
        list.parentElement.classList.remove('hidden');
    })();

    (function () {
      const checkboxes = document.querySelectorAll('input[type=checkbox]');

      checkboxes.forEach(checkbox => {
        markCheckBox(checkbox)
        checkbox.addEventListener('change', () => markCheckBox(checkbox))
      })

    })();

    document.querySelector('#buttonAddItem').addEventListener('click', () => {
      const itemName = document.querySelector('#inputItemName').value.trim();
      const itemQuantity = document.querySelector('#inputItemQuantity').value;
      const list = document.querySelector('.list');

      if (itemName === '') {
        alert('Please insert a name for the item to be added to the list!');
        return;
      }

      const div = document.createElement('div');
      div.setAttribute('class', 'listItem');

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('title', 'Mark as done');

      const itemHtml = document.createElement('h4');
      const itemQuantityHtml = document.createElement('span');
      const button = document.createElement('button');
      button.classList.add('delete');
      button.setAttribute('type', 'button');
      button.setAttribute('disabled', 'disabled');
      button.innerText = 'Delete item';

      itemQuantityHtml.append(` x${itemQuantity}`);
      itemHtml.append(itemName, itemQuantityHtml);
      div.append(checkbox, itemHtml, button);

      list.append(div);
    });
  }

  function markCheckBox(checkbox) {
    if (checkbox.checked)
      checkbox.nextElementSibling.classList.add('line-through');
    else
      checkbox.nextElementSibling.classList.remove('line-through');
  }
})();
