const addBooks = (items) => {
  $("#bookListContainer").append('<div id="bookList"></div>');

  items.forEach((item) => {
    let itemToAppend =
      '<div class="book"><a class="waves-effect waves-teal btn-flat book-item" data-id="' +
      item.id +
      '">' +
      '<span class="book-title">' +
      item.title +
      "</span>" +
      " " +
      '<span class="book-price">' +
      item.price.$numberDecimal +
      "</span>" +
      " " +
      '<span class="book-currency">' +
      item.currency +
      "</span>" +
      "</a></div>";

    $("#bookList").append(itemToAppend);
  });
};

const addDetails = (item) => {
  if ($("#bookInfo").length === 0) {
    $("#bookListContainer").append('<div id="bookInfo"></div>');
  }

  $("#bookInfo").empty();
  const itemToAppend =
    '<div id="info">' +
    "<span>Title: " +
    item.title +
    "</span>" +
    " " +
    "<span>Author: " +
    item.author +
    "</span>" +
    " " +
    "<span>Year: " +
    item.year +
    "</span>" +
    " " +
    "<span>Genre: " +
    item.genre +
    "</span>" +
    " " +
    "<span>Summary: " +
    item.summary +
    "</span>" +
    " " +
    "<span>Price: " +
    item.price.$numberDecimal +
    " " +
    item.currency +
    "</span>" +
    "</div>";
  $("#bookInfo").append(itemToAppend);
};
const updateBookDetails = async (id) => {
  try {
    const response = await fetch("/api/books/" + id);

    if (response.ok) {
      const data = await response.json();
      addDetails(data);
    } else {
      console.error("Error:", response.status);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
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
  $("#getBookBtn").click(async function () {
    await getBooks();
    $(this).remove();
  });
  $(document).on("click", ".book-item", function (event) {
  const bookId = $(event.currentTarget).data("id");
  console.log("Book ID:", bookId);
  updateBookDetails(bookId);
});
});
