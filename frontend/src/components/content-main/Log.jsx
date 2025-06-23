import { Flex, Heading, HStack, VStack, Menu, Button, Portal, Text } from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi";
import Match from "./match/Match"
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase";

function Log() {

    let date = "2025-06-22"

    const [allMatchesOnDate, setAllMatchesOnDate] = useState([])
    useEffect(() => {
    const fetchMatches = async () => {
        const matchesRef = collection(db, "matches", "by_date", date);
        const q = query(matchesRef, orderBy("StartEpoch", "desc"));
        const snapshot = await getDocs(q);
        const matches = snapshot.docs.map(doc => doc.data());
        setAllMatchesOnDate(matches);
  }

  fetchMatches();
}, []);
    const filterMenu = (
        <Menu.Root positioning={{ placement: "right-start" }}>
            <Menu.Trigger asChild>
                <Button variant={"plain"} size={"sm"} fontSize={"sm"} color={"white"}>
                    <GiHamburgerMenu />Filter by Playlist
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item>1v1</Menu.Item>
                        <Menu.Item>2v2</Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )

    return (
        <VStack w={"100%"} px={8} gap={2} py={4}>
            <Heading size={"md"}>Match Logs</Heading>
            <HStack w={"100%"} alignSelf={"center"} justifyContent={"space-between"}>
                {filterMenu}
                <Text color={"gray.700"}>Viewing: {date}</Text>
            </HStack>
            <Flex direction={"column"} w={"100%"} gap={4}>
                {allMatchesOnDate.map((matchStats) => (
                    <Match key={matchStats.StartEpoch} matchStats={matchStats}/>
                ))}
            </Flex>
        </VStack>
    )
}

export default Log