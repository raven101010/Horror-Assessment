import React, { useEffect, useState } from "react";
import { Box, Text, Image, Flex, Link, Spinner, Center } from "@chakra-ui/react";

const MovieScroller = ({ movies }) => (
  <Box mb={10} fontFamily="Poppins">
    <Flex
      overflowX="auto"
      gap={4}
      pb={2}
      aria-label="Movie scroller"
      sx={{
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari, Edge
      }}
    >
      {movies.map((movie, index) => (
        <Box
          key={index}
          flexShrink={0}
          minW={{ base: "220px", sm: "240px", md: "250px" }}
          maxW={{ base: "220px", sm: "240px", md: "250px" }}
          boxSizing="border-box"
        >
          <Image
            src={movie.image}
            alt={movie.title}
            borderRadius="md"
            w="100%"
            h="auto"
            objectFit="contain"
            loading="lazy"
            draggable={false}
          />
          <Text mt={2} fontWeight="bold" fontSize="sm" noOfLines={2}>
            {movie.title}
          </Text>
          <Text fontSize="sm" noOfLines={1} color="gray.300">
            {movie.genre}
          </Text>
          <Text fontSize="sm" noOfLines={1} color="gray.400">
            {movie.duration}
          </Text>
        </Box>
      ))}
    </Flex>
  </Box>
);

const HorrorPicks = () => {
  const [topHorrorPicks, setTopHorrorPicks] = useState([]);
  const [cultClassics, setCultClassics] = useState([]);
  const [horrorGames, setHorrorGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recommendations");
        const data = await res.json();
        setTopHorrorPicks(data.filter((item) => item.category === "Top Horror Picks"));
        setCultClassics(data.filter((item) => item.category === "Cult Classics"));
        setHorrorGames(data.filter((item) => item.category === "Horror Games"));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Center h="200px" color="white" fontFamily="Poppins">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box color="white" px={{ base: 4, md: 6 }} py={10} fontFamily="Poppins">
      <Box mb={12}>
        <Text
          fontFamily="'Playfair Display', serif"
          py={6}
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
        >
          Top 10 Horror Picks Of The Month |{" "}
          <Link
            href="https://variety.com/lists/horror-movies-to-watch-may-2025/"
            color="white"
            isExternal
            textDecoration="underline"
            fontSize={{ base: "md", md: "lg" }}
          >
            Read Article
          </Link>
        </Text>
        <MovieScroller movies={topHorrorPicks} />
      </Box>

      <Box mb={12}>
        <Text
          fontFamily="'Playfair Display', serif"
          py={6}
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
        >
          Top 10 Horror Cult Classics Of All Time |{" "}
          <Link
            href="https://www.imdb.com/?ref_=nv_home"
            color="white"
            isExternal
            textDecoration="underline"
            fontSize={{ base: "md", md: "lg" }}
          >
            Read Article
          </Link>
        </Text>
        <MovieScroller movies={cultClassics} />
      </Box>

      <Box mb={12}>
        <Text
          fontFamily="'Playfair Display', serif"
          py={6}
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
        >
          Top 10 Scariest Video Games Of All Time |{" "}
          <Link
            href="https://www.rollingstone.com/culture/rs-gaming-lists/10-scariest-video-games-of-all-time-1235141514/outlast-2013-1235141524/"
            color="white"
            isExternal
            textDecoration="underline"
            fontSize={{ base: "md", md: "lg" }}
          >
            Read Article
          </Link>
        </Text>
        <MovieScroller movies={horrorGames} />
      </Box>
    </Box>
  );
};

export default HorrorPicks;
