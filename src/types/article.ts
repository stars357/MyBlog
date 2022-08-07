import { Tag } from './tag'

export interface Article{
    id: number,
    title: string,
    text?: string,
    tags: Array<Tag>
}
