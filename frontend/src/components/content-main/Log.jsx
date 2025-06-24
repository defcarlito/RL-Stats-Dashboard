import { Flex, Heading, HStack, VStack, Menu, Button, Portal, Text, Box } from "@chakra-ui/react"
import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { GiHamburgerMenu } from "react-icons/gi";
import Match from "./match/Match"
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase";

function Log() {

    const dates = [
        "2025-06-23",
        "2025-06-22"
    ]

    const [selectedDate, setSelectedDate] = useState(0)
    let date = dates[selectedDate]
    const formattedDate = () => {
        const parts = date.split("-")
        return parts[1] + "/" + parts[2] + "/" + parts[0]
    }

    const [allMatchesOnDate, setAllMatchesOnDate] = useState([])

    useEffect(() => {
        const fetchMatches = async () => {
            const matchesRef = collection(db, "matches", "by_date", date);
            const q = query(matchesRef, orderBy("StartEpoch", "desc"));
            const snapshot = await getDocs(q);
            const matches = snapshot.docs.map(doc => doc.data());
            setAllMatchesOnDate(matches);
        }
        fetchMatches()
    }, [selectedDate])

    const filterPlaylistMenu = (
        <Menu.Root>
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

    const DateSelector = (
        <Pagination.Root count={dates.length * 2} pageSize={2} defaultPage={1}>
            <ButtonGroup gap="4" size="sm" variant="ghost">
                <Pagination.PrevTrigger asChild>
                    <IconButton onClick = {() => setSelectedDate(selectedDate-1)}>
                        <HiChevronLeft color={"white"}/>
                    </IconButton>
                </Pagination.PrevTrigger>
                <Pagination.PageText />
                <Pagination.NextTrigger asChild>
                    <IconButton onClick = {() => setSelectedDate(selectedDate+1)}>
                        <HiChevronRight color={"white"}/>
                    </IconButton>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
        )

    return (
        <VStack w={"100%"} px={8} gap={2} py={4}>
            <Heading size={"lg"}>Match Logs</Heading>
            <HStack w={"100%"} alignSelf={"center"} justifyContent={"space-between"}>
                <Box>
                    {filterPlaylistMenu}
                </Box>
                <Box>
                    {DateSelector}
                </Box>
                <Box>
                    <Text color={"gray.700"}>Viewing: {formattedDate()}</Text>
                </Box>
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