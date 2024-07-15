// src/global.d.ts
declare module NodeJS {
  interface Module {
    hot?: {
      accept(path?: string, callback?: () => void): void;
      accept(dependencies: string[], callback: (updatedDependencies: any) => void): void;
      decline(path?: string): void;
      dispose(callback: (data: any) => void): void;
      addDisposeHandler(callback: (data: any) => void): void;
      removeDisposeHandler(callback: (data: any) => void): void;
    };
  }
}

declare module 'shell/events' {
  export const ADD_TO_CART_EVENT: string;
  export const REMOVE_FROM_CART_EVENT: string;

  export const addToCart: (product: any) => CustomEvent;
  export const removeFromCart: (productId: number) => CustomEvent;
}