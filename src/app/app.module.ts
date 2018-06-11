import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FlashMessagesModule } from "angular2-flash-messages";

// SERVICE
import { ListingService } from "./services/listing.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";

// ANGULAR FIRE
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAwCjs4qxqfk0rl-er65rfBS9peguZfpgA",
  authDomain: "firelist-38c92.firebaseapp.com",
  databaseURL: "https://firelist-38c92.firebaseio.com",
  projectId: "firelist-38c92",
  storageBucket: "firelist-38c92.appspot.com",
  messagingSenderId: "284480281061"
};

// COMPONENTS
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ListingsComponent } from "./components/listings/listings.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListingComponent } from "./components/listing/listing.component";
import { AddListingComponent } from "./components/add-listing/add-listing.component";
import { EditListingComponent } from "./components/edit-listing/edit-listing.component";
import { LoginComponent } from "./components/login/login.component";

// ROUTES
const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "listings", component: ListingsComponent },
  { path: "listing/:id", component: ListingComponent },
  {
    path: "add-listing",
    component: AddListingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit-listing/:id",
    component: EditListingComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ListingService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
