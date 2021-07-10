import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
//import  mockDataJson from 'src/app/data/data.ts';
import * as data from 'src/app/data/data';
import * as Global from '../global';

@Injectable({ providedIn: 'root' })
export class DataService {

  /*===================================
  VARIABLES GLOBALES
  ====================================*/
  private api:string = Global.Api.url;

  mockData = data.data;

  constructor(public http: HttpClient) {

  }
  /*===================================
  HISTORIES GET
  ====================================*/
  getHistories() {

    //return this.http.get(`${this.api}/histories.json`);
    return this.mockData.histories;

  }


  /*==================================
  SEENFIRTSHISTORIES GET
  ====================================*/
  getSeenFirtsHistories() {
    return this.mockData.histories.sort((story1: any, story2: any) =>
      story1.seen > story2.seen ? 1 : story1.seen == story2.seen ? 0 : -1
    );
  }

  /*===================================
  ARTICULO GET
  ====================================*/
  getArticles() {
    //return this.http.get(`${this.api}/articles.json`);
    return this.mockData.articles;
  }

  /*===================================
  EVENTOS GET
  ====================================*/
  getEvents() {
    return this.http.get(`${this.api}/events.json`);
    //return this.mockData.events;
  }



  /*===================================
  FOLLOW GET
  ====================================*/
  getFollow() {
    return this.http.get(`${this.api}/follow.json`);
    //return this.mockData.follow;
  }

  /*===================================
  FEEDS GET
  ====================================*/
  getFeed() {
    return this.http.get(`${this.api}/feeds.json`);
    //return this.mockData.feeds;
  }

  /*===================================
  STORIES GET
  ====================================*/
  getStories() {
    return this.http.get(`${this.api}/stories.json`);
    //return this.mockData.stories;
  }

  /*===================================
  GROUPS GET
  ====================================*/
  getGroups() {
    return this.mockData.groups;
  }

  /*===================================
  COMMENTS GET
  ====================================*/
  getComments() {
    return this.mockData.comments;
  }

  /*===================================
  USERS GET
  ====================================*/
  getUsers() {
    return this.mockData.users;
  }

  /*===================================
  MESSAGES GET
  ====================================*/
  getMessages() {
    return this.mockData.messages;
  }

  /*===================================
  NOTIFICATIONS GET
  ====================================*/
  getNotifications() {

    return this.mockData.notifications;
  }
}
