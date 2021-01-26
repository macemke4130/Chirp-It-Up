export interface Chirp {
    id?: number,
    userid?: number,
    name?: string,
    content: string,
    location?: string,
    _created?: string,
    mention?: Object
};

export interface MentionChirp {
    chirpAuthorId: number,
    chirpAuthorName: string,
    chirpid: number,
    content: string,
    location: string,
    _created: string
};

export interface MB {
    close: boolean,
    home: boolean,
    destroy?: boolean
};