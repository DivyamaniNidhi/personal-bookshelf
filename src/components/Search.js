import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Box, Spinner, Text, Grid, useToast } from "@chakra-ui/react";
import BookCard from "./BookCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookshelf, setBookshelf] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const storedBookshelf = localStorage.getItem("bookshelf");
    if (storedBookshelf) {
      setBookshelf(JSON.parse(storedBookshelf));
    }
  }, []);

  const updateBookshelf = (newBookshelf) => {
    setBookshelf(newBookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(newBookshelf));
  };

  const onAdd = (book) => {
    const bookExists = bookshelf.some((b) => b.key === book.key);
    if (bookExists) {
      toast({
        title: "Book already exists.",
        description: "This book is already in your bookshelf.",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      const newBookshelf = [...bookshelf, book];
      updateBookshelf(newBookshelf);
      toast({
        title: "Book added.",
        description: "Book added to your bookshelf.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const searchBooks = async (q) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(
          q
        )}&limit=10&page=1`
      );
      const booksWithEditions = response.data.docs.map((book) => ({
        ...book,
        edition_count: book.edition_count || "N/A",
      }));
      setBooks(booksWithEditions);
      if (response.data.docs.length === 0) {
        setError("No books found.");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
      setError(
        "There was an error fetching the books. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Input
        mt={4}
        placeholder="Search for books"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          if (value) {
            searchBooks(value);
          } else {
            setBooks([]);
            setError("");
          }
        }}
      />
      {loading && <Spinner />}
      {error && !loading && <Text color="red.500">{error}</Text>}
      <Box mt={4} ml={4} mr={4}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={6}
        >
          {books.map((book) => (
            <BookCard key={book.key} book={book} onAdd={onAdd} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Search;
