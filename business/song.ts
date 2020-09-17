// Business interface that can be called on by the UI and that in turn calls on the Firebase songs
// database, thus keeping the UI and songs data separated

import { addNoteListener } from "./note";

// units of song
export interface NoteTime {
    note: number;
    time: number;
}

// format in which a song is stored in database
export interface SongData {
    title: string;
    song: NoteTime[];
}

type SongCallback = (song: SongData | null) => void;

// listeners that are called when the 'songs' database changes, i.e. the logged in user's saved song changes
let songLoadListeners = new Set<SongCallback>();

// add a listener to the set listening for changes to the 'songs' database
export function addSongLoadListener(callback: SongCallback) {
    songLoadListeners.add(callback);
}

// If the 'songs' database is modified then anywhere in app that uses the data (i.e. play_songs
// page when it calls getSong) needs to be notified
export function notifySongLoadListeners(currentSong: SongData) {
    for (const cb of songLoadListeners) {
        cb(currentSong);
    }
}

export function recordSong(): NoteTime[] {
    const song: NoteTime[] = [];
    addNoteListener((note: number) => {
        song.push({ note, time: Date.now() });
    });
    return song;
}

export interface SongPersister {
    saveSong: (title: string, song: NoteTime[]) => Promise<void>;
    loadSong: (title: string) => Promise<NoteTime[]>;
}

// this needs to be wired to a concrete SongPersister (from the data layer)
export let songSaver: SongPersister | null = null;
