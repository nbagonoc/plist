import { Component, OnInit } from "@angular/core";
import { ListingService } from "../../services/listing.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Listing } from "../../models/Listing";

@Component({
  selector: "app-edit-listing",
  templateUrl: "./edit-listing.component.html",
  styleUrls: ["./edit-listing.component.css"]
})
export class EditListingComponent implements OnInit {
  id: string;
  listing: Listing = {
    title: "",
    price: "",
    city: "",
    bedrooms: "",
    type: "",
    phone: ""
  };

  constructor(
    public listingService: ListingService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];

    // get property listing
    this.listingService
      .getListing(this.id)
      .valueChanges()
      .subscribe(listing => {
        this.listing = listing;
      });
  }

  onSubmit({ value, valid }: { value: Listing; valid: boolean }) {
    if (!valid) {
      // not valid
      this.flashMessagesService.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      this.router.navigate(["edit-listing/" + this.id]);
    } else {
      // update property listing
      this.listingService.updateListing(this.id, value);
      this.flashMessagesService.show("Property listing successfully edited", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/listing/" + this.id]);
    }
  }
}
