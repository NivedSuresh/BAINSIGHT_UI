import {PortfolioSymbol} from "../../../shared/models/portfolio-symbol.model";
import {Page} from "../../../shared/models/watchlist.model";

export type PortfolioStateType = {
  portfolioSymbols: PortfolioSymbol[],
  page: Page
}

export const portfolioState : PortfolioStateType = {
  portfolioSymbols: [],
  page: {prev: false, next: false, page: 0}
}
