import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react"

function CurrentStats({ dates }) {

    const most_recent_date = new Date(dates[0])
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
        <Box position={"sticky"} top={"5rem"} alignSelf={"start"} p={4}>
            <HStack>
                <Image bg="transparent" height="50px" src="epic-games-logo.svg"></Image>
                <Heading size={"4xl"}>BrickBoned</Heading>
            </HStack>
            <Text color={"gray.500"}>Last played {lastPlayedText}</Text>
        </Box>
    )
}

export default CurrentStats