import React, {useState} from "react";
import {datas} from "./data";
import {
    closestCenter,
    DndContext,
    DragEndEvent, DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function SortableList() {
    const [items, setItems] = useState(datas);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const {active} = event
        console.log(`drag event start - '${active.id}'`)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        console.log(`drag event end - '${active.id}' to '${over?.id}'`)

        if (over?.id && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.id === +active.id);
                const newIndex = items.findIndex(item => item.id === +over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <table>
                <thead>
                <tr>
                    <th>아이디</th>
                    <th>태그</th>
                    <th>내용</th>
                </tr>
                </thead>
                <tbody>
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(item => <SortableItem key={item.id} item={item}/>)}
                </SortableContext>
                </tbody>
            </table>
        </DndContext>
    );
}