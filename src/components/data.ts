export type Item = {
    id: number,
    tag: string,
    content: string
}

export const datas: Item[] = [...Array(10)].map((_, idx) => ({
    id: idx+1,
    tag: `tag-${idx+1}`,
    content: `content-${idx+1}`
}))