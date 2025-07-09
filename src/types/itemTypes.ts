export type Item = {
    _id: string;
    title: string;
    color: string;
    size: string;
    description: string;
    photo: string;
    date: Date;
    found: boolean;
    __v: number;
}

export type WebCamPhotoProps = {
    photo: string;
    setPhoto: React.Dispatch<React.SetStateAction<string>>;
}