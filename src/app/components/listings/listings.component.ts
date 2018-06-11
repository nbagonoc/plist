import { Component, OnInit } from "@angular/core";
import { ListingService } from "../../services/listing.service";
import { Listing } from "../../models/Listing";

@Component({
  selector: "app-listings",
  templateUrl: "./listings.component.html",
  styleUrls: ["./listings.component.css"]
})
export class ListingsComponent implements OnInit {
  listings: any[];

  constructor(public listingService: ListingService) {}

  ngOnInit() {
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
}
