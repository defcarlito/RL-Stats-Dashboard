import { Box, VStack, HStack, Heading } from "@chakra-ui/react";
import DayRankChart from "./charts/DayRankChart";

function ContentRight ({ allMatchesOnDate }) {
    return (
        <VStack position={"sticky"} top={"40%"} alignSelf={"start"} px={8}>
            <Box background={"container.base"} borderRadius={"lg"} boxShadow={"0 0 10px rgba(0, 0, 0, 0.2)"}>
                <HStack w={"full"} bg={"container.soft"} justifyContent={"center"} borderTopRadius={"lg"}
                    direction={"row"} px={4} py={2}
                >
                    <Heading size={"lg"} color={"text.quiet"}>MMR Change</Heading>
                </HStack>
                <DayRankChart allMatchesOnDate={allMatchesOnDate} /> 
            </Box>
        </VStack>
    )
}

export default ContentRight