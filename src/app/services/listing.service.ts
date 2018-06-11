import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "angularfire2/database";
import * as firebase from "firebase";
import { Observable } from "rxjs";
import { Listing } from "../models/Listing";

@Injectable({
  providedIn: "root"
})
export class ListingService {
  listings: AngularFireList<any>;
  listing: AngularFireObject<any>;
  folder: any;

  constructor(public af: AngularFireDatabase) {
    this.listings = this.af.list("/listings") as AngularFireList<Listing[]>;
    this.folder = "listingImages";
  }

  // get property listings
  getListings() {
    return this.listings;
  }

  // get property listing
  getListing(id: string) {
    this.listing = this.af.object("/listings/" + id) as AngularFireObject<
      Listing
    >;
    return this.listing;
  }

  // add property listing
  newListing(listing: Listing) {
    // creaet root ref
    let storageRef = firebase.storage().ref();
    for (let selectedFile of [
      (<HTMLInputElement>document.getElementById("image")).files[0]
    ]) {
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then(snapshot => {
        listing.image = selectedFile.name;
        listing.path = path;

        // push to database
        this.listings.push(listing);
      });
    }
  }

  //update property listing
  updateListing(id: string, listing: Listing) {
    return this.listings.update(id, listing);
  }

  // delete propert listing
  deleteListing(id: string) {
    return this.listings.remove(id);
  }
}
