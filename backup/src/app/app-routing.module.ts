import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardV1Component} from "./demo/custom-pages/dashboard-v1/dashboard-v1.component";
import {AdminComponent} from "./core/admin/admin.component";
import {ButtonsComponent} from "./demo/components/buttons/buttons.component";
import {CardsComponent} from "./demo/components/cards/cards.component";
import {DialogsComponent} from "./demo/components/dialogs/dialogs.component";
import {GridListComponent} from "./demo/components/grid-list/grid-list.component";
import {ListsComponent} from "./demo/components/lists/lists.component";
import {MenuComponent} from "./demo/components/menu/menu.component";
import {SliderComponent} from "./demo/components/slider/slider.component";
import {SnackBarComponent} from "./demo/components/snack-bar/snack-bar.component";
import {TooltipComponent} from "./demo/components/tooltip/tooltip.component";
import {FormElementsComponent} from "./demo/forms/form-elements/form-elements.component";
import {FormWizardComponent} from "./demo/forms/form-wizard/form-wizard.component";

// import {AddVisitComponent} from "./demo/visit/add_visit/icons.component";
import {Level5Component} from "./demo/levels/level5/level5.component";
import {GoogleMapsComponent} from "./demo/maps/google-maps/google-maps.component";
import {SimpleTableComponent} from "./demo/tables/simple-table/simple-table.component";
import {FixedHeaderTableComponent} from "./demo/tables/fixed-header-table/fixed-header-table.component";
import {LoginComponent} from "./demo/custom-pages/login/login.component";
import {RegisterComponent} from "./demo/custom-pages/register/register.component";
import {ForgotPasswordComponent} from "./demo/custom-pages/forgot-password/forgot-password.component";
import {EditorComponent} from "./demo/leads/add_leads/add_leads.component";
import {LeadsComponent} from "./demo/leads/leads.component";
import {QueriesComponent} from "./demo/queries/queries";
import {ProfileComponent} from "./demo/profile/profile";
import {DashboardComponent} from "./demo/dashboard/dashboard.component";
// import {visitsComponent} from "./demo/visit/drag-and-drop.component";
import {InboxComponent} from "./demo/apps/inbox/inbox.component";
import {CalendarComponent} from "./demo/apps/calendar/calendar.component";
import {ChatComponent} from "./demo/apps/chat/chat.component";
import {AutocompleteComponent} from "./demo/components/autocomplete/autocomplete.component";
// import {QueryComponent} from "./demo/queries/query.component";
// import {QueryDetails} from "./demo/queries/query.detail.component";
// import {VisitComponent} from "./demo/visits/visit.component";
// import {VisitDetails} from "./demo/visits/visit.detail.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
       // pathMatch: 'full'
      },
      {
        path: 'queries',
        component: QueriesComponent
       // pathMatch: 'full'
      },
      // {
      //     path: 'question-details/:id',
      //     component: QueryDetails
      //     //pathMatch: 'full'
      // },
      // {
      //   path:'visits',
      //   component:VisitComponent
      // },
      //  {
      //     path: 'visit-details',
      //     component: VisitDetails
      //     //pathMatch: 'full'
      // },
      {
        path: 'apps/inbox',
        component: InboxComponent
      },
      {
        path: 'apps/calendar',
        component: CalendarComponent
      },
      {
        path: 'apps/chat',
        component: ChatComponent
      },
      {
        path: 'dashboard-v1',
        component: DashboardV1Component,
      },
      {
        path: 'components/autocomplete',
        component: AutocompleteComponent
      },
      {
        path: 'components/buttons',
        component: ButtonsComponent
      },
      {
        path: 'components/cards',
        component: CardsComponent
      },
      {
        path: 'components/dialogs',
        component: DialogsComponent
      },
      {
        path: 'components/grid-list',
        component: GridListComponent
      },
      {
        path: 'components/lists',
        component: ListsComponent
      },
      {
        path: 'components/menu',
        component: MenuComponent
      },
      {
        path: 'components/slider',
        component: SliderComponent
      },
      {
        path: 'components/snack-bar',
        component: SnackBarComponent
      },
      {
        path: 'components/tooltips',
        component: TooltipComponent
      },
      {
        path: 'forms/form-elements',
        component: FormElementsComponent
      },
      {
        path: 'forms/form-wizard',
        component: FormWizardComponent
      },
      // {
      //   path: 'add_visit',
      //   component: AddVisitComponent
      // },
      {
        path: 'level1/level2/level3/level4/level5',
        component: Level5Component
      },
      {
        path: 'maps/google-maps',
        component: GoogleMapsComponent
      },
      {
        path: 'tables/simple-table',
        component: SimpleTableComponent
      },
      {
        path: 'tables/fixed-header-table',
        component: FixedHeaderTableComponent
      },
      // {
      //   path: 'visits',
      //   component: visitsComponent
      // },
      {
        path: 'editor',
        component: EditorComponent
      },
      {
        path: 'leads',
        component: LeadsComponent
      },
      {
        path: 'queries',
        component: QueriesComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
