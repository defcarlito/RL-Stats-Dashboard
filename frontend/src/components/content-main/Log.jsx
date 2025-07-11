import { Flex, Heading, HStack, VStack, Text, Box, Presence, Separator } from "@chakra-ui/react"
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
            <Box mb={8}>
                <DateSelector dates={dates} selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate} formatDate={formatDate} />
            </Box>
            <HStack w={"100%"} alignSelf={"center"} justifyContent={"space-between"}>
                <Box>
                    <FilterPlaylistMenu setSelectedPlaylist={setSelectedPlaylist} />
                </Box>
                <Box>
                    <Text color={"text.quieter"}>
                        {allMatchesOnDate.length} {allMatchesOnDate.length === 1 ? "Match" : "Matches"}
                    </Text>
                </Box>
            </HStack>
            <Flex direction={"column"} w={"full"} gap={4} bg={"container.base"} borderRadius={"lg"}
            boxShadow={"0 0 10px rgba(0, 0, 0, 0.2)"} pb={8}>
                <HStack w={"full"} bg={"container.soft"} borderTopRadius={"lg"} textAlign={"flex-start"} py={2} mb={4}
                direction={"row"} gap={4}>
                    <Heading size={"lg"} ml={8} color={"text.quiet"}>Match Log</Heading>
                    <Separator orientation={"vertical"} height={6} borderColor={"text.quieter"} size={"lg"} borderRadius={"lg"}/>
                    <Text fontSize={"sm"} color={"text.quiet"}>{formatDate(selectedDate)}</Text>
                </HStack>

                {allMatchesOnDate.map((matchStats, index) => (
                    <Presence key={matchStats.StartEpoch} present={true} px={8}
                    animationName={{ _open: "scale-in, fade-in, slide-from-bottom" }} animationDuration=".75s"
                    style={{ animationDelay: `${index * 0.25}s`, animationFillMode: "both" }}>
                        <Match key={matchStats.StartEpoch} matchStats={matchStats}/>
                    </Presence>
                ))}
            </Flex>
        </VStack>
    )
}

export default Log