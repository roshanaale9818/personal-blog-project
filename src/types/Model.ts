export interface User {
    id:number,
    username:string,
    password:string,
    connect:{id:string}
}
export interface Blog {
    id: number;
    title: string;
    description: string;
    content: string;
    author?:string;
    createdAt?:  Date;
    updatedAt?:  Date;
    createdBy?:{ connect: { id: string} };
    createdById?:string;
}