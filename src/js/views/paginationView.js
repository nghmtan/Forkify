import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateNextButton(page) {
    return `
      <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generatePrevButton(page) {
    return `
      <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page - 1}</span>
      </button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1, with other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNextButton(curPage);
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePrevButton(curPage);
    }

    // other page
    if (curPage < numPages) {
      return [
        this._generatePrevButton(curPage),
        this._generateNextButton(curPage),
      ];
    }

    // page 1 NO other pages
    return '';
  }
}

export default new PaginationView();
