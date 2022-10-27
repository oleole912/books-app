{
  ('use strict');



  const bookTemplate = Handlebars.compile(
    document.querySelector('#template-book').innerHTML
  );

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

  render();
}
