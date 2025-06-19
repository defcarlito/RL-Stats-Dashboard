import { Box, Collapsible, Icon } from "@chakra-ui/react"
import { useState } from "react"
import { SlArrowRight, SlArrowDown } from "react-icons/sl"

function MoreInfo() {
    const [isOpen, setIsOpen] = useState(false)
    const icon = isOpen ? <SlArrowDown/> : <SlArrowRight/>

    return (
        <Collapsible.Root open={isOpen} onClick={()=>{setIsOpen(!isOpen)}}>
            <Collapsible.Trigger>
                <Icon>{icon}</Icon>
            </Collapsible.Trigger>
            <Collapsible.Content>
                <Box>imagine these are clips</Box>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}

export default MoreInfo