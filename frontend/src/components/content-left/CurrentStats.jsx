import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react"

function CurrentStats({ dates }) {
    if (!dates || dates.length === 0) return null

    const [year, month, day] = dates[0].split("-").map(Number)
    const most_recent_date = new Date(year, month - 1, day)
    const today = new Date()

    const differenceInMs = today - most_recent_date
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24))

    let lastPlayedText
    if (differenceInDays === 0) {
        lastPlayedText = "today"
    } else if (differenceInDays === 1) {
        lastPlayedText = "yesterday"
    } else {
        lastPlayedText = `${differenceInDays} days ago`
    }

    return (
        <VStack position={"sticky"} top={"5rem"} alignSelf={"start"} p={4}>
            <Box>
                <HStack>
                    <Image bg="transparent" height="50px" src="epic-games-logo.svg"></Image>
                    <Heading size={"4xl"}>BrickBoned</Heading>
                </HStack>
                <Text color={"gray.500"}>Last played {lastPlayedText}</Text>
            </Box>
            <Box>
                <Text>Current 1v1 rank:</Text>
            </Box>
        </VStack>
    )
}

export default CurrentStats