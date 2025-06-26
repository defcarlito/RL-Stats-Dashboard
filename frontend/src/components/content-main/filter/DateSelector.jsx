import { Box, Button, HStack } from "@chakra-ui/react";

function DateSelector({ dates, selectedDate, setSelectedDate, formatDate }) {


    return (
        <HStack p={4}>
            {dates.map((date, index) => (
                    <Button size={"sm"} variant={"plain"} key={index} 
                    onClick={() => setSelectedDate(date)}
                    color={selectedDate === date ? "white" : "gray.700"}
                    _hover={{ color: selectedDate !== date && "gray.500" }}>
                        {formatDate(date)}
                    </Button>
            ))}
            <Button size={"sm"} color={"blue.200"} variant={"plain"}>View more</Button>
            
        </HStack>
    )
}

export default DateSelector