import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Search from "../components/Search";
import Navbar from "../components/Navbar";

const SearchPage = () => {
  const [bookshelf, setBookshelf] = useState(
    JSON.parse(localStorage.getItem("bookshelf")) || []
  );

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
  };

  return (
    <Box>
      <Navbar />
      <Search onAdd={addToBookshelf} />
    </Box>
  );
};

export default SearchPage;
