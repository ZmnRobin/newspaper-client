export type User ={
    id: number;
    name:string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Genre ={
    id: number;
    name: string;
};
export type Articles = {
    id: number;
    title: string;
    content: string;
    thumbnail?: string;
    published_at: Date;
    author_id: string;
    createdAt: Date;
    updatedAt: Date;
    User: User;
    author: User;
    Genres: Genre[];
    totalViews: string;
}
export type Comment = {
    id: number;
    content: string;
    User: User;
    createdAt: string;
}
