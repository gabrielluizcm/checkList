(function () {
  window.onload = load;

  function load() {

    // localStorage.clear();
    (function () {
      const storageList = JSON.parse(localStorage.getItem('list'));

      if (storageList)
        storageList.forEach(listItem => addListItemFromStorage(listItem));
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
        clickEvent => deleteListItem(clickEvent.path[1])));
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

    li.children[2].addEventListener('click', clickEvent => deleteListItem(clickEvent.path[1]));

    list.append(li);
    list.parentElement.classList.remove('hidden');

    let storageList = JSON.parse(localStorage.getItem('list')) ?? [];
    storageList.push(`${itemName} <${itemQuantity}`);
    console.log(storageList);
    localStorage.setItem('list', JSON.stringify(storageList));

    itemInputName.value = '';
    itemInputQuantity.value = 1;
    itemInputName.focus();
  }

  function addListItemFromStorage(listItem) {
    const list = document.querySelector('.list');
    const itemText = listItem.split('<')[0];
    const itemQuantity = listItem.split('<')[1];

    const li = document.createElement('li');
    li.setAttribute('class', 'listItem');

    li.innerHTML = createListItem(itemText, itemQuantity);

    list.append(li);
  }

  function deleteListItem(listItem) {
    if (window.confirm('Are you sure you want to delete this?')) {
      const list = document.querySelector('.list');

      listItem.remove();

      let storageList = JSON.parse(localStorage.getItem('list'));
      const itemIndex = storageList.indexOf(listItem.children[1].innerHtml);
      storageList.splice(itemIndex, 1)
      localStorage.setItem('list', JSON.stringify(storageList));

      if (list.childElementCount === 0)
        list.parentElement.classList.add('hidden');
      else
        list.parentElement.classList.remove('hidden');
    }
  }

  function createListItem(text, quantity) {
    return `<input type='checkbox' title='Mark as done' />
    <h4>${text} <span>x${quantity}</span></h4>
    <button class='delete' type='button'>
      Delete item
    </button>`;
  }
})();
