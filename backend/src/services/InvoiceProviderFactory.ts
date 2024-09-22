
import { PagBankProvider } from '../providers/PagBankProvider';

export class InvoiceProviderFactory {
  static getProvider(providerName: string) {
    switch (providerName) {
      case 'pagbank':
        return new PagBankProvider();
      default:
        throw new Error('No valid provider found.');
    }
  }
}
