import {Component, input} from '@angular/core';

@Component({
  selector: 'company-card',
  standalone: true,
  templateUrl: './company-card.html',
  styleUrl: './company-card.scss'
})
export class CompanyCard {

  companyName = input<string>();
  industry = input<string>();
  employeeCount = input<number>();
}
