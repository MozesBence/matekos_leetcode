export type CommunityData = {
    id: number;
    title: string;
    content: string;
    files: Array<File>;
}

export type CommunityEditData = {
    id: number;
    title: string;
    content: string;
    files: Array<File>;
    none_files: number[] | null;
};