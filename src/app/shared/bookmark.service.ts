import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks: Bookmark[] = [
    new Bookmark('Google','http://www.google.com'),
    new Bookmark('YouTube','http://www.youtube.com'),
    new Bookmark('Wikipedia','http://www.wikipedia.com'),
    new Bookmark('Facebook','http://www.facebook.com')
  ]

  constructor() { }

  getBookMarks(){
    return this.bookmarks;
  }

  getBookMark(id: string){
      return this.bookmarks.find(b=> b.id === id)
  }

  addBookMark(bookmark: Bookmark){
    this.bookmarks.push(bookmark)
  }

  updateBookMark(id: string, updatedFields: Partial<Bookmark>){
    const bookmark = this.getBookMark(id)
    Object.assign(bookmark, updatedFields) 
  }

  deleteBookMark(id: string){
    const bookmarkIndex = this.bookmarks.findIndex(b=> b.id === id)
    if(bookmarkIndex == -1) return
    this.bookmarks.splice(bookmarkIndex,1)
  }
}
