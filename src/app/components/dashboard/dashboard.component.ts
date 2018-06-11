import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { Listing } from "../../models/Listing";
import { ListingService } from "../../services/listing.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  listings: any[];

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public listingService: ListingService
  ) {}

  ngOnInit() {
    // get listings
    this.listingService
      .getListings()
      .snapshotChanges()
      .subscribe(listings => {
        this.listings = [];
        listings.forEach(listing => {
          let listingItem = listing.payload.toJSON();
          listingItem["$key"] = listing.key;
          this.listings.push(listingItem as Listing);
        });
        // console.log(this.listings);
      });
  }

  // onDelete() {
  //   if (confirm("Are you sure you want to delete this employee?")) {
  //     this.listingService.deleteListing(this.id);
  //     this.flashMessagesService.show("Employee Deleted", {
  //       cssClass: "alert-success",
  //       timeout: 4000
  //     });
  //     this.router.navigate(["/listings"]);
  //   }
  // }
}
