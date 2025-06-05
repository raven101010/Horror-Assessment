import React from 'react'
import { Flex, Box} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import SideBar from '../../components/SideBar/SideBar'
import TerrorForum from '../../components/TerrorForum/TerrorForum'
import HorrorTake from '../../components/HorrorTakes/HorrorTakes';
import HorrorPicks from '../../components/HorrorPicks/HorrorPicks';

const HomePage = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  const query = useQuery();
  const mode = query.get("mode");

  return (
    <>
      <Flex 
      bgImage="url('/images/credBg.png')"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
      w="full"
      minH="100%">
        <SideBar />
          <Box w="full" pt={{ base: 16, md: 0 }} px={4}>

            {mode === "forum" && <TerrorForum />}
            {mode === "horrortakes" && <HorrorTake />}
            {(!mode || mode === "picks") && <HorrorPicks />}
          </Box>
      </Flex>
    </>
  );
};

export default HomePage