const addBooks = (items) => {
  items.forEach((item) => {
    let itemToAppend =
      '<div class="col s12 m6">' +
      '<div class="card blue-grey darken-1">' +
      '<div class="card-content white-text">' +
      '<span class="card-title">' +
      item.title +
      "</span>" +
      "<p>" +
      item.summary +
      "</p>" +
      "</div>" +
      '<div class="card-action">' +
      '<a href="#">About this book</a>' +
      '<a href="#">Add to cart</a>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("#bookList").append(itemToAppend);
  });
};
const getBooks = () => {
  $.get("/api/books", (response) => {
    if (response.status == 200) {
      addBooks(response.data);
    }
  });
};

$(document).ready(function () {
  getBooks();
});
