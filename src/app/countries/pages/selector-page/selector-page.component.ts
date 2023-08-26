import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CountryService } from '../../services/country.service';
import { Region, SmallCountryData } from '../../interfaces/country.interfaces';
import { Observable, Subscription, filter, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit, OnDestroy{

  myForm: FormGroup = this.fb.group({
    region : ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  });

  regionSub!: Subscription;
  countrySub!: Subscription;

  countriesByRegion: SmallCountryData[] = [];
  bordersOfCountry: SmallCountryData[] = [];

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.onSelectedRegionChange();
    this.onSelectedCountryChange();
  }
  
  ngOnDestroy(): void {
    this.regionSub.unsubscribe();
    this.countrySub.unsubscribe();
  }

  get regions(): Region[] {
    return this.countryService.regions;
  }

  onSelectedRegionChange(): void {
    this.regionSub = this.myForm.get('region')!.valueChanges
    .pipe(
      tap( () => this.myForm.get('country')!.setValue('') ),
      tap( () => this.countriesByRegion = [] ),
      switchMap( region => this.countryService.getCountriesByRegion( region ))
    )
    .subscribe(  response => {
      this.countriesByRegion = response;
    });
  }
  
  onSelectedCountryChange(): void {
    this.countrySub = this.myForm.get('country')!.valueChanges
    .pipe(
      tap( () => this.myForm.get('border')!.setValue('') ),
      tap( () => this.bordersOfCountry = [] ),
      filter( (code: string) => code.length > 0 ),
      switchMap( alphaCode => this.countryService.getCountryByAlphaCode( alphaCode )),
      switchMap( country => this.countryService.getBorderCountriesByCode(country.borders ?? []) )
    )
    .subscribe(  response => {
      console.log(response);
      this.bordersOfCountry = response;
    });
  }

  

}
