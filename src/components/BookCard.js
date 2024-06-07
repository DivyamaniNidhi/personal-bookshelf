import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const BookCard = ({ book, onAdd }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Text fontWeight="bold" fontSize={20} color="#F44900">
          {book.title}
        </Text>
        <Text mt={8}>
          <Text as="span" fontWeight="bold">
            Author:{" "}
          </Text>
          {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
        </Text>
        <Text mt={2}>
          <Text as="span" fontWeight="bold">
            Edition Count:{" "}
          </Text>{" "}
          {book.edition_count || "N/A"}
        </Text>
      </Box>
      <Button mt={4} colorScheme="blue" size="sm" onClick={() => onAdd(book)}>
        Add to Bookshelf
      </Button>
    </Box>
  );
};

export default BookCard;
