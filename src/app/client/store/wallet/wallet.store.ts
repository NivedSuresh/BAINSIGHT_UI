import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {WalletService} from "../../services/wallet/wallet.service";
import {PagedTransactions, walletState} from "./wallet.state";

export const walletStore =
  signalStore({providedIn : "root"},
    withState(walletState),

    withMethods((store,
                 walletService: WalletService = inject(WalletService),
                 toastr: ToastrService = inject(ToastrService)) => ({


      async fetchWalletAndTransactionsOnInit(){
        try
        {
          const newState = await walletService.fetchWalletAndTransactions();
          console.log(newState.transactions.transactions);
          patchState(store, {
            transactions: newState.transactions,
            currentBalance: newState.currentBalance,
            withdrawableBalance: newState.withdrawableBalance
          });

        }
        catch (err: any){
          toastr.error(err.error.message);
        }
      },


      async fetchPage(page: number){
        try
        {
          const pagedTransactions: PagedTransactions  = await walletService.fetchTransactions(page);
          patchState(store, {transactions: pagedTransactions});
        }
        catch (err: any)
        {
          toastr.error(err.error.message);
        }
      }

    })),
  )
