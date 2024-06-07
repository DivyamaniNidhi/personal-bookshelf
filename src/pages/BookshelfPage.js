import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Bookshelf from "../components/Bookshelf";

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState(
    JSON.parse(localStorage.getItem("bookshelf")) || []
  );

  const handleDelete = (bookToDelete) => {
    const updatedBookshelf = bookshelf.filter(
      (book) => book.key !== bookToDelete.key
    );
    setBookshelf(updatedBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
  };

  return (
    <Box>
      <Navbar />
      <Bookshelf books={bookshelf} onDelete={handleDelete} />
    </Box>
  );
};

export default BookshelfPage;
