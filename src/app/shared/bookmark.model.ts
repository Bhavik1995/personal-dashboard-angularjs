import {v4 as uuidV4} from 'uuid'; 

export class Bookmark{
    id: string;
    name: string;
    url: URL;

    constructor(name: string, url: string){

        this.id = uuidV4();
        this.name  = name,
        this.url = new URL(url);

        if(!name) name = this.url.hostname
        this.name = name

    }
}