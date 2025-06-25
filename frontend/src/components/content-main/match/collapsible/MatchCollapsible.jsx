import { Box, Collapsible, Flex, Icon } from "@chakra-ui/react"
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
                <Icon>{icon}</Icon>
            </Collapsible.Trigger>
            <Collapsible.Content>
                <Flex py={4} w={"full"} justifyContent={"center"}>    
                    <Scoreboard matchStats={matchStats} />
                </Flex>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}

export default MatchCollapsible