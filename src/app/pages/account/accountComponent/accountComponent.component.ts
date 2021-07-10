import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-accountComponent',
  templateUrl: './accountComponent.component.html',
  styleUrls: ['./accountComponent.component.scss']
})
export class AccountComponentComponent implements OnInit {

  constructor(private apiservice :ApiService) { }

  ngOnInit() {
    this.apiservice.authActivate()
    
  }

}
