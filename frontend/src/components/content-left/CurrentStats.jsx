import { Box, Heading, Text } from "@chakra-ui/react"

function CurrentStats() {
    return (
        <Box position={"sticky"} top={"5rem"} alignSelf={"start"} p={4}>
            <Heading>BrickBoned</Heading>
            <Text color={"gray.500"}>Last played # days ago</Text>
        </Box>
    )
}

export default CurrentStats