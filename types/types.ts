export type User = {
    id: number;
    name: string;
    email: string;
};

export type ImageInfo = {
    description: string;
    url: string;
};

export type Album = {
    id: number;
    userId: number;
    title: string;
};
