import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {

  bookmark: Bookmark

  constructor(private bookMarkService: BookmarkService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
        const idParam = paramMap.get('id')

        this.bookmark = this.bookMarkService.getBookMark(idParam);
    })
  }

  onFormSubmit(form: NgForm){

    const {name,url} = form.value;
      this.bookMarkService.updateBookMark(this.bookmark.id,{
        name,
        url: new URL(url)
      })
      // this.router.navigateByUrl('bookmarks')
  }

  delete(){
    this.bookMarkService.deleteBookMark(this.bookmark.id)
    this.router.navigate(['../'],{relativeTo: this.route})
  }

}
