import {PropsWithChildren} from "react";
import {DragOverlay} from "@dnd-kit/core";

interface Props {

}

export default function SortableOverlay({children}: PropsWithChildren<Props>) {
    return <DragOverlay>{children}</DragOverlay>
}