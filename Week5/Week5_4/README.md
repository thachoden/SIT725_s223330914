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
## 📝 Key Files

### book.model.js
Defines MongoDB schema with validation rules:
```javascript
const bookSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_-]+$/ // Alphanumeric, hyphens, underscores
  },
  title: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9\s\-':.,&!?()]+$/ // Allowed characters
  },
  author: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s\-'.]+$/ // Letters, spaces, hyphens, apostrophes, periods
  },
  genre: {
    type: String,
    enum: ["Fiction", "Non-Fiction", "Science Fiction", "Fantasy", ...]
  },
  year: {
    type: Number,
    min: 1000,
    max: currentYear + 5
  },
  summary: {
    type: String,
    minlength: 10,
    maxlength: 2000
  },
  price: {
    type: Number,
    min: 0
  },
  currency: {
    type: String,
    match: /^[A-Z]{3}$/ // ISO 4217 code
  }
});
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
      data: book
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
