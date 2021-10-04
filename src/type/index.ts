export interface DataType {
    id: number,
    title: string,
    description: string,
    type: string,
    image: string,
    rating: string,
    genre: string,
    year: number,
    language: string
}

export interface StateType extends DataType {
    order: number
}