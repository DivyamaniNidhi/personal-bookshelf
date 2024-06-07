import React from "react";
import { Box, Text, Button, Grid, Flex } from "@chakra-ui/react";

const Bookshelf = ({ books, onDelete }) => {
  return (
    <Box>
      {books.length === 0 ? (
        <Flex align="center" justify="center" height="100vh">
          <Text fontWeight="bold" fontSize={18} color="#F44900">
            No books in your bookshelf
          </Text>
        </Flex>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={4}
          margin="16px"
        >
          {books.map((book, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              position="relative"
            >
              <Box>
                <Text fontWeight="bold" fontSize={20} color="#F44900">
                  {book.title}
                </Text>
                <Text mt={8}>
                  <Text as="span" fontWeight="bold">
                    Author:{" "}
                  </Text>
                  {book.author_name
                    ? book.author_name.join(", ")
                    : "Unknown Author"}
                </Text>
                <Text mt={2}>
                  <Text as="span" fontWeight="bold">
                    Edition Count:{" "}
                  </Text>
                  {book.edition_count || "N/A"}
                </Text>
              </Box>
              <Button
                mt="30px"
                colorScheme="red"
                size="sm"
                onClick={() => onDelete(book)}
                alignSelf="center"
              >
                Delete
              </Button>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Bookshelf;
