import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { RouterModule } from '@angular/router';
import { UserAccountFormDialogComponent } from './components/user-account-form-dialog/user-account-form-dialog.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './store/user-list.effects';
import { appReducer } from './app.state';
import { userAccountReducer } from './store/reducers/bank-account.reducer';

@NgModule({
  declarations: [
    AppComponent,
    UserDialogComponent,
    UserDetailsComponent,
    UserAccountFormDialogComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    // Angular Material modules
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    // NgRx modules
    StoreModule.forRoot({ userAccounts: userAccountReducer  }),
    StoreModule.forFeature('appFeature', appReducer),
    EffectsModule.forRoot([UserEffects]),
    // Other modules
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
