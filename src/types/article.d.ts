import './tag.d.ts'

interface Article{
    id: number,
    title: string,
    text?: string,
    tags: Tag[]
}

export default { Article }