export type CommunityData = {
    id: number;
    title: string;
    content: string;
    files: Array<File>;
    chips: Array<number> | null;
}

export type CommunityEditData = {
    id: number;
    title: string;
    content: string;
    files: Array<File>;
    none_files: number[] | null;
    chips: Array<number> | null;
};