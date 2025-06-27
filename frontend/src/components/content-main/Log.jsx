import { Flex, Heading, HStack, VStack, Text, Box, Presence } from "@chakra-ui/react"
import Match from "./match/Match"
import DateSelector from "./filter/DateSelector";
import FilterPlaylistMenu from "./filter/FilterPlaylistMenu";

function Log({ dates, selectedDate, setSelectedDate, setSelectedPlaylist, allMatchesOnDate }) {

    function formatDate(date) {
        const parts = date.split("-")
        const year = parts[0]
        const month = parseInt(parts[1])
        const day = parseInt(parts[2])
        return `${month}/${day}/${year}`
    }

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
                    <Text color={"gray.700"}>{allMatchesOnDate.length} Matches</Text>
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