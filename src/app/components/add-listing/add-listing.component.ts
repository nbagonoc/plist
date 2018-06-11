import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { Listing } from "../../models/Listing";
import { ListingService } from "../../services/listing.service";

@Component({
  selector: "app-add-listing",
  templateUrl: "./add-listing.component.html",
  styleUrls: ["./add-listing.component.css"]
})
export class AddListingComponent implements OnInit {
  listing: Listing = {
    title: "",
    price: "",
    city: "",
    bedrooms: "",
    type: "",
    image: "",
    phone: ""
  };

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public listingService: ListingService
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Listing; valid: boolean }) {
    if (!valid) {
      // not valid
      this.flashMessagesService.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      this.router.navigate(["add-listing"]);
    } else {
      // add new property listing
      this.listingService.newListing(value);
      this.flashMessagesService.show("Property listed successfully", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["dashboard"]);
    }
  }
}
