import { Flex, Heading, HStack, VStack, Text, Box } from "@chakra-ui/react"
import Match from "./match/Match"
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import DateSelector from "./filter/DateSelector";
import FilterPlaylistMenu from "./filter/FilterPlaylistMenu";

function Log() {

    const dates = [
        "2025-06-23",
        "2025-06-22"
    ]

    const [selectedDate, setSelectedDate] = useState(0)
    const [selectedPlaylist, setSelectedPlaylist] = useState(10) // default = ranked 1v1

    
    let date = dates[selectedDate]
    const formattedDate = () => {
        const parts = date.split("-")
        return parts[1] + "/" + parts[2] + "/" + parts[0]
    }

    const [allMatchesOnDate, setAllMatchesOnDate] = useState([])

    useEffect(() => {
        const fetchMatches = async () => {
            const matchesRef = collection(db, "matches", "by_date", date)
            const q = query(
                matchesRef, 
                where("Playlist", "==", selectedPlaylist),
                orderBy("StartEpoch", "desc")
            )
            const snapshot = await getDocs(q)
            const matches = snapshot.docs.map(doc => doc.data())
            setAllMatchesOnDate(matches)
        }
        fetchMatches()
    }, [selectedDate, selectedPlaylist])

    return (
        <VStack w={"100%"} px={8} gap={2} py={4}>
            <Heading size={"lg"}>Match Logs</Heading>
            <Box>
                <DateSelector dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </Box>
            <HStack w={"100%"} alignSelf={"center"} justifyContent={"space-between"}>
                <Box>
                    <FilterPlaylistMenu setSelectedPlaylist={setSelectedPlaylist} />
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