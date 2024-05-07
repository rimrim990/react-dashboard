import React, {useState} from "react";
import {datas} from "./data";
import {closestCenter, DndContext, DragEndEvent, DragStartEvent} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function SortableList() {
    const [items, setItems] = useState(datas);

    /**
     * sensor - 다양한 장치로부터 drag 이벤트 활성화, 기본 값 - Pointer, Keyboard
     * 1) drag start
     * 2) drag move
     * 3) drag end / drag cancel
     */

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
        /**
         * DndContext
         * - collisionDetection: draggable 과 droppable 의 충돌을 결정하는 알고리름
         * 1) closestCenter - 중심이 가장 가까운 droppable 컨테이너
         * 2) Rectangle Intersection - bounding box 가 겹쳐지는 컨테이너
         */
        <DndContext
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

                {
                    /**
                     * useSortable 훅에서 사용할 context 제공
                     * - transform 계산을 위한 여러 가지 전략을 전달받음
                     */
                }
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