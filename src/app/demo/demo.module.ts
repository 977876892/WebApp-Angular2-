import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardV1Component } from './custom-pages/dashboard-v1/dashboard-v1.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { FormElementsComponent } from './forms/form-elements/form-elements.component';
import { ListsComponent } from './components/lists/lists.component';
import { WidgetComponent } from '../core/widgets/widgets-v1/widget-v1/widget-v1.component';
import { LineChartWidgetComponent } from '../core/widgets/widgets-v1/line-chart-widget/line-chart-widget.component';
import { SourceOverviewWidgetComponent } from '../core/widgets/widgets-v1/source-overview-widget/source-overview-widget.component';
import { SimpleTableComponent } from './tables/simple-table/simple-table.component';
import { FixedHeaderTableComponent } from './tables/fixed-header-table/fixed-header-table.component';
import { FormWizardComponent } from './forms/form-wizard/form-wizard.component';
import { GoogleMapsComponent } from './maps/google-maps/google-maps.component';
import { CardsComponent } from './components/cards/cards.component';
import { nvD3 } from '../core/charts/nvD3/nvD3.component';
import { DemoDialog, DialogsComponent } from './components/dialogs/dialogs.component';
import { IconsComponent } from './icons/icons.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { Level5Component } from './levels/level5/level5.component';
import { LoginComponent } from './custom-pages/login/login.component';
import { RegisterComponent } from './custom-pages/register/register.component';
import { ForgotPasswordComponent } from './custom-pages/forgot-password/forgot-password.component';
import { AddLeadComponent } from './leads/add_leads/add_leads.component';
import { LeadsComponent } from './leads/leads.component';
import { DialogOverviewExampleDialog} from './leads/leads.component';
import { ProfileComponent,ProfileDialogOverviewExampleDialog } from './profile/profile';
import { DashboardComponent,BlogViewDialog } from './dashboard/dashboard.component';
import { QueryComponent } from "./queries/query.component";
import { QueryDetails} from "./queries/query.detail.component";
import { VisitComponent,VisitDialogOverviewExampleDialog} from "./visits/visit.component";
import { VisitDetails} from "./visits/visit.detail.component";
import { BarChartComponent } from '../core/widgets/bar-chart/bar-chart.component';
import { LineChartComponent } from '../core/widgets/line-chart/line-chart.component';
import { RecentSalesComponent } from '../core/widgets/recent-sales/recent-sales.component';
import { PieChartComponent } from '../core/widgets/pie-chart/pie-chart.component';
import { GoogleMapsWidgetComponent } from '../core/widgets/google-maps-widget/google-maps-widget.component';
import { ActivityComponent } from '../core/widgets/activity/activity.component';
import { QueryActivityComponent } from '../core/widgets/queries/activity.component';
import { QueryDetailActivityComponent } from '../core/widgets/queries/detail.component';
import { TrafficSourcesComponent } from '../core/widgets/traffic-sources/traffic-sources.component';
import { LoadingOverlayComponent } from '../core/loading-overlay/loading-overlay.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { InboxComponent } from './apps/inbox/inbox.component';
import { InboxComposeComponent } from './apps/inbox/inbox-compose/inbox-compose.component';
// import { CalendarComponent } from './apps/calendar/calendar.component';
// import { CalendarEditComponent } from './apps/calendar/calendar-edit/calendar-edit.component';
import { ChatComponent } from './apps/chat/chat.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { environment } from "../../environments/environment";
import { SortablejsModule, SortablejsOptions } from 'angular-sortablejs';
import { D3ChartService } from '../core/charts/nvD3/nvD3.service';
import { MailService } from './apps/inbox/mail.service';
import { CalendarModule } from 'angular-calendar';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from '../app-routing.module';
import { MaterialComponentsModule } from '../material-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { HighlightModule } from '../core/highlightjs/highlight.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { Pipe, PipeTransform } from '@angular/core';
import {FilterPipe} from './leads/pipe';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
//calendar
import { CalendarComponent } from '../demo/calendar/calendar.component';
import { CalendarEditComponent } from '../demo/calendar/calendar-edit/calendar-edit.component';
//calendar
//editor
import { ContentEditorComponent } from '../demo/dashboard/editor/editor.component';
//import { QuillEditorModule } from 'ng2-quill-editor';
import {ImageUploadModule} from "angular2-image-upload";
import {ModalModule} from "ng2-modal";
//editor
import {GoogleAnalyticsComponent} from './google_analytics/google_analytics';
import {ComposeMessageComponent} from './compose_message/compose_message.component';



// delete confirmationdialog box
import{ConfirmationDialog} from "../demo/dashboard/confirmation-dialog";
import{QueryConfirmationDialog} from "../demo/queries/confirmation-dialog";
import{VisitConfirmationDialog} from "../demo/visits/confirmation-dialog";
import {ComposeMsgDialog} from '../demo/compose_message/confirmation-dialog';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown'; // npm install angular2-multiselect-dropdown

@NgModule({
  imports: [
    CommonModule,AngularMultiSelectModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    TagInputModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApi
    }),
    QuillModule,
    HighlightModule,
    SortablejsModule,
    CalendarModule.forRoot(),
    PerfectScrollbarModule.forChild(),
    ImageUploadModule.forRoot(),
    ModalModule,
  ],
  entryComponents: [
    DemoDialog,
    InboxComposeComponent,
    CalendarEditComponent,DialogOverviewExampleDialog,VisitDialogOverviewExampleDialog,ProfileDialogOverviewExampleDialog,BlogViewDialog,ConfirmationDialog,QueryConfirmationDialog,VisitConfirmationDialog,ComposeMsgDialog
  ],
  declarations: [
    DashboardV1Component,ProfileComponent, GoogleAnalyticsComponent, ComposeMessageComponent,
    ButtonsComponent,
    FormElementsComponent,ConfirmationDialog,QueryConfirmationDialog, VisitConfirmationDialog,ComposeMsgDialog,
    ListsComponent,
    WidgetComponent,
    LineChartWidgetComponent,
    SourceOverviewWidgetComponent,
    SimpleTableComponent,
    FixedHeaderTableComponent,
    FormWizardComponent,
    GoogleMapsComponent,
    CardsComponent,
    nvD3,FilterPipe,
    DialogsComponent,
    DemoDialog,
    IconsComponent,
    GridListComponent,
    MenuComponent,
    SliderComponent,
    SnackBarComponent,
    TooltipComponent,
    Level5Component,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,ProfileDialogOverviewExampleDialog,
    BlogViewDialog,
    AddLeadComponent,
    LeadsComponent,DialogOverviewExampleDialog, ProfileComponent,
    DashboardComponent,
    QueryComponent,
    VisitComponent,
    VisitDialogOverviewExampleDialog,
    QueryDetails,
    VisitDetails,
    BarChartComponent,
    LineChartComponent,
    RecentSalesComponent,
    PieChartComponent,
    GoogleMapsWidgetComponent,
    ActivityComponent,
    QueryActivityComponent,
    QueryDetailActivityComponent,
    TrafficSourcesComponent,
    LoadingOverlayComponent,
    DragAndDropComponent,
    InboxComponent,
    InboxComposeComponent,
    CalendarComponent,
    CalendarEditComponent,
    ChatComponent,
    AutocompleteComponent,
    ContentEditorComponent,
   // QuillEditorModule
  ],
  providers: [
    D3ChartService,
    MailService,
  ]

})
export class DemoModule { }
