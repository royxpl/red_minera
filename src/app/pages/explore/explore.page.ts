import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  /** Variables globales **/
  articles: unknown;
  users: unknown;
  feeds:any[] = [];   //feeds: unknown;
  stories:any[] = []; //stories: unknown;
  follow:any[] = [];  //follow: unknown;
  events:any[] = [];  //events: unknown;

  /** Otros **/
  storiesConfig = {
    initialSlide: 0,
    spaceBetween: 10,
    slidesPerView: 2.8,
  };

  usersConfig = {
    initialSlide: 0,
    spaceBetween: 2,
    slidesPerView: 5,
  };

  followConfig = {
    initialSlide: 0,
    spaceBetween: 10,
    slidesPerView: 2.6,
  };

  /** Constructor **/
  constructor(private router: Router, private dataService: DataService) {}


  ngOnInit() {

    /*===================================
    MOSTRAR ARTICULOS
    ====================================*/
    this.articles = this.dataService.getArticles();


    /*===================================
    MOSTRAR GETSEEFIRHISTORIE
    ====================================*/
    this.users = this.dataService.getSeenFirtsHistories();


    /*===================================
    MOSOTRAR FEED
    ====================================*/
    this.dataService.getFeed()
        .subscribe(resp=>{
          let i;
          for (i in resp){
              this.feeds.push(resp[i]);
          }
        })
    //this.feeds = this.dataService.getFeed();


    /*===================================
    MOSTRAR FOLLOW
    ====================================*/
    this.dataService.getFollow()
    .subscribe(resp=>{
      let i;
      for (i in resp){
          this.follow.push(resp[i]);
      }
    })
    //this.follow = this.dataService.getFollow();



    /*===================================
    MOSTRAR EVENTOS
    ====================================*/
   this.dataService.getEvents()
      .subscribe(resp=>{
        let i;
        for(i in resp){
          this.events.push(resp[i]);
        }
      });
   // this.events = this.dataService.getEvents();


    /*===================================
    MOSTRAR STORIES
    ====================================*/
    this.dataService.getStories()
        .subscribe(resp=>{
          let i;
          for(i in resp){
            this.stories.push(resp[i]);
          }
        })
    //this.stories = this.dataService.getStories();

  }




    /*===================================

    ====================================*/

  viewStory(index) {
    this.router.navigate(['story', index]);
  }

  navigateToDetail() {
    this.router.navigate(['post-detail']);
  }

  goToNotifications() {
    this.router.navigate(['notifications']);
  }

  eventDetail(item) {
    let navigationExtras: NavigationExtras = {
      state: {
        event: item,
      },
    };
    this.router.navigate(['event-detail'], navigationExtras);
  }
}
