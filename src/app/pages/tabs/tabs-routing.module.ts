import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'explore',
        loadChildren: () => import('../explore/explore.module').then( m => m.ExplorePageModule)
        //,canActivate: [ AuthGuard ]
      },
      {
        path: 'messages',
        loadChildren: () => import('../messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../events/events.module').then( m => m.EventsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule),
        //canActivate: [ AuthGuard ]
      },
      {
        path: '',
        redirectTo: '/welcome',//'/tabs/explore',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
