import { Menu, Portal, HStack } from "@chakra-ui/react"
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

function FilterPlaylistMenu({ setSelectedPlaylist }){

    const [formatPlaylist, setFormatPlaylist] = useState("Ranked 1v1")

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <HStack variant={"plain"} fontSize={"2xl"}>
                    Playlist<MdKeyboardArrowRight /> {formatPlaylist}
                </HStack>
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