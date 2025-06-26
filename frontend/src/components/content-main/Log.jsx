import { Flex, Heading, HStack, VStack, Text, Box, Presence } from "@chakra-ui/react"
import Match from "./match/Match"
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import DateSelector from "./filter/DateSelector";
import FilterPlaylistMenu from "./filter/FilterPlaylistMenu";

function Log() {

    const [dates, setDates] = useState([])

    const [selectedDate, setSelectedDate] = useState("")
    const [selectedPlaylist, setSelectedPlaylist] = useState(10) // default = ranked 1v1

    const [allMatchesOnDate, setAllMatchesOnDate] = useState([])

    function formatDate(date) {
        const parts = date.split("-")
        const year = parts[0]
        const month = parseInt(parts[1])
        const day = parseInt(parts[2])
        return `${month}/${day}/${year}`
    }
    
    useEffect(() => {
        const fetchAvaliableDates = async () => {
            const snapshot = await getDocs(collection(db, "match_dates"))
            const fetchedDates = snapshot.docs.map(doc => doc.id)
            const datesInOrder = fetchedDates.reverse()
            setDates(datesInOrder)
            fetchedDates.length > 0 && setSelectedDate(datesInOrder[0]) // set default
        }
        fetchAvaliableDates()
    }, [])

    useEffect(() => {
        const fetchMatches = async () => {
            const matchesRef = collection(db, "matches")
            const q = query(
                matchesRef, 
                where("StartDate", "==", selectedDate),
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
        <VStack w={"100%"} minH={"100vh"} px={8} py={4} gap={2}>
            <Heading size={"4xl"}>Match Logs</Heading>
            <Box>
                <DateSelector dates={dates} selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate} formatDate={formatDate} />
            </Box>
            <HStack w={"100%"} alignSelf={"center"} justifyContent={"space-between"}>
                <Box>
                    <FilterPlaylistMenu setSelectedPlaylist={setSelectedPlaylist} />
                </Box>
                <Box>
                    <Text color={"gray.700"}>{allMatchesOnDate.length} matches</Text>
                </Box>
            </HStack>
            <Flex direction={"column"} w={"full"} gap={4}>
                {allMatchesOnDate.map((matchStats, index) => (
                    <Presence key={matchStats.StartEpoch} present={true}
                    animationName={{ _open: "scale-in, fade-in, slide-from-bottom-full" }} animationDuration=".75s"
                    style={{ animationDelay: `${index * 0.25}s`, animationFillMode: "both" }}>
                        <Match key={matchStats.StartEpoch} matchStats={matchStats}/>
                    </Presence>
                ))}
            </Flex>
        </VStack>
    )
}

export default Log