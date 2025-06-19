import { Flex, Heading, HStack, VStack } from "@chakra-ui/react"
import Match from "./match/Match"

function Logs() {
    return (
        <VStack w={"100%"} px={8} gap={2} py={4}>
            <Heading size={"md"}>Match Logs</Heading>
            <HStack alignSelf={"start"}>
                pretend this is a menu  
            </HStack>
            <Flex direction={"column"} w={"100%"} gap={4}>
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
                <Match />
            </Flex>
        </VStack>
    )
}

export default Logs