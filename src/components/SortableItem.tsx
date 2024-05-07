import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
import {Item} from "./data";
import './SortableItem.css'

interface Props {
    item: Item
}

export default function SortableItem({item}: Props) {
    const {id, tag, content} = item
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id});

    const style = {
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