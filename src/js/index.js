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
      })

    })();

    document.querySelector('#buttonAddItem').
      addEventListener('click', addListItem);
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
    const itemName = document.querySelector('#inputItemName').value.trim();
    const itemQuantity = document.querySelector('#inputItemQuantity').value;
    const list = document.querySelector('.list');

    if (itemName === '') {
      alert('Please insert a name for the item to be added to the list!');
      return;
    }

    const div = document.createElement('div');
    div.setAttribute('class', 'listItem');

    div.innerHTML =
      `<input type='checkbox' title='Mark as done' />
      <h4>${itemName} <span>x${itemQuantity}</span></h4>
      <button class='delete' type='button'>
        Delete item
      </button>`;

    div.children[2].addEventListener('click', clickEvent => deleteListItem(clickEvent.path[1]))

    list.append(div);
    list.parentElement.classList.remove('hidden');

    let storageList = JSON.parse(localStorage.getItem('list')) ?? [];
    storageList.push(`${itemName} <x${itemQuantity}`);
    console.log(storageList);
    localStorage.setItem('list', JSON.stringify(storageList));
  }

  function addListItemFromStorage(listItem) {
    const list = document.querySelector('.list');
    const itemText = listItem.split('<')[0];
    const itemQuantity = listItem.split('<')[1];

    const div = document.createElement('div');
    div.setAttribute('class', 'listItem');

    div.innerHTML =
      `<input type='checkbox' title='Mark as done' />
      <h4>${itemText} <span>${itemQuantity}</span></h4>
      <button class='delete' type='button'>
        Delete item
      </button>`;

    list.append(div);
  }

  function deleteListItem(listItem) {
    if (window.confirm('Are you sure you want to delete this?')) {
      const list = document.querySelector('.list');

      listItem.remove()

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
})();
