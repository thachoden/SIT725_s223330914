# Week5_4 - Book Management API

A RESTful Book Management API built with **Node.js, Express, and MongoDB** with comprehensive validation and error handling.

## 📁 Project Structure

```
Week5_4/
├── controllers/
│   ├── book.controller.js      # Request handlers
│   └── index.js                # Controller exports
├── models/
│   └── book.model.js           # MongoDB schema & validation
├── routes/
│   └── book.router.js          # API endpoints
├── services/
│   └── book.service.js         # Business logic
├── test/
│   ├── test.js                 # Test runner
│   └── testData.js             # Test data
├── public/
│   ├── css/
│   │   └── styles.css          # Frontend styles
│   └── index.html              # Frontend UI
├── node_modules/               # Dependencies
├── package.json                # Project metadata
├── package-lock.json           # Dependency lock
├── server.js                   # Express server
├── seed.js                     # Database seeder
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd Week5_4

# Install dependencies
npm install

# Start server
npm run start
```

### Test running

```bash
# Start testing script
node .\test\test.js
```

## 📝 Key Files

### book.model.js

Defines MongoDB schema with validation rules:

```javascript
const bookSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      maxlength: 50,
      immutable: true,
      match: /^[a-zA-Z0-9\-_]+$/,
    },
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
      match: /^[a-zA-Z0-9\s\-':.,&!?()]+$/,
    },
    author: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      match: /^[a-zA-Z\s\-'.]+$/,
    },
    year: {
      type: Number,
      required: true,
      min: 1000,
      max: new Date().getFullYear() + 5, // Allow future publications up to 5 years
      validate: {
        validator: Number.isInteger,
        message: "Year must be an integer",
      },
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Romance",
        "Thriller",
        "Biography",
        "History",
        "Self-Help",
        "Poetry",
        "Drama",
        "Adventure",
        "Horror",
        "Other",
      ],
    },
    summary: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },
    price: {
      type: mongoose.Decimal128,
      required: true,
      min: 0,
      validate: [
        {
          validator: function (v) {
            return v !== null && v !== undefined;
          },
          message: "Price is required",
        },
        {
          validator: function (v) {
            if (v === null || v === undefined) return true;
            return parseFloat(v.toString()) >= 0;
          },
          message: "Price must be greater than or equal to 0",
        },
      ],
      get: (v) => v?.toString(),
    },
    currency: {
      type: String,
      required: true,
      default: "AUD",
    },
  },
  { strict: "throw" }
);
```

### book.service.js

Business logic layer:

```javascript
const addBook = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

const getBookById = async (id) => {
  return await Book.findById(id);
};

const updateBook = async (id, updateData) => {
  return await Book.findByIdAndUpdate(id, updateData, { new: true });
};
```

### book.controller.js

Request handlers with error management:

```javascript
const addBook = async (req, res) => {
  try {
    const book = await bookService.addBook(req.body);
    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (e) {
    // Handle validation, duplicate, and server errors
  }
};
```

## 👤 Author

**Student ID:** s223330914  
**Course:** SIT725 Week 5

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Last Updated:** December 2025
