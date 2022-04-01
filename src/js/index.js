(function () {
  window.onload = load;

  function load() {

    (function () {
      const storageList = JSON.parse(localStorage.getItem('list'));

      if (storageList)
        storageList.forEach(
          listItem => addListItemFromStorage(JSON.parse(listItem)));
    })();

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
        markCheckBox(checkbox);
        checkbox.addEventListener('change', () => markCheckBox(checkbox));
      });

    })();

    document.querySelector('#buttonAddItem').
      addEventListener('click', addListItem);
    document.querySelector('#inputItemName').addEventListener('keypress', e => {
      if (e.keyCode === 13) addListItem();
    });
    document.querySelectorAll('.delete').forEach(deleteButton =>
      deleteButton.addEventListener('click',
        clickEvent => deleteListItem(clickEvent.target.parentElement)));
  }

  function markCheckBox(checkbox) {
    if (checkbox.checked)
      checkbox.nextElementSibling.classList.add('line-through');
    else
      checkbox.nextElementSibling.classList.remove('line-through');
  }

  function addListItem() {
    const itemInputName = document.querySelector('#inputItemName');
    const itemInputQuantity = document.querySelector('#inputItemQuantity');
    const itemName = itemInputName.value.trim();
    const itemQuantity = itemInputQuantity.value;
    const list = document.querySelector('.list');

    if (itemName === '') {
      alert('Please insert a name for the item to be added to the list!');
      return;
    }

    const li = document.createElement('li');
    li.setAttribute('class', 'listItem');

    li.innerHTML = createListItem(itemName, itemQuantity);

    li.children[2].addEventListener('click',
      clickEvent => deleteListItem(clickEvent.target.parentElement));

    list.append(li);
    list.parentElement.classList.remove('hidden');

    saveListToStorage();

    itemInputName.value = '';
    itemInputQuantity.value = 1;
    itemInputName.focus();
  }

  function addListItemFromStorage(listItem) {
    const list = document.querySelector('.list');

    const li = document.createElement('li');
    li.setAttribute('class', 'listItem');

    li.innerHTML = createListItem(listItem[0], listItem[1]);

    list.append(li);
  }

  function saveListToStorage() {
    const listItems = document.querySelectorAll('.listItem');
    const storageList = [];

    listItems.forEach(item => {
      const raw = item.children[1].innerHTML;
      const [text, quantity] = getCleanItem(raw);

      storageList.push(JSON.stringify([text, quantity]));
    })

    localStorage.setItem('list', JSON.stringify(storageList));
  }

  function deleteListItem(listItem) {
    if (window.confirm('Are you sure you want to delete this?')) {
      const list = document.querySelector('.list');

      listItem.remove();

      saveListToStorage();
    }
  }

  function createListItem(text, quantity) {
    return `<input type='checkbox' title='Mark as done' />
    <h4>${text} <span>x${quantity}</span></h4>
    <button class='delete' type='button'>
      Delete item
    </button>`;
  }

  function getCleanItem(html) {
    return [
      html.split('<span>')[0].trim(),
      html.split('<span>')[1].split('</span>')[0].replace('x', '')
    ];
  }

})();
