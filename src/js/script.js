{
  ('use strict');

  const bookTemplate = Handlebars.compile(
    document.querySelector('#template-book').innerHTML
  );

  const select = {
    booksList: '.books-list',
    filters: '.filters',
    bookImage: '.book__image',

  };

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData() {
      const thisBooksList = this;

      thisBooksList.data = dataSource.books;
      thisBooksList.favouriteBooks = [];
      thisBooksList.filters = [];
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.booksListElem = document.querySelector(select.booksList);
      thisBooksList.filtersElem  = document.querySelector(select.filters);
    }

    render() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        // generate HTML based on template
        const generatedHTML = bookTemplate({
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          rating: book.rating,
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth,
        });

        //create element using utils.createDOMFromHTML
        const bookElement = utils.createDOMFromHTML(generatedHTML);

        // add element to list of books
        thisBooksList.booksListElem.appendChild(bookElement);
      }
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.booksListElem.addEventListener('dblclick', function(event) {
        event.preventDefault();
        const clickedElem = event.target.offsetParent;
        const clickedImageId = clickedElem.getAttribute('data-id');

        if(!thisBooksList.favouriteBooks.includes(clickedImageId)) {
          clickedElem.classList.add('favorite');
          thisBooksList.favouriteBooks.push(clickedImageId);
        } else {
          clickedElem.classList.remove('favorite');
          const index = thisBooksList.favouriteBooks.indexOf(clickedImageId);
          thisBooksList.favouriteBooks.splice(index, 1);
        }
      });

      thisBooksList.filtersElem.addEventListener('click', function(event) {
        const clickedFilter = event.target;
        const index = thisBooksList.filters.indexOf(clickedFilter.value);
        if (clickedFilter.tagName == 'INPUT' && clickedFilter.name == 'filter' && clickedFilter.type === 'checkbox') {
          if (clickedFilter.checked) {
            thisBooksList.filters.push(clickedFilter.value);
          } else {
            thisBooksList.filters.splice(index, 1);
          }
        }
        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        let shouldBeHidden = false;
        const bookImageElem = document.querySelector(select.bookImage + '[data-id="' + book.id + '"]');
        for (let filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          bookImageElem.classList.add('hidden');
        } else {
          bookImageElem.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let background = '';
      if (rating <= 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }

  const app = new BooksList();
  console.log(app);

}