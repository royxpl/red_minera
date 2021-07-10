import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
//import  mockDataJson from 'src/app/data/data.ts';
import * as data from 'src/app/data/data';
import * as Global from '../global';
@Injectable({ providedIn: 'root' })
export class DataService {
  private api:string = Global.Api.url;
  mockData = data.data;
  constructor(public http: HttpClient) {
  }
  getHistories() {
    //return this.http.get(`${this.api}/histories.json`);
    return this.mockData.histories;
  }
  getSeenFirtsHistories() {
    return this.mockData.histories.sort((story1: any, story2: any) =>
      story1.seen > story2.seen ? 1 : story1.seen == story2.seen ? 0 : -1
    );
  }
  getArticles() {
    //return this.http.get(`${this.api}/articles.json`);
    return this.mockData.articles;
  }
  getEvents() {
    return this.http.get(`${this.api}/events.json`);
  }
  getFollow() {
    return this.http.get(`${this.api}/follow.json`);
  }
  getFeed() {
    return this.http.get(`${this.api}/feeds.json`);
  }
  getStories() {
    return this.http.get(`${this.api}/stories.json`);
  }
  getGroups() {
    return this.mockData.groups;
  }
  getComments() {
    return this.mockData.comments;
  }
  getUsers() {
    return this.mockData.users;
  }
  getMessages() {
    return this.mockData.messages;
  }
  getNotifications() {
    return this.mockData.notifications;
  }
}
