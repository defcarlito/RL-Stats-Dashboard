import { Button, HStack } from "@chakra-ui/react";

function DateSelector({ dates, selectedDate, setSelectedDate, formatDate }) {

    const recent_three_dates = dates.slice(0, 3)



    return (
        <HStack p={4}>
            {recent_three_dates.map((date, index) => (
                    <Button size={"sm"} variant={"plain"} key={index} 
                    onClick={() => setSelectedDate(date)} fontSize={"lg"}
                    color={selectedDate === date ? "white" : "gray.700"}
                    _hover={{ color: selectedDate !== date && "gray.500" }}>
                        {formatDate(date)}
                    </Button>
            ))}
            <Button size={"sm"} color={"blue.200"} variant={"plain"}
            _hover={{ color: "blue.500" }}>View more</Button>
        </HStack>
    )
}

export default DateSelector