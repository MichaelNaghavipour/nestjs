import { Injectable, NotFoundException } from '@nestjs/common';

import { DrinkModel } from './drink.model';

@Injectable()
export class DrinksService {
  private drinks: DrinkModel[] = [];

  insertDrinks(title: string, itemNo: number, price: number) {
    const drinkId = Math.random().toString();
    const newDrink = new DrinkModel(drinkId, title, itemNo, price);
    this.drinks.push(newDrink);
    return drinkId;
  }

  getDrinks() {
    return [...this.drinks];
  }

  getSingleDrink(drinkId: string) {
    const drink = this.findDrink(drinkId)[0];
    return { ...drink };
  }

  updateDrink(drinkId: string, title: string, itemNo: number, price: number) {
    const [drink, index] = this.findDrink(drinkId);
    const updatedDrink = { ...drink };
    if (title) {
      updatedDrink.title = title;
    }
    if (itemNo) {
      updatedDrink.itemNo = itemNo;
    }
    if (price) {
      updatedDrink.price = price;
    }
    this.drinks[index] = updatedDrink;
  }

  deleteDrink(drinkId: string) {
    const index = this.findDrink(drinkId)[1];
    this.drinks.splice(index, 1);
  }

  private findDrink(id: string): [DrinkModel, number] {
    const drinkIndex = this.drinks.findIndex((drink) => drink.id === id);
    const drink = this.drinks[drinkIndex];
    if (!drink) {
      throw new NotFoundException('Drink could not be found.');
    }
    return [drink, drinkIndex];
  }
}
