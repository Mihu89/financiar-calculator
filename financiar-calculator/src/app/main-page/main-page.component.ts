import { Component, OnInit } from '@angular/core';
import { BudgetItem } from '../shared/models/budget-item.model';
import { UpdateEvent } from '../budget-item-list/budget-item-list.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  totalBudget= 0;
  budgetItems: BudgetItem[] = new Array<BudgetItem>();

  constructor() { }

  ngOnInit(): void {
  }

  addItem(newItem: BudgetItem){
    this.budgetItems.push(newItem);
    this.totalBudget += newItem.amount;
  }

  deleteItem(item: BudgetItem){
    let index = this.budgetItems.indexOf(item);
    if (index > -1) {
      this.budgetItems.splice(index, 1);
      this.totalBudget -= item.amount;
    }
  }

  updateItem(updateEvent: UpdateEvent){
    let oldItemIndex = this.budgetItems.indexOf(updateEvent.old);
    this.budgetItems[oldItemIndex] = updateEvent.new;
    // this.budgetItems[this.budgetItems.indexOf(updateEvent.old)] = updateEvent.new;

    this.totalBudget -= updateEvent.old.amount;
    this.totalBudget += updateEvent.new.amount;
  }

  showColor(){
    if(this.totalBudget > 0) return 'green';
    return 'red';
  }
}
