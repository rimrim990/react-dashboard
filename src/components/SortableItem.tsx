import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
import {Item} from "./data";
import './SortableItem.css'
import {CSSProperties} from "react";

interface Props {
    item: Item
}

export default function SortableItem({item}: Props) {
    const {id, tag, content} = item

    /**
     * draggable & droppable element
     * - listeners: drag 를 활성화한 장치 이벤트 리스너
     */
    const {
        attributes,
        listeners,
        setNodeRef,
        isDragging,
        transform,
        transition,
    } = useSortable({id});

    /**
     * transform - sortable element 갱신된 좌표
     * transition - CSS 모션 속도 조절, 부드럽게 갱신
     */
    console.log(`'${id}' transform: x -> ${transform?.x}, y -> ${transform?.y}`)

    const style: CSSProperties = {
        opacity: isDragging ? 0.4 : undefined,
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <td className="table-cell">
            id: {id}
        </td>
        <td className="table-cell">
            tag: {tag}
        </td>
        <td className="table-cell">
            content: {content}
        </td>
    </tr>
}