import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ListingService } from "../../services/listing.service";
import { AuthService } from "../../services/auth.service";
import * as firebase from "firebase";
import { Listing } from "../../models/Listing";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-listing",
  templateUrl: "./listing.component.html",
  styleUrls: ["./listing.component.css"]
})
export class ListingComponent implements OnInit {
  id: string;
  listing: Listing;
  imageUrl: any;
  isLoggedIn: boolean;

  constructor(
    public authService: AuthService,
    public listingService: ListingService,
    public route: ActivatedRoute,
    public router: Router,
    public flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    // Check for user login
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    // get id
    this.id = this.route.snapshot.params["id"];

    // get listing
    this.listingService
      .getListing(this.id)
      .valueChanges()
      .subscribe(listing => {
        this.listing = listing;
        // console.log(this.listing);

        // Get image
        let storageRef = firebase.storage().ref();
        let spaceRef = storageRef.child(listing.path);

        storageRef
          .child(listing.path)
          .getDownloadURL()
          .then(url => {
            // set image url
            this.imageUrl = url;
            // console.log(this.imageUrl);
          })
          .catch(error => {
            // console.log(error);
          });
      });
  }

  onDelete() {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.listingService.deleteListing(this.id);
      this.flashMessagesService.show("Employee Deleted", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["listings"]);
    }
  }
}
