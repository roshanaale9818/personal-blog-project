export interface User {
    id:number,
    username:string,
    password:string,
    connect:{id:string}
}
export interface Blog {
    id?: number | string;
    title: string;
    description: string;
    content: string;
    author?:string;
    createdAt?: string;
    updatedAt?: string;
    createdBy?:any;
    createdById?:string;
}