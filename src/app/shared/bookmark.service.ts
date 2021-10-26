import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnDestroy {

  bookmarks: Bookmark[] = []
  stroageListenSub: Subscription

  constructor() {

    this.loadState();

    this.stroageListenSub = fromEvent(window, 'storage')
    .subscribe((event: StorageEvent)=>{
        if(event.key==='bookmarks')
        this.loadState();
      })
   }
  ngOnDestroy(): void {
    if(this.stroageListenSub) return this.stroageListenSub.unsubscribe()
  }

  getBookMarks(){
    return this.bookmarks;
  }

  getBookMark(id: string){
      return this.bookmarks.find(b=> b.id === id)
  }

  addBookMark(bookmark: Bookmark){
    this.bookmarks.push(bookmark)
    this.saveState();
  }

  updateBookMark(id: string, updatedFields: Partial<Bookmark>){
    const bookmark = this.getBookMark(id)
    Object.assign(bookmark, updatedFields) 
    this.saveState();
  }

  deleteBookMark(id: string){
    const bookmarkIndex = this.bookmarks.findIndex(b=> b.id === id)
    if(bookmarkIndex == -1) return
    this.bookmarks.splice(bookmarkIndex,1)
    this.saveState();
  }

  saveState(){
    localStorage.setItem('bookmarks',JSON.stringify(this.bookmarks))
  }

  loadState(){
    try{
      const bookmarkInStorage = JSON.parse(localStorage.getItem('bookmarks'), (key,value)=>{
        if(key == 'url') return new URL(value)
        return value

      })

      this.bookmarks.length = 0 //clear the notes array( while keeping the reference)
      this.bookmarks.push(...bookmarkInStorage)
    }
    catch(e)
    {
        console.log("There was an error");
        console.log(e)
    }
    
  }
}
