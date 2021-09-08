`use strict`;
const display = new Display(true);
$(`.filter-accordion`).accordion({
  header: `.filter-accordion__header`,
  collapsible: true,
});

function toggleFilterAccordion() {
  if(document.documentElement.clientWidth > 400) {
    $(`.filter-accordion`).accordion(`disable`);
  }
}

toggleFilterAccordion();

window.addEventListener(`resize`, toggleFilterAccordion);