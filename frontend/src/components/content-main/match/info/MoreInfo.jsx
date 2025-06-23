import { Box, Collapsible, Icon } from "@chakra-ui/react"
import { useState } from "react"
import { SlArrowRight, SlArrowDown } from "react-icons/sl"

function MoreInfo({ matchStats }) {
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
        <Collapsible.Root open={isOpen} onClick={()=>{setIsOpen(!isOpen)}}>
            <Collapsible.Trigger>
                <Icon>{icon}</Icon>
            </Collapsible.Trigger>
            <Collapsible.Content>
                <Box>clips / scoreboard here</Box>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}

export default MoreInfo