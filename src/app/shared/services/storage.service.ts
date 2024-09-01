import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private platform = inject(PLATFORM_ID);

  private storage = isPlatformBrowser(this.platform) ? localStorage : new MockStorage();

  get(key: string): string | null {
    return this.storage.getItem(key) || null;
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

class MockStorage {
  store = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: any) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}