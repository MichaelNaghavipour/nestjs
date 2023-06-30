import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { title } from 'process';

@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Post()
  addDrinks(
    @Body('title') drinkTitle: string,
    @Body('itemNo') drinkItemNo: number,
    @Body('price') drinkPrice: number,
  ) {
    const generatedId2 = this.drinksService.insertDrinks(
      drinkTitle,
      drinkItemNo,
      drinkPrice,
    );
    return { id: generatedId2 };
  }

  @Get()
  getAllDrinks() {
    return this.drinksService.getDrinks();
  }

  @Get(':id')
  getDrink(@Param('id') drinkId: string) {
    return this.drinksService.getSingleDrink(drinkId);
  }

  @Patch(':id')
  updateDrink(
    @Param('id') drinkId: string,
    @Body('title') drinkTitle: string,
    @Body('itemNo') itemNo: number,
    @Body('price') drinkPrice: number,
  ) {
    this.drinksService.updateDrink(drinkId, drinkTitle, itemNo, drinkPrice);
    return null;
  }

  @Delete(':id')
  deleteDrink(@Param('id') drinkId: string) {
    this.drinksService.deleteDrink(drinkId);
    return null;
  }
}
