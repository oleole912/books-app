{
  ('use strict');

  const bookTemplate = Handlebars.compile(
    document.querySelector('#template-book').innerHTML
  );

  /*const select = {
    bookElem: '.book',
  };*/


  const favouriteBooks = [];

  function render() {
    for (let book of dataSource.books) {
      // generate HTML based on template
      const generatedHTML = bookTemplate(book);

      //create element using utils.createDOMFromHTML
      const bookElement = utils.createDOMFromHTML(generatedHTML);

      // find books container
      const booksList = document.querySelector('.books-list');

      // add element to list
      booksList.appendChild(bookElement);
    }
  }

  function initActions() {
    const booksListElem = document.querySelector('.books-list');
    const bookImageElems = booksListElem.querySelectorAll('.book__image');

    for (let bookImage of bookImageElems) {
      bookImage.addEventListener('dblclick', function(event) {
        event.preventDefault();

        const clickedImageId = bookImage.getAttribute('data-id');
        if (!favouriteBooks.includes(clickedImageId)) {
          event.target.offsetParent.classList.add('favorite');
          favouriteBooks.push(clickedImageId);
        }

        console.log(favouriteBooks);
      });
    }
  }

  render();
  initActions();

}