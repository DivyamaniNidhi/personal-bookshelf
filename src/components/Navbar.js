import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex justify="space-between">
        <Button as={Link} to="/" colorScheme="teal">
          <Text color="white">Search Books</Text>
        </Button>
        <Button as={Link} to="/bookshelf" colorScheme="teal">
          My Bookshelf
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
