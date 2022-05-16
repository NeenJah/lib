`use strict`;

const selectEl = document.querySelector(`.js-select`);

class CustomMultipleSelect {
  constructor(elem, options) {
    this._originSelect = elem;
    this.values = Array.from(this._originSelect).map(option => {
      const { textContent: text } = option;
      return text;
    });
    this._fakeSelect = this.createFakeSelect();

    // this._originSelect.hidden = `true`;
    this._originSelect.insertAdjacentElement(`afterend`, this._fakeSelect);
  }

  createFakeSelect() {
    const wrapper = document.createElement(`div`);
    const field = document.createElement(`input`);
    const list = document.createElement(`ul`);

    const onChangeOriginSelectItemClick = (ev) => {
      if(!ev.target.classList.contains(`js-fake-option`)) return;

      const index = ev.target.dataset.index;

      this._originSelect[index].selected = !this._originSelect[index].selected;
    }

    const onSortOptionsFieldKeyup = (ev) => {
      const fieldValue = ev.target.value.toLowerCase();
      this._fakeOptions.forEach(option => {
        option.textContent.toLowerCase().startsWith(fieldValue) ? option.classList.remove(`fake-option-hidden`) : option.classList.add(`fake-option-hidden`);
      });
    }

    list.addEventListener(`click`, onChangeOriginSelectItemClick);
    field.addEventListener(`keyup`, onSortOptionsFieldKeyup);

    this._fakeOptions = this.values.map((text, index) => {
      const li = document.createElement(`li`);
      li.className = `js-fake-option`;
      li.dataset.index = index;
      li.textContent = text;
      
      return li;
    });

    this._fakeOptions.forEach(item => list.append(item));

    wrapper.append(field, list);

    return wrapper;
  }
}

new CustomMultipleSelect(selectEl);