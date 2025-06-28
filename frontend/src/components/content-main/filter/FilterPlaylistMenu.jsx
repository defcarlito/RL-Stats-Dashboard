import { Menu, Button, Portal } from "@chakra-ui/react"
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdKeyboardArrowRight } from "react-icons/md";

function FilterPlaylistMenu({ setSelectedPlaylist }){

    const [formatPlaylist, setFormatPlaylist] = useState("Ranked 1v1")

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button variant={"plain"} size={"sm"} fontSize={"sm"} color={"white"}>
                    <GiHamburgerMenu />Filter <MdKeyboardArrowRight /> <u>{formatPlaylist}</u>
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item onClick={() => {
                            setSelectedPlaylist(10)
                            setFormatPlaylist("Ranked 1v1")
                        }}>Ranked 1v1</Menu.Item>
                        <Menu.Item onClick={() => {
                            setSelectedPlaylist(11)
                            setFormatPlaylist("Ranked 2v2")
                        }}>Ranked 2v2</Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

export default FilterPlaylistMenu