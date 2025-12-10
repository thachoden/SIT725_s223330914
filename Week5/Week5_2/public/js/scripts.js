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
      item.author +
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
const getBooks = async () => {
  try {
    const response = await fetch("/api/books");

    if (response.ok) {
      const data = await response.json();
      console.log("Books received:", data);
      addBooks(data);
    } else {
      console.error("Error:", response.status);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

$(document).ready(function () {
  getBooks();
});
