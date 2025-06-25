import { Box, Button, HStack } from "@chakra-ui/react";

function DateSelector({ dates, selectedDate, setSelectedDate, formatDate }) {

    return (
        <HStack p={4}>
            {dates.map((date, index) => (
                <Button size={"sm"} color={"white"} variant={"plain"} 
                onClick={() => setSelectedDate(date)} key={index}>
                    {formatDate(date)}
                </Button>
            ))}
            <Button size={"sm"} color={"blue.200"} variant={"plain"}>View more</Button>
            
        </HStack>
    )
}

export default DateSelector