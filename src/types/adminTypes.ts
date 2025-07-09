export type Sessao = {
    _id: string
    type: string,
    userId:string,
    itemId: string,
    date:Date
    photos: [string],
    __v: number;

    itemName:string,
    itemImage:string,
    key:number,
    userName:string,
    
}