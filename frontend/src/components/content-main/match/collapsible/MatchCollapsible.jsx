import { Box, Collapsible, Flex, Icon, IconButton } from "@chakra-ui/react"
import { useState } from "react"
import { SlArrowRight, SlArrowDown } from "react-icons/sl"
import Scoreboard from "./stats/Scoreboard"

function MatchCollapsible({ matchStats }) {
    const [isOpen, setIsOpen] = useState(false)
    const icon = isOpen ? <SlArrowDown/> : <SlArrowRight/>

    const localPlayerName = "BrickBoned"
    const getLocalPlayerGoals = () => {
        let goals = []
        matchStats.Goals.forEach(goal => {
            if (goal.ScorerName === localPlayerName) {
                goals.push(goal)
            } 
        })
        return goals
    }

    return (
        <Collapsible.Root open={isOpen} w={"full"}>
            <Collapsible.Trigger onClick={()=>{setIsOpen(!isOpen)}}>
                <IconButton size={"sm"} variant={"outline"} borderColor={"border.soft"}
                    background={"container.soft"} _hover={{ bg: "text.quieter" }}
                >
                    {icon}
                </IconButton>
            </Collapsible.Trigger>
            <Collapsible.Content>
                <Box>
                    <Flex w={"full"} alignItems={"center"} justifyContent={"center"} marginTop={4}>    
                        <Scoreboard matchPlayerInfo={matchStats.MatchPlayerInfo} />
                    </Flex>
                </Box>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}

export default MatchCollapsible
        