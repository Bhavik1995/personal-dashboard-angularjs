import { animate, query, style, transition, trigger, group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Event, RouterOutlet } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    trigger('routeAnim',[
        transition(':increment',[

          style({
            position: 'relative',
            overflow: 'hidden'
          }),

          query(':enter, :leave',[
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                // display: 'block'
            })
          ],{optional: true}),

          // query(':enter',[
          //     style({
          //       opacity: 0,
          //       // height: '100%'
          //     })
          // ],{optional: true}),


          group([
            query(':leave',[
              animate('200ms ease-in',style({
                opacity: 0,
                transform: 'translateX(-50px)'
              }))
  
            ],{optional:true}),
  
            query(':enter',[
              style({
                transform: 'translateX(50px)',
                opacity: 0,
              }),
              animate('250ms 120ms ease-out', style({
                opacity: 1,
                transform: 'translateX(0)'
              }))
            ],{optional: true})

          ]),
          
        ]),

        transition(':decrement',[

          style({
            position: 'relative',
            overflow: 'hidden'
          }),
    
          query(':enter, :leave',[
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                // display: 'block'
            })
          ],{optional: true}),
    
          // query(':enter',[
          //     style({
          //       opacity: 0,
          //       // height: '100%'
          //     })
          // ],{optional: true}),
    
    
          group([
            query(':leave',[
              animate('200ms ease-in',style({
                opacity: 0,
                transform: 'translateX(50px)'
              }))
    
            ],{optional:true}),
    
            query(':enter',[
              style({
                transform: 'translateX(-50px)',
                opacity: 0,
              }),
              animate('250ms 120ms ease-out', style({
                opacity: 1,
                transform: 'translateX(0)'
              }))
            ],{optional: true})
    
          ]),
          
        ]),

        transition('* => secondary',[
          style({
            position: 'relative',
            // overflow: 'hidden'
          }),
    
          query(':enter, :leave',[
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                // display: 'block'
            })
          ],{optional: true}),
    
    
    
          group([
            query(':leave',[
              animate('200ms ease-in',style({
                opacity: 0,
                transform: 'scale(0.8)'
              }))
    
            ],{optional:true}),
    
            query(':enter',[
              style({
                transform: 'scale(1.2)',
                opacity: 0,
              }),
              animate('250ms 120ms ease-out', style({
                opacity: 1,
                transform: 'scale(1)'
              }))
            ],{optional: true})
    
          ]),
        ]),

        transition('secondary => *',[
          style({
            position: 'relative',
            // overflow: 'hidden'
          }),
    
          query(':enter, :leave',[
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                // display: 'block'
            })
          ],{optional: true}),
    
    
    
          group([
            query(':leave',[
              animate('200ms ease-in',style({
                opacity: 0,
                transform: 'scale(1.25)'
              }))
    
            ],{optional:true}),
    
            query(':enter',[
              style({
                transform: 'scale(0.8)',
                opacity: 0,
              }),
              animate('250ms 120ms ease-out', style({
                opacity: 1,
                transform: 'scale(1)'
              }))
            ],{optional: true})
    
          ]),
        ])
    ]),

    trigger('bgAnim',[
      transition(':leave',[
        animate(1000, style({
          opacity: 0
        }))
      ])
    ]),

    trigger('fadeAnim',[
      transition(':enter',[
        style({
          opacity: 0
        }),
        animate(250,style({
          opacity: 1
        }))
      ]),
      transition(':leave',[
        animate(250, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  backgrounds: string[] = [
    'https://images.unsplash.com/photo-1633836331520-e35c668f1f9d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzNDcxMTM3NQ&ixlib=rb-1.2.1&q=80&w=1920'
]

  loadingBGImage: boolean

  dateTime: Observable<Date>

  ngOnInit(){
     this.dateTime = timer(0,1000).pipe(
          map(()=>{
            return new Date()
          })
      )
  }

  prepareRoute(outlet: RouterOutlet){
    if(outlet.isActivated){
    const tab =  outlet.activatedRouteData['tab']

    if(!tab) return 'secondary'
        return tab
    }

  }

 // async changeBgImg(){
 //   this.loadingBGImage = true
 //   const result= await fetch('https://source.unsplash.com/featured/1920x1080',{
 //      method:'HEAD'
 //    })

 //   const alreadyGot = this.backgrounds.includes(result.url)
 //   if(alreadyGot){
 //     //this is the same image as we currently have, so re run the function 
 //     return this.changeBgImg();

 //   }

 //    this.backgrounds.push(result.url)
 //  }

  async changeBgImg() {
      this.loadingBGImage = true
      const API_KEY = '563492ad6f91700001000001958daa7b44c34aeb9da0643786e08151';
      const query = 'nature';
      const perPage = 15;
      const randomPage = Math.floor(Math.random() * 50) + 1; // Pages 1–50
    
      const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${randomPage}`, {
        headers: {
          Authorization: API_KEY,
        }
      });
    
      const data = await response.json();

    if (!data.photos || !data.photos.length) {
      console.warn("No images received from Pexels");
      this.loadingBGImage = false;
      return;
    }

    const randomIndex = Math.floor(Math.random() * data.photos.length);
    const imageUrl = data.photos[randomIndex].src.landscape; // Or use original/large2x

    const alreadyGot = this.backgrounds.includes(imageUrl);
    if (alreadyGot) {
      // Already used this image, try again
      return this.changeBgImg();
    }

    this.backgrounds.push(imageUrl);

    // Example: set background (optional)
    document.body.style.backgroundImage = `url(${imageUrl})`;

  } catch (err) {
    console.error("Failed to fetch from Pexels", err);
  } finally {
    this.loadingBGImage = false;
  }
}


  onBGImageLoad(imgEvent: { target: HTMLImageElement }) {
    // BG image has loaded, now remove the old BG image from the backgrounds array
    const imgElement = imgEvent.target as HTMLImageElement
    const src = imgElement.src
    this.backgrounds = this.backgrounds.filter(b => b === src)

    this.loadingBGImage = false
  }

}
